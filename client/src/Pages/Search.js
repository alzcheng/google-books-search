import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Component/Card/Card";
import Button from "../Component/Button/Button";
import SearchBar from "../Component/SearchBar/SearchBar";

const Search = () => {
  const [searchBookshelf, setSearchBookshelf] = useState({ searchTerm: "", searchResult: [] });
  const handleOnChange = (e) => {
    setSearchBookshelf({ ...searchBookshelf, searchTerm: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const mySearch = await { result: searchBookshelf.searchTerm.replace(/\s/g, '+') };
      const mySearchResult = await axios.post("/api/getGoogleBooks", mySearch);

      const searchBooks = await mySearchResult.data.map(result => {
        //error handling for when imageLinks isn't there
        if (result.volumeInfo.hasOwnProperty('imageLinks')) {
          return {
            title: result.volumeInfo.title,
            authors: result.volumeInfo.authors,
            description: result.volumeInfo.description,
            image: result.volumeInfo.imageLinks.thumbnail,
            link: result.volumeInfo.previewLink,
            id: result.id
          }
        } else {
          return {
            title: result.volumeInfo.title,
            authors: result.volumeInfo.authors,
            description: result.volumeInfo.description,
            image: "",
            link: result.volumeInfo.previewLink,
            id: result.id
          }
        }
      });

      setSearchBookshelf({ ...searchBookshelf, searchResult: searchBooks });

      // reset the form in the case that redirect comes back and the internal state is saved
      e.target.reset();
    } catch (error) {
      console.log(error)
    }

  }

  const onClickSave = async (e, book) => {
    e.preventDefault();
    const book2bSaved = {
      authors: book.authors,
      description: book.description,
      image: book.image,
      link: book.link,
      title: book.title
    };

    await axios.post("/api/books", book2bSaved);
    const newBookshelf = searchBookshelf.searchResult;
    newBookshelf.splice(searchBookshelf.searchResult.findIndex(e => e.id === book.id), 1);
    setSearchBookshelf({ ...searchBookshelf, searchResult: newBookshelf });
  }

  const onClickView = (e, urlLink) => {
    window.location = urlLink;
  }

  useEffect(() => {
    setSearchBookshelf({ searchTerm: "", searchResult: [] });
  }, [])


  return (
    <>
      <div className="row">
        <SearchBar submit={(e) => handleOnSubmit(e)} change={handleOnChange} />
      </div>
      {searchBookshelf.searchResult && searchBookshelf.searchResult.map((book) => (
        <Card title={book.title}
          image={book.image}
          link={book.link}
          authors={book.authors}
          key={book.id}
          id={book.id}
          description={book.description}>
          <div className="row">
            <div className="col-md-4">
              <Button func={(e) => onClickView(e, book.link)} text={"View Book"} key={book.id} />
            </div>
            <div className="col-md-6">
              <Button func={(e) => onClickSave(e, book)} text={"Save Book"} key={book.id} />
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

export default Search
