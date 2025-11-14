import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
const SearchForm = ({query}: {query? : string}) => {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        className="search-input"
        defaultValue={query}
        placeholder="Search StartUp"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn cursor-pointer text-white">
          <Search />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
