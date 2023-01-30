import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import db from './modules/db';

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const posts = await db.submission.findMany();
  res.json(posts);
});

const startApolloServer = async () => {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  const port = Number(process.env.PORT || 8080);

  await new Promise<void>((resolve) =>
    httpServer.listen({ hostname: '0.0.0.0', port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

startApolloServer();

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server started at http://localhost:${port}`);
// });
