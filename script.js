// Change this to your actual Render backend URL after deployment:
const API_URL = 'wss://tradebackend-duyo.onrender.com';

async function signup() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showError('Please fill out both fields.');
    return;
  }

  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    // Auto-login after signup
    login();
  } else {
    showError(data.message || 'Signup failed');
  }
}

async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showError('Please enter both username and password.');
    return;
  }

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    // Store session info locally
    localStorage.setItem('username', data.username);
    localStorage.setItem('currency', data.currency);
    // Redirect to hub
    window.location.href = 'hub.html';
  } else {
    showError(data.message || 'Login failed');
  }
}

function showError(msg) {
  document.getElementById('error').innerText = msg;
}
