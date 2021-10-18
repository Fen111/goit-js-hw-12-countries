import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';

export default function fetchCountries(searchQuery) {
  const BASE_URL = `https://restcountries.com/v2/name/`;
  let url = BASE_URL + `${searchQuery}`;

  return fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      if (data.status === 404) {
        // const myNotice = notice({
        //   text: 'Incorrect input!',
        //   modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
        // });
        throw new Error(data.status);
      } else return data;
    });
}
