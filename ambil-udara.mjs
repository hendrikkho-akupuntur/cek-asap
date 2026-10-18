// Mengambil data kualitas udara dari Open-Meteo (CAMS) dan menyimpannya ke udara.json
// Dijalankan otomatis tiap jam oleh GitHub Actions (lihat update-udara.yml).
const AQ_CITIES = [
  {n:'Medan', lat:3.5952, lon:98.6722, g:'id'},
  {n:'Banda Aceh', lat:5.5483, lon:95.3238, g:'id'},
  {n:'Padang', lat:-0.9471, lon:100.4172, g:'id'},
  {n:'Pekanbaru', lat:0.5071, lon:101.4478, g:'id'},
  {n:'Jambi', lat:-1.6101, lon:103.6131, g:'id'},
  {n:'Bengkulu', lat:-3.8004, lon:102.2655, g:'id'},
  {n:'Palembang', lat:-2.9761, lon:104.7754, g:'id'},
  {n:'Pontianak', lat:-0.0263, lon:109.3425, g:'id'},
  {n:'Palangka Raya', lat:-2.2161, lon:113.9135, g:'id'},
  {n:'Banjarmasin', lat:-3.3194, lon:114.5908, g:'id'},
  {n:'Samarinda', lat:-0.5022, lon:117.1536, g:'id'},
  {n:'Jakarta', lat:-6.2088, lon:106.8456, g:'id'},
  {n:'Kuala Lumpur', lat:3.1390, lon:101.6869, g:'nb', c:'Malaysia'},
  {n:'Kuching', lat:1.5535, lon:110.3593, g:'nb', c:'Malaysia'},
  {n:'Singapura', lat:1.3521, lon:103.8198, g:'nb', c:'Singapura'},
  {n:'Bandar Seri Begawan', lat:4.9031, lon:114.9398, g:'nb', c:'Brunei'},
  {n:'Dili', lat:-8.5569, lon:125.5603, g:'nb', c:'Timor-Leste'}
];

const url = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=' + AQ_CITIES.map(c => c.lat).join(',') + '&longitude=' + AQ_CITIES.map(c => c.lon).join(',') + '&current=us_aqi,pm2_5';

const res = await fetch(url);
if (!res.ok) throw new Error('Open-Meteo HTTP ' + res.status);
let data = await res.json();
if (!Array.isArray(data)) data = [data];
if (data.length !== AQ_CITIES.length || !data[0] || !data[0].current) throw new Error('Data tidak lengkap');

import { writeFileSync } from 'node:fs';
writeFileSync('udara.json', JSON.stringify({fetched: new Date().toISOString(), cities: AQ_CITIES, data}));
console.log('OK', new Date().toISOString());
