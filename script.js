// Data guru berdasarkan mata pelajaran
const teacherData = {
  IPAS: "DWI WAHYUNING MAR-ATUSH SHALIHAH, S.Pd",
  BINA: "SRI HARTUTIK, S.Pd",
  Informatika: "IWAN MAJID, S.Pd",
  "Penjas Orkes": "PRIYA DANA NGINDA FADLI, S.Pd",
  DDP2: "JOKO PURWONO, A, S.Pd",
  PPKN: "NOVIA ARDHANA DARMANINGTYAS, S.Pd",
  "Seni Budaya": "AHMAD RIZAL ANSORI, S.Pd",
  "Bahasa Jawa": "M. ALWI ADAM ARIFIN, S.Pd",
  DDP3: "VIKI MARTA TIFANI, S.Pd",
  "BP BK": "DWI IRAWAN, S.Psi",
  DDP1: "NURUL FITRAH RAHMADANI, S.Kom",
  PABP: "DYAH NUR AZIZAH, S.Pd",
  "Bahasa Jepang": "PRADANA YUDI PRASETIYO, M.Pd",
  Matematika: "SRI SURYATI, S.Pd",
  BING: "NUNING JULI ASTUTI, S.Pd",
  "Mulok Produktif": "ONI BUDI SETIYONO, S.Pd",
  Sejarah: "ENDANG ASTUTIK, S.Pd",
  PGRI: "DWI ARTIN TIANA, SE",
};

// Function untuk menampilkan tanggal
function updateDate() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  const dateString = `${dayName}, ${date} ${monthName} ${year}`;
  document.getElementById("currentDate").textContent = dateString;
}

function showTab(tabName) {
  // Sembunyikan semua tab
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Hapus class active dari semua button
  const buttons = document.querySelectorAll(".nav-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // Tampilkan tab yang dipilih
  document.getElementById(tabName).classList.add("active");

  // Tambahkan class active ke button yang diklik
  event.target.classList.add("active");

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Load lazy images if tab contains them
  if (tabName === "siswa") {
    lazyLoadStudents();
  }
}

// Function untuk menampilkan modal guru
function showTeacherInfo(subjectText) {
  // Extract nama pelajaran (remove nomor dan strip)
  const subjectName = subjectText.replace(/^\d+\.\s*/, "").trim();

  // Skip kalau kosong atau strip
  if (subjectName === "—" || subjectName === "") {
    return;
  }

  // Cari nama guru
  const teacherName =
    teacherData[subjectName] || "Informasi guru tidak tersedia";

  // Update modal content
  document.getElementById("subjectName").textContent = subjectName;
  document.getElementById("teacherName").textContent = teacherName;

  // Tampilkan modal
  const modal = document.getElementById("teacherModal");
  modal.classList.add("show");
}

// Function untuk menutup modal
function closeModal() {
  const modal = document.getElementById("teacherModal");
  modal.classList.remove("show");
}

// Close modal kalau klik di luar modal content
window.onclick = function (event) {
  const modal = document.getElementById("teacherModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal dengan ESC key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Lazy loading untuk student cards
function lazyLoadStudents() {
  const studentCards = document.querySelectorAll(".student-card");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            // Simulate loading with delay
            setTimeout(() => {
              card.classList.add("loaded");
            }, 50);
            observer.unobserve(card);
          }
        });
      },
      {
        rootMargin: "50px",
      },
    );

    studentCards.forEach((card) => {
      imageObserver.observe(card);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    studentCards.forEach((card) => {
      card.classList.add("loaded");
    });
  }
}

// Optimize images loading
function optimizeImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    // Add loading="lazy" attribute for native lazy loading
    img.setAttribute("loading", "lazy");

    // Add decode="async" for better performance
    img.setAttribute("decoding", "async");
  });
}

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Display current date
  updateDate();

  // Optimize images
  optimizeImages();

  // Initial lazy load for visible students
  lazyLoadStudents();

  // Reduce animations on mobile
  if (window.innerWidth <= 768) {
    document.body.classList.add("mobile-optimized");
  }

  // Handle window resize with debounce
  window.addEventListener(
    "resize",
    debounce(function () {
      if (window.innerWidth <= 768) {
        document.body.classList.add("mobile-optimized");
      } else {
        document.body.classList.remove("mobile-optimized");
      }
    }, 250),
  );

  // Add click event to all subject boxes
  const subjectBoxes = document.querySelectorAll(".subject-box");
  subjectBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      showTeacherInfo(this.textContent);
    });
  });
});

// Prefetch on hover (for desktop only)
if (window.innerWidth > 768) {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      const tabName = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      // Prefetch content if needed
    });
  });
}
