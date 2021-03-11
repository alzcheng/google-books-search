import React from 'react'
import "./SearchBar.css"

const SearchBar = (props) => {
  return (
    <form className="google-search" onSubmit={props.submit}>
      <input type="text" name="searchInput" className="mx-auto" onChange={props.change}></input>
      <button className="mx-auto" >Submit</button>
    </form>
  )
}

export default SearchBar
