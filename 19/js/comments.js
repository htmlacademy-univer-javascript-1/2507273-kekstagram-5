const makeComments = (comments, socialCommentsList) =>{
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialCommentsList.appendChild(commentElement);
  });
};

export const cutComments = (comments, commentCount, commentLoader, socialCommentsList) => {
  socialCommentsList.innerHTML = '';
  commentLoader.classList.remove('hidden');
  let loadedComments = 0;

  const onRenderCommentsClick = () => (renderComments());

  function renderComments() {
    commentLoader.removeEventListener('click', onRenderCommentsClick);
    const slice = comments.slice(loadedComments, loadedComments + 5);
    loadedComments += slice.length;
    makeComments(slice, socialCommentsList);

    commentCount.textContent = `${loadedComments} из ${comments.length} комментариев`;

    if (loadedComments >= comments.length) {
      commentLoader.classList.add('hidden');
    }else{
      commentLoader.addEventListener('click', onRenderCommentsClick);
    }

  }
  renderComments();
};
