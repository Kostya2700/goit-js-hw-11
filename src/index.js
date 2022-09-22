import { getUser } from './searchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// all modules
import Notiflix from 'notiflix';
// getUser('cat');
const formElem = document.querySelector('.search-form');

const elemDiv = document.querySelector('.gallery');
// console.log(valueInput);

formElem.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  const valueInput = document.querySelector("[type='text']").value;
  if (valueInput === '') {
    elemDiv.innerHTML = '';

    return;
  }
  getUser(valueInput).then(data => {
    console.log(data);
    elemDiv.insertAdjacentHTML('afterbegin', markupPictures(data));
    let gallery = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
  });
}

function markupPictures(search) {
  return search
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}" data-lightbox="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" '/>
      </a>
      <div class="info">
        <p class="info-item">
          <b> Likes </b><span>${likes}</span>
        </p>
        <p class="info-item">
          <b> Views </b><span>${views}</span>
        </p>
        <p class="info-item">
          <b> Comments </b><span>${comments}</span>
        </p>
        <p class="info-item">
          <b> Downloads </b><span>${downloads}</span>
        </p>
      </div>
      
    </div>`;
      }
    )
    .join('');
}
