export default function markupPictures(search) {
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
