import { SearchCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      const doSearch = async () => {
        try {
          setSearchLoading(true);
          const { data } = await axios.get(`/api/search?query=${searchTerm}`);
          setSearchResults(data);
          setSearchLoading(false);
        } catch (err) {
          setSearchLoading(false);
        }
      };
      doSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  let searchResultsMarkup;
  if (!searchTerm) {
    searchResultsMarkup = null;
  } else if (searchResults.length) {
    searchResultsMarkup = searchResults.map((product) => (
      <li
        key={product._id}
        className="p-2 cursor-pointer hover:text-Green transition-all ease-in-out duration-300"
        onClick={() => {
          setSearchTerm("");
          router.push(`/product/${product.slug}`);
        }}
      >
        {product.name}
      </li>
    ));
  } else if (!searchResults.length && !searchLoading) {
    searchResultsMarkup = <li>No results found</li>;
  } else if (searchLoading) {
    searchResultsMarkup = <li>I&apos;m a-looking!</li>;
  }

  return (
    <div className="relative w-1/2 z-10 md:inline sm:hidden">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="w-full rounded-md border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div className="absolute top-12 left-0 w-full bg-blue text-orange rounded-md shadow-lg">
          <ul>{searchResultsMarkup}</ul>
        </div>
      )}
    </div>
  );
}
