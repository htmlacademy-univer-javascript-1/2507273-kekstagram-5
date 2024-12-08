import{checkValidation, form} from './formValidation.js';
import { editPhoto } from './photoRedactor.js';

export const addListenersOnForm = () => {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const body = document.body;
  const closeButton = document.querySelector('.img-upload__cancel');

  const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

  const isFieldFocused = () =>
    document.activeElement.classList.contains('text__hashtags') ||
    document.activeElement.classList.contains('text__description');

  const onEscPress = (evt) => {
    if (isEscapeKey(evt)) {
      if (isFieldFocused()) {
        evt.stopPropagation();
      } else {
        evt.preventDefault();
        closeForm();
      }
    }
  };

  function closeForm() {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.querySelector('.img-upload__form').reset();
    fileInput.value = '';
    form.reset();
    form.removeEventListener('keydown', onEscPress);
  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
      form.addEventListener('keydown', onEscPress);
      editPhoto();
    }
  });


  closeButton.addEventListener('click', () => {
    closeForm();
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    checkValidation();
  });
};
