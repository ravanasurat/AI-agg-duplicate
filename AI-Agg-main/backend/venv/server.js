// import express from 'express';
// import { MongoClient, ObjectId } from 'mongodb';
// import cors from 'cors';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// // Get current file path (ES module equivalent of __dirname)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 8000;
// const MONGODB_URI = 'mongodb://localhost:27017';
// const DB_NAME = 'toolify_db';
// const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// let db;

// async function connectToMongo() {
//   try {
//     const client = new MongoClient(MONGODB_URI);
//     await client.connect();
//     console.log('Connected to MongoDB');
//     db = client.db(DB_NAME);
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// }

// // Routes
// app.get('/api/tools', async (req, res) => {
//   try {
//     const tools = await db.collection('tools').find({}).toArray();
    
//     // Transform the data to exclude binary data for the API response
//     const transformedTools = tools.map(tool => {
//       const { screenshot, ...toolData } = tool;
//       return {
//         ...toolData,
//         hasScreenshot: !!screenshot
//       };
//     });
    
//     res.json(transformedTools);
//   } catch (error) {
//     console.error('Error fetching tools:', error);
//     res.status(500).json({ error: 'Failed to fetch tools' });
//   }
// });

// // Get a specific tool by ID
// app.get('/api/tools/:id', async (req, res) => {
//   try {
//     const tool = await db.collection('tools').findOne({ _id: new ObjectId(req.params.id) });
    
//     if (!tool) {
//       return res.status(404).json({ error: 'Tool not found' });
//     }
    
//     const { screenshot, ...toolData } = tool;
//     res.json({
//       ...toolData,
//       hasScreenshot: !!screenshot
//     });
//   } catch (error) {
//     console.error('Error fetching tool:', error);
//     res.status(500).json({ error: 'Failed to fetch tool' });
//   }
// });

// // Serve tool screenshots from MongoDB
// app.get('/api/tools/:id/screenshot', async (req, res) => {
//   try {
//     const tool = await db.collection('tools').findOne({ _id: new ObjectId(req.params.id) });
    
//     if (!tool || !tool.screenshot) {
//       return res.status(404).json({ error: 'Screenshot not found' });
//     }
    
//     // Set the content type header
//     res.set('Content-Type', tool.screenshot.content_type || 'image/jpeg');
    
//     // If the screenshot data is stored directly in MongoDB
//     if (tool.screenshot.data) {
//       return res.send(tool.screenshot.data.buffer);
//     }
    
//     // If the screenshot is stored as a file reference
//     if (tool.screenshot.filename) {
//       const filePath = path.join(SCREENSHOTS_DIR, tool.screenshot.filename);
      
//       if (fs.existsSync(filePath)) {
//         return res.sendFile(filePath);
//       }
//     }
    
//     res.status(404).json({ error: 'Screenshot file not found' });
//   } catch (error) {
//     console.error('Error fetching screenshot:', error);
//     res.status(500).json({ error: 'Failed to fetch screenshot' });
//   }
// });

// // Fallback for direct file access (in case MongoDB doesn't store the binary data)
// app.use('/screenshots', express.static(SCREENSHOTS_DIR));

// // Start the server
// async function startServer() {
//   await connectToMongo();
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// startServer();


import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current file path (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'toolify_db';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
    
    // Create collection if it doesn't exist
    const collections = await db.listCollections({ name: 'tools' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('tools');
      await seedDatabaseWithToolsData();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Seed the database with initial tools data based on the image
async function seedDatabaseWithToolsData() {
  try {
    const toolsData = [
      { main_category: 'Text&Writing', subcategory: 'AI Blog Writer', count: 506 },
      { main_category: 'Text&Writing', subcategory: 'Translate', count: 579 },
      { main_category: 'Text&Writing', subcategory: 'Papers', count: 246 },
      { main_category: 'Text&Writing', subcategory: 'Handwriting', count: 55 },
      { main_category: 'Text&Writing', subcategory: 'Copywriting', count: 863 },
      { main_category: 'Text&Writing', subcategory: 'Captions or Subtitle', count: 471 },
      { main_category: 'Text&Writing', subcategory: 'Essay Writer', count: 290 },
      { main_category: 'Text&Writing', subcategory: 'Letter Writer', count: 171 },
      { main_category: 'Text&Writing', subcategory: 'AI Lyrics Generator', count: 102 },
      { main_category: 'Text&Writing', subcategory: 'Report Writing', count: 261 },
      { main_category: 'Text&Writing', subcategory: 'AI Rewriter', count: 662 },
      { main_category: 'Text&Writing', subcategory: 'AI Script Writing', count: 236 },
      { main_category: 'Text&Writing', subcategory: 'AI Story Writing', count: 459 },
      { main_category: 'Text&Writing', subcategory: 'AI Bio Generator', count: 145 },
      { main_category: 'Text&Writing', subcategory: 'AI Book Writing', count: 229 },
      { main_category: 'Text&Writing', subcategory: 'Paraphraser', count: 563 },
      { main_category: 'Text&Writing', subcategory: 'AI Poem & Poetry Generator', count: 67 },
      { main_category: 'Text&Writing', subcategory: 'Summarizer', count: 1156 },
      { main_category: 'Text&Writing', subcategory: 'Pick-up Lines Generator', count: 43 },
      { main_category: 'Text&Writing', subcategory: 'Transcription', count: 577 },
      { main_category: 'Text&Writing', subcategory: 'General Writing', count: 944 },
      { main_category: 'Text&Writing', subcategory: 'Writing Assistants', count: 2873 },
      { main_category: 'Text&Writing', subcategory: 'AI Creative Writing', count: 586 },
      { main_category: 'Text&Writing', subcategory: 'Transcriber', count: 495 },
      { main_category: 'Image', subcategory: 'Image Generator', count: 1253 },
      { main_category: 'Image', subcategory: 'Image Editor', count: 872 },
      { main_category: 'Video', subcategory: 'Video Generator', count: 634 },
      { main_category: 'Video', subcategory: 'Video Editor', count: 528 },
      { main_category: 'Code&IT', subcategory: 'Code Generator', count: 765 },
      { main_category: 'Code&IT', subcategory: 'Code Explainer', count: 432 },
      { main_category: 'Voice', subcategory: 'Text to Speech', count: 891 },
      { main_category: 'Voice', subcategory: 'Voice Cloning', count: 345 },
      { main_category: 'Business', subcategory: 'Business Plan Generator', count: 521 },
      { main_category: 'Business', subcategory: 'Financial Analysis', count: 378 },
      { main_category: 'Marketing', subcategory: 'Social Media Manager', count: 643 },
      { main_category: 'Marketing', subcategory: 'Email Campaign Creator', count: 487 },
      { main_category: 'AI Detector', subcategory: 'Content Detector', count: 732 },
      { main_category: 'AI Detector', subcategory: 'Plagiarism Checker', count: 654 },
      { main_category: 'Chatbot', subcategory: 'Customer Service Bot', count: 823 },
      { main_category: 'Design&Art', subcategory: 'Logo Designer', count: 976 },
      { main_category: 'Design&Art', subcategory: 'UI/UX Designer', count: 854 },
      { main_category: 'Life Assistant', subcategory: 'Personal Assistant', count: 765 },
      { main_category: '3D', subcategory: '3D Model Generator', count: 543 }
    ];

    await db.collection('tools').insertMany(toolsData);
    console.log('Database seeded with initial tools data');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Routes
app.get('/api/tools', async (req, res) => {
  try {
    const tools = await db.collection('tools').find({}).toArray();
    
    res.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// Get tools by main category
app.get('/api/tools/category/:mainCategory', async (req, res) => {
  try {
    const mainCategory = req.params.mainCategory;
    const tools = await db.collection('tools')
      .find({ main_category: mainCategory })
      .toArray();
    
    res.json(tools);
  } catch (error) {
    console.error('Error fetching tools by category:', error);
    res.status(500).json({ error: 'Failed to fetch tools by category' });
  }
});

// Get a specific tool by ID
app.get('/api/tools/:id', async (req, res) => {
  try {
    let tool;
    
    try {
      // Try to find by ObjectId
      tool = await db.collection('tools').findOne({ _id: new ObjectId(req.params.id) });
    } catch (err) {
      // If error (invalid ObjectId), try to find by string ID
      tool = await db.collection('tools').findOne({ _id: req.params.id });
    }
    
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    
    // Enhance the tool object with additional properties for the detail page
    const enhancedTool = {
      ...tool,
      tool_name: tool.subcategory,
      createdAt: tool.createdAt || new Date(Date.now() - Math.random() * 10000000000),
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500),
      savedCount: Math.floor(Math.random() * 1000),
      monthlyVisitors: `${Math.floor(Math.random() * 50)}K`,
      main_use_case: `${tool.subcategory} is a powerful AI-powered tool for ${tool.main_category.toLowerCase()} tasks. It helps users to efficiently process and generate high-quality content.`,
      url: `https://example.com/${tool.subcategory.toLowerCase().replace(/\s+/g, '-')}`,
      email: 'contact@example.com',
      socialLinks: {
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com'
      },
      technologies: ['AI', 'Machine Learning', tool.main_category],
      hasScreenshot: false
    };
    
    res.json(enhancedTool);
  } catch (error) {
    console.error('Error fetching tool:', error);
    res.status(500).json({ error: 'Failed to fetch tool' });
  }
});

// Get all main categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('tools').distinct('main_category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Serve tool screenshots from MongoDB
app.get('/api/tools/:id/screenshot', async (req, res) => {
  try {
    const tool = await db.collection('tools').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!tool || !tool.screenshot) {
      return res.status(404).json({ error: 'Screenshot not found' });
    }
    
    // Set the content type header
    res.set('Content-Type', tool.screenshot.content_type || 'image/jpeg');
    
    // If the screenshot data is stored directly in MongoDB
    if (tool.screenshot.data) {
      return res.send(tool.screenshot.data.buffer);
    }
    
    // If the screenshot is stored as a file reference
    if (tool.screenshot.filename) {
      const filePath = path.join(SCREENSHOTS_DIR, tool.screenshot.filename);
      
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }
    
    res.status(404).json({ error: 'Screenshot file not found' });
  } catch (error) {
    console.error('Error fetching screenshot:', error);
    res.status(500).json({ error: 'Failed to fetch screenshot' });
  }
});

// Fallback for direct file access (in case MongoDB doesn't store the binary data)
app.use('/screenshots', express.static(SCREENSHOTS_DIR));

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // For any request that doesn't match an API route, send the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Start the server
async function startServer() {
  await connectToMongo();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();