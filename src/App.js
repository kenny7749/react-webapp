import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const host = process.env.SPRINGBOOT_PORT_8080_TCP_ADDR || 'localhost'
const port = process.env.SPRINGBOOT_PORT_8080_TCP_PORT || 8080
const api = `http://${host}:${port}/hospitals`


function App() {
  const [hospitals, setHospitals] = useState([])

  const fetchHospitals = () => {

    fetch(api).then(res => res.json()).then( res => setHospitals(res))
  }

  return (
    <div>
      <h1>React Application</h1>
      SPRINGBOOT_PORT_8080_TCP_ADDR: {host}<br />
      SPRINGBOOT_PORT_8080_TCP_PORT: {port}<br />
      api: {api}<br />
      <br />

      <button onClick={() => fetchHospitals()}>Get hospital from spring boot</button><br />
      hospitals: {JSON.stringify(hospitals)}

    </div>
  );
}

export default App;
