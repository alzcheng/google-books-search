import { useState, useEffect } from "react";
import axios from "axios";
//import SearchCard from "../Component/Card/SearchCard";
import Button from "../Component/Button/Button";

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

      const searchBooks = mySearchResult.data.map(result => ({
        title: result.volumeInfo.title,
        authors: result.volumeInfo.authors,
        description: result.volumeInfo.description,
        image: result.volumeInfo.imageLinks.thumbnail,
        link: result.volumeInfo.previewLink,
        id: result.id
      }));
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
    const removed = newBookshelf.splice(searchBookshelf.searchResult.findIndex(e => e.id === book.id), 1);
    setSearchBookshelf({ ...searchBookshelf, searchResult: newBookshelf });
  }

  const onClickView = (e, urlLink) => {
    window.location = urlLink;
  }

  useEffect(() => {
    setSearchBookshelf({ searchTerm: "", searchResult: [] });
  }, [])
  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" name="searchInput" className={"searchMe"} onChange={handleOnChange}></input>
        <button>Submit</button>
      </form>
      {searchBookshelf.searchResult && searchBookshelf.searchResult.map((book) => (

        // This chunck of code is mapped and needs to be refactored in React
        <div className="card mb-3 portfolio-element" key={book.id}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={book.image} alt={book.title}
                className="img-fluid mx-auto my-5 portfolio-img"></img>
              <h1>{book.id}</h1>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="card-body">
                    <h5 className="card-title proj-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                    <div className="row">
                      <div className="col-md-4">
                        <Button func={(e) => onClickView(e, book.link)} text={"View Book"} />
                      </div>
                      <div className="col-md-6">
                        <Button func={(e) => onClickSave(e, book)} text={"Save Book"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Search
