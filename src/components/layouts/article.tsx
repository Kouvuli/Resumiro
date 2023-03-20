import React from 'react'
import { motion, Variants } from 'framer-motion'
import Head from 'next/head'

interface ArticleLayoutProps {
  children: React.ReactNode
  title?: string
}

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 0, y: 20, transition: { duration: 0.5 } }
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ children, title }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      <>
        {title && (
          <Head>
            <title>{title}</title>
          </Head>
        )}
        {children}
      </>
    </motion.div>
  )
}

export default ArticleLayout
