import './index.css';
import { router } from './router';

function renderHome() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <h1 class='text-3xl font-bold text-blue-600'>Home Page</h1>
      <div class='mt-6 flex gap-8'>
        <form id='signInForm' class='flex flex-col gap-2 p-4 border rounded w-64'>
          <h2 class='text-xl font-semibold mb-2'>Sign In</h2>
          <input type='text' name='username' placeholder='Username' class='px-2 py-1 border rounded' required />
          <input type='password' name='password' placeholder='Password' class='px-2 py-1 border rounded' required />
          <button type='submit' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>Sign In</button>
        </form>
        <form id='signUpForm' class='flex flex-col gap-2 p-4 border rounded w-64'>
          <h2 class='text-xl font-semibold mb-2'>Sign Up</h2>
          <input type='text' name='username' placeholder='Username' class='px-2 py-1 border rounded' required />
          <input type='password' name='password' placeholder='Password' class='px-2 py-1 border rounded' required />
          <button type='submit' class='mt-2 px-4 py-2 bg-green-500 text-white rounded'>Sign Up</button>
        </form>
      </div>
      <button id='go-profile' class='mt-8 px-4 py-2 bg-blue-500 text-white rounded'>Go to Profile</button>
    `;
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
      if (data.success) {
        alert('Sign In successful!');
      } else {
        alert(data.error || 'Sign In failed.');
      }
    };
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) signUpForm.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(signUpForm as HTMLFormElement);
      const username = formData.get('username');
      const password = formData.get('password');
      // For demo, use username as displayName
      const displayName = username;
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, displayName })
      });
      const data = await res.json();
      if (data.success) {
        alert('Sign Up successful!');
      } else {
        alert(data.error || 'Sign Up failed.');
      }
    };
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
