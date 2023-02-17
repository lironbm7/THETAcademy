import { useState } from  'react';
import './index.css';
import RiskFree from './RiskFree';
// import ExampleChart from './ClosePrice';

function App() {

  // state
  const [stockPrice, setStockPrice] = useState('');
  // const [strikePrice, setStrikePrice] = useState('');
  // const [timeToExpire, setTimeToExpire] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');
  // const [stockPrice, setStockPrice] = useState('');



  const [LABELONE, setLABELONE] = useState(0);
  const [LABELTWO, setLABELTWO] = useState(0);
  const [LABELTHREE, setLABELTHREE] = useState('');
  const [message, setMessage] = useState('');

  let imgSrc = '';  

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="app">
      <div className="container">
      <RiskFree />
      {/* <ExampleChart /> */}
        <h2 className="center">Option Pricing & Greeks (Black-Scholes Model)</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stockPrice">Stock price:</label>
          <input
            type="number"
            id="stockPrice"
            name="stockPrice"
            value={stockPrice}
            onChange={(event) => setStockPrice(event.target.value)}
          />
        </div>

        <div>
            <label>LABELONE</label>
            <input value={LABELONE} />
          </div>
          <div>
            <label>LABELTWO</label>
            <input value={LABELTWO} />
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
            <button className="btn btn-outline" type="submit">Submit</button>
          </div>
        </form>

        <div className="center">
          <h3>OUTCOME IS {LABELTHREE}</h3>
          <p>{message}</p>
        </div>

        <div className="img-container">
          <img src={imgSrc} alt=''></img>
        </div>
      </div>
    </div>
  );
}

export default App;
