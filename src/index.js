import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import countryCards from '../src/templates/card-country.hbs';
import countryListFound from '../src/templates/list-country.hbs';

const { debounce } = require('lodash');

const BASE_URL = `https://restcountries.com/v2`;
let endpoint = `/name/`;

refs.inputSearch.addEventListener(
  'input',

  debounce(e => {
    let inputValue = e.target.value;
    let nameCountry = `${inputValue}`;
    let url = BASE_URL + endpoint + nameCountry;
    fetch(url)
      .then(result => {
        console.log(result);
        return result.json();
      })
      .then(dataCountries => {
        console.log(dataCountries);
        if (dataCountries.length > 10) {
          return alert('Too many matches found. Please enter a more specific query!');
        }
        if (dataCountries.length > 1) {
          let markup = countryListFound(dataCountries);
          return refs.countryList.insertAdjacentHTML('afterbegin', markup);
        } else {
          let markup = countryCards(dataCountries);
          return refs.countryList.insertAdjacentHTML('afterbegin', markup);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, 500),
);
