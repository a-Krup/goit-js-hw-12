import { fetchImages } from './js/pixabay-api';
import { renderImages, toggleLoadingIndicator } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1;
let searchQuery = '';
let totalHits = 0;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const form = document.querySelector('.form');
  const searchInput = document.querySelector('.form-input');
  const loadMoreBtn = document.querySelector('.sub-loader');
  const endMessage = document.querySelector('.end-message');
  const searchBtn = document.querySelector('.sub-btn');

  if (!form || !searchInput || !loadMoreBtn || !endMessage || !searchBtn)
    return;

  form.addEventListener('submit', async event => {
    event.preventDefault();

    searchQuery = searchInput.value.trim();

    if (!searchQuery) {
      iziToast.error({
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
      return;
    }

    gallery.innerHTML = '';
    page = 1;
    loadMoreBtn.classList.add('hidden');
    endMessage.classList.add('hidden');
    searchBtn.disabled = true;
    toggleLoadingIndicator(true);

    try {
      const response = await fetchImages(searchQuery, page);
      totalHits = response.totalHits;

      const images = response.hits;

      if (images.length === 0) {
        iziToast.error({
          message: 'Sorry, no images match your search. Please try again!',
          position: 'topRight',
          timeout: 2000,
        });
        return;
      }

      await delay(2000);

      renderImages(images);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      if (images.length < totalHits) {
        loadMoreBtn.classList.remove('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
        endMessage.classList.remove('hidden');
        endMessage.textContent =
          "We're sorry, but you've reached the end of search results.";
      }

      setTimeout(() => {
        toggleLoadingIndicator(false);
        searchBtn.disabled = false;
      }, 500);

      scrollToNewImages();
    } catch (error) {
      iziToast.error({
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
    } finally {
      toggleLoadingIndicator(false);
      searchBtn.disabled = false;
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    toggleLoadingIndicator(true);
    loadMoreBtn.classList.add('hidden');

    await delay(2000);

    try {
      const response = await fetchImages(searchQuery, page);
      const images = response.hits;

      if (images.length === 0 || page * 40 >= totalHits) {
        loadMoreBtn.classList.add('hidden');
        endMessage.classList.remove('hidden');
        endMessage.textContent =
          "We're sorry, but you've reached the end of search results.";
        return;
      }

      renderImages(images);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      if (page * 40 >= totalHits) {
        loadMoreBtn.classList.add('hidden');
        endMessage.classList.remove('hidden');
        endMessage.textContent =
          "We're sorry, but you've reached the end of search results.";
      } else {
        loadMoreBtn.classList.remove('hidden');
      }

      scrollToNewImages();
    } catch (error) {
      iziToast.error({
        message: 'Sorry, no images match your search. Please try again!',
        position: 'topRight',
        timeout: 2000,
      });
    } finally {
      toggleLoadingIndicator(false);
    }
  });

  function scrollToNewImages() {
    const galleryItems = document.querySelectorAll('.gallery li');
    if (galleryItems.length > 0) {
      const lastItem = galleryItems[galleryItems.length - 1];
      if (lastItem) {
        const itemHeight = lastItem.getBoundingClientRect().top;
        if (itemHeight > 0) {
          window.scrollBy({
            top: itemHeight,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }
  }
});
