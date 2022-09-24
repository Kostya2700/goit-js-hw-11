import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
const axios = require('axios').default;

const formElem = document.querySelector('.search-form');
const elemDiv = document.querySelector('.gallery');
const KEY_PIXABAY = '29991996-b215bbe81df8b02481f14f1cd';
const loadMore = document.querySelector('.load-more');
const iElem = document.querySelector('.fa');
const endElemDiv = document.querySelector('.more');
loadMore.addEventListener('click', onLoadMore);
let page = 1;
let valueInput = '';

formElem.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  page = 1;
  valueInput = document.querySelector("[type='text']").value;
  if (valueInput === '') {
    elemDiv.innerHTML = '';
    // endElemDiv.innerHTML = '';
    loadMore.classList.add('visually-hidden');
    Notiflix.Notify.info('Please enter a search images');
    return;
  }
  getUser(valueInput).then(data => {
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
          <b class='info-image'> Likes </b><span class='info-image'>${likes}</span>
        </p>
        <p class="info-item">
          <b class='info-image'> Views </b><span class='info-image'>${views}</span>
        </p>
        <p class="info-item">
          <b class='info-image'> Comments </b><span class='info-image'>${comments}</span>
        </p>
        <p class="info-item">
          <b class='info-image'> Downloads </b><span class='info-image'>${downloads}</span>
        </p>
      </div>
      
    </div>`;
      }
    )
    .join('');
}

function onLoadMore(e) {
  page += 1;
  iElem.classList.remove('visually-hidden');
  getUser(valueInput).then(data => {
    console.log(data.length);
    if (data.length < 40) {
      loadMore.classList.add('visually-hidden');
      //   const lastItem = document.createElement('h1');
      //   lastItem.textContent = 'The end, enter a new search';
      //   endElemDiv.append(lastItem);
    }
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
    if (response.data.totalHits === 0) {
      loadMore.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (response.data.totalHits > 40) {
      loadMore.classList.remove('visually-hidden');
      iElem.classList.add('visually-hidden');
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    } else if (response.data.totalHits < 40) {
      loadMore.classList.add('visually-hidden');
      Notiflix.Notify.success(
        `We found only ${response.data.totalHits} images.`
      );
    }
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
