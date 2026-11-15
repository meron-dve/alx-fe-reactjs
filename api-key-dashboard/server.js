const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'companies.json');
const PUBLIC = path.join(__dirname, 'public');

const load = () => {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch { return []; }
};
const save = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

const send = (res, status, body, type = 'application/json') => {
  res.writeHead(status, { 'Content-Type': type });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 1e5) req.destroy();
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); }
    });
  });

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/keys') {
    try {
      const { companyName, email, password } = await readBody(req);
      if (!companyName?.trim() || !email?.trim() || !password)
        return send(res, 400, { error: 'All fields are required.' });
      if (!/^\S+@\S+\.\S+$/.test(email))
        return send(res, 400, { error: 'Enter a valid email.' });
      if (password.length < 8)
        return send(res, 400, { error: 'Password must be at least 8 characters.' });

      const companies = load();
      if (companies.some((c) => c.email === email.toLowerCase()))
        return send(res, 409, { error: 'A key was already issued for this email.' });

      const apiKey = 'ck_' + crypto.randomBytes(24).toString('hex');
      companies.push({
        id: crypto.randomUUID(),
        companyName: companyName.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password),
        apiKeyHash: crypto.createHash('sha256').update(apiKey).digest('hex'),
        keyPreview: apiKey.slice(0, 7) + '…' + apiKey.slice(-4),
        createdAt: new Date().toISOString(),
      });
      save(companies);
      return send(res, 201, { apiKey });
    } catch {
      return send(res, 400, { error: 'Invalid request.' });
    }
  }

  if (req.method === 'GET' && req.url === '/api/companies') {
    return send(
      res,
      200,
      load().map(({ id, companyName, email, keyPreview, createdAt }) => ({
        id, companyName, email, keyPreview, createdAt,
      }))
    );
  }

  if (req.method === 'GET') {
    const file = path.join(PUBLIC, req.url === '/' ? 'index.html' : path.normalize(req.url));
    if (file.startsWith(PUBLIC) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
      return send(res, 200, fs.readFileSync(file), types[path.extname(file)] || 'text/plain');
    }
  }
  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => console.log(`Dashboard running at http://localhost:${PORT}`));
