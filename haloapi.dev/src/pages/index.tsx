import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import { Icon } from '@iconify/react';
import getAppUrl from '@/util/getAppUrl';
import { APP_DESCRIPTION, APP_NAME } from '@/util/constants';

const gaEnabled =
  typeof window !== `undefined` &&
  process.env.NEXT_PUBLIC_GA_ID &&
  process.env.NEXT_PUBLIC_GA_ID.length > 0;

export default function Index() {
  const ga = gaEnabled && (
    <Script
      strategy="afterInteractive"
      src={
        `https://www.googletagmanager.com/gtag/js?id=` +
        process.env.NEXT_PUBLIC_GA_ID
      }
      onLoad={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];

        function gtag() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line prefer-rest-params
          dataLayer.push(arguments);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gtag(`js`, new Date());

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gtag(`config`, process.env.NEXT_PUBLIC_GA_ID);
      }}
    />
  );

  return (
    <div>
      <NextSeo title={APP_NAME} description={APP_DESCRIPTION} />
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
      </Head>
      {ga}
      <main>
        <div className="background" />
        <div className="container">
          <div className="hero">
            <div className="title">{APP_NAME}</div>
            <div className="buttons">
              <a
                className="button"
                href="https://github.com/TimMikeladze/haloapi.dev"
              >
                <Icon icon="mdi:github" className="icon" />
                GitHub
              </a>
              <a className="button" href={getAppUrl(`/api/graphql`)}>
                <Icon icon="mdi:graphql" className="icon" />
                Explore API
              </a>
            </div>
            <div className="divider" />
            <div className="description">
              GraphQL API and NPM module for querying Halo data.
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footerContent">
          <div>❤️</div>
          <a href="https://github.com/TimMikeladze/haloapi.dev#sponsor-development">
            Support project
          </a>
          <div className="verticalDivider" />
          <a href="https://linesofcode.dev">linesofcode.dev</a>
        </div>
      </footer>
    </div>
  );
}
