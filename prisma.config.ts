import { defineConfig } from "@prisma/config";

<<<<<<< HEAD
export default defineConfig({
<<<<<<< HEAD
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
=======
  datasources: {
    db: {
      url: process.env.DATABASE_URL!, 
    },
  },
});
>>>>>>> 3c3a81a (갈아엎기)
