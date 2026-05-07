// ===== APP STATE =====
let currentLang = localStorage.getItem('aag-lang') || 'es';
let isAdmin = sessionStorage.getItem('aag-admin') === 'true';

// ===== DATA MANAGEMENT =====
const defaultData = {
  groups: [
    { id: 1, name: "Grupo Familias", leader: "Por asignar", desc: "Un espacio para matrimonios y familias.", day: "Sábados", time: "17:00", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80" },
    { id: 2, name: "Grupo Jóvenes", leader: "Por asignar", desc: "Jóvenes apasionados por Dios.", day: "Sábados", time: "17:00", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80" }
  ],
  sermons: [
    { id: 1, title: "El Poder de la Fe", speaker: "Pastor Principal", date: "27", month: "ABR", link: "#" },
    { id: 2, title: "Caminando en Propósito", speaker: "Pastor Principal", date: "20", month: "ABR", link: "#" }
  ],
  songs: [
    { id: 1, name: "Way Maker", artist: "Sinach", link: "https://youtube.com" },
    { id: 2, name: "Goodness of God", artist: "Bethel Music", link: "https://youtube.com" }
  ]
};

let siteData = JSON.parse(localStorage.getItem('aag-data')) || defaultData;

function saveSiteData() {
  localStorage.setItem('aag-data', JSON.stringify(siteData));
  renderAll();
}

// ===== TRANSLATIONS (Keep existing ones but add dynamic ones) =====
const translations = {
  es: {
    nav_home: "Inicio", nav_about: "Quiénes Somos", nav_schedule: "Horarios", nav_groups: "Grupos", nav_sermons: "Predicaciones", nav_songs: "Canciones", nav_contact: "Contacto",
    util_social: "Síguenos", hero_title: "Bienvenido a Casa", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Conoce Más", hero_scroll: "Descubre",
    about_label: "Nuestra Historia", about_title: "Quiénes Somos", about_desc: "Somos una comunidad de fe que cree en el poder transformador de Dios.",
    about_mission_title: "Nuestra Misión", about_mission: "Llevar el mensaje de salvación a cada persona en Alemania.",
    about_vision_title: "Nuestra Visión", about_vision: "Ser una iglesia relevante y transformadora.",
    pastors_label: "Liderazgo", pastors_title: "Nuestros Pastores", pastors_name: "Pastor & Pastora", pastors_role: "Pastores Principales", pastors_bio: "Con un corazón apasionado...",
    schedule_label: "Reuniones", schedule_title: "Horarios de Servicio", schedule_desc: "Te esperamos.",
    sched_sunday: "Servicio Dominical", sched_sunday_day: "Domingos", sched_sunday_time: "10:00",
    sched_wednesday: "Estudio Bíblico", sched_wednesday_day: "Miércoles", sched_wednesday_time: "19:00",
    sched_friday: "Reunión de Oración", sched_friday_day: "Viernes", sched_friday_time: "19:30",
    groups_label: "Comunidad", groups_title: "Grupos de Amistad", groups_desc: "El corazón de nuestra iglesia.",
    sermons_label: "Palabra", sermons_title: "Notas de Predicaciones", sermons_desc: "Revive los mensajes.",
    songs_label: "Adoración", songs_title: "Canciones del Domingo", songs_desc: "Adora con nosotros.",
    songs_week: "Canciones de esta semana", song_listen: "YouTube",
    visitors_title: "¿Es tu Primera Vez?", visitors_desc: "Te damos la bienvenida.", visitors_cta: "Planifica tu Visita",
    contact_label: "Conecta", contact_title: "Contáctanos", contact_desc: "¿Preguntas?", contact_name: "Nombre", contact_email: "Email", contact_message: "Mensaje", contact_send: "Enviar",
    footer_desc: "Comunidad de fe en Alemania.", footer_rights: "Todos los derechos reservados."
  }
  // (EN and DE would be similar, skipping for brevity in this step)
};

function t(key) { return translations[currentLang]?.[key] || translations['es'][key] || key; }

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('aag-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
}

// ===== RENDERING ENGINE =====
function renderGroups() {
  const container = document.getElementById('groups-container');
  if (!container) return;
  container.innerHTML = siteData.groups.map(g => `
    <div class="group-card reveal active">
      <div class="group-card-img"><img src="${g.img}" alt="${g.name}"></div>
      <div class="group-card-body">
        <h4>${g.name}</h4>
        <p class="group-leader">Líder: ${g.leader}</p>
        <p>${g.desc}</p>
        <div class="group-meta">
          <span>📅 ${g.day}</span>
          <span>🕐 ${g.time}</span>
        </div>
        <div style="margin-top:15px; display:flex; gap:10px; align-items:center;">
          <a href="${g.map}" target="_blank" class="btn-outline" style="padding:5px 15px; font-size:0.6rem;">Google Maps</a>
          ${isAdmin ? `
            <button class="edit-btn" onclick="editGroup(${g.id})">✎</button>
            <button class="delete-btn" onclick="deleteGroup(${g.id})">✕</button>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderSermons() {
  const container = document.getElementById('sermons-container');
  if (!container) return;
  container.innerHTML = siteData.sermons.map(s => `
    <div class="sermon-item reveal active">
      <div class="sermon-date"><span class="day">${s.date}</span><span class="month">${s.month}</span></div>
      <div class="sermon-info"><h4>${s.title}</h4><p>${s.speaker}</p></div>
      <div class="sermon-actions">
        <a href="${s.link}" target="_blank" class="btn-outline" style="border-color:var(--gray-400);color:var(--gray-300);padding:8px 20px;font-size:0.7rem;">Notas</a>
        ${isAdmin ? `
          <button class="edit-btn" onclick="editSermon(${s.id})">✎</button>
          <button class="delete-btn" onclick="deleteSermon(${s.id})">✕</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderSongs() {
  const container = document.getElementById('songs-container');
  if (!container) return;
  container.innerHTML = `
    <h4 data-i18n="songs_week">${t('songs_week')}</h4>
    ${siteData.songs.map(s => `
      <div class="song-item">
        <div><p class="song-name">${s.name}</p><p class="song-artist">${s.artist}</p></div>
        <div style="display:flex; gap:10px;">
          <a href="${s.link}" target="_blank" data-i18n="song_listen">${t('song_listen')}</a>
          ${isAdmin ? `
            <button class="edit-btn" onclick="editSong(${s.id})" style="padding:0; border:none; background:none;">✎</button>
            <button class="delete-btn" onclick="deleteSong(${s.id})" style="padding:0; border:none; background:none; color:red;">✕</button>
          ` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function renderAll() {
  renderGroups();
  renderSermons();
  renderSongs();
  document.body.classList.toggle('admin-mode', isAdmin);
}

// ===== ADMIN ACTIONS =====
function tryLogin() {
  const pass = document.getElementById('admin-pass').value;
  if (pass === 'admin123') {
    isAdmin = true;
    sessionStorage.setItem('aag-admin', 'true');
    closeLogin();
    renderAll();
    alert("Modo Admin Activado");
  } else {
    alert("Contraseña incorrecta");
  }
}

function closeLogin() { document.getElementById('login-modal').classList.remove('active'); }

// Group Forms
function openGroupForm(id = null) {
  const g = id ? siteData.groups.find(x => x.id === id) : { name: "", leader: "", desc: "", day: "Sábados", time: "17:00", map: "", img: "" };
  const modal = document.getElementById('form-modal');
  const content = document.getElementById('form-content');
  
  content.innerHTML = `
    <h3>${id ? 'Editar' : 'Añadir'} Grupo</h3>
    <input type="text" id="g-name" placeholder="Nombre de la Casa" value="${g.name}" style="width:100%; margin:10px 0; padding:8px;">
    <input type="text" id="g-leader" placeholder="Líder" value="${g.leader}" style="width:100%; margin:10px 0; padding:8px;">
    <textarea id="g-desc" placeholder="Descripción" style="width:100%; margin:10px 0; padding:8px;">${g.desc}</textarea>
    <input type="text" id="g-day" placeholder="Día" value="${g.day}" style="width:100%; margin:10px 0; padding:8px;">
    <input type="text" id="g-time" placeholder="Hora" value="${g.time}" style="width:100%; margin:10px 0; padding:8px;">
    <input type="text" id="g-map" placeholder="Link Google Maps" value="${g.map}" style="width:100%; margin:10px 0; padding:8px;">
    <input type="text" id="g-img" placeholder="URL Imagen" value="${g.img}" style="width:100%; margin:10px 0; padding:8px;">
    <button class="btn-dark" onclick="saveGroup(${id})">Guardar</button>
    <button onclick="document.getElementById('form-modal').classList.remove('active')">Cancelar</button>
  `;
  modal.classList.add('active');
}

function saveGroup(id) {
  const newG = {
    id: id || Date.now(),
    name: document.getElementById('g-name').value,
    leader: document.getElementById('g-leader').value,
    desc: document.getElementById('g-desc').value,
    day: document.getElementById('g-day').value,
    time: document.getElementById('g-time').value,
    map: document.getElementById('g-map').value,
    img: document.getElementById('g-img').value
  };
  if (id) siteData.groups = siteData.groups.map(x => x.id === id ? newG : x);
  else siteData.groups.push(newG);
  document.getElementById('form-modal').classList.remove('active');
  saveSiteData();
}

function deleteGroup(id) { if(confirm("¿Eliminar grupo?")) { siteData.groups = siteData.groups.filter(x => x.id !== id); saveSiteData(); } }

// (Similar functions for Sermons and Songs)
function openSermonForm(id = null) {
  const s = id ? siteData.sermons.find(x => x.id === id) : { title: "", speaker: "", date: "", month: "", link: "" };
  document.getElementById('form-content').innerHTML = `
    <h3>${id ? 'Editar' : 'Añadir'} Predicación</h3>
    <input type="text" id="s-title" placeholder="Título" value="${s.title}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="s-speaker" placeholder="Predicador" value="${s.speaker}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="s-date" placeholder="Día (ej: 27)" value="${s.date}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="s-month" placeholder="Mes (ej: ABR)" value="${s.month}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="s-link" placeholder="Link a Notas" value="${s.link}" style="width:100%; margin:5px 0; padding:8px;">
    <button class="btn-dark" onclick="saveSermon(${id})">Guardar</button>
    <button onclick="document.getElementById('form-modal').classList.remove('active')">Cancelar</button>
  `;
  document.getElementById('form-modal').classList.add('active');
}

function saveSermon(id) {
  const newS = { id: id || Date.now(), title: document.getElementById('s-title').value, speaker: document.getElementById('s-speaker').value, date: document.getElementById('s-date').value, month: document.getElementById('s-month').value, link: document.getElementById('s-link').value };
  if (id) siteData.sermons = siteData.sermons.map(x => x.id === id ? newS : x);
  else siteData.sermons.push(newS);
  document.getElementById('form-modal').classList.remove('active');
  saveSiteData();
}

function deleteSermon(id) { if(confirm("¿Eliminar?")) { siteData.sermons = siteData.sermons.filter(x => x.id !== id); saveSiteData(); } }

function openSongForm(id = null) {
  const s = id ? siteData.songs.find(x => x.id === id) : { name: "", artist: "", link: "" };
  document.getElementById('form-content').innerHTML = `
    <h3>${id ? 'Editar' : 'Añadir'} Canción</h3>
    <input type="text" id="so-name" placeholder="Canción" value="${s.name}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="so-artist" placeholder="Artista" value="${s.artist}" style="width:100%; margin:5px 0; padding:8px;">
    <input type="text" id="so-link" placeholder="Link YouTube" value="${s.link}" style="width:100%; margin:5px 0; padding:8px;">
    <button class="btn-dark" onclick="saveSong(${id})">Guardar</button>
    <button onclick="document.getElementById('form-modal').classList.remove('active')">Cancelar</button>
  `;
  document.getElementById('form-modal').classList.add('active');
}

function saveSong(id) {
  const newS = { id: id || Date.now(), name: document.getElementById('so-name').value, artist: document.getElementById('so-artist').value, link: document.getElementById('so-link').value };
  if (id) siteData.songs = siteData.songs.map(x => x.id === id ? newS : x);
  else siteData.songs.push(newS);
  document.getElementById('form-modal').classList.remove('active');
  saveSiteData();
}

function deleteSong(id) { if(confirm("¿Eliminar?")) { siteData.songs = siteData.songs.filter(x => x.id !== id); saveSiteData(); } }

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  setLanguage(currentLang);

  document.getElementById('admin-login-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdmin) {
      isAdmin = false;
      sessionStorage.setItem('aag-admin', 'false');
      renderAll();
      alert("Modo Admin Desactivado");
    } else {
      document.getElementById('login-modal').classList.add('active');
    }
  });

  // Navbar and Hamburger
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
});
