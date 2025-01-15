import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider, SubscriptionContextProvider } from '../context';
import Layout from '../Layout/Layout';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Legends Clone (My Youtube Clone)</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <Layout>
                <SubscriptionContextProvider>
                  <div className={inter.className}>
                    <Component {...pageProps} />
                  </div>
                </SubscriptionContextProvider>
              </Layout>
            </UserContextProvider>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
