import { ApolloError, ApolloServer } from 'apollo-server-micro';
import { createApplication } from 'graphql-modules';
import HaloGraphQL from 'halo-graphql';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginCacheControl,
} from 'apollo-server-core';
import getAppUrl from '@/util/getAppUrl';
import {
  DEFAULT_MAX_AGE,
  DEFAULT_QUERY,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW,
} from '@/util/constants';
import { applyMiddleware } from 'graphql-middleware';
import { shield } from 'graphql-shield';
import isDev from '@/util/isDev';
import { createRateLimitRule } from 'graphql-rate-limit';
import parseIp from '@/util/parseIp';

const rateLimitUserAgentAndIp = createRateLimitRule({
  identifyContext: (context) => {
    return `${context.userAgent}-${context.ip}`;
  },
});

const queryRateLimit = rateLimitUserAgentAndIp({
  window: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
});

const application = createApplication({
  modules: [HaloGraphQL],
});

const permissions = shield(
  {},
  {
    fallbackRule: queryRateLimit,
    allowExternalErrors: isDev(),
    debug: isDev(),
  },
);

const schema = applyMiddleware(
  application.createSchemaForApollo(),
  permissions,
);

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

  context: ({ req }) => ({
    userAgent: req.headers[`user-agent`],
    ip: parseIp(req),
    HALO_AUTOCODE_TOKEN: process.env.HALO_AUTOCODE_TOKEN,
  }),
});

export default apolloServer;
