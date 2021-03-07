import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [state, setState] = useState();

  const getRequest = async () => {
    try {
      const { data } = await axios.get("/api/books");
      console.log(data.allbooks)
      setState(data.allbooks);
    } catch (err) { console.log(err) };
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="App">
      {/* <h1>state[0].description</h1> */}
      <button></button>
    </div>
  );
}

export default App;
