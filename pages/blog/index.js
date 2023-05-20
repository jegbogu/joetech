import Head from "next/head";
import { Fragment } from "react";

const Blog = () => {
    return ( 
        <Fragment>
        <Head>
            <title>Blog</title>
            <meta name="description" content="We have our articles for technical writers"/>
        </Head>
        <div>
        <h1>Blog</h1>
        </div>
    </Fragment>
     );
}
 
export default Blog;