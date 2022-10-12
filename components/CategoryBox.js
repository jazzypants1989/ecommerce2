import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Container from "./Container";

const categories = [
  "All",
  "Movies",
  "TV",
  "Music",
  "Books",
  "Games",
  "Software",
  "Other",
];

export default function CategoryBox() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Container>
      <Listbox
        as="div"
        value={selectedCategory}
        onChange={setSelectedCategory}
        className="flex items-center justify-between w-full p-0"
      >
        {({ open }) => (
          <>
            <div className="relative w-32 ml-2 md:bottom-56 sm:m-0">
              <span className="inline-block w-full">
                <Listbox.Label className="w-full text-sm font-base">
                  Category
                </Listbox.Label>

                <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-orange relative border shadow-sm border-Green rounded text-Green hover:text-orange transition-all duration-300 ease-in-out">
                  <span className="block truncate">{selectedCategory}</span>
                </Listbox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="border border-Green rounded mt-1 absolute w-full bg-blue shadow-lg max-h-60 overflow-y-auto overflow-x-hidden leading-6 z-10"
                >
                  {categories.map((category) => (
                    <Listbox.Option key={category} value={category}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-blue bg-orange transition-all duration-300 ease-in-out"
                              : "text-Green hover:text-blue transition-all duration-300 ease-in-out"
                          } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {category}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active
                                  ? "text-blue transition-all duration-300 ease-in-out"
                                  : "text-orange transition-all duration-300 ease-in-out"
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </Container>
  );
}
