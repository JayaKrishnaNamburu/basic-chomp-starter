import React from 'react'

import { Helmet } from 'react-helmet'

import styles from './home.module.css'

const Home = () => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>New Project13</title>
        <meta property="og:title" content="New Project13" />
      </Helmet>
    </div>
  )
}

export default Home
