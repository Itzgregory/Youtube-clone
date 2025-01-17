import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider, SubscriptionContextProvider } from '../context';
import Layout from '../Layout/Layout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Legends Clone (My Youtube Clone)</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
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
                  <div style={{ fontFamily: 'Inter, sans-serif' }}>
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
