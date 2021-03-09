import { useState, useEffect } from "react";
import axios from "axios";
import SavedCard from "../Component/Card/SavedCard";

const Saved = () => {
  const [savedBookshelf, setSavedBookshelf] = useState();
  const getSavedBooks = async () => {
    try {
      const { data } = await axios.get("/api/books");
      console.log(data.savedbooks.map((book) => (book._id)));
      setSavedBookshelf(data);
    } catch (err) { console.log(err) };
  }

  useEffect(() => {
    getSavedBooks();
  }, []);

  return (
    <div>
      {savedBookshelf && savedBookshelf.savedbooks.map((book) => (
        <SavedCard
          title={book.title}
          image={book.image}
          link={book.link}
          authors={book.authors}
          id={book._id}
          description={book.description}
        />
      )
      )};
    </div>
  )
}

export default Saved
