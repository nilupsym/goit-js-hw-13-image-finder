import './styles.css';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/apiService';
import LoadMoreButton from './js/components/load-more-button';
import { emptyQuery, imagesFound, imagesNotFound } from './js/notifications';
import onClickImage from './js/lightbox.js';

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
}

const loadMoreButton = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const imagesApiService = new ImagesApiService();

refs.imagesContainer.addEventListener('click', onClickImage);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', onLoadMoreButtonClick);

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value;

    if (imagesApiService.query === '') {
        emptyQuery();
        clearImagesContainer();
        loadMoreButton.hide();
        return;
    }

    loadMoreButton.show();
    imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages();
}

function fetchImages() {
    loadMoreButton.disable();
    imagesApiService.fetchImages().then(hits => {
        if (hits.length === 0) {
            loadMoreButton.hide();
            imagesNotFound();
            return;
        }
        
        appendImagesMarkup(hits);
        loadMoreButton.enable();
        imagesFound();
    });
}

function onLoadMoreButtonClick() {
    fetchImages();
    
    setTimeout(function () {
         window.scrollTo(0, document.documentElement.offsetHeight);
    }, 2000);
}

function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', imageCard(hits));
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}