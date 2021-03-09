import { useState } from "react";
import axios from "axios";
import SearchCard from "../Component/Card/SearchCard";

const Search = () => {
  const [searchBookshelf, setSearchBookshelf] = useState({ searchTerm: "", searchResult: [] });

  const handleOnChange = (e) => {
    setSearchBookshelf({ ...searchBookshelf, searchTerm: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const mySearch = searchBookshelf.searchTerm.replace(/\s/g, '+');
    console.log(mySearch);
    const searchResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${mySearch}&key=MY_KEY`);

    console.log(searchResult.data.items.map(result => ({
      title: result.volumeInfo.title,
      authors: result.volumeInfo.authors,
      description: result.volumeInfo.description,
      image: result.volumeInfo.imageLinks.thumbnail,
      link: result.selfLink,
      id: result.id
    })));

    const searchBooks = searchResult.data.items.map(result => ({
      title: result.volumeInfo.title,
      authors: result.volumeInfo.authors,
      description: result.volumeInfo.description,
      image: result.volumeInfo.imageLinks.thumbnail,
      link: result.selfLink,
      id: result.id
    }));
    setSearchBookshelf({ ...searchBookshelf, searchResult: searchBooks });
  }

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" name="" onChange={handleOnChange}></input>
        <button>Submit</button>
      </form>
      {searchBookshelf.searchResults && searchBookshelf.searchResults.map((book) => (
        <SearchCard
          title={book.title}
          image={book.image}
          link={book.link}
          authors={book.authors}
          id={book.id}
          description={book.description}
        />
      )
      )}
    </div>
  )
}

export default Search
