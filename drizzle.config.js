
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_DLc0tIdV5neX@ep-morning-breeze-a8tjgkpa-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});
