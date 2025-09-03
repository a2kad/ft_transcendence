import './index.css';
import { router } from './router';

function renderHome() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `<h1 class='text-3xl font-bold text-blue-600'>Home Page</h1>
      <button id='go-profile' class='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>Go to Profile</button>`;
    const btn = document.getElementById('go-profile');
    if (btn) btn.onclick = () => router.navigate('profile');
  }
}

function renderProfile() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `<h1 class='text-3xl font-bold text-green-600'>Profile Page</h1>
      <button id='go-home' class='mt-4 px-4 py-2 bg-green-500 text-white rounded'>Go to Home</button>`;
    const btn = document.getElementById('go-home');
    if (btn) btn.onclick = () => router.navigate('/');
  }
}

router.add('/', renderHome);
router.add('profile', renderProfile);
router.resolve();
