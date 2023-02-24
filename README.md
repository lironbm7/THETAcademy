<h2 align="center"> Project and Documentation are currently a Work In Progress. </h2>
<p align="center"><img src="https://i.imgur.com/keFsA2M.png" /></p>

# THETAcademy - Option Pricing & Greeks

Calculations of Greeks and Option Pricing based on the Black-Scholes Mathematical Model. 

No prerequisities. Designed with the sole purpose of intuitively educating and enriching the knowledge of Students and Traders.


## Overview

THETAcademy is a JavaScript React Web Application which uses the Black-Scholes Mathematical Model formulas to calculate complex parameters that affect the price of Stock Options while taking advantage of AlphaVantage API's US Treasury Yields data from the Federal Reserve's system to provide accurate real-time measurements.

Online Option Calculators lack in information for beginners and Students who are acquiring the knowledge of how the Option market works, this is where THETAcademy comes in to place and provides a solution - a friendly platform that explains what stands behind every number, helps understand the risks and how Greeks can affect the outcome of a trade.


## Premium, Implied Volatility and Greeks

#### ATM, calculations are only processed in the back-end and are not visible to the client, debug via console @ `handleSubmit`:
```javascript
function handleSubmit(event) {
    event.preventDefault();
    // ...
    console.log(`Underlying: ${underlyingPrice}$, Strike: ${strikePrice}$, Premium: ${optionPrice}$, DTE: ${timeToExpiration}, IV: ${impliedVolatility}%, Rate: ${riskFreeRate}%, Type: ${optionType.toUpperCase()}`)
    console.log(`Delta: ${delta}, Theta: ${theta}, Vega: ${vega}, Gamma: ${gamma}, Rho: ${rho}`)
  }
```


## Chart Data ETL Process

#### `Chart.js` component includes the Chart creation methodology which is based on an ETL process:

**Extraction** - Various `AlphaVantage API` endpoints to provide data

**Transformation** - I chose to use `JQ` and Regular Expressions to filter out unwanted data

**Loading** - `PapaParse` to read the data from a .csv and `Recharts` to visualize



## Contributing

If you would like to contribute to this project, please open an issue or pull request on GitHub.


## Authors & License

[@lironbm7](https://github.com/lironbm7)

This project is licensed under the MIT license. See the LICENSE file for more details.




