import Head from "next/head";

const HeadComponent = ({ title, description, tags }) => {
  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <met charSet="utf-8" />
    </Head>
  );
};
export default HeadComponent;
