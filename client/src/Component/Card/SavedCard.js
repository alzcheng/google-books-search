import React from 'react';
import axios from 'axios';
import Button from '../Button/Button';

const SavedCard = ({ title, image, link, authors, id, description }) => {

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

  return (
    <div className="card mb-3 portfolio-element" key={id}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={image} alt={title}
            className="img-fluid mx-auto my-5 portfolio-img"></img>
          <h1>{id}</h1>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title proj-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="row">
                  <div className="col-md-4">
                    <Button func={(e) => onClickView(e, link)} text={"View Book"} />
                  </div>
                  <div className="col-md-6">
                    <Button func={(e) => onClickDelete(e, id)} text={"Delete Book"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedCard
