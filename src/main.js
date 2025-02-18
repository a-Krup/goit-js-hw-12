import { fetchImages } from './js/pixabay-api';
import { renderImages, toggleLoadingIndicator } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1; // Початковий номер сторінки
let searchQuery = ''; // Початковий запит

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const form = document.querySelector('.form');
  const searchInput = document.querySelector('.form-input');
  const loadMoreBtn = document.querySelector('.sub-loader');
  const endMessage = document.querySelector('.end-message');
  const searchBtn = document.querySelector('.sub-btn');

  if (!form || !searchInput || !loadMoreBtn || !endMessage || !searchBtn) return;

  // Функція затримки для коректного відображення лоадера
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Слухач події для форми "Search"
  form.addEventListener('submit', async event => {
    event.preventDefault();

    searchQuery = searchInput.value.trim();

    if (!searchQuery) {
      iziToast.error({
        message: 'Please enter a search term.',
        position: 'topRight',
        timeout: 2000,
      });
      return;
    }

    // Скидаємо існуючі зображення та інтерфейс
    gallery.innerHTML = '';
    page = 1; // Скидаємо сторінку до 1
    loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку "Load more"
    endMessage.classList.add('hidden'); // Ховаємо повідомлення про кінець
    searchBtn.disabled = true; // Дезактивуємо кнопку "Search"
    toggleLoadingIndicator(true);

    try {
      const images = await fetchImages(searchQuery, page);

      if (images.length === 0) {
        iziToast.error({
          message: 'No images found, please try another search.',
          position: 'topRight',
          timeout: 2000,
        });
        return;
      }

      // Затримка перед відображенням зображень (емулюємо час завантаження)
      await delay(2000);


      renderImages(images);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      // Після завантаження зображень
      setTimeout(() => {
        searchBtn.disabled = false; // Активуємо кнопку "Search"
        loadMoreBtn.classList.remove('hidden'); // Показуємо кнопку "Load More"
      }, 500); // Затримка 500 мс

      // Перевіряємо, чи є ще зображення на даній сторінці
      const totalHits = images.length;
      const perPage = 40;
      if (totalHits < perPage) {
        loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку "Load More"
        endMessage.classList.remove('hidden'); // Показуємо повідомлення про кінець
        endMessage.textContent = "We're sorry, but you've reached the end of search results."; // Оновлюємо текст
      }

      scrollToNewImages();

    } catch (error) {
      iziToast.error({
        message: 'Something went wrong, please try again later.',
        position: 'topRight',
        timeout: 2000,
      });
    } finally {
      toggleLoadingIndicator(false);
      searchBtn.disabled = false; // Активуємо кнопку "Search" по завершенню
    }
  });

  // Слухач події для кнопки "Load More"
  loadMoreBtn.addEventListener('click', async () => {
    page += 1; // Переходимо до наступної сторінки
    loadMoreBtn.disabled = true; // Дезактивуємо кнопку "Load More" під час завантаження
    toggleLoadingIndicator(true);

    try {
      const images = await fetchImages(searchQuery, page);

      if (images.length === 0) {
        // Якщо більше немає зображень, ховаємо кнопку "Load More"
        loadMoreBtn.classList.add('hidden');
        endMessage.classList.remove('hidden'); // Показуємо повідомлення
        endMessage.textContent = "We're sorry, but you've reached the end of search results."; // Оновлюємо текст
        return;
      }

      renderImages(images);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      // Перевіряємо, чи є ще зображення на наступній сторінці
      const perPage = 40;
      if (images.length < perPage) {
        loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку "Load More"
        endMessage.classList.remove('hidden'); // Показуємо повідомлення про кінець
        endMessage.textContent = "We're sorry, but you've reached the end of search results."; // Оновлюємо текст
      }

      scrollToNewImages();

    } catch (error) {
      iziToast.error({
        message: 'Something went wrong, please try again later.',
        position: 'topRight',
        timeout: 2000,
      });
    } finally {
      loadMoreBtn.disabled = false; // Активуємо кнопку "Load More" після завантаження
      toggleLoadingIndicator(false);
    }
  });

  // Функція для прокручування до нових зображень
  function scrollToNewImages() {
    const galleryItems = document.querySelectorAll('.gallery li');
    if (galleryItems.length > 0) {
      const lastItem = galleryItems[galleryItems.length - 1];
      const itemHeight = lastItem.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2, // Прокручуємо на дві висоти елемента
        behavior: 'smooth',
      });
    }
  }
});
