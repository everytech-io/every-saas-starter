import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Supabase exposes a direct Postgres connection via the SUPABASE_URL
// on port 5432. For serverless/edge environments, use the pooler on port 6543.
// We use the direct URL here since this runs in Node.js server actions.
const connectionString = process.env.DATABASE_URL!;

// Prevent multiple connections in development due to hot reloading
const globalForDb = globalThis as unknown as { _pgClient: postgres.Sql };
const client = globalForDb._pgClient ?? postgres(connectionString);
if (process.env.NODE_ENV !== 'production') globalForDb._pgClient = client;

export const db = drizzle(client, { schema });
