import './index.css';
import RiskFree from './RiskFree';
import OptionPricingForm from './PricingForm';

function App() {
  return (
    <div className="app">
      <div className="container">
      <h2 className="center">Option Pricing & Greeks (Black-Scholes Model)</h2>
      <RiskFree />
      <OptionPricingForm />
      </div>
    </div>
  );
}

export default App;
