import React from "react";
import { Link } from "react-router-dom";
function NoMatch() {
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <Link to="/">Return to Saved Books page</Link>
    </div>
  )
}
export default NoMatch;
