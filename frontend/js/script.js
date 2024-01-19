function scrollLeft() {
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    galleryWrapper.scrollBy({ left: -200, behavior: 'smooth' }); // Adjust -200 if needed
}

function scrollRight() {
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    galleryWrapper.scrollBy({ left: 200, behavior: 'smooth' }); // Adjust 200 if needed
}
