import './styles.css';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/apiService';
import LoadMoreButton from './js/components/load-more-button';

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
}

const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;

    if (imagesApiService.query === '') {
        return alert('Type something');
    }

    loadMoreButton.show();
    imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages();
}

function fetchImages() {
    loadMoreButton.disable();
    imagesApiService.fetchImages().then(hits => {
        appendImagesMarkup(hits);
        loadMoreButton.enable();
    });
}

function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', imageCard(hits));
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}
