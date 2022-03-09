# halo-graphql

```bash
npm install halo-graphql
```

If you want to incorporate the Halo API into your own GraphQL server you can use the power of [GraphQL-Modules](https://www.graphql-modules.com/). The `halo-graphql` NPM package encapsulates the API's type definitions and resolvers to provide a turnkey solution for integrating the Halo API into your app.

1. Install `halo-graphql`.
2. Visit [Autocode](https://autocode.com/) and copy your General Identity Token [from here](https://autocode.com/auth).

3. On the GraphQL server context create a field called `HALO_AUTOCODE_TOKEN` and assign it the value of your Autocode token.

[View full example code here.](https://github.com/TimMikeladze/haloapi.dev/blob/master/haloapi.dev/src/graphql/server.ts)

**Simple example**

```typescript
import { ApolloError, ApolloServer } from 'apollo-server-micro';
import { createApplication } from 'graphql-modules';
import HaloGraphQL from 'halo-graphql';

const application = createApplication({
  modules: [HaloGraphQL],
});

const schema = application.createSchemaForApollo()

const apolloServer = new ApolloServer({
  schema,
  formatError: (error: any) => {
    return new ApolloError(error.message, error.extensions.code);
  },
  context: ({ req }) => ({
    HALO_AUTOCODE_TOKEN: process.env.HALO_AUTOCODE_TOKEN,
  }),
});

export default apolloServer;
```
