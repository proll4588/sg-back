import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import resolvers from './resolvers.js';
import { TimestampTypeDefinition } from 'graphql-scalars';
import { context } from './auth.js';
import { readFileSync } from 'fs';

const typeDefs = readFileSync('./schema.graphql', {
  encoding: 'utf-8',
});
const testOneDefs = readFileSync('./models/TestOne/schema.graphql', {
  encoding: 'utf-8',
});
const testTwoDefs = readFileSync('./models/TestTwo/schema.graphql', {
  encoding: 'utf-8',
});
const userDefs = readFileSync('./models/User/schema.graphql', {
  encoding: 'utf-8',
});

const server = new ApolloServer({
  typeDefs: [
    TimestampTypeDefinition,
    typeDefs,
    userDefs,
    testOneDefs,
    testTwoDefs,
  ],
  resolvers: { ...resolvers },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: context,
});

await server.start();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(graphqlUploadExpress());
app.use('/', express.static('public'));
server.applyMiddleware({ app });
await new Promise((r) => app.listen({ port: 4000 }, r));

console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
