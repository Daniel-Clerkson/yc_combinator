"use client";

import { X } from "lucide-react";
import Link from "next/link";
const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <div>
      <button
        type="reset"
        onClick={reset}
        name="query"
        value=""
      >
        <Link href="/" className="search-btn text-white">
            <X />
        </Link>
      </button>
    </div>
  );
};

export default SearchFormReset;
