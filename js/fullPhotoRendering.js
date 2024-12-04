import { cutComments } from './comments.js';

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function closeUserModal() {
  const picturesFull = document.querySelector('.big-picture');
  const commentCount = picturesFull.querySelector('.social__comment-count');
  const commentLoader = picturesFull.querySelector('.comments-loader');
  picturesFull.classList.add('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentLoader.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const createButton = (socialCommentsList) =>{
  const commentLoader = document.createElement('button');
  commentLoader.type = 'button';
  commentLoader.className = 'social__comments-loader comments-loader';
  commentLoader.textContent = 'Загрузить ещё';
  socialCommentsList.parentNode.insertBefore(commentLoader, socialCommentsList.nextSibling);
};

const showFullPhoto = (photo) => {
  const picturesFull = document.querySelector('.big-picture');
  const picturesFullImg = picturesFull.querySelector('.big-picture__img img');
  const picturesFullLikes = picturesFull.querySelector('.likes-count');
  const picturesFullCaption = picturesFull.querySelector('.social__caption');
  const closeButton = picturesFull.querySelector('.big-picture__cancel');
  const commentCount = picturesFull.querySelector('.social__comment-count');
  const oldLoader = picturesFull.querySelector('.comments-loader');
  if (oldLoader) {
    oldLoader.remove();
  }
  const socialCommentsList = picturesFull.querySelector('.social__comments');
  picturesFullImg.src = photo.url;
  picturesFullImg.alt = photo.description;
  picturesFullLikes.textContent = photo.likes;
  commentCount.textContent = photo.comments.length;
  picturesFullCaption.textContent = photo.description;

  picturesFull.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  document.body.classList.add('modal-open');

  createButton(socialCommentsList);
  const commentLoader = picturesFull.querySelector('.comments-loader');
  cutComments(photo.comments, commentCount, commentLoader, socialCommentsList);

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeUserModal);
};


export const makeFull = (pictures) =>{
  const pictureElements = document.querySelector('.pictures');
  pictureElements.addEventListener('click',(evt) =>{
    const photoElement = evt.target.closest('[data-thumbnail-id]');
    if (!photoElement){
      return;
    }
    const index = photoElement.dataset.thumbnailId;
    evt.preventDefault();
    const photo = pictures.find(
      (item) => item.id === Number(index)
    );
    showFullPhoto(photo);
  });
};


