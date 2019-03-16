const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker: Registered!');
    } catch(error) {
      console.log(`Service Worker: Register error ${error}`);
    }
  }
}

const insertImageList = () => {
  const imageList = document.getElementById('image-list');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 3; i++) {
    console.log('loop', i)
    const image = document.createElement('img');

    image.src = 'https://via.placeholder.com/200x300?text=PWA';
    fragment.appendChild(image);
  }

  imageList.appendChild(fragment);
};

const main = () => {
  console.log('main() invoked!')
  registerServiceWorker();
  insertImageList();
};

window.addEventListener('load', () => { main(); });
