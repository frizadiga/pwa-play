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

const app = () => {
  registerServiceWorker();
};

app();