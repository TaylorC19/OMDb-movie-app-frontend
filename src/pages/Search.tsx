import React, { useState } from "react";
import Header from "../components/Header";
import { searchResultsType } from "../global.t";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<searchResultsType | {}>({});

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold">Find all you favorite movies</h1>

      <div>
        
      </div>

    </div>
  );
};

export default Search;
