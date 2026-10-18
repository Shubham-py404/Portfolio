import http from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PORTFOLIO_DATA } from './src/data/defaultPortfolio.js';

console.log('🚀 Starting portfolio server...');

const DEFAULT_PORT = parseInt(process.env.PORT || '3001', 10);
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
  const server = http.createServer(app);

  // Request logging middleware for visible server activity
  app.use((req, res, next) => {
    const start = Date.now();
    const url = req.originalUrl || req.url;
    res.on('finish', () => {
      // Filter out internal noisy asset polling so user sees real requests clearly
      if (
        !url.startsWith('/@') &&
        !url.includes('node_modules') &&
        !url.endsWith('.map') &&
        !url.startsWith('/src/')
      ) {
        const time = Date.now() - start;
        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url} → ${res.statusCode} (${time}ms)`);
      }
    });
    next();
  });

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
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server },
      },
      appType: 'spa',
    });

    // Vite transforms and handles modules/assets
    app.use(vite.middlewares);

    // Dev SPA HTML Fallback: transforms index.html with Vite HMR client & scripts
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.join(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Graceful port fallback
  const host = '0.0.0.0';
  let port = DEFAULT_PORT;

  function listen(targetPort: number) {
    server.listen(targetPort, host, () => {
      console.log(`\n  ➜  Local:   http://localhost:${targetPort}`);
      console.log(`  ➜  Network: http://127.0.0.1:${targetPort}\n`);
      console.log(`  ✓ Ready to accept connections. Logs will appear below:\n`);
    });
  }

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is currently in use. Trying port ${port + 1}...`);
      port += 1;
      setTimeout(() => {
        listen(port);
      }, 200);
    } else {
      console.error('Server error:', err);
    }
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  listen(port);
}

startServer();
