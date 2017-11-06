// JavaScript File

//#v01


var CACHE_NAME = 'fitnessGo-static-v2';


var staticURLS = ["/",
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/5.jpg",
  "/assets/6.jpg",
  "/assets/7.jpg",
  "/assets/9.jpg",
  "/assets/8.jpg",
  "/assets/plotly.js",
  "/inline.bundle.js",
  "/main.bundle.js",
  "/polyfills.bundle.js",
  "/styles.bundle.css",
  "/vendor.bundle.js"];


self.addEventListener('install', function (event) {



  event.waitUntil(
    setTimeout(function () {
      caches.open(CACHE_NAME)
        .then(function (cache) {
          return cache.addAll(staticURLS);
        })


    }, 3000));
});


self.addEventListener('fetch', function (event) {

  var requestURL = new URL(event.request.url);

  if (event.request.method == 'POST') {
    return;
  }
  //Ones you want live data for
  if (/\/api\//.test(requestURL.pathname)) {

    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          if (response.ok) {
            cache.put(event.request, response.clone());
            return response;
          } else {
            return caches.match(event.request).then(function (response) {
              return response;
            });
          }

        }, function (err) {
          return caches.match(event.request).then(function (response) {
            return response;
          });
        });
      }));
    return;

  }


  //Default if it is in the cache use it, otherwise use the network.
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('activate', function (event) {

  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);

          }
        })
      );
    })
  );
});

