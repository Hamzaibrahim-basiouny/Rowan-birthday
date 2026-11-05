/*
  مشروع عيد ميلاد روان — التخصيص كله هنا.
  غيّر النصوص والتواريخ والصور قبل ما تبعت الموقع.
*/

const storyMoments = [
  {
    chapter: "الفصل 01",
    title: "البداية",
    date: "اكتب التاريخ هنا",
    text: "اكتب هنا إزاي بدأت حكايتكم، وأول حاجة فاكرها عن روان."
  },
  {
    chapter: "الفصل 02",
    title: "كبرنا واتغيرنا",
    date: "مرحلة مهمة",
    text: "اكتب ذكرى حقيقية من أيام المدرسة أو الكلية، أو موقف لسه فاكره."
  },
  {
    chapter: "الفصل 03",
    title: "وقت ما احتجنا لبعض",
    date: "ذكرى لا تُنسى",
    text: "اكتب عن موقف وقفتوا فيه جنب بعض، من غير ما تضيف أي حاجة مش حصلت فعلًا."
  },
  {
    chapter: "الفصل 04",
    title: "خطوة جديدة",
    date: "اكتب التاريخ هنا",
    text: "اكتب عن مرحلة الخطوبة أو أي لحظة حقيقية حسيت فيها إن علاقتكم بتبدأ فصل جديد."
  },
  {
    chapter: "الفصل 05",
    title: "والحكاية مكملة",
    date: "النهارده",
    text: "لسه في ذكريات كتير مستنيانا، وأماكن هنروحها، وأيام حلوة لسه ما عشناهاش."
  }
];

const galleryMoments = [
  { file: "assets/images/photo-01.jpg", title: "أول ذكرى", caption: "اكتب تعليقك هنا" },
  { file: "assets/images/photo-02.jpg", title: "يوم مميز", caption: "اكتب تعليقك هنا" },
  { file: "assets/images/photo-03.jpg", title: "تفصيلة بحبها", caption: "اكتب تعليقك هنا" },
  { file: "assets/images/photo-04.jpg", title: "ضحكة من القلب", caption: "اكتب تعليقك هنا" },
  { file: "assets/images/photo-05.jpg", title: "لحظة غالية", caption: "اكتب تعليقك هنا" },
  { file: "assets/images/photo-06.jpg", title: "لسه في كتير", caption: "ذكرياتنا الجاية أجمل بإذن الله" }
];

// اكتب رسالتك الشخصية هنا. دي صيغة بداية قابلة للتعديل، مش قصة مفترضة عنكم.
const personalLetterText = `روان،

كل سنة وإنتِ طيبة، وكل سنة وإنتِ أقرب لكل حاجة نفسك فيها.
بمناسبة عيد ميلادك الـ23، حبيت أعملك حاجة مختلفة شوية، حاجة تفضلي ترجعي لها وتبتسمي.

أنا ممتن لكل لحظة حلوة شاركناها، ولكل مرة كنا فيها سند لبعض. أتمنى السنة الجديدة من عمرك تكون أهدى على قلبك، وأجمل من كل اللي فات، وتحققي فيها حاجات كتير بتتمنيها.

أتمنى تفضلي دايمًا بخير، مطمنة، وفرحانة، وتلاقي في أيامك أسباب كتير تضحكي من قلبك.

عيد ميلاد سعيد يا روان. ♡

— اكتب اسمك هنا`;

const timeline = document.getElementById("timeline");
const galleryGrid = document.getElementById("galleryGrid");
const letterModal = document.getElementById("letterModal");
const personalLetter = document.getElementById("personalLetter");
const envelope = document.getElementById("envelope");
const toast = document.getElementById("toast");
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
let toastTimeout;

function renderTimeline() {
  timeline.innerHTML = storyMoments.map((moment, index) => `
    <article class="timeline-item reveal">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-card">
        <span class="chapter">${escapeHTML(moment.chapter)}</span>
        <h3>${escapeHTML(moment.title)}</h3>
        <p>${escapeHTML(moment.text)}</p>
      </div>
      <div class="timeline-date">${escapeHTML(moment.date)}</div>
    </article>
  `).join("");
}

function renderGallery() {
  galleryGrid.innerHTML = galleryMoments.map((moment, index) => `
    <button class="gallery-card reveal" type="button" data-index="${index}" aria-label="عرض ${escapeHTML(moment.title)}">
      <span class="gallery-photo is-placeholder">
        <img src="${escapeHTML(moment.file)}" alt="${escapeHTML(moment.title)}" loading="lazy">
        <span class="placeholder"><span>♡</span><b>${escapeHTML(moment.title)}</b><small>أضف صورة في مجلد الصور</small></span>
      </span>
      <span class="gallery-caption">${escapeHTML(moment.title)}<small>${escapeHTML(moment.caption)}</small></span>
    </button>
  `).join("");

  galleryGrid.querySelectorAll(".gallery-photo img").forEach((img) => {
    img.addEventListener("load", () => {
      img.parentElement.classList.remove("is-placeholder");
    });
    img.addEventListener("error", () => {
      img.parentElement.classList.add("is-placeholder");
    });
    if (img.complete && img.naturalWidth > 0) img.parentElement.classList.remove("is-placeholder");
  });

  galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => openGalleryImage(Number(card.dataset.index)));
  });
}

function openGalleryImage(index) {
  const item = galleryMoments[index];
  const img = new Image();
  img.src = item.file;
  img.onload = () => {
    const modal = document.createElement("div");
    modal.className = "modal is-open gallery-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="modal-backdrop" data-close="true"></div>
      <div class="modal-card" style="background:#21151d;color:#f5e9df;padding:18px;max-width:800px">
        <button class="modal-close" type="button" aria-label="إغلاق الصورة" data-close="true" style="color:#f5e9df">×</button>
        <img src="${escapeHTML(item.file)}" alt="${escapeHTML(item.title)}" style="width:100%;max-height:65vh;object-fit:contain;display:block">
        <h3 style="margin:14px 0 0">${escapeHTML(item.title)}</h3>
        <p style="color:#c5b0b7;margin:4px 0 0;font-size:13px">${escapeHTML(item.caption)}</p>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add("modal-open");
    modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => {
      modal.remove();
      document.body.classList.remove("modal-open");
    }));
    document.addEventListener("keydown", function closeOnEscape(e) {
      if (e.key === "Escape") {
        modal.remove();
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", closeOnEscape);
      }
    });
  };
  img.onerror = () => showToast("لسه مفيش صورة هنا — ضيف صورتك في مجلد assets/images.");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
}

function openLetter() {
  personalLetter.textContent = personalLetterText;
  letterModal.classList.add("is-open");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  envelope.classList.add("open");
  createHearts(9);
}

function closeLetter() {
  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function createHearts(amount = 18) {
  const layer = document.getElementById("heartLayer");
  const symbols = ["♡", "♥", "✧"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
    heart.style.fontSize = `${13 + Math.random() * 22}px`;
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }
}

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("is-playing");
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "إيقاف الموسيقى";
    } catch {
      showToast("ضيف ملف موسيقى باسم music.mp3 داخل assets/audio، وبعدها جرّب تاني.");
    }
  } else {
    music.pause();
    musicButton.classList.remove("is-playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "شغّل الموسيقى";
  }
});

document.getElementById("openLetterButton").addEventListener("click", openLetter);
envelope.addEventListener("click", openLetter);
envelope.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openLetter();
  }
});
letterModal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeLetter));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && letterModal.classList.contains("is-open")) closeLetter();
});

document.getElementById("surpriseButton").addEventListener("click", () => {
  createHearts(48);
  showToast("كل سنة وإنتِ طيبة يا روان ♡ افتكري دايمًا إنك تستاهلي كل حاجة حلوة.");
});

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

window.addEventListener("scroll", updateScrollProgress, { passive: true });

renderTimeline();
renderGallery();
setupRevealAnimations();
updateScrollProgress();
