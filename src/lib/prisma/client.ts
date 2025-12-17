// prisma.config.ts
import { defineConfig } from '@prisma/config';

export default defineConfig({
  // Informa onde está seu schema
  schema: 'src/lib/prisma/schema.prisma',
  
  // Configura a conexão com o banco (substitui a config do schema.prisma)
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
});