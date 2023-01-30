import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
console.log('🚀 ~ file: index.ts:7 ~ db', db.submission);
const genId = () => nanoid(16);

const seedDatabase = async () => {
  if ((await db.submission.count()) === 0) {
    await db.submission.createMany({
      data: [
        {
          id: genId(),
          submittedAt: new Date(),
          data: {
            name: 'Emre Yoleri',
            twitter: 'https://twitter.com//',
          },
        },
      ],
    });
  }
};
seedDatabase();

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const posts = await db.submission.findMany();
  res.json(posts);
});

const port = Number(process.env.PORT || 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${port}`);
});
