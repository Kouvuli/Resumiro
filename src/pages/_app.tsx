import Layout from '@components/layouts/main'
import { ThemeProvider } from '@mui/material/styles'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import lightTheme from '@styles/themes/light'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import store from '@redux/store'
const inter = Inter({ subsets: ['latin'] })
import { Web3Provider } from '@context/Web3Context'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router
}: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <Web3Provider>
          <SessionProvider session={session}>
            <Layout className={inter.className}>
              <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0 })
                  }
                }}
              >
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </Layout>
          </SessionProvider>
        </Web3Provider>
      </Provider>
    </ThemeProvider>
  )
}
