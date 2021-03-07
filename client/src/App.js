import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [state, setState] = useState();

  const getRequest = async () => {
    try {
      const { data } = await axios.get("/api/test");
      console.log(data)
      setState(data);
    } catch (err) { console.log(err) };
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="App">
      <h1>{state.msg}</h1>
    </div>
  );
}

export default App;
