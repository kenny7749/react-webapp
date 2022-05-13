import './App.css';
import { useState } from 'react';

const host = 'springboot'
const port = 8080

const url = `https://springboot_api/hospitals`

function App() {
  const [api, setApi] = useState(url)
  const [results, setResults] = useState('')

  const fetchHospitals = () => {
    fetch(api).then(res => {
      console.log(res)
      return res.json()
    }).then(res => setResults(res))
  }

  return (
    <div>
      <h1>React Application</h1>
      api: {api}<br />
      <br />

      <input value={api} onChange={(e) => setApi(e.target.value)} />
      <button onClick={() => fetchHospitals()}>Get hospital from spring boot</button><br />
      reuslts: {JSON.stringify(results)}

    </div>
  );
}

export default App;
