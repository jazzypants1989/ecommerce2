import Link from "next/link";
import Layout from "../../components/Layout";

const rentals = () => {
  return (
    <Layout title="Admin Rentals">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="flex-col text-base align-middle justify-center">
          <ul className="align-middle">
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
            <li>
              <Link href="/admin/rentals">
                <a className="font-bold text-Green">Rentals</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>rentals</div>
      </div>
    </Layout>
  );
};
export default rentals;
