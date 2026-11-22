// ==========================================
// JAVASCRIPT PORTOFOLIO
// DWIPUTRA JAUHAR ALFIAN
// ==========================================


// ==========================================
// 1. DAFTAR KEAHLIAN DARI FILE JSON
// ==========================================

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  if (!daftarSkill) return;

  daftarSkill.innerHTML = "<li>Memuat keahlian...</li>";

  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data keahlian.");
    }

    const skills = await response.json();

    daftarSkill.innerHTML = "";

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    if (jumlahSkill) {
      jumlahSkill.textContent =
        `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    }

  } catch (error) {
    console.error(error);
    daftarSkill.innerHTML = "<li>Keahlian gagal dimuat.</li>";

    if (jumlahSkill) {
      jumlahSkill.textContent =
        "Data keahlian tidak dapat ditampilkan.";
    }
  }
}

muatKeahlian();


// ==========================================
// 2. MODE GELAP
// ==========================================

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
    } else {
      tombolTema.textContent = "Mode Gelap";
    }
  });
}


// ==========================================
// 3. PENGHITUNG KARAKTER PESAN
// ==========================================

const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent =
      `${kotakPesan.value.length}/300 karakter`;
  });
}


// ==========================================
// 4. DAFTAR PROYEK DAN FILTER DARI JSON
// ==========================================

let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;

  const semuaKartu = daftar.map((item) => buatKartu(item));

  daftarProyek.innerHTML = semuaKartu.join("");

  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {
    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(
        proyek.filter((item) => item.kategori === kategori)
      );
    }
  });
}

async function muatProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  daftarProyek.innerHTML = "<p>Memuat proyek...</p>";

  try {
    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data proyek.");
    }

    proyek = await response.json();

    tampilkanProyek(proyek);

    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-HTML", "HTML");
    pasangFilter("#filter-CSS", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");

  } catch (error) {
    console.error(error);

    daftarProyek.innerHTML =
      "<p>Data proyek gagal dimuat.</p>";

    jumlahProyek.textContent =
      "Tidak dapat menampilkan proyek.";
  }
}

muatProyek();


// ==========================================
// 5. GITHUB API DENGAN ASYNC/AWAIT
// ==========================================

async function ambilRepo() {
  const daftarRepo = document.querySelector("#daftar-repo-github");
  const statusRepo = document.querySelector("#status-repo-github");

  if (!daftarRepo || !statusRepo) return;

  statusRepo.textContent = "Memuat repositori GitHub...";
  daftarRepo.innerHTML = "";

  try {
    const response = await fetch(
      "https://api.github.com/users/dpjkn-05/repos?sort=updated&per_page=100"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data repositori.");
    }

    const repositori = await response.json();

    if (repositori.length === 0) {
      statusRepo.textContent = "Belum ada repositori publik.";
      return;
    }

    daftarRepo.innerHTML = repositori.map((repo) => `
      <article class="kartu">
        <span class="label">${repo.language || "Repository"}</span>
        <h3>${repo.name}</h3>
        <p>${repo.description || "Belum ada deskripsi."}</p>
        <p>Bintang: ${repo.stargazers_count}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          Lihat repositori di GitHub
        </a>
      </article>
    `).join("");

    statusRepo.textContent =
      `Berhasil memuat ${repositori.length} repositori GitHub.`;

  } catch (error) {
    console.error(error);
    statusRepo.textContent =
      "Repositori gagal dimuat. Periksa koneksi internet.";
  }
}

ambilRepo();


// ==========================================
// 6. MENU RESPONSIVE PONSEL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const tombolMenu = document.querySelector("#tombol-menu");
  const daftarMenu = document.querySelector("#daftar-menu-ponsel");

  // Pastikan elemen menu tersedia
  if (!tombolMenu || !daftarMenu) return;

  // Fungsi menutup menu
  function tutupMenu() {
    daftarMenu.hidden = true;

    tombolMenu.setAttribute(
      "aria-expanded",
      "false"
    );

    tombolMenu.textContent = "☰ Menu";
  }

  // Fungsi membuka menu
  function bukaMenu() {
    daftarMenu.hidden = false;

    tombolMenu.setAttribute(
      "aria-expanded",
      "true"
    );

    tombolMenu.textContent = "✕ Tutup Menu";
  }

  // Klik tombol menu
  tombolMenu.addEventListener("click", (event) => {

    event.stopPropagation();

    const menuTerbuka =
      tombolMenu.getAttribute("aria-expanded") === "true";

    if (menuTerbuka) {
      tutupMenu();
    } else {
      bukaMenu();
    }

  });

  // Klik tautan menu
  daftarMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      tutupMenu();
    });

  });

  // Klik di luar menu
  document.addEventListener("click", (event) => {

    const klikDiTombol =
      tombolMenu.contains(event.target);

    const klikDiMenu =
      daftarMenu.contains(event.target);

    if (!klikDiTombol && !klikDiMenu) {
      tutupMenu();
    }

  });

  // Tutup dengan tombol Escape
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      tutupMenu();
    }

  });

  // Tutup ketika layar berubah ke laptop
  window.addEventListener("resize", () => {

    if (window.innerWidth >= 768) {
      tutupMenu();
    }

  });

  // Kondisi awal menu tertutup
  tutupMenu();

});