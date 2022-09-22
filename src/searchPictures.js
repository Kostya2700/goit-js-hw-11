import Notiflix from 'notiflix';
const axios = require('axios').default;
const KEY_PIXABAY = '29991996-b215bbe81df8b02481f14f1cd';
async function getUser(name) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY_PIXABAY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(response);
    if (!response.data.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (response.data.totalHits) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }

    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
export { getUser };
