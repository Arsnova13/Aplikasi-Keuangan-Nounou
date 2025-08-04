
async function cekLogin() {
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) {
    window.location.href = "login.html";
  } else {
    tampilkanTransaksi();
  }
}

async function tambahTransaksi() {
  const nama = document.getElementById('nama').value;
  const jumlah = parseInt(document.getElementById('jumlah').value);
  const user = await supabase.auth.getUser();
  const { error } = await supabase
    .from('transaksi')
    .insert([{ nama, jumlah, user_id: user.data.user.id }]);
  if (!error) {
    tampilkanTransaksi();
  }
}

async function tampilkanTransaksi() {
  const container = document.getElementById('transaksi-container');
  const grafik = document.getElementById('grafik').getContext('2d');
  const roleBox = document.getElementById('user-role');
  const user = await supabase.auth.getUser();

  let { data: user_data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.data.user.id)
    .single();

  roleBox.innerText = `Login sebagai: ${user_data?.role || 'user'}`;

  let query = supabase.from('transaksi').select("*");
  if (user_data?.role !== "admin") {
    query = query.eq('user_id', user.data.user.id);
  }
  const { data, error } = await query;

  container.innerHTML = '';
  const chartData = {
    labels: data.map(t => t.nama),
    datasets: [{
      label: 'Jumlah (Rp)',
      data: data.map(t => t.jumlah),
      backgroundColor: '#3498db'
    }]
  };

  data.forEach(t => {
    container.innerHTML += `<p>${t.nama} - Rp ${t.jumlah}</p>`;
  });

  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(grafik, {{
    type: 'bar',
    data: chartData,
    options: {{
      responsive: true
    }}
  }});
}

cekLogin();