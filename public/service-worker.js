// // Service Worker file

// // Define a cache name for your app
// const cacheName = "my-webapp-cache";

// // List the files you want to cache
// const filesToCache = [
//     "/",
//     // "/index.html",
//     "/src/index.css",
//     // Add more files and assets you want to cache
// ];

// // Install event: cache the app shell and static assets
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheName).then((cache) => {
//             return cache.addAll(filesToCache);
//         })
//     );
// });

// // Activate event: delete old caches if any
// self.addEventListener("activate", (event) => {
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames
//                     .filter((name) => {
//                         return name !== cacheName;
//                     })
//                     .map((name) => {
//                         return caches.delete(name);
//                     })
//             );
//         })
//     );
// });

// // Fetch event: serve cached content if available, otherwise make a network request
// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             // Serve the cached response if found
//             if (response) {
//                 return response;
//             }

//             // Make a network request if the content is not cached
//             return fetch(event.request);
//         })
//     );
// });

// // Register the service worker
// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register("/public/service-worker.js")
//         .then((registration) => {
//             console.log("Service Worker registered");
//         })
//         .catch((error) => {
//             console.error("Service Worker registration failed:", error);
//         });
// }
