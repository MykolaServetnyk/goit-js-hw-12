'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import './css/loader.css'

import fetchImages from './js/pixabay-api';
import renderPhotoList from './js/render-functions';

const searchForm = document.getElementById('search-form');
const inputField = document.querySelector('.searchInput');
const galleryEl = document.querySelector('.image-gallery');

function clearGallery() {
    galleryEl.innerHTML = '';
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userInput = inputField.value.trim();

    const loader = document.createElement('span');
    loader.classList.add('loader');
    document.querySelector('.form').after(loader);

    if (!userInput) {
        console.log('Please enter a search query before submitting.');
        return;
    }

    clearGallery();

    fetchImages(userInput)
        .then(images => {
            renderPhotoList(images, galleryEl);
            loader.remove();
        })
        .catch(error => {
            loader.remove();
            console.log('error');
        });
});




