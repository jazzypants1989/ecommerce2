import { useState, useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SearchCircleIcon } from "@heroicons/react/outline";

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const doSearch = useMemo(() => {
    return async () => {
      try {
        setSearchLoading(true);
        const { data } = await axios.get(`/api/search?query=${searchTerm}`);
        setSearchResults(data);
        setSearchLoading(false);
      } catch (err) {
        setSearchLoading(false);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      doSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, doSearch]);

  return (
    <div className="relative w-1/2 z-10 md:inline sm:hidden">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={props.placeholder}
        className="w-full rounded-md border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
      />
      {searchTerm && (
        <div className="absolute top-12 left-0 w-full bg-blue text-orange rounded-md shadow-lg">
          {searchLoading ? (
            <div>I&apos;m a-looking!</div>
          ) : (
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className="p-2 cursor-pointer hover:text-Green transition-all ease-in-out duration-300"
                  onClick={() => {
                    setSearchTerm("");
                    router.push(`/product/${product.slug}`);
                  }}
                >
                  <SearchCircleIcon className="inline h-7 w-7" />
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
