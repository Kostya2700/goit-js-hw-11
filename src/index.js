import './css/styles.css';
// import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';
// console.log('fetchCountries', fetchCountries);
// var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};
refs.input.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();
    let valueInput = e.target.value.trim();
    // console.log('valueInput', valueInput.trim());

    if (!valueInput) {
      refs.list.innerHTML = '';
      refs.div.innerHTML = '';
      return;
    }
    fetchCountries(valueInput)
      .then(country => searchCountry(country))
      .catch(() => {
        refs.div.innerHTML = '';
        refs.list.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
function searchCountry(city) {
  if (city.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (city.length > 1 && city.length < 10) {
    const markup = city
      .map(city => {
        return `<li class="country-list__item">
        <img src=${city.flags.svg} width="50" alt="flag">
        <span class="country-list__name">${city.name.official}</span>
    </li>`;
      })
      .join('');
    refs.div.innerHTML = '';
    refs.list.innerHTML = markup;
  } else {
    const markup = city
      .map(city => {
        return `<div class="country-info__box" alt="flag">
        <img src=${city.flags.svg} width="80">
        <span class="country-info__name">${city.name.common}</span>
        </div>
        <p class="country-text"><span class="country-info--accent">Capital:</span> ${
          city.capital
        }</p>
        <p class="country-text"><span class="country-info--accent">Population:</span> ${
          city.population
        }</p>
        <p class="country-text"><span class="country-info--accent">Languages:</span> ${Object.values(
          city.languages
        ).join(', ')}</p>`;
      })
      .join('');
    refs.list.innerHTML = '';
    refs.div.innerHTML = markup;
  }
}
