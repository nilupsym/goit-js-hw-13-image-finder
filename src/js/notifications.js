import { success, notice, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { defaults } = require('@pnotify/core');
defaults.delay = 1500;

function imagesFound() {
  success({text: "Wow, something found for you!"});
}
function emptyQuery() {
  notice({text: "Please, type something!"});
}

function imagesNotFound() {
  error({text: "Nothing was found :("});
}

export { imagesFound, emptyQuery, imagesNotFound }