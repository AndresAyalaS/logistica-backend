import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'envio',
  password: '1234',
  port: 5432, // Puerto por defecto de PostgreSQL
});

export default pool;