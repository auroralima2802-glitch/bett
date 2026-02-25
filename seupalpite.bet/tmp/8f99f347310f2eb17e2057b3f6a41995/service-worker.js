import {setCacheNameDetails as workbox_core_setCacheNameDetails} from '/var/www/bu_online/node_modules/workbox-core/setCacheNameDetails.mjs';
import {precacheAndRoute as workbox_precaching_precacheAndRoute} from '/var/www/bu_online/node_modules/workbox-precaching/precacheAndRoute.mjs';/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */





workbox_core_setCacheNameDetails({prefix: "jb-web-app"});


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});




/**
 * The precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox_precaching_precacheAndRoute([
  {
    "url": "/.well-known/assetlinks.json",
    "revision": "8ea5e1a806c952b9cf435ce5db3a4648"
  },
  {
    "url": "/VueQrcodeReader.umd.min.js",
    "revision": "8dfaac19b4f1bef33c817df792c14d91"
  },
  {
    "url": "/css/134.00ef8583.css",
    "revision": null
  },
  {
    "url": "/css/176.97bdb357.css",
    "revision": null
  },
  {
    "url": "/css/182.754be023.css",
    "revision": null
  },
  {
    "url": "/css/191.752fcc66.css",
    "revision": null
  },
  {
    "url": "/css/24.2a18b82f.css",
    "revision": null
  },
  {
    "url": "/css/250.a3ec0264.css",
    "revision": null
  },
  {
    "url": "/css/26.c7b8cbaa.css",
    "revision": null
  },
  {
    "url": "/css/275.dff84213.css",
    "revision": null
  },
  {
    "url": "/css/298.7e6514d0.css",
    "revision": null
  },
  {
    "url": "/css/300.51164307.css",
    "revision": null
  },
  {
    "url": "/css/304.a5ae2c63.css",
    "revision": null
  },
  {
    "url": "/css/310.fdb02e3f.css",
    "revision": null
  },
  {
    "url": "/css/322.7cd14aca.css",
    "revision": null
  },
  {
    "url": "/css/332.677ae193.css",
    "revision": null
  },
  {
    "url": "/css/367.395ec040.css",
    "revision": null
  },
  {
    "url": "/css/393.8437bd2b.css",
    "revision": null
  },
  {
    "url": "/css/41.09360458.css",
    "revision": null
  },
  {
    "url": "/css/410.04d158ea.css",
    "revision": null
  },
  {
    "url": "/css/438.7401d70c.css",
    "revision": null
  },
  {
    "url": "/css/535.0a606fa6.css",
    "revision": null
  },
  {
    "url": "/css/536.6cd3af18.css",
    "revision": null
  },
  {
    "url": "/css/550.1915b71d.css",
    "revision": null
  },
  {
    "url": "/css/566.8f9c0df4.css",
    "revision": null
  },
  {
    "url": "/css/6.af3944c9.css",
    "revision": null
  },
  {
    "url": "/css/601.cdaa7d83.css",
    "revision": null
  },
  {
    "url": "/css/629.20a2109f.css",
    "revision": null
  },
  {
    "url": "/css/64.8a386ae3.css",
    "revision": null
  },
  {
    "url": "/css/663.7e914b4f.css",
    "revision": null
  },
  {
    "url": "/css/688.549b6fbe.css",
    "revision": null
  },
  {
    "url": "/css/778.d3247fa4.css",
    "revision": null
  },
  {
    "url": "/css/789.840d9152.css",
    "revision": null
  },
  {
    "url": "/css/796.4e525a36.css",
    "revision": null
  },
  {
    "url": "/css/826.987454f8.css",
    "revision": null
  },
  {
    "url": "/css/848.e9f2bff1.css",
    "revision": null
  },
  {
    "url": "/css/863.ca5d75d1.css",
    "revision": null
  },
  {
    "url": "/css/884.8a9150ce.css",
    "revision": null
  },
  {
    "url": "/css/888.f050ece5.css",
    "revision": null
  },
  {
    "url": "/css/942.39dcb773.css",
    "revision": null
  },
  {
    "url": "/css/948.1705ffb5.css",
    "revision": null
  },
  {
    "url": "/css/952.9f84cc73.css",
    "revision": null
  },
  {
    "url": "/css/960.8974ad1b.css",
    "revision": null
  },
  {
    "url": "/css/981.5d4c7b64.css",
    "revision": null
  },
  {
    "url": "/css/987.214ec405.css",
    "revision": null
  },
  {
    "url": "/css/996.b9ecbeda.css",
    "revision": null
  },
  {
    "url": "/css/app.af2dfca5.css",
    "revision": null
  },
  {
    "url": "/css/chunk-vendors.26d5b9d9.css",
    "revision": null
  },
  {
    "url": "/fontawesome/css/all.css",
    "revision": "062584886c1b962f3e3b79f3c1e435de"
  },
  {
    "url": "/fontawesome/css/all.min.css",
    "revision": "5c7e27dec58a9845cfcdc4c16f6673de"
  },
  {
    "url": "/fontawesome/css/fontawesome.min.css",
    "revision": "4d2a7af0cb4dff3fef59a2208cdba29b"
  },
  {
    "url": "/fontawesome/webfonts/fa-brands-400.ttf",
    "revision": "d661a131af20271e35f64eb9cefe5496"
  },
  {
    "url": "/fontawesome/webfonts/fa-brands-400.woff",
    "revision": "cf6b43998affe1b2595c1a63ee0601b0"
  },
  {
    "url": "/fontawesome/webfonts/fa-brands-400.woff2",
    "revision": "04f411f3f6c5167d09e9d398db65d3e1"
  },
  {
    "url": "/fontawesome/webfonts/fa-duotone-900.ttf",
    "revision": "a1a0dd3f7860352537107fda9eb29162"
  },
  {
    "url": "/fontawesome/webfonts/fa-duotone-900.woff",
    "revision": "4e32c890deab499d76c66b1ff0c0855f"
  },
  {
    "url": "/fontawesome/webfonts/fa-duotone-900.woff2",
    "revision": "7d1f87704f3a6fbb4b6199ee9e6d05b3"
  },
  {
    "url": "/fontawesome/webfonts/fa-light-300.ttf",
    "revision": "65099b38c4d8507690627608c9617ff6"
  },
  {
    "url": "/fontawesome/webfonts/fa-light-300.woff",
    "revision": "e7447ad6a02a8fb0dfa777b45e84dd41"
  },
  {
    "url": "/fontawesome/webfonts/fa-light-300.woff2",
    "revision": "462b09925c9e0d39ead29d072b12615d"
  },
  {
    "url": "/fontawesome/webfonts/fa-regular-400.ttf",
    "revision": "e7dd4ec40a4c6a928b753ba9b7f44709"
  },
  {
    "url": "/fontawesome/webfonts/fa-regular-400.woff",
    "revision": "121c9d6df06ce74e86b159342970b30a"
  },
  {
    "url": "/fontawesome/webfonts/fa-regular-400.woff2",
    "revision": "5b2dad1f9126a770b3a1a64056043c08"
  },
  {
    "url": "/fontawesome/webfonts/fa-solid-900.ttf",
    "revision": "0515d0c4ac818515cf73e3f429bbb921"
  },
  {
    "url": "/fontawesome/webfonts/fa-solid-900.woff",
    "revision": "ec05f713ec37819a3ecc516c862e3b23"
  },
  {
    "url": "/fontawesome/webfonts/fa-solid-900.woff2",
    "revision": "27437db6b41f3f3e3884c9a964839bf5"
  },
  {
    "url": "/fontawesome/webfonts/fa-thin-100.ttf",
    "revision": "7459a124fef2ce0f1f26d4b5ee80839b"
  },
  {
    "url": "/fontawesome/webfonts/fa-thin-100.woff",
    "revision": "284e02b328e985f9cc9d1c165b61dcce"
  },
  {
    "url": "/fontawesome/webfonts/fa-thin-100.woff2",
    "revision": "f17c0551e90de6423e55489eefde0cee"
  },
  {
    "url": "/fonts/primeicons.29151a74.woff",
    "revision": null
  },
  {
    "url": "/fonts/primeicons.5f5d08cd.ttf",
    "revision": null
  },
  {
    "url": "/fonts/primeicons.964f445f.eot",
    "revision": null
  },
  {
    "url": "/img/app-background.16fa2d29.png",
    "revision": null
  },
  {
    "url": "/img/app-background2.2b0d08bd.png",
    "revision": null
  },
  {
    "url": "/img/bank-transfer.25c61304.svg",
    "revision": null
  },
  {
    "url": "/img/bau-icon.a6977573.png",
    "revision": null
  },
  {
    "url": "/img/bauzinho-card.c7593fa1.png",
    "revision": null
  },
  {
    "url": "/img/bear-color.0944734a.png",
    "revision": null
  },
  {
    "url": "/img/bear-cover.09a94d92.jpg",
    "revision": null
  },
  {
    "url": "/img/bolaoDezenas-card.4c3dbd1e.png",
    "revision": null
  },
  {
    "url": "/img/bolaoDezenas-icon.5fafaa0d.png",
    "revision": null
  },
  {
    "url": "/img/boleto-bancario.e86b02cc.svg",
    "revision": null
  },
  {
    "url": "/img/bull-color.656f3271.png",
    "revision": null
  },
  {
    "url": "/img/bull-cover.fe3adff8.jpg",
    "revision": null
  },
  {
    "url": "/img/butterfly-color.961de7a8.png",
    "revision": null
  },
  {
    "url": "/img/butterfly-cover.5ed0386d.jpg",
    "revision": null
  },
  {
    "url": "/img/camel-color.d495ae0c.png",
    "revision": null
  },
  {
    "url": "/img/camel-cover.b05ed769.jpg",
    "revision": null
  },
  {
    "url": "/img/cat-color.8cc01eaa.png",
    "revision": null
  },
  {
    "url": "/img/cat-cover.65a4f22a.jpg",
    "revision": null
  },
  {
    "url": "/img/cobra-color.c087aaaa.png",
    "revision": null
  },
  {
    "url": "/img/cobra-cover.f90f81b7.jpg",
    "revision": null
  },
  {
    "url": "/img/color.dae87a04.png",
    "revision": null
  },
  {
    "url": "/img/cow-color.2d57765c.png",
    "revision": null
  },
  {
    "url": "/img/cow-cover.368aa935.jpg",
    "revision": null
  },
  {
    "url": "/img/crocodile-color.7402da47.png",
    "revision": null
  },
  {
    "url": "/img/crocodile-cover.f3d076bc.jpg",
    "revision": null
  },
  {
    "url": "/img/deer-color.ad0eab7f.png",
    "revision": null
  },
  {
    "url": "/img/deer-cover.b372a842.jpg",
    "revision": null
  },
  {
    "url": "/img/dia-de-sorte.bded2813.png",
    "revision": null
  },
  {
    "url": "/img/dog-color.ca51d46b.png",
    "revision": null
  },
  {
    "url": "/img/dog-cover.2dfdf6f0.jpg",
    "revision": null
  },
  {
    "url": "/img/donkey-color.2f2f9f9b.png",
    "revision": null
  },
  {
    "url": "/img/donkey-cover.cd09aa3c.jpg",
    "revision": null
  },
  {
    "url": "/img/eagle-color.131b0971.png",
    "revision": null
  },
  {
    "url": "/img/eagle-cover.c26fc44f.jpg",
    "revision": null
  },
  {
    "url": "/img/elephant-color.63d7c158.png",
    "revision": null
  },
  {
    "url": "/img/elephant-cover.80420216.jpg",
    "revision": null
  },
  {
    "url": "/img/galo-color.3757a1ab.png",
    "revision": null
  },
  {
    "url": "/img/galo-cover.f1401ef7.jpg",
    "revision": null
  },
  {
    "url": "/img/goat-color.f7e27870.png",
    "revision": null
  },
  {
    "url": "/img/goat-cover.fa2d5313.jpg",
    "revision": null
  },
  {
    "url": "/img/horse-color.4ee17d64.png",
    "revision": null
  },
  {
    "url": "/img/horse-cover.f61ae036.jpg",
    "revision": null
  },
  {
    "url": "/img/hot-icon.b88eac96.svg",
    "revision": null
  },
  {
    "url": "/img/instantaneo-card.792c1e9e.png",
    "revision": null
  },
  {
    "url": "/img/instantaneo-icon.3f4f2f15.png",
    "revision": null
  },
  {
    "url": "/img/ligeirinha-card.98211242.png",
    "revision": null
  },
  {
    "url": "/img/ligeirinha-icon.b4bbd685.png",
    "revision": null
  },
  {
    "url": "/img/lion-color.f13b7f55.png",
    "revision": null
  },
  {
    "url": "/img/lion-cover.0ae5046e.png",
    "revision": null
  },
  {
    "url": "/img/logo-2.png",
    "revision": "0079e4d834fb0ef7d1ace798a7607e15"
  },
  {
    "url": "/img/logo-brasao.d60e418d.png",
    "revision": null
  },
  {
    "url": "/img/logo-brasao.png",
    "revision": "0ca3af2d7d0c213a016f7f6eaf89640b"
  },
  {
    "url": "/img/logo-dia-de-sorte-em-png.82393325.png",
    "revision": null
  },
  {
    "url": "/img/logo-leao.png",
    "revision": "5090c3c9b3a2cc0f22a059cb1c29a625"
  },
  {
    "url": "/img/logo-lotofacil-em-png.1252e47c.png",
    "revision": null
  },
  {
    "url": "/img/logo-lotomania-em-png.928473b6.png",
    "revision": null
  },
  {
    "url": "/img/logo-mega-sena-em-png.8dcf832e.png",
    "revision": null
  },
  {
    "url": "/img/logo-no-background.png",
    "revision": "c340149928da3bef42e4780e08cb3c3e"
  },
  {
    "url": "/img/logo-quina-em-png.da983cc5.png",
    "revision": null
  },
  {
    "url": "/img/logo-white.png",
    "revision": "38b708c4c7f8726983c5e6461aee7029"
  },
  {
    "url": "/img/logo.png",
    "revision": "685e7c559a4547a10b834e146a914cd7"
  },
  {
    "url": "/img/logo_color.cc68bf8c.svg",
    "revision": null
  },
  {
    "url": "/img/logo_small-bu.b763893d.png",
    "revision": null
  },
  {
    "url": "/img/logonatal-sp.svg",
    "revision": "7e1a9fdf2b9f62531d2bc4d2095adfb8"
  },
  {
    "url": "/img/lotofacil-png-1.ffdd6b3e.png",
    "revision": null
  },
  {
    "url": "/img/lotomania-png.ec6024f0.png",
    "revision": null
  },
  {
    "url": "/img/lotteries-icon.e2068be9.svg",
    "revision": null
  },
  {
    "url": "/img/lt-card.04bdf2ff.png",
    "revision": null
  },
  {
    "url": "/img/lt-icon.04b6aa1a.png",
    "revision": null
  },
  {
    "url": "/img/lt.b7be0b74.png",
    "revision": null
  },
  {
    "url": "/img/mega-sena-png.15419815.png",
    "revision": null
  },
  {
    "url": "/img/monkey-color.f1b4836b.png",
    "revision": null
  },
  {
    "url": "/img/monkey-cover.184f04e5.jpg",
    "revision": null
  },
  {
    "url": "/img/ostrich-color.4ebba472.png",
    "revision": null
  },
  {
    "url": "/img/ostrich-cover.29c5714b.jpg",
    "revision": null
  },
  {
    "url": "/img/password.cca68f78.svg",
    "revision": null
  },
  {
    "url": "/img/peacock-color.6d12243d.png",
    "revision": null
  },
  {
    "url": "/img/peacock-cover.7ec5d887.jpg",
    "revision": null
  },
  {
    "url": "/img/pig-color.873111fc.png",
    "revision": null
  },
  {
    "url": "/img/pig-cover.b6af662a.jpg",
    "revision": null
  },
  {
    "url": "/img/pix.5ef6f125.svg",
    "revision": null
  },
  {
    "url": "/img/primeicons.76044b1c.svg",
    "revision": null
  },
  {
    "url": "/img/products-icon.7191562d.svg",
    "revision": null
  },
  {
    "url": "/img/quina.8753cf01.png",
    "revision": null
  },
  {
    "url": "/img/quinabrasil-card.f5f65b6b.png",
    "revision": null
  },
  {
    "url": "/img/quinabrasil-icon.9417e9c4.png",
    "revision": null
  },
  {
    "url": "/img/quininha-card.8e529b0b.png",
    "revision": null
  },
  {
    "url": "/img/quininha-icon.c83db87e.png",
    "revision": null
  },
  {
    "url": "/img/rabbit-color.30e03914.png",
    "revision": null
  },
  {
    "url": "/img/rabbit-cover.4be57164.jpg",
    "revision": null
  },
  {
    "url": "/img/ram-color.952ddb52.png",
    "revision": null
  },
  {
    "url": "/img/ram-cover.136d88d9.jpg",
    "revision": null
  },
  {
    "url": "/img/seninha-card.7e9fdd86.png",
    "revision": null
  },
  {
    "url": "/img/ticket.a7a47c40.png",
    "revision": null
  },
  {
    "url": "/img/tiger-color.a8ef4d17.png",
    "revision": null
  },
  {
    "url": "/img/tiger-cover.2d17cb78.jpg",
    "revision": null
  },
  {
    "url": "/img/tradicional-card.4de5f968.png",
    "revision": null
  },
  {
    "url": "/img/tradicional-icon.8792d98d.png",
    "revision": null
  },
  {
    "url": "/img/tradicional2-card.8cdc435f.png",
    "revision": null
  },
  {
    "url": "/img/trevo.33c3d19f.png",
    "revision": null
  },
  {
    "url": "/img/turkey-color.56b082ff.png",
    "revision": null
  },
  {
    "url": "/img/turkey-cover.879f317a.jpg",
    "revision": null
  },
  {
    "url": "/img/wealth-1.1s-200px.0b8090e0.png",
    "revision": null
  },
  {
    "url": "/index.html",
    "revision": "6f01f5ddc443faff54bb0b612bfaadca"
  },
  {
    "url": "/js/134.f0d39b9f.js",
    "revision": null
  },
  {
    "url": "/js/176.e0fc2e73.js",
    "revision": null
  },
  {
    "url": "/js/182.dd8234f7.js",
    "revision": null
  },
  {
    "url": "/js/191.6ad48e88.js",
    "revision": null
  },
  {
    "url": "/js/24.f06761a0.js",
    "revision": null
  },
  {
    "url": "/js/250.f3711d86.js",
    "revision": null
  },
  {
    "url": "/js/26.778174d6.js",
    "revision": null
  },
  {
    "url": "/js/275.24ecd1ba.js",
    "revision": null
  },
  {
    "url": "/js/298.d1564ff7.js",
    "revision": null
  },
  {
    "url": "/js/300.a52ecac4.js",
    "revision": null
  },
  {
    "url": "/js/304.518fdda5.js",
    "revision": null
  },
  {
    "url": "/js/310.195f7c94.js",
    "revision": null
  },
  {
    "url": "/js/322.7dc8c8c0.js",
    "revision": null
  },
  {
    "url": "/js/332.c9900409.js",
    "revision": null
  },
  {
    "url": "/js/367.b66acced.js",
    "revision": null
  },
  {
    "url": "/js/376.50cd40ec.js",
    "revision": null
  },
  {
    "url": "/js/393.125007fa.js",
    "revision": null
  },
  {
    "url": "/js/41.5176ef3e.js",
    "revision": null
  },
  {
    "url": "/js/410.8f0f542a.js",
    "revision": null
  },
  {
    "url": "/js/438.f932077e.js",
    "revision": null
  },
  {
    "url": "/js/535.3d81a748.js",
    "revision": null
  },
  {
    "url": "/js/536.3956e3b9.js",
    "revision": null
  },
  {
    "url": "/js/550.d736a6c0.js",
    "revision": null
  },
  {
    "url": "/js/563.77bbfa08.js",
    "revision": null
  },
  {
    "url": "/js/566.ebfee48b.js",
    "revision": null
  },
  {
    "url": "/js/583.d091c7dd.js",
    "revision": null
  },
  {
    "url": "/js/6.e04d8180.js",
    "revision": null
  },
  {
    "url": "/js/601.53a63479.js",
    "revision": null
  },
  {
    "url": "/js/629.49811839.js",
    "revision": null
  },
  {
    "url": "/js/64.c9f5fa92.js",
    "revision": null
  },
  {
    "url": "/js/663.43840098.js",
    "revision": null
  },
  {
    "url": "/js/688.6ca1de6f.js",
    "revision": null
  },
  {
    "url": "/js/778.5e205419.js",
    "revision": null
  },
  {
    "url": "/js/789.52103462.js",
    "revision": null
  },
  {
    "url": "/js/796.45347c1b.js",
    "revision": null
  },
  {
    "url": "/js/806.75719597.js",
    "revision": null
  },
  {
    "url": "/js/826.09aefb9d.js",
    "revision": null
  },
  {
    "url": "/js/848.293d0817.js",
    "revision": null
  },
  {
    "url": "/js/863.9b989a06.js",
    "revision": null
  },
  {
    "url": "/js/884.22689846.js",
    "revision": null
  },
  {
    "url": "/js/888.b7d475f3.js",
    "revision": null
  },
  {
    "url": "/js/942.00d8eeb9.js",
    "revision": null
  },
  {
    "url": "/js/948.7d0b0b71.js",
    "revision": null
  },
  {
    "url": "/js/952.139852d1.js",
    "revision": null
  },
  {
    "url": "/js/960.41c9e997.js",
    "revision": null
  },
  {
    "url": "/js/981.502e3272.js",
    "revision": null
  },
  {
    "url": "/js/987.21cda7df.js",
    "revision": null
  },
  {
    "url": "/js/996.bff26841.js",
    "revision": null
  },
  {
    "url": "/js/app.491e80fa.js",
    "revision": null
  },
  {
    "url": "/js/chunk-vendors.9ab928cc.js",
    "revision": null
  },
  {
    "url": "/manifest.json",
    "revision": "41ad44f31c9163b142729fba93d322e0"
  },
  {
    "url": "/robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  },
  {
    "url": "/seubicho.ico",
    "revision": "6b2c3f90fef8461dc0f5fdaaf96e24c6"
  },
  {
    "url": "/seupalpite.ico",
    "revision": "a0a8efc460e8a3a828c31de71ef8f560"
  },
  {
    "url": "/uniaoweb.apk",
    "revision": "4b4fd27b91cc4dcaa70c86abe231731c"
  }
], {});








