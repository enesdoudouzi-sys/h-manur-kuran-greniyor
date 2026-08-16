const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const DATA_DIR = process.env.DATA_DIR || __dirname;
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'progress.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    user_id TEXT PRIMARY KEY,
    state TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

const rateMap = new Map();
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 1000;
  const maxReq = 10;
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count++;
  rateMap.set(ip, entry);
  if (entry.count > maxReq) {
    return res.status(429).json({ error: 'Çok fazla istek, lütfen biraz bekle.' });
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId || userId.length > 64) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı kimliği.' });
  }
  const row = db.prepare('SELECT state, updated_at FROM progress WHERE user_id = ?').get(userId);
  if (!row) {
    return res.json({ state: null, updated_at: null });
  }
  try {
    res.json({ state: JSON.parse(row.state), updated_at: row.updated_at });
  } catch (e) {
    res.status(500).json({ error: 'Kayıtlı veri okunamadı.' });
  }
});

app.put('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  const { state } = req.body;
  if (!userId || userId.length > 64) {
    return res.status(400).json({ error: 'Geçersiz kullanıcı kimliği.' });
  }
  if (!state || typeof state !== 'object') {
    return res.status(400).json({ error: 'Geçersiz ilerleme verisi.' });
  }
  const json = JSON.stringify(state);
  if (json.length > 200000) {
    return res.status(413).json({ error: 'Veri çok büyük.' });
  }
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO progress (user_id, state, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET state = excluded.state, updated_at = excluded.updated_at
  `).run(userId, json, now);
  res.json({ ok: true, updated_at: now });
});

app.listen(PORT, () => {
  console.log(`Humanur backend çalışıyor: http://localhost:${PORT}`);
  console.log(`Veritabanı: ${DB_PATH}`);
});
