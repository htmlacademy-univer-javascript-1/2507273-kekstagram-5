import { makeFull } from './fullPhotoRendering.js';

export const renderPhotos = (pictures) => {
  const picturesTitle = document.querySelector('.pictures__title');
  picturesTitle.classList.remove('visually-hidden');

  const pictureElements = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();
  pictures.forEach(({ id, url, likes, comments, description}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.dataset.thumbnailId = id;
    picturesFragment.appendChild(picture);
  });

  pictureElements.appendChild(picturesFragment);
  makeFull(pictures);
};


