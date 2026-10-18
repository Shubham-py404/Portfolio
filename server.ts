import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PORTFOLIO_DATA } from './src/data/defaultPortfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3001', 10);
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize portfolio data on disk if not existing
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_PORTFOLIO_DATA, null, 2), 'utf8');
}

// Read current portfolio data
function getPortfolioData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading portfolio data, resetting to initial seed:', err);
    return INITIAL_PORTFOLIO_DATA;
  }
}

// Save portfolio data
function savePortfolioData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    broadcastUpdate(data);
    return true;
  } catch (err) {
    console.error('Error saving portfolio data:', err);
    return false;
  }
}

// SSE Clients for real-time synchronization
let sseClients: express.Response[] = [];

function broadcastUpdate(data: any) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach((client) => {
    try {
      client.write(payload);
    } catch (e) {
      // client disconnected
    }
  });
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '20mb' }));

  // --- API Endpoints ---

  // GET Portfolio Data
  app.get('/api/portfolio', (req, res) => {
    const data = getPortfolioData();
    res.json(data);
  });

  // PUT Update Portfolio Data
  app.put('/api/portfolio', (req, res) => {
    const newData = req.body;
    if (!newData || !newData.profile) {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }
    const success = savePortfolioData(newData);
    if (success) {
      res.json({ status: 'ok', data: newData });
    } else {
      res.status(500).json({ error: 'Failed to write to portfolio database' });
    }
  });

  // POST Contact Form
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const currentData = getPortfolioData();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'Portfolio Contact',
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    if (!currentData.messages) {
      currentData.messages = [];
    }
    currentData.messages.unshift(newMessage);
    savePortfolioData(currentData);

    res.json({ status: 'ok', message: newMessage });
  });

  // DELETE Message
  app.delete('/api/messages/:id', (req, res) => {
    const { id } = req.params;
    const currentData = getPortfolioData();
    if (currentData.messages) {
      currentData.messages = currentData.messages.filter((m: any) => m.id !== id);
      savePortfolioData(currentData);
    }
    res.json({ status: 'ok' });
  });

  // SSE Endpoint for Live Real-Time Updates
  app.get('/api/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Send initial ping and data
    const currentData = getPortfolioData();
    res.write(`data: ${JSON.stringify(currentData)}\n\n`);

    sseClients.push(res);

    req.on('close', () => {
      sseClients = sseClients.filter((client) => client !== res);
    });
  });

  // --- Vite & Static Handling ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ➜  Local: http://localhost:${PORT}\n`);
  });
}

startServer();
