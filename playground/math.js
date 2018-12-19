//const city = require("./math-util").city;
//const country = require("./math-util").country;

//console.log(city);
//console.log(country);

//By doing Object Destructuring
const {
  city: cityName,
  country,
  details,
  state = "karnataka"
} = require("./math-util");

console.log(cityName, country, state);

details();
