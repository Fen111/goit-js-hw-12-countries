import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';

import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import countryCards from '../src/templates/card-country.hbs';
import countryListFound from '../src/templates/list-country.hbs';

const { debounce } = require('lodash');

refs.inputSearch.addEventListener(
  'input',
  debounce(e => {
    let inputValue = e.target.value;
    fetchCountries(inputValue).then(renderCountries).catch(catchError);
  }, 700),
);

function renderCountries(dataCountries) {
  clearCountryList();
  if (dataCountries.length > 10) {
    const myNotice = notice({
      text: 'Too many matches found. Please enter a more specific query!',
      modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
    });
  } else if (dataCountries.length > 1) {
    let markup = countryListFound(dataCountries);
    refs.countryList.insertAdjacentHTML('afterbegin', markup);
  } else {
    let markup = countryCards(dataCountries);
    refs.countryList.insertAdjacentHTML('afterbegin', markup);
  }
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function catchError() {
  const myNotice = notice({
    text: 'Error 404. Not found',
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}
