import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import re
import os
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
from pymongo import MongoClient
from datetime import datetime
from selenium.common.exceptions import TimeoutException, WebDriverException
from urllib.parse import urlparse

class AIToolsScraper:
    def __init__(self, mongodb_uri="mongodb://localhost:27017/"):
        self.client = MongoClient(mongodb_uri)
        self.db = self.client['toolify_db']
        self.collection = self.db['tools']
        self.screenshots_dir = 'screenshots'
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_argument('--disable-notifications')
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        # Define technology keywords
        self.tech_keywords = {
            'LLM': ['llm', 'large language model', 'gpt', 'transformer'],
            'Computer Vision': ['computer vision', 'image recognition', 'object detection', 'cv'],
            'NLP': ['natural language processing', 'nlp', 'text analysis', 'language understanding'],
            'Machine Learning': ['machine learning', 'ml', 'deep learning', 'neural network'],
            'Speech AI': ['speech recognition', 'text to speech', 'voice ai', 'speech-to-text'],
            'Generative AI': ['generative ai', 'text-to-image', 'gan', 'diffusion model']
        }
        
        # Define tool categories
        self.tool_categories = {
            'content_generation': ['writer', 'content creator', 'generate content', 'writing assistant'],
            'image_generation': ['image generator', 'create images', 'art generator', 'designer'],
            'analysis': ['analyzer', 'analysis tool', 'insights', 'data analysis'],
            'conversion': ['converter', 'transformer', 'translate', 'transcribe'],
            'automation': ['automation', 'automate', 'workflow', 'bot'],
            'assistant': ['assistant', 'helper', 'chat', 'companion'],
            'developer_tool': ['developer', 'coding', 'programming', 'code generator']
        }
        
        # NEW: Main categories and their subcategories
        self.main_categories = {
            'Text&Writing': [
                'blog writer', 'blog', 'translate', 'translation', 'handwriting', 
                'copywriting', 'copy writer', 'captions', 'subtitle', 'essay writer', 
                'content writer', 'text generation', 'paraphrasing', 'summarization', 
                'grammar checker', 'writing assistant'
            ],
            'Image': [
                'image generator', 'image creation', 'art generator', 'photo editing', 
                'image upscaler', 'background remover', 'image enhancer', 'logo creator', 
                'design tool', 'illustration', 'image restoration', 'photo restoration'
            ],
            'Video': [
                'video creator', 'video generator', 'video editing', 'animation', 
                'motion graphics', 'video enhancement', 'video upscaling', 'video subtitles', 
                'video transcription', 'video summarization', 'video background removal'
            ],
            'Code&IT': [
                'code generator', 'programming assistant', 'code completion', 'debugging', 
                'code explanation', 'documentation', 'web development', 'app development', 
                'algorithm', 'IT solution', 'database', 'infrastructure', 'devops'
            ],
            'Voice': [
                'text to speech', 'speech to text', 'voice cloning', 'voice generator', 
                'voice assistant', 'voice recognition', 'voice analysis', 'voice enhancement', 
                'podcast', 'audio', 'voice over', 'speech synthesis'
            ],
            'Business': [
                'business analytics', 'market research', 'business intelligence', 'crm', 
                'sales', 'finance', 'accounting', 'project management', 'hr', 'recruitment', 
                'team management', 'strategy', 'business plan', 'presentation', 'pitch deck'
            ],
            'Marketing': [
                'seo', 'email marketing', 'social media', 'ad creation', 'ad copy', 
                'content strategy', 'marketing analysis', 'customer segmentation', 
                'campaign management', 'marketing automation', 'influencer marketing'
            ],
            'AI Detector': [
                'ai detection', 'content verification', 'plagiarism', 'ai text detector', 
                'ai image detector', 'deepfake detector', 'authenticity checker', 
                'originality check'
            ],
            'Chatbot': [
                'chatbot', 'conversational ai', 'chat assistant', 'customer support', 
                'virtual assistant', 'dialogue system', 'qa bot', 'interactive agent'
            ],
            'Education': [
                'learning', 'tutor', 'education', 'teaching', 'course', 'study', 
                'homework', 'academic', 'research assistant', 'knowledge base'
            ],
            'Productivity': [
                'productivity', 'automation', 'time management', 'task management', 
                'notes', 'organization', 'calendar', 'scheduling', 'workflow'
            ],
            'Research': [
                'research', 'data analysis', 'scientific', 'literature review', 
                'academic research', 'insights', 'discovery', 'knowledge extraction'
            ]
        }
        
        # Define source platforms
        self.source_platforms = {
            'huggingface': ['hugging face', 'huggingface.co', 'huggingface'],
            'replicate': ['replicate.com', 'replicate'],
            'openai': ['openai.com', 'openai', 'gpt-4', 'gpt-3'],
            'anthropic': ['anthropic', 'claude'],
            'stability': ['stability.ai', 'stable diffusion'],
            'midjourney': ['midjourney'],
            'google': ['google', 'gemini', 'bard'],
            'aws': ['amazon web services', 'aws', 'amazon bedrock'],
            'azure': ['azure', 'microsoft ai'],
            'meta': ['meta ai', 'llama']
        }

    def is_valid_content(self, text):
        """Check if the content is valid and not a bot check page"""
        if not text:
            return False
            
        invalid_patterns = [
            r'verify you are human',
            r'enable javascript',
            r'complete the security check',
            r'waiting.*respond',
            r'cloudflare',
            r'just moment',
            r'please wait',
            r'security check'
        ]
        
        return not any(re.search(pattern, text.lower()) for pattern in invalid_patterns)

    def identify_tool_category(self, text):
        """Identify the main category of the AI tool"""
        text = text.lower()
        max_matches = 0
        best_category = None
        
        for category, keywords in self.tool_categories.items():
            matches = sum(1 for keyword in keywords if keyword in text)
            if matches > max_matches:
                max_matches = matches
                best_category = category
        
        return best_category
    
    # NEW: Identify main category and subcategory
    def identify_main_category_and_subcategory(self, text):
        """Identify the main category and subcategory of the AI tool"""
        if not text or not self.is_valid_content(text):
            return {'main_category': 'Uncategorized', 'subcategory': None}
            
        text = text.lower()
        results = {'main_category': 'Uncategorized', 'subcategory': None}
        
        # Score each main category by counting the number of keyword matches
        category_scores = {}
        subcategory_matches = {}
        
        for category, keywords in self.main_categories.items():
            matches = []
            for keyword in keywords:
                if keyword in text:
                    matches.append(keyword)
            
            if matches:
                category_scores[category] = len(matches)
                subcategory_matches[category] = matches
        
        # Find the category with the highest score
        if category_scores:
            max_score = max(category_scores.values())
            best_categories = [cat for cat, score in category_scores.items() if score == max_score]
            
            # If there's a tie, prefer categories earlier in the list
            results['main_category'] = best_categories[0]
            
            # Determine subcategory - use the longest matching term from the winning category
            if subcategory_matches[results['main_category']]:
                subcategory_term = max(subcategory_matches[results['main_category']], key=len)
                
                # Format the subcategory nicely
                subcategory = subcategory_term.replace('-', ' ').title()
                
                # Special handling for common terms
                if 'seo' in subcategory.lower():
                    subcategory = subcategory.replace('Seo', 'SEO')
                if 'ai' in subcategory.lower().split():
                    subcategory = subcategory.replace('Ai', 'AI')
                if 'qa' in subcategory.lower().split():
                    subcategory = subcategory.replace('Qa', 'QA')
                if 'hr' in subcategory.lower().split():
                    subcategory = subcategory.replace('Hr', 'HR')
                
                results['subcategory'] = subcategory
                
        return results

    def detect_source_platforms(self, text, url):
        """Detect source platforms the tool is built on"""
        if not text or not self.is_valid_content(text):
            return []
        
        text = text.lower()
        detected_sources = set()
        
        # Check for mentions in text
        for source, keywords in self.source_platforms.items():
            if any(keyword in text for keyword in keywords):
                detected_sources.add(source)
        
        # Check for API mentions
        api_patterns = [
            r'powered by (\w+)',
            r'uses (\w+) api',
            r'based on (\w+)',
            r'built (on|with) (\w+)',
            r'leverages (\w+)'
        ]
        
        for pattern in api_patterns:
            matches = re.findall(pattern, text)
            for match in matches:
                if isinstance(match, tuple):  # For patterns with multiple capture groups
                    potential_source = match[1].lower() if len(match) > 1 else match[0].lower()
                else:
                    potential_source = match.lower()
                
                # Map the potential source to our known platforms
                for source, keywords in self.source_platforms.items():
                    if any(keyword.lower() in potential_source for keyword in keywords):
                        detected_sources.add(source)
                        
        # Check links in the page for API providers
        soup = BeautifulSoup(self.driver.page_source, 'html.parser')
        for link in soup.find_all('a', href=True):
            href = link['href'].lower()
            for source, keywords in self.source_platforms.items():
                if any(keyword in href for keyword in keywords):
                    detected_sources.add(source)
        
        return list(detected_sources) if detected_sources else ['Independent/Unknown']

    def extract_growth_data(self, text):
        """Extract growth rate information from text"""
        growth_data = {
            'growth_rate_percentage': None,
            'growth_numbers': None,
            'time_period': None
        }
        
        if not text or not self.is_valid_content(text):
            return growth_data
            
        # Patterns for percentage growth
        percentage_patterns = [
            r'(?:grew|growth|increased|up)(?:\sby)?\s(\d+(?:\.\d+)?)%',
            r'(\d+(?:\.\d+)?)%\s(?:growth|increase)',
            r'(?:growth rate|growth)(?:\sof)?\s(\d+(?:\.\d+)?)%'
        ]
        
        for pattern in percentage_patterns:
            if matches := re.search(pattern, text):
                growth_data['growth_rate_percentage'] = float(matches.group(1))
                break
        
        # Patterns for absolute growth numbers
        number_patterns = [
            r'(?:grew|increased|added)\s(?:from|by)?\s(?:\w+\s)?(\d+[,\d]*)\sto\s(?:\w+\s)?(\d+[,\d]*)',
            r'(?:user base|users|customers)(?:\sincreased)?\s(?:from|by)?\s(?:\w+\s)?(\d+[,\d]*)\sto\s(?:\w+\s)?(\d+[,\d]*)'
        ]
        
        for pattern in number_patterns:
            if matches := re.search(pattern, text):
                start_num = int(matches.group(1).replace(',', ''))
                end_num = int(matches.group(2).replace(',', ''))
                growth_data['growth_numbers'] = {
                    'start': start_num,
                    'end': end_num,
                    'absolute_growth': end_num - start_num
                }
                # Calculate percentage if we have numbers but no explicit percentage
                if growth_data['growth_rate_percentage'] is None and start_num > 0:
                    growth_data['growth_rate_percentage'] = round((end_num - start_num) * 100 / start_num, 2)
                break
        
        # Patterns for time period
        time_period_patterns = [
            r'(?:in|over|during|the past|the last|the previous)\s(\d+)\s(day|week|month|year|quarter)s?',
            r'(?:since|from)\s(?:last|the beginning of)\s(January|February|March|April|May|June|July|August|September|October|November|December|Q1|Q2|Q3|Q4)',
            r'(?:in|during)\s(20\d\d)'
        ]
        
        for pattern in time_period_patterns:
            if matches := re.search(pattern, text):
                growth_data['time_period'] = matches.group(0)
                break
                
        return growth_data

    def create_structured_description(self, text, category, tool_name):
        """Create a structured description based on the tool category"""
        category_templates = {
            'content_generation': "AI-powered content generation tool for",
            'image_generation': "AI image generation tool that",
            'analysis': "AI analysis tool that",
            'conversion': "AI conversion tool that",
            'automation': "AI automation tool for",
            'assistant': "AI assistant that",
            'developer_tool': "AI development tool for"
        }
        
        purpose_patterns = [
            r"(?:helps|allows|enables)(?:\syou)?\sto\s([\w\s\-]+?)(?:\.|,|\s(?:and|with|using))",
            r"(?:for|specialized\sin)\s([\w\s\-]+?)(?:\.|,|\s(?:and|with|using))",
            r"(?:creates|generates|produces)\s([\w\s\-]+?)(?:\.|,|\s(?:and|with|using))"
        ]
        
        purpose = None
        for pattern in purpose_patterns:
            if match := re.search(pattern, text.lower()):
                purpose = match.group(1).strip()
                if 5 <= len(purpose.split()) <= 10:
                    break
        
        if purpose:
            template = category_templates.get(category, "AI tool that")
            return f"{template} {purpose}"
        
        return None

    def format_description(self, description):
        """Format and clean the description"""
        if not description:
            return None
            
        # Remove marketing fluff
        marketing_words = r'\b(simply|easily|quickly|efficiently|seamlessly|revolutionary|cutting-edge|innovative)\b'
        description = re.sub(marketing_words, '', description)
        
        # Clean up whitespace
        description = ' '.join(description.split())
        
        # Capitalize first letter
        description = description[0].upper() + description[1:] if description else ''
        
        # Ensure it ends with a period
        if description and not description.endswith('.'):
            description += '.'
        
        # Limit length
        words = description.split()
        if len(words) > 15:
            description = ' '.join(words[:15]) + '...'
        
        return description

    def extract_main_use_case(self, text, tool_name):
        """Extract precise and appropriate introduction for the AI tool"""
        if not self.is_valid_content(text):
            return None
            
        # Clean the text
        text = re.sub(r'\s+', ' ', text.lower())
        
        # Try to find the most relevant description
        description = None
        
        # 1. Look for specific tool type patterns
        tool_patterns = [
            rf"{tool_name.lower()} is (?:an? )?(?:ai )?(?:tool |platform |solution )?(?:that |which |to )([\w\s\-,\.]+?)[\.\n]",
            rf"{tool_name.lower()} ((?:helps|allows|enables) (?:you |users )?to )([\w\s\-,\.]+?)[\.\n]",
            r"(?:ai tool|platform|solution) (?:for|that) ([\w\s\-,\.]+?)[\.\n]"
        ]
        
        for pattern in tool_patterns:
            match = re.search(pattern, text)
            if match:
                description = match.group(1)
                break
        
        if not description:
            # 2. Try category-based description
            category = self.identify_tool_category(text)
            if category:
                description = self.create_structured_description(text, category, tool_name)
        
        if not description:
            sentences = re.split(r'[.!?]', text)
            for sentence in sentences:
                if len(sentence.split()) >= 5 and len(sentence.split()) <= 15:
                    if any(tech in sentence.lower() for tech in ['ai', 'machine learning', 'generator', 'analyzer', 'assistant']):
                        description = sentence.strip()
                        break
        
        return self.format_description(description) if description else None

    def wait_for_content(self, timeout=20):
        """Wait for real content to load with multiple checks"""
        try:
            # Wait for body
            WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            # Check for content indicators
            for selector in ['h1', 'main', 'article', '.content', '#main-content']:
                try:
                    WebDriverWait(self.driver, 5).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                    )
                    break
                except TimeoutException:
                    continue
                    
            time.sleep(3)
            return True
        except TimeoutException:
            return False

    def take_screenshot(self, url, tool_name):
        """Take a screenshot of the website and convert to PNG binary data for MongoDB storage"""
        try:
            # Create a safe filename
            safe_name = re.sub(r'[^\w\-.]', '', tool_name.lower())
            file_path = os.path.join(self.screenshots_dir, f"{safe_name}.png")
            
            # Take screenshot
            self.driver.save_screenshot(file_path)
            
            # Optimize and convert to JPG (smaller size)
            with Image.open(file_path) as img:
                # Create output path for JPG
                jpg_path = os.path.join(self.screenshots_dir, f"{safe_name}.jpg")
                
                # Convert to RGB (in case it's PNG with alpha channel)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Save as JPG with quality=85
                img.save(jpg_path, 'JPEG', quality=85, optimize=True)
                
                # Read the JPG file as binary data
                with open(jpg_path, "rb") as image_file:
                    binary_data = Binary(image_file.read())
                
                return {
                    'data': binary_data,
                    'content_type': 'image/jpeg',
                    'filename': f"{safe_name}.jpg"
                }
                
        except Exception as e:
            print(f"Error taking screenshot for {url}: {str(e)}")
            return None

    def detect_technologies(self, text):
        """Detect AI technologies with improved detection"""
        if not text or not self.is_valid_content(text):
            return []
            
        text = text.lower()
        detected_tech = set()
        
        for tech, keywords in self.tech_keywords.items():
            if any(keyword in text for keyword in keywords):
                detected_tech.add(tech)
        
        return list(detected_tech) if detected_tech else ['Unknown']

    def check_similar_tools_for_growth(self, tool_name):
        """Check similar tools in database for growth data to estimate if unavailable"""
        estimated_growth = None
        try:
            # Find tools in the same category with growth data
            similar_tools = self.collection.find({
                "growth_rate_percentage": {"$exists": True, "$ne": None}
            })
            
            growth_rates = [tool.get('growth_rate_percentage', 0) for tool in similar_tools]
            
            if growth_rates:
                # Calculate average growth rate of similar tools
                estimated_growth = sum(growth_rates) / len(growth_rates)
                
        except Exception as e:
            print(f"Error estimating growth for {tool_name}: {str(e)}")
            
        return estimated_growth

    def _safe_extract(self, soup, selector):
        """Safely extract text with improved cleaning"""
        try:
            element = soup.select_one(selector)
            if element:
                # Remove script and style content
                for script in element.find_all(['script', 'style']):
                    script.decompose()
                text = element.get_text(strip=True)
                # Clean up the text
                text = re.sub(r'\s+', ' ', text)
                return text.strip()
        except Exception:
            pass
        return ''

    def extract_tool_name(self, url, soup, full_name=None):
        """Extract the concise tool name from various sources"""
        # Method 1: Try to extract from meta tags
        for meta in soup.find_all('meta'):
            property_value = meta.get('property', '')
            if property_value in ['og:site_name', 'twitter:site']:
                site_name = meta.get('content', '')
                if site_name and len(site_name) < 50:
                    return site_name.strip()
            
        # Method 2: Extract from title tag, but clean it
        title = soup.title.string if soup.title else ""
        if title:
            # Remove common suffixes
            title = re.sub(r'\s*[|\-–—]\s*.*$', '', title)
            # Remove common descriptors
            title = re.sub(r'\s*-\s*AI\s+.*$', '', title, flags=re.IGNORECASE)
            if len(title.split()) <= 3:
                return title.strip()
        
        # Method 3: Extract from URL domain
        domain = urlparse(url).netloc
        # Remove www. prefix if present
        domain = re.sub(r'^www\.', '', domain)
        # Get the main domain name without TLD
        main_domain = domain.split('.')[0]
        
        # Convert to proper case if it looks like a brand name
        if main_domain and len(main_domain) > 2:
            # Format 'toolify' to 'Toolify'
            formatted_domain = main_domain[0].upper() + main_domain[1:].lower()
            
            # Check if it's a merged name (camelCase or PascalCase)
            if re.search(r'[A-Z]', main_domain[1:]):
                # Split camelCase/PascalCase into separate words (e.g., "ToolifyAI" -> "Toolify AI")
                formatted_domain = re.sub(r'([a-z])([A-Z])', r'\1 \2', formatted_domain)
            
            # Check if "ai" is part of the domain and format accordingly
            ai_match = re.search(r'([aA][iI])$', formatted_domain)
            if ai_match:
                # Format 'toolifyai' to 'Toolify.AI'
                formatted_domain = formatted_domain.replace(ai_match.group(1), '.AI')
            
            return formatted_domain
        
        # Method 4: Use the h1 tag if it's short enough
        h1_text = self._safe_extract(soup, 'h1')
        if h1_text and len(h1_text.split()) <= 3:
            return h1_text
        
        # Fallback: Use the provided full name but truncate it
        if full_name:
            # Get the first 2-3 words if they seem like a name
            name_parts = full_name.split()
            if len(name_parts) <= 3:
                return full_name
            return ' '.join(name_parts[:2])
        
        # Last resort: Return the domain if nothing else works
        return domain.replace('.', ' ').title()

    def scrape_ai_tools(self, urls):
        """Scrape information about AI tools with improved error handling"""
        for url in urls:
            retry_count = 0
            max_retries = 3
            
            while retry_count < max_retries:
                try:
                    self.driver.get(url)
                    
                    if not self.wait_for_content():
                        print(f"Timeout waiting for content on {url}")
                        retry_count += 1
                        continue
                    
                    soup = BeautifulSoup(self.driver.page_source, 'html.parser')
                    
                    # Extract content with multiple selectors
                    content_text = ""
                    for selector in ['main', 'article', '.content', '#main-content', '.description', '.about']:
                        if content := soup.select_one(selector):
                            content_text = content.get_text(separator=' ', strip=True)
                            if len(content_text) > 100 and self.is_valid_content(content_text):
                                break
                    
                    if not content_text:
                        content_text = soup.find('body').get_text(separator=' ', strip=True)
                    
                    if not self.is_valid_content(content_text):
                        print(f"Invalid content detected on {url}, retrying...")
                        retry_count += 1
                        continue
                    
                    # Extract full name (longer description that might be used as title)
                    full_name = (self._safe_extract(soup, 'h1') or 
                            self._safe_extract(soup, '.tool-name') or 
                            self._safe_extract(soup, '.brand') or
                            self._safe_extract(soup, 'title'))
                    
                    if not full_name:
                        print(f"Could not extract name from {url}, retrying...")
                        retry_count += 1
                        continue
                    
                    # Extract the concise tool name (e.g. "Toolify.AI")
                    tool_name = self.extract_tool_name(url, soup, full_name)
                    
                    main_use_case = self.extract_main_use_case(content_text, tool_name)
                    technologies = self.detect_technologies(content_text)
                    
                    # Extract source platforms
                    source_platforms = self.detect_source_platforms(content_text, url)
                    
                    # Extract growth data
                    growth_data = self.extract_growth_data(content_text)
                    
                    # NEW: Extract main category and subcategory
                    category_info = self.identify_main_category_and_subcategory(content_text)
                    
                    # If growth data isn't found directly, try blog or news sections
                    if growth_data['growth_rate_percentage'] is None:
                        try:
                            # Try to find and navigate to blog/news section
                            for link_text in ['blog', 'news', 'about', 'press']:
                                blog_links = self.driver.find_elements(By.XPATH, f"//a[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{link_text}')]")
                                if blog_links and len(blog_links) > 0:
                                    # Store current URL to navigate back
                                    current_url = self.driver.current_url
                                    blog_links[0].click()
                                    time.sleep(3)
                                    
                                    # Extract blog content
                                    blog_soup = BeautifulSoup(self.driver.page_source, 'html.parser')
                                    blog_text = blog_soup.find('body').get_text(separator=' ', strip=True)
                                    
                                    # NEW: Search for additional category information in blog
                                    if category_info['main_category'] == 'Uncategorized':
                                        blog_category_info = self.identify_main_category_and_subcategory(blog_text)
                                        if blog_category_info['main_category'] != 'Uncategorized':
                                            category_info = blog_category_info
                                    
                                    # Check for growth data in blog
                                    blog_growth_data = self.extract_growth_data(blog_text)
                                    if blog_growth_data['growth_rate_percentage'] is not None:
                                        growth_data = blog_growth_data
                                        break
                                        
                                    # Navigate back to main page
                                    self.driver.get(current_url)
                                    time.sleep(2)
                        except Exception as e:
                            print(f"Error checking blog/news for growth data: {str(e)}")
                    
                    # If still no growth data, try to estimate based on similar tools
                    if growth_data['growth_rate_percentage'] is None:
                        estimated_growth = self.check_similar_tools_for_growth(tool_name)
                        if estimated_growth is not None:
                            growth_data['growth_rate_percentage'] = estimated_growth
                            growth_data['is_estimated'] = True
                    
                    # If the category is Uncategorized, try harder with the main use case
                    if category_info['main_category'] == 'Uncategorized' and main_use_case:
                        secondary_category_info = self.identify_main_category_and_subcategory(main_use_case)
                        if secondary_category_info['main_category'] != 'Uncategorized':
                            category_info = secondary_category_info
                    
                    if not main_use_case or not technologies:
                        print(f"Missing critical information from {url}, retrying...")
                        retry_count += 1
                        continue
                    
                    # Take screenshot
                    screenshot_data = self.take_screenshot(url, tool_name)
                    
                    tool_document = {
                        'name': full_name,        # Full descriptive name (e.g. "Discover The Best AI Websites & Tools")
                        'tool_name': tool_name,   # Concise tool name (e.g. "Toolify.AI")
                        'main_use_case': main_use_case,
                        'technologies': technologies,
                        'url': url,
                        'source_platforms': source_platforms,
                        'growth_rate_percentage': growth_data['growth_rate_percentage'],
                        'growth_numbers': growth_data['growth_numbers'],
                        'growth_time_period': growth_data['time_period'],
                        'is_estimated_growth': growth_data.get('is_estimated', False),
                        'main_category': category_info['main_category'],  # NEW: Main category
                        'subcategory': category_info['subcategory'],      # NEW: Subcategory
                        'screenshot': screenshot_data,
                        'last_updated': datetime.utcnow()
                    }
                    
                    # Store if data is valid
                    if all(key in tool_document for key in ['name', 'tool_name', 'main_use_case', 'technologies', 'url']):
                        self.collection.update_one(
                            {'url': url},
                            {'$set': tool_document},
                            upsert=True
                        )
                        
                        print(f"Successfully scraped and stored tool: {tool_document['tool_name']}")
                        print(f"Full name: {tool_document['name']}")
                        print(f"Main use case: {tool_document['main_use_case']}")
                        print(f"Technologies: {', '.join(tool_document['technologies'])}")
                        print(f"Source platforms: {', '.join(tool_document['source_platforms'])}")
                        
                        # Print category information
                        print(f"Main category: {tool_document['main_category']}")
                        if tool_document['subcategory']:
                            print(f"Subcategory: {tool_document['subcategory']}")
                        
                        # Print growth information if available
                        if tool_document['growth_rate_percentage'] is not None:
                            print(f"Growth rate: {tool_document['growth_rate_percentage']}%" + 
                                 (" (estimated)" if tool_document['is_estimated_growth'] else ""))
                            
                            if tool_document['growth_time_period']:
                                print(f"Time period: {tool_document['growth_time_period']}")
                                
                            if tool_document['growth_numbers']:
                                print(f"Growth numbers: {tool_document['growth_numbers']['start']} to {tool_document['growth_numbers']['end']}")
                        else:
                            print("Growth data: Not available")
                            
                        print(f"Screenshot taken: {'Yes' if screenshot_data else 'No'}")
                        print("-" * 50)
                        break
                    
                except Exception as e:
                    print(f"Error scraping {url} (attempt {retry_count + 1}): {str(e)}")
                    retry_count += 1
                    
                time.sleep(5)
            
            if retry_count == max_retries:
                print(f"Failed to scrape {url} after {max_retries} attempts")

    def export_to_csv(self, filename='ai_tools_data.csv'):
        """Export MongoDB data to CSV (excluding screenshot binary data)"""
        cursor = self.collection.find({})
        data = list(cursor)
        
        if data:
            df = pd.DataFrame(data)
            df = df.drop('_id', axis=1)
            
            # Remove screenshot binary data from CSV export
            if 'screenshot' in df.columns:
                df['has_screenshot'] = df['screenshot'].apply(lambda x: True if x else False)
                df = df.drop('screenshot', axis=1)
                
            df.to_csv(filename, index=False)
            print(f"\nData exported to {filename}")
        else:
            print("No data to export")

    def close(self):
        """Close connections"""
        self.driver.quit()
        self.client.close()

def main():
    urls = [
        'https://discord.com/invite/midjourney'
    
    ]
    
    scraper = AIToolsScraper(mongodb_uri="mongodb://localhost:27017/")
    try:
        scraper.scrape_ai_tools(urls)
        scraper.export_to_csv()
    finally:
        scraper.close()

if __name__ == "__main__":
    main()


# import requests 
# from pprint import pprint
#  # Structure payload. 
# payload = {'source': 'amazon_product','query': 'B07FZ8S74R','geo_location': '90210','parse': True} 
# # Get response.
# response = requests.request(
#  'POST',
#  'https://realtime.oxylabs.io/v1/queries',
#  auth=('Demo_data', 'Demo_account1234'),
#  json=payload,)
# # Print prettified response to stdout.
# pprint(response.json())