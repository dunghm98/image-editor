import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Editor from '../components/editor'
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import Sidebar from '../components/sidebar'


export default function Home() {
  return (
<AppProvider>
  <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* <Sidebar></Sidebar> */}
          <Editor></Editor>
        </main>
      </div>
</AppProvider>
    
  )
}
