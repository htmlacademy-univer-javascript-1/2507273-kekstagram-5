
import { addListenersOnForm } from './img-upload.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { filter } from './filtration.js';


getData()
  .then((photos) => {
    filter(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

addListenersOnForm();
