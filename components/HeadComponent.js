import Head from "next/head";

const HeadComponent = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta name="description" content="Ecommerce Website" />
    </Head>
  );
};
export default HeadComponent;
