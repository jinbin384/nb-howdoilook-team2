import 'dotenv/config';

<<<<<<< HEAD
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node ./prisma/db/seed/seed.js",
=======
export default {
  datasources: {
    db: {
      adapter: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
};
>>>>>>> a37799b (댓글기능구현3일차)
