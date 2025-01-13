import { fetchPhotosByQuery } from './pixabay-api';
import { createGalleryItemMarkup } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loaderEl = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchKeywords.value.trim();
  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.show({
      message: 'Input field can not be empty',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  try {
    const { data } = await fetchPhotosByQuery(searchQuery);

    if (data.total === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
      return;
    }
    galleryEl.innerHTML = createGalleryItemMarkup(data.hits);

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }

  event.target.reset();
  loaderEl.classList.add('is-hidden');
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
