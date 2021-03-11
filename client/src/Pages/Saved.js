import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Component/Card/Card";
import Button from "../Component/Button/Button";

const Saved = () => {
  const [savedBookshelf, setSavedBookshelf] = useState();
  const getSavedBooks = async () => {
    try {
      const { data } = await axios.get("/api/books");
      setSavedBookshelf(data);
    } catch (err) { console.log(err) };
  }

  const onClickDelete = async (e, thisID) => {
    e.preventDefault();
    console.log(thisID);
    try {
      const content = await axios.delete(`/api/books/${thisID}`);
      console.log(content);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const onClickView = (e, urlLink) => {
    window.open(urlLink, "_self")
  }


  useEffect(() => {
    getSavedBooks();
  }, []);

  return (
    <>
      {savedBookshelf && savedBookshelf.savedbooks.map((book) => (
        <Card title={book.title}
          image={book.image}
          link={book.link}
          authors={book.authors}
          key={book._id}
          id={book._id}
          description={book.description}>
          <div className="row">
            <div className="col-md-6">
              <Button func={(e) => onClickView(e, book.link)} text={"View Book"} key={book._id} />
            </div>
            <div className="col-md-6">
              <Button func={(e) => onClickDelete(e, book._id)} text={"Delete Book"} key={book._id} />
            </div>
          </div>
        </Card>
      )
      )}
    </>
  )
}

export default Saved