import { ApolloError, ApolloServer } from 'apollo-server-micro';
import { createApplication } from 'graphql-modules';
import HaloGraphQL from 'halo-graphql';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginCacheControl,
} from 'apollo-server-core';
import getAppUrl from '@/util/getAppUrl';
import { DEFAULT_MAX_AGE, DEFAULT_QUERY } from '@/util/constants';

const application = createApplication({
  modules: [HaloGraphQL],
});

const schema = application.createSchemaForApollo();

const plugins = [
  ApolloServerPluginCacheControl({ defaultMaxAge: DEFAULT_MAX_AGE }),
  responseCachePlugin(),
  ApolloServerPluginLandingPageGraphQLPlayground({
    tabs: [
      {
        endpoint: getAppUrl(`/api/graphql`),
        query: DEFAULT_QUERY,
      },
    ],
  }),
];

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  formatError: (error: any) => {
    return new ApolloError(error.message, error.extensions.code);
  },
  plugins: plugins as any,
  context: {
    HALO_AUTOCODE_TOKEN: process.env.HALO_AUTOCODE_TOKEN,
  },
});

export default apolloServer;
