const form = document.querySelector('.img-upload__form');


const checkValidation = ()=> {

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    successClass: 'img-upload__field-wrapper--success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  }, false);

  function validateHashtags(value) {
    if (value === '') {
      return true;
    }

    const hashtags = value.trim().split(/\s+/);
    const regex = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

    if (hashtags.length > 5) {
      return false;
    }

    for (const hashtag of hashtags) {
      if (!regex.test(hashtag)) {
        return false;
      }
      if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
        return false;
      }
    }

    const lowerCasedTags = hashtags.map((tag) => tag.toLowerCase());
    if (new Set(lowerCasedTags).size !== lowerCasedTags.length) {
      return false;
    }

    return hashtags.every((tag) => regex.test(tag));
  }

  const hashtagsField = form.querySelector('.text__hashtags');
  pristine.addValidator(hashtagsField, validateHashtags);

  const isValid = pristine.validate();

  const showSuccessMessage = () => {
    const successTemplate = document.querySelector('#success').content.cloneNode(true);
    document.body.appendChild(successTemplate);

    const successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', () => {
      const fileInput = document.querySelector('.img-upload__input');
      const overlay = document.querySelector('.img-upload__overlay');
      const body = document.body;

      document.querySelector('.success').remove();
      overlay.classList.add('hidden');
      body.classList.remove('modal-open');
      document.querySelector('.img-upload__form').reset();
      fileInput.value = '';
    });
  };

  const showErrorMessage = () => {
    const errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.body.appendChild(errorTemplate);

    const errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', () => {
      document.querySelector('.error').remove();
    });
  };

  if (isValid) {
    showSuccessMessage('success');
    form.reset();
    pristine.reset();
  } else {
    showErrorMessage('error');
  }
};


export{checkValidation, form};

