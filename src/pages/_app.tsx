import Layout from '@components/layouts/main'
import { ThemeProvider } from '@mui/material/styles'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import lightTheme from '@styles/themes/light'
import { AnimatePresence } from 'framer-motion'
const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
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
    </ThemeProvider>
  )
}
