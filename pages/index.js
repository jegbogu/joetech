import {Fragment} from 'react'
import Head from 'next/head'
 import HomePageForm from '../component/home-page/home-form';
 
 

const HomePage = () => {
  return ( 
    <>
    <Fragment>
      <Head>
        <title>Joerally | Quality articles and service to humans..</title>
        <meta 
        name='description'
        content='This Application can help you send bulk schelduled emails, and SMS. This Application also has quality articles for tech writers'
        />
      </Head>
      <h1>Home page</h1>
      
    <HomePageForm/>
    </Fragment>
    
    </>
   
   );
}
 
export default HomePage;