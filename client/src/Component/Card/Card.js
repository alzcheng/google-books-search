import React from 'react'
import "./Card.css"

const Card = (props) => {
  return (
    <div className="card mb-3 portfolio-element">
      <div className="row">
        <div className="col-md-4 img-Col">
          <div>
            <img src={props.image} alt={props.title}
              className="img-fluid mx-auto my-5 portfolio-img"></img>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <div className="row">
                  <h4 className="card-title proj-title">{props.title}</h4>
                  <h6 className="proj-title">Authors(s): {props.authors && props.authors.join(',')}</h6>
                </div>
                <div className="row last-row">
                  <div className="col-md-12">
                    <h5>Description: </h5>
                    <p className="card-text">{props.description}</p>
                  </div>
                </div>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Card
