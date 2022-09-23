// import { getUser } from './searchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
const axios = require('axios').default;

const formElem = document.querySelector('.search-form');
const elemDiv = document.querySelector('.gallery');
const KEY_PIXABAY = '29991996-b215bbe81df8b02481f14f1cd';
const loadMore = document.querySelector('.load-more');
loadMore.addEventListener('click', onLoadMore);
let page = 1;
let valueInput = '';

formElem.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  page = 1;
  valueInput = document.querySelector("[type='text']").value;
  if (valueInput === '') {
    elemDiv.innerHTML = '';
    Notiflix.Notify.info('Please enter a search images');
    return;
  }
  getUser(valueInput).then(data => {
    // console.log(data);
    elemDiv.innerHTML = '';
    elemDiv.insertAdjacentHTML('beforeend', markupPictures(data));

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
  lightBox.refresh();
}
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

function onLoadMore(e) {
  page += 1;
  getUser(valueInput).then(data => {
    // console.log(data);
    elemDiv.insertAdjacentHTML('beforeend', markupPictures(data));
    let gallery = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
  });
}
async function getUser(name) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY_PIXABAY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    // console.log(response);
    if (!response.data.totalHits) {
      loadMore.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (response.data.totalHits) {
      loadMore.classList.remove('visually-hidden');
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
    console.log(response.data);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
