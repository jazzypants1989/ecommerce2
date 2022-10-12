import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import DropdownLink from "./DropdownLink";
import Footer from "./Footer";
import HeadComponent from "./HeadComponent";
import { Store } from "../utils/Store";
import Search from "./SearchWithUseRef";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <HeadComponent title={title} />

      <ToastContainer position="bottom-center" limit={1} theme="dark" />

      <div className="flex bg-blue min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-4xl font-thin lg:text-3xl sm:text-lg hover:text-Green">
                Electric Larry&apos;s
              </a>
            </Link>
            <Search placeholder="Explore our oddities!" />
            <div>
              <Link href="/cart">
                <a className="p-4">
                  <ShoppingCartIcon className="inline h-7 w-7 hover:text-Green hover:scale-125 transition-all duration-300 ease-in-out" />
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-orange font-extralight hover:bg-Green px-2 py-1 text-xs text-Black hover:text-orange transition-all duration-500 ease-in-out">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="tracking-wide font-thin hover:text-orange">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right mt-4 shadow-lg bg-blue z-10">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 hover:text-Green">Log-in!</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-2">{children}</main>
        <Footer />
      </div>
    </>
  );
}
