export const createGalleryItemMarkup = images => {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class ='gallery-item'>
    <a href="${largeImageURL}" class="gallery-link">
      <img class ="gallery-img" src="${webformatURL}" alt="${tags}" />
      <div class="image-info">
        <span>Likes: ${likes}</span>
        <span>Views: ${views}</span>
        <span>Comments: ${comments}</span>
        <span>Downloads: ${downloads}</span>
      </div>
  </a>
</li>`
    )
    .join('');
};
