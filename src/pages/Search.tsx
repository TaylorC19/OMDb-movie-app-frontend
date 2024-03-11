import React, { useState } from "react";
import Header from "../components/Header";
import { searchResultsType } from "../global.t";
import utils from "../utils/utils";
import SearchMovie from "../components/SearchMovie";
import SearchMovies from "../components/SearchMovie";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<searchResultsType | {}>({});
console.log(searchResults, page)
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let queryUrl = `movie/api/movies?title=${searchTitle}&page=${page}`;
      const results = await utils.requests.get(queryUrl);

      setSearchResults(results.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handlePageChange (e: React.MouseEvent<HTMLButtonElement>) {
    setPage(Number(e.currentTarget.value));
    try {
      let queryUrl = `movie/api/movies?title=${searchTitle}&page=${Number(
        e.currentTarget.value
      )}`;
      const results = await utils.requests.get(queryUrl);
      
      setSearchResults(results.data);
    } catch (error) {
      console.error(error); 
    }
  }

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center">
        Find all you favorite movies and TV shows
      </h1>

      {/* this is the section for the search feature */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={searchTitle}
          id="title"
          className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <button className="border-2 rounded-md p-1" type="submit">Search</button>
      </form>

      {searchResults && "Search" in searchResults ? (
        <>
          <p>Results: {searchResults.totalResults}</p>
          <SearchMovies movies={searchResults.Search} />
          <div className="flex justify-end">
            <span className="my-auto">page:</span>
            {page > 2 && (
              <button
                className="border p-2"
                onClick={handlePageChange}
                value={1}
              >
                {1}
              </button>
            )}
            {page > 1 && (
              <button
                className="border p-2"
                onClick={handlePageChange}
                value={page - 1}
              >
                {page - 1}
              </button>
            )}
            <button className="font-bold border p-2">{page}</button>
            {page < Math.ceil(Number(searchResults.totalResults) / 10) && (
              <button
                className="border p-2"
                onClick={handlePageChange}
                value={page + 1}
              >
                {page + 1}
              </button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
