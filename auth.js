const SUPABASE_URL = "https://uaroatxgccylreefilyu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcm9hdHhnY2N5bHJlZWZpbHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODc2NTAsImV4cCI6MjA2OTg2MzY1MH0.sQ0v1xhSbrywY3V334lnuI7NpUDFDMOnwoepZypQ12c";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    document.getElementById('auth-msg').innerText = "Login gagal: " + error.message;
  } else {
    window.location.href = "dashboard.html";
  }
}

async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    document.getElementById('auth-msg').innerText = "Registrasi gagal: " + error.message;
  } else {
    document.getElementById('auth-msg').innerText = "Berhasil daftar! Silakan login.";
  }
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}