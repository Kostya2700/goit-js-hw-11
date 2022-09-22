const axios = require('axios').default;
const KEY_PIXABAY = '29991996-b215bbe81df8b02481f14f1cd';
async function getUser(name) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY_PIXABAY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(response.data.hits);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
export { getUser };
