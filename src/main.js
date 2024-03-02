'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import './css/loader.css';
import fetchImages from './js/pixabay-api';
import renderPhotoList from './js/render-functions';

const searchForm = document.getElementById('search-form');
const inputField = document.querySelector('.searchInput');
const galleryEl = document.querySelector('.image-gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

/*Створення loader*/
const loader = document.createElement('span')
loader.classList.add('loader');

let currentPage = 1;
let currentQuery = '';

function clearGallery() {
    galleryEl.innerHTML = '';
}
/*Функції приховування та показу кнопок і loader*/
function showLoadMoreButton() {
    loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}


function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
};

hideLoader();
hideLoadMoreButton();

function resetPage() {
    currentPage = 1;
}



searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const userInput = inputField.value.trim();
    currentQuery = userInput;
    galleryEl.before(loader);

    if (!userInput) {
        console.log('Please enter a search query before submitting.');
        return;
    }

    clearGallery();
    resetPage();
    hideLoader();

    try {
        showLoader();
        const images = await fetchImages(userInput, currentPage);
        renderPhotoList(images, galleryEl);
        // Висота карточки галереї
        const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height;

        // Прокручування на 2 висоти карточки галереї
        window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });

        showLoadMoreButton();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
});

async function handleLoadMore() {
    currentPage++;
    loadMoreBtn.before(loader);
    showLoader();
    hideLoadMoreButton();

    try {
        const images = await fetchImages(currentQuery, currentPage);
        renderPhotoList(images, galleryEl);
        // Висота карточки галереї
        const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height;

        // Прокручування на 2 висоти карточки галереї
        window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
        showLoadMoreButton();
    }
}


loadMoreBtn.addEventListener('click', handleLoadMore);

