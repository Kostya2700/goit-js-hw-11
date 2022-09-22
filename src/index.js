import { getUser } from './searchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
    // console.log(getUser(valueInput));
    elemDiv.innerHTML = galleryMarkup(data);
    let gallery = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    // console.log(galleryMarkup(data));
  });
}
// function markupPictures() {}

function galleryMarkup(search) {
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
          <b> likes ${likes}</b>
        </p>
        <p class="info-item">
          <b> views ${views}</b>
        </p>
        <p class="info-item">
          <b> comments ${comments}</b>
        </p>
        <p class="info-item">
          <b> downloads ${downloads}</b>
        </p>
      </div>
      
    </div>`;
      }
    )
    .join('');
}
// const createGallery = galleryMarkup(galleryItems);
// console.log(galleryItems);
// elemDiv.insertAdjacentHTML('beforeend', createGallery);

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
