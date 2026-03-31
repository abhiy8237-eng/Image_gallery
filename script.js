const images = [
    {src: "https://picsum.photos/id/1015/800/600", category: "nature"},
    {src: "https://picsum.photos/id/1016/800/600", category: "nature"},
    {src: "https://picsum.photos/id/1020/800/600", category: "city"},
    {src: "https://picsum.photos/id/1024/800/600", category: "city"},
    {src: "https://picsum.photos/id/1025/800/600", category: "nature"},
];

let currentIndex = 0;
let slideshowInterval = null;

// Load images
function loadGallery(filter = "all") {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images.forEach((img, index) => {
        if (filter === "all" || img.category === filter) {
            const image = document.createElement("img");
            image.src = img.src;
            image.onclick = () => openLightbox(index);
            gallery.appendChild(image);
        }
    });
}

function filterImages(category) {
    loadGallery(category);
}

// Lightbox
function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    stopSlideshow();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function updateImage() {
    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
});

// Slideshow
function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        slideshowInterval = setInterval(nextImage, 2000);
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
}

// Initialize
loadGallery();