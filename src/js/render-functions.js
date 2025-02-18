import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const toggleLoadingIndicator = isLoading => {
  const loader = document.querySelector('.loader');
  if (isLoading) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
};

export const renderImages = images => {
  const gallery = document.querySelector('.gallery');

  const markup = images
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
        return `
        <li>
          <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info">
            <div class="stat-item">
              <p class="label">Likes</p>
              <p class="value">${likes}</p>
            </div>
            <div class="stat-item">
              <p class="label">Views</p>
              <p class="value">${views}</p>
            </div>
            <div class="stat-item">
              <p class="label">Comments</p>
              <p class="value">${comments}</p>
            </div>
            <div class="stat-item">
              <p class="label">Downloads</p>
              <p class="value">${downloads}</p>
            </div>
          </div>
        </li>
      `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};
