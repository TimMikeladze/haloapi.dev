# Halo API

[GraphQL playground](https://haloapi.dev/api/graphql)

The Halo GraphQL API provides an endpoint for developers to query Halo data without writing any backend code. 

Building your own GraphQL server? Integrate the Halo API into your backend by installing the `halo-graphql` package.

## Using the hosted GraphQL API

The API is deployed to [https://haloapi.dev/api/graphql](https://haloapi.dev/api/graphql). Visit the playground to explore the API or point your GraphQL client to the endpoint. 

**Additional info**

- Cache control is enabled for all queries. Responses will be cached in memory for 5 minutes. 
- All queries are rate limited by user-agent and ip address. Excessive querying will result in an error.

**❗Important note❗**

> If you are using the hosted GraphQL API in a production app or for data intensive experiments consider supporting the project by donating on [PayPal](https://www.paypal.com/paypalme/TimMikeladze) or [Ko-Fi](https://ko-fi.com/timmikeladze).
> 
> The service is using Autocode with a [free plan](https://autocode.com/pricing/) allowing only a **limited number of requests per month**. Your donations would pay for a higher rate plan.
> 
> ❤️ Please be considerate with your usage.

## Using the GraphQL Module

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

## Sponsor project

Your access to the [Halo GraphQL API](https://haloapi.dev/api/graphql) is free but my hosting costs are not.

Support the project by donating on [PayPal](https://www.paypal.com/paypalme/TimMikeladze) or [Ko-Fi](https://ko-fi.com/timmikeladze).

 
## How it works

First `halo-graphql` wraps the [Halo Infinite Autocode API](https://autocode.com/lib/halo/infinite) with GraphQL type definitions and resolvers which use Autocode's `lib` package to access the Halo Infinite API.

Second a [NextJS](https://nextjs.org/) app is deployed to [Vercel](https://vercel.com/) containing a GraphQL server function. This is an [Apollo server](https://github.com/apollographql/apollo-server) that consumes the `halo-graphql` package using [GraphQL Modules](https://github.com/Urigo/graphql-modules). The server also implements caching and rate limiting using [GraphQL Shield](https://github.com/maticzav/graphql-shield).

**Why I built this:**

The service by provided by Autocode is great for quick scripting purposes when you want to access game data programmatically. However if you are building a fully featured app than a more sophisticated data fetching mechanism becomes crucial. This is where the Halo GraphQL API enters the picture by enabling you to leverage the power of the GraphQL ecosystem while providing access to Halo data in a type-safe and developer friendly manner.

Furthermore, in the future this API can be expanded to have additional datasources, such as Halo 5, MCC or Waypoint all while maintaining a single GraphQL API for all Halo data.

## Future plans

**Waypoint API**

This [blog post](https://den.dev/blog/halo-api/) and [GitHub repo](https://github.com/dend/grunt/blob/main/Grunt/Grunt/endpoints.json) show a reverse engineering of the Infinite API by inspecting network traffic between the client and Waypoint site. 

With this approach the need for Autocode can be eliminated entirely or the existing API enhanced with data only available in Waypoint.

**Persistent caching**

Replace the in memory apollo server cache implementation to use a persistent cache like Redis or Memcached. This will result in less cache misses and better performance in a serverless environment since at the moment the cache is reset on every cold start.

**Suggestions**

Got a feature request? Found a bug? [Open an issue](https://github.com/TimMikeladze/haloapi.dev/issues/new) or contact me [directly](https://linesofcode.dev).

## Query examples

```graphql
query MultiplayerOverview {
  multiplayerServiceRecord(
    gamertag: "your gamertag goes here"
    filter: matchmade_pvp
  ) {
    data {
      matches_played
      win_rate
      time_played {
        human
      }
      core {
        kda
        kdr
      }
    }
  }

  matches(gamertag: "your gamertag goes here", limit: { offset: 0, count: 2 }) {
    data {
      id
      played_at
      player {
        rank
        outcome
      }
      details {
        map {
          name
        }
      }
    }
  }
}
```
