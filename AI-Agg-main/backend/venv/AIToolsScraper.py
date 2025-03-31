import os
import re
import asyncio
from io import BytesIO
from PIL import Image
from bson.binary import Binary
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from selenium.common.exceptions import TimeoutException, WebDriverException
from bs4 import BeautifulSoup

class AsyncAIToolsScraper:
    def __init__(self, mongodb_uri="mongodb://localhost:27017/"):
        self.client = AsyncIOMotorClient(mongodb_uri)
        self.db = self.client['toolify_db']
        self.collection = self.db['scraped_tools']
        
        self.screenshots_dir = 'screenshots'
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--window-size=1920,1080')
        
        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        self.tech_keywords = {
            'LLM': ['llm', 'large language model', 'gpt', 'transformer'],
            'Computer Vision': ['computer vision', 'image recognition', 'object detection'],
            'NLP': ['natural language processing', 'nlp', 'text analysis'],
            'Machine Learning': ['machine learning', 'ml', 'deep learning'],
            'Speech AI': ['speech recognition', 'text to speech', 'voice ai'],
            'Generative AI': ['generative ai', 'text-to-image', 'gan']
        }

    async def scrape_ai_tools(self, urls):
        """Async method to scrape information about AI tools"""
        results = []
        for url in urls:
            try:
                # Use asyncio.to_thread for CPU-bound operations
                result = await asyncio.to_thread(self._scrape_single_tool, url)
                if result:
                    # Store in MongoDB asynchronously
                    await self.collection.update_one(
                        {'url': url},
                        {'$set': result},
                        upsert=True
                    )
                    results.append(result)
            except Exception as e:
                print(f"Error scraping {url}: {str(e)}")
                continue
        return results

    def _scrape_single_tool(self, url):
        """Synchronous method to scrape a single tool"""
        try:
            self.driver.get(url)
            WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            
            # Extract content
            content_text = self._extract_content(soup)
            if not content_text:
                return None
                
            # Extract name
            name = (self._safe_extract(soup, 'h1') or 
                   self._safe_extract(soup, '.tool-name') or 
                   self._safe_extract(soup, '.brand') or
                   self._safe_extract(soup, 'title'))
            
            if not name:
                return None
                
            # Extract other information
            main_use_case = self._extract_main_use_case(content_text)
            technologies = self._detect_technologies(content_text)
            screenshot_data = self._take_screenshot(url, name)
            
            return {
                'name': name,
                'url': url,
                'main_use_case': main_use_case,
                'technologies': technologies,
                'content_text': content_text,
                'screenshot': screenshot_data,
                'last_updated': datetime.utcnow()
            }
            
        except Exception as e:
            print(f"Error in _scrape_single_tool for {url}: {str(e)}")
            return None

    def _extract_content(self, soup):
        """Extract main content from the page"""
        for selector in ['main', 'article', '.content', '#main-content']:
            if content := soup.select_one(selector):
                text = content.get_text(separator=' ', strip=True)
                if len(text) > 100:
                    return text
        return soup.find('body').get_text(separator=' ', strip=True)

    def _extract_main_use_case(self, text):
        """Extract the main use case from text"""
        patterns = [
            r'designed (?:for|to) ([\w\s\-,\.]{10,150}?)[\.\n]',
            r'helps (?:you |users |to )?([\w\s\-,\.]{10,150}?)[\.\n]',
            r'platform (?:for|that) ([\w\s\-,\.]{10,150}?)[\.\n]'
        ]
        
        for pattern in patterns:
            if match := re.search(pattern, text.lower()):
                return match.group(1).strip()
        
        # Fallback to first paragraph
        words = text.split()[:100]
        return ' '.join(words)

    def _detect_technologies(self, text):
        """Detect AI technologies mentioned in the text"""
        text = text.lower()
        detected_tech = set()
        
        for tech, keywords in self.tech_keywords.items():
            if any(keyword in text for keyword in keywords):
                detected_tech.add(tech)
        
        return list(detected_tech) if detected_tech else ['Unknown']

    def _take_screenshot(self, url, tool_name):
        """Take and process screenshot"""
        try:
            # Take screenshot
            safe_name = re.sub(r'[^\w\-.]', '', tool_name.lower())
            file_path = os.path.join(self.screenshots_dir, f"{safe_name}.png")
            self.driver.save_screenshot(file_path)
            
            # Process image
            with Image.open(file_path) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                    
                output_buffer = BytesIO()
                img.save(output_buffer, format='PNG', optimize=True)
                binary_data = Binary(output_buffer.getvalue())
                
            os.remove(file_path)
            
            return {
                'data': binary_data,
                'content_type': 'image/png',
                'filename': f"{safe_name}.png"
            }
        except Exception as e:
            print(f"Screenshot error for {url}: {str(e)}")
            return None

    def _safe_extract(self, soup, selector):
        """Safely extract text from HTML"""
        try:
            element = soup.select_one(selector)
            if element:
                return element.get_text(strip=True)
        except Exception:
            pass
        return ''

    async def close(self):
        """Close connections asynchronously"""
        await asyncio.to_thread(self.driver.quit)
        await self.client.close() 