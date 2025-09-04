import './index.css';
import { router } from './router';

function renderHome() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col bg-gray-50">
        <header class="bg-blue-700 text-white shadow-md">
          <nav class="container mx-auto flex justify-between items-center py-4 px-6">
            <div class="text-2xl font-bold">Transcendence</div>
            <ul class="flex gap-6">
              <li><a href="/" class="hover:underline" id="menu-home">Home</a></li>
              <li><a href="/profile" class="hover:underline" id="menu-profile">Profile</a></li>
            </ul>
          </nav>
        </header>
        <main class="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 class='text-3xl font-bold text-blue-600 mb-8'>Welcome to Transcendence</h1>
          <div class='w-full max-w-md'>
            <form id='signInForm' class='flex flex-col gap-2 p-6 bg-white border rounded shadow'>
              <h2 class='text-xl font-semibold mb-2 text-blue-700'>Sign In</h2>
              <input type='text' name='username' placeholder='Username' class='px-2 py-1 border rounded' required />
              <input type='password' name='password' placeholder='Password' class='px-2 py-1 border rounded' required />
              <button type='submit' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>Sign In</button>
            </form>
            <button id='go-register' class='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-full'>Register</button>
          </div>
          <button id='go-profile' class='mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>Go to Profile</button>
        </main>
        <footer class="bg-gray-800 text-gray-200 py-4 mt-8">
          <div class="container mx-auto text-center text-sm">&copy; 2025 Transcendence. All rights reserved.</div>
        </footer>
      </div>
    `;
  // Header menu navigation
  const menuProfile = document.getElementById('menu-profile');
  if (menuProfile) menuProfile.onclick = (e) => { e.preventDefault(); router.navigate('profile'); };
  const menuHome = document.getElementById('menu-home');
  if (menuHome) menuHome.onclick = (e) => { e.preventDefault(); router.navigate('/'); };
    const btn = document.getElementById('go-profile');
    if (btn) btn.onclick = () => router.navigate('profile');
    // Add basic submit handlers
    const signInForm = document.getElementById('signInForm');
    if (signInForm) signInForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(signInForm as HTMLFormElement);
      const username = formData.get('username');
      const password = formData.get('password');
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        document.cookie = `session=${data.token}; path=/;`;
        alert('Sign In successful!');
        router.navigate('/profile');
      } else {
        alert(data.error || 'Sign In failed.');
      }
    };
    const goRegister = document.getElementById('go-register');
    if (goRegister) goRegister.onclick = () => router.navigate('/register');
  }
}

function renderProfile() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col bg-gray-50">
        <header class="bg-blue-700 text-white shadow-md">
          <nav class="container mx-auto flex justify-between items-center py-4 px-6">
            <div class="text-2xl font-bold">Transcendence</div>
            <ul class="flex gap-6">
              <li><a href="/" class="hover:underline" id="menu-home">Home</a></li>
              <li><a href="/profile" class="hover:underline" id="menu-profile">Profile</a></li>
            </ul>
          </nav>
        </header>
        <main class="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 class='text-3xl font-bold text-green-600 mb-8'>Profile Page</h1>
          <button id='go-home' class='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'>Go to Home</button>
        </main>
        <footer class="bg-gray-800 text-gray-200 py-4 mt-8">
          <div class="container mx-auto text-center text-sm">&copy; 2025 Transcendence. All rights reserved.</div>
        </footer>
      </div>
    `;
  // Header menu navigation
  const menuHome = document.getElementById('menu-home');
  if (menuHome) menuHome.onclick = (e) => { e.preventDefault(); router.navigate('/'); };
  const menuProfile = document.getElementById('menu-profile');
  if (menuProfile) menuProfile.onclick = (e) => { e.preventDefault(); router.navigate('profile'); };
    const btn = document.getElementById('go-home');
    if (btn) btn.onclick = () => router.navigate('/');
  }
}

function renderRegister() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col bg-gray-50">
        <header class="bg-blue-700 text-white shadow-md">
          <nav class="container mx-auto flex justify-between items-center py-4 px-6">
            <div class="text-2xl font-bold">Transcendence</div>
            <ul class="flex gap-6">
              <li><a href="/" class="hover:underline" id="menu-home">Home</a></li>
              <li><a href="/profile" class="hover:underline" id="menu-profile">Profile</a></li>
            </ul>
          </nav>
        </header>
        <main class="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 class='text-3xl font-bold text-green-600 mb-8'>Register</h1>
          <form id='registerForm' class='flex flex-col gap-2 p-6 bg-white border rounded shadow w-full max-w-md'>
            <input type='text' name='username' placeholder='Username' class='px-2 py-1 border rounded' required />
            <input type='password' name='password' placeholder='Password' class='px-2 py-1 border rounded' required />
            <button type='submit' class='mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'>Register</button>
          </form>
        </main>
        <footer class="bg-gray-800 text-gray-200 py-4 mt-8">
          <div class="container mx-auto text-center text-sm">&copy; 2025 Transcendence. All rights reserved.</div>
        </footer>
      </div>
    `;
    // Header menu navigation
    const menuHome = document.getElementById('menu-home');
    if (menuHome) menuHome.onclick = (e) => { e.preventDefault(); router.navigate('/'); };
    const menuProfile = document.getElementById('menu-profile');
    if (menuProfile) menuProfile.onclick = (e) => { e.preventDefault(); router.navigate('/profile'); };
    // Registration form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm as HTMLFormElement);
      const username = formData.get('username');
      const password = formData.get('password');
      const displayName = username;
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, displayName })
      });
      const data = await res.json();
      if (data.success && data.token) {
        document.cookie = `session=${data.token}; path=/;`;
        alert('Registration successful!');
        router.navigate('/profile');
      } else {
        alert(data.error || 'Registration failed.');
      }
    };
  }
}

router.add('/', renderHome);
router.add('/profile', renderProfile);
router.add('/register', renderRegister);
router.resolve();
