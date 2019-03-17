const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker: Registered!', reg);
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

    image.src = `https://via.placeholder.com/300x300?text=${i + 1}`;
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
