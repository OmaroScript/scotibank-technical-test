import React, { useEffect, useState } from "react";
import CollapsibleTable from "./components/table";
import './App.scss'
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://api.datos.gob.mx/v1/condiciones-atmosfericas/");
      setData(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Condiciones Atmosfericas</h1>
      </header>
      <div className="principalTable">
        <CollapsibleTable dataTable={data}/>
      </div>
    </div>
  );
}

export default App;
