import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers/HelloResolver";
import { BookModel } from "./entities/Book";
import { AuthorModel } from "./entities/Author";
import { AuthorResolver } from "./resolvers/AuthorResolver";
import { BookResolver } from "./resolvers/BookResolver";

(async () => {
  const mongoConn = await connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await mongoConn.connection;

  const schema = await buildSchema({
    resolvers: [AuthorResolver, BookResolver, HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started at http://localhost:4000/graphql");
  });
})().catch((err) => {
  throw err;
});
