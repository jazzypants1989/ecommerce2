import Layout from "../../components/Layout";
import axios from "axios";

const CategoryScreen = () => {
  return (
    <Layout>
      <div>CategoryScreen</div>
    </Layout>
  );
};
export default CategoryScreen;

export async function getStaticPaths() {
  const { data } = await axios.get("/api/categories");
  return {
    paths: data.map((category) => ({
      params: { title: category.title },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`/api/categories/${params.title}`);
  return {
    props: {
      category: data,
    },
  };
}
