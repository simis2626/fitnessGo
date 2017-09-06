// JavaScript File

//#v01


var CACHE_NAME = 'fitnessGo-static-v1';


var staticURLS = ["/",
  "/assets/logo/logo24.png",
  "/assets/logo/logo48.png",
  "/assets/logo/logo64.png",
  "/assets/logo/logo96.png",
  "/assets/logo/logo128.png",
  "/assets/logo/logo144.png",
  "/assets/logo/logo240.png",
  "/assets/logo/logo512.png",
  "/assets/logo/logo768.png",
  "/assets/logo/logo1024.png",
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/5.jpg",
  "/assets/6.jpg",
  "/assets/7.jpg",
  "/assets/9.jpg",
  "/assets/8.jpg",
  "/assets/manifest.json",
  "/assets/plotly.js",
  "/inline.bundle.js",
  "/main.bundle.js",
  "/polyfills.bundle.js",
  "/styles.bundle.css",
  "/vendor.bundle.js"/*,
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://static-web.runkeeper.com/build/14445/static/sparta/homepage/assets/community-reviewer-1.png",
  "https://static-web.runkeeper.com/build/14445/static/sparta/homepage/assets/community-reviewer-2.png",
  "https://static-web.runkeeper.com/build/14445/static/sparta/homepage/assets/community-reviewer-3.png"*/];


self.addEventListener('install', function (event) {

  var requestOps = new RequestOptions();


  event.waitUntil(
    setTimeout(function () {
      caches.open(CACHE_NAME)
        .then(function (cache) {
          Promise.all([
              cache.addAll(staticURLS),
              cache.add(new Request("https://fonts.googleapis.com/icon?family=Material+Icons", {"mode": "no-cors"}))
            ]
          ).then(() => {
          })
        })


    }, 5000));
});


self.addEventListener('fetch', function (event) {

  var requestURL = new URL(event.request.url);

  if (event.request.method == 'POST') {
    return;
  }
  //Ones you want live data for
  if (/api/.test(requestURL.pathname)) {

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

