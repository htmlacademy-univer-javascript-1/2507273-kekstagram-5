import { renderPhotos } from './rendering.js';
import { debounce } from './utils.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const pictureElements = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
const buttons = filtersContainer.querySelectorAll('.img-filters__button');

const removeActiveClass = () => {
  buttons.forEach((button) => button.classList.remove(ACTIVE_CLASS));
};

const handleFilterClick = debounce((filterFunction, photos, button) => {
  const oldPhotos = pictureElements.querySelectorAll('.picture');
  oldPhotos.forEach((photo) => photo.remove());
  removeActiveClass();
  button.classList.add(ACTIVE_CLASS);
  const filteredPhotos = filterFunction ? filterFunction(photos) : photos;
  renderPhotos(filteredPhotos);
});

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const getDiscussedPhotos = (photos) => {
  const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  return discussedPhotos;
};

export const filter = (photos) => {
  renderPhotos(photos);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      switch (button.id) {
        case 'filter-random':
          handleFilterClick(getRandomPhotos,photos, button);
          break;
        case 'filter-discussed':
          handleFilterClick(getDiscussedPhotos,photos, button);
          break;
        default:
          handleFilterClick(null, photos, button);
          break;
      }
    });
  });
  filtersContainer.classList.remove('img-filters--inactive');
};
