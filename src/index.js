import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import getUser from './js/fetchApi';
import markupPictures from './js/renderMarkup';

const formElem = document.querySelector('.search-form');
const elemDiv = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const iElem = document.querySelector('.fa');
const divEndpic = document.querySelector('.endpic');
let gallery = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});
let page;
let valueInput = '';

formElem.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  divEndpic.innerHTML = '';
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  page = 1;
  valueInput = document.querySelector("[type='text']").value.trim();
  if (valueInput === '') {
    elemDiv.innerHTML = '';
    loadMore.classList.add('visually-hidden');
    Notiflix.Notify.info('Please enter a search images');
    return;
  }
  getUser(valueInput, page).then(({ hits, totalHits }) => {
    elemDiv.innerHTML = '';
    if (totalHits === 0) {
      loadMore.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (hits.length >= 40) {
      loadMore.classList.remove('visually-hidden');
      Notiflix.Notify.success(
        `Hooray! We found ${totalHits} images at this page ${hits.length} images`
      );
      iElem.classList.add('visually-hidden');
    } else if (hits.length < 40) {
      loadMore.classList.add('visually-hidden');
      const end = document.createElement('h1');
      end.textContent = 'End images';
      divEndpic.append(end);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    elemDiv.insertAdjacentHTML('beforeend', markupPictures(hits));
    gallery.refresh();
  });
}

function onLoadMore() {
  page += 1;
  iElem.classList.remove('visually-hidden');
  loadMore.disabled = true;
  // let allPictures = 0;
  getUser(valueInput, page).then(({ hits, totalHits }) => {
    // const allTotal = totalHits;
    // allPictures = allTotal - hits.length;
    // console.log('getUser ~ allPictures', allPictures);

    if (hits.length >= 40) {
      iElem.classList.add('visually-hidden');
      loadMore.disabled = false;
    } else if (hits.length < 40) {
      loadMore.classList.add('visually-hidden');
      loadMore.disabled = false;
      const end = document.createElement('h1');
      end.textContent = 'End images';
      divEndpic.append(end);
    }
    elemDiv.insertAdjacentHTML('beforeend', markupPictures(hits));
    gallery.refresh();
  });
}
