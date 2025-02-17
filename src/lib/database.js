import Database from 'better-sqlite3';

// Initialize the database
const db = new Database('shipments.db', { verbose: console.log });

// Create the shipments table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS shipments (
    id TEXT PRIMARY KEY,
    origin TEXT,
    destination TEXT,
    status TEXT,
    createdAt TEXT,
    lastUpdated TEXT
  )
`).run();

export default db;
