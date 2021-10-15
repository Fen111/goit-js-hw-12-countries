export default function fetchCountries(searchQuery) {
  return fetch(searchQuery)
    .then(res => {
      return res.json;
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      return err;
    });
}
