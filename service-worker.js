'use strict';

const CACHE_VERSION = 'ifsc-digital-book-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './Capítulo 01 - Preparando o Terreno - O Início da Programação em Geoprocessamento.html',
  './Capítulo 02 - A Base de Tudo - Variáveis e Dados Simples.html',
  './Capítulo 03 - Estruturas de Dados Essenciais.html',
  './Capítulo 04 - Dando Inteligência ao Código - Decisões e Loops.html',
  './Capítulo 05 - Manipulação de Dados com Pandas e GeoPandas.html',
  './Capítulo 06 - Do Endereço ao Mapa - Geocodificação com Geopy.html',
  './Capítulo 07 - Mapas Interativos com Python.html',
  './Capítulo 08 - Conectando com o Brasil - API do IBGE.html',
  './offline.html',
  './estilos.v2.css',
  './main.v2.js',
  './manifest.webmanifest',
  './imagens/logotipos/logo_IFSC.png',
  './imagens/logotipos/logo_DACC.jpg',
  './imagens/logotipos/Logo_Curso_Geoprocessamento.jpg',
  './imagens/logotipos/logo_Disciplina.png',
  './icons/icon.svg',
  './icons/icon-maskable.svg',
  './arquivos/Pontos.csv'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./offline.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === 'opaque'
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match('./offline.html'));
    })
  );
});
