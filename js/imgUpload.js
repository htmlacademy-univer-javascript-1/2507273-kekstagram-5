import{ validateForm, form } from './formValidation.js';
import { editPhoto } from './photoRedactor.js';
import { sendData } from './api.js';
import { showAlert } from './utils.js';

const addListenersOnForm = () =>{
  const submitButton = form.querySelector('.img-upload__submit');
  const sliderElement = document.querySelector('.effect-level__slider');
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

  function closeForm(){
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
    fileInput.value = '';
    sliderElement.noUiSlider.destroy();
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

  const blockSubmitButton = () => {
    submitButton.disabled = true;
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
  };


  const setImageLoaderFormSubmit = (onSuccess) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        blockSubmitButton();
        sendData(new FormData(evt.target))
          .then(onSuccess)
          .catch(
            (err) => {
              showAlert(err.message);
            }
          )
          .finally(unblockSubmitButton);
      }
    });
  };

  setImageLoaderFormSubmit(closeForm);
};

export {addListenersOnForm};
