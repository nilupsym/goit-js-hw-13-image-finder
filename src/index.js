import './styles.css';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/apiService';

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
}

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;

    if (imagesApiService.query === '') {
        return alert('Type something');
    }

    imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages();
}

function fetchImages() {
    imagesApiService.fetchImages().then(hits => {
        appendImagesMarkup(hits);
    });
}

function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', imageCard(hits));
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}
