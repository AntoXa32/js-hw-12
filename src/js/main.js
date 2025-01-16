import { fetchPhotosByQuery } from './pixabay-api';
import { createGalleryItemMarkup } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PER_PAGE } from './pixabay-api.js';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loaderEl = document.querySelector('.loader');
const buttonEl = document.querySelector('.button');

let searchQuery = '';
let newCurrentPage = 1;
let totalPages = 0;

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchKeywords.value.trim();
  buttonEl.classList.add('d-none');
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
    const { data } = await fetchPhotosByQuery(searchQuery, newCurrentPage);

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

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (totalPages > 1) {
      buttonEl.classList.remove('d-none');
    }

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }

  event.target.reset();
  loaderEl.classList.add('is-hidden');
}

const smothScrollOnLoadMore = () => {
  const lastElement = galleryEl.querySelector('li.gallery-item:last-child');
  const newsElementHeight = lastElement.getBoundingClientRect().height;
  window.scrollBy(0, newsElementHeight * 3);
};

async function onLoadMoreClick() {
  newCurrentPage += 1;
  loaderEl.classList.remove('is-hidden');
  try {
    const { data } = await fetchPhotosByQuery(searchQuery, newCurrentPage);

    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryItemMarkup(data.hits)
    );

    loaderEl.classList.add('is-hidden');
    smothScrollOnLoadMore();

    if (newCurrentPage > totalPages) {
      buttonEl.classList.add('d-none');
      buttonEl.removeEventListener('click', onLoadMoreClick);
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
        color: 'blue',
      });
    }

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
buttonEl.addEventListener('click', onLoadMoreClick);
