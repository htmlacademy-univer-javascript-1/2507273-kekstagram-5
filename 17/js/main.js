import { renderPhotos } from './rendering.js';
import { addListenersOnForm } from './imgUpload.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';


getData()
  .then((photoes) => {
    renderPhotos(photoes);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

addListenersOnForm();
