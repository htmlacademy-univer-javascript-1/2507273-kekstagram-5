import { throttle } from './utils.js';

const editScale = () =>{
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');

  const MIN_SCALE = 25;
  const MAX_SCALE = 100;
  const SCALE_STEP = 25;

  const updateScale = throttle((scale) => {
    scaleControlValue.value = `${scale}%`;
    previewImage.style.transform = `scale(${scale / 100})`;
  }, 100);

  const handleSmallerClick = () => {
    let currentScale = parseInt(scaleControlValue.value, 10);
    if (currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
      updateScale(currentScale);
    }
  };

  const handleBiggerClick = () => {
    let currentScale = parseInt(scaleControlValue.value, 10);
    if (currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
      updateScale(currentScale);
    }
  };

  scaleControlSmaller.addEventListener('click', handleSmallerClick);
  scaleControlBigger.addEventListener('click', handleBiggerClick);


  return () => {
    scaleControlSmaller.removeEventListener('click', handleSmallerClick);
    scaleControlBigger.removeEventListener('click', handleBiggerClick);
  };
};

const editEffects = () => {
  const sliderElement = document.querySelector('.effect-level__slider');
  const sliderValueElement = document.querySelector('.effect-level__value');
  const imgPreview = document.querySelector('.img-upload__preview img');
  const effectsList = document.querySelector('.effects__list');
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');

  const EFFECTS = {
    none: {
      name: 'none',
      style: '',
      min: 0,
      max: 100,
      step: 1,
      start: 100,
    },
    chrome: {
      name: 'chrome',
      style: 'grayscale',
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    sepia: {
      name: 'sepia',
      style: 'sepia',
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    marvin: {
      name: 'marvin',
      style: 'invert',
      min: 0,
      max: 100,
      step: 1,
      start: 100,
      unit: '%',
    },
    phobos: {
      name: 'phobos',
      style: 'blur',
      min: 0,
      max: 3,
      step: 0.1,
      start: 3,
      unit: 'px',
    },
    heat: {
      name: 'heat',
      style: 'brightness',
      min: 1,
      max: 3,
      step: 0.1,
      start: 3,
    },
  };

  let currentEffect = EFFECTS.none;

  noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
    connect: 'lower',
    format: {
      to: function (value) {
        return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderValueElement.value = sliderValue;

    if (currentEffect.style) {
      imgPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit || ''})`;
    } else {
      imgPreview.style.filter = '';
    }
  });

  effectsList.addEventListener('change', (evt) => {
    const selectedEffect = evt.target.value;
    currentEffect = EFFECTS[selectedEffect];

    if (currentEffect.name === 'none') {
      effectLevelContainer.classList.add('hidden');
      imgPreview.style.filter = '';
    } else {
      effectLevelContainer.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: currentEffect.min,
          max: currentEffect.max,
        },
        start: currentEffect.start,
        step: currentEffect.step,
      });
    }
  });

  effectLevelContainer.classList.add('hidden');
};

export const editPhoto = () => {
  const resetScale = editScale();
  editEffects();

  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const body = document.body;
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
      resetScale();
    }
  });
};

