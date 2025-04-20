import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'logistica',
  password: 'Saralu15*',
  port: 5432, // Puerto por defecto de PostgreSQL
});

export default pool;