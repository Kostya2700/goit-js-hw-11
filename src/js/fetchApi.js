const axios = require('axios').default;
const KEY_PIXABAY = '29991996-b215bbe81df8b02481f14f1cd';

export default async function getUser(name, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY_PIXABAY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    console.log(response);
    console.log(response.data);
    console.log(response.data.hits);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
