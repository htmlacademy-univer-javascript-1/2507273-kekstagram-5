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
  const modal = document.querySelector('.big-picture');
  modal.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showFullPhoto = (photo) => {
  const picturesFull = document.querySelector('.big-picture');
  const picturesFullImg = picturesFull.querySelector('.big-picture__img img');
  const picturesFullLikes = picturesFull.querySelector('.likes-count');
  const picturesFullCommentsCount = picturesFull.querySelector('.comments-count');
  const socialCommentsList = picturesFull.querySelector('.social__comments');
  const picturesFullCaption = picturesFull.querySelector('.social__caption');
  const closeButton = picturesFull.querySelector('.big-picture__cancel');
  const commentCount = picturesFull.querySelector('.social__comment-count');
  const commentLoader = picturesFull.querySelector('.comments-loader');

  picturesFullImg.src = photo.url;
  picturesFullImg.alt = photo.description;
  picturesFullLikes.textContent = photo.likes;
  picturesFullCommentsCount.textContent = photo.comments.length;
  picturesFullCaption.textContent = photo.description;

  socialCommentsList.innerHTML = '';
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialCommentsList.appendChild(commentElement);
  });

  picturesFull.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
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

