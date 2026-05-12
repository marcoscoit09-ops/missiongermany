// ===== APP STATE =====
let currentLang = localStorage.getItem('aag-lang') || 'es';
let isAdmin = sessionStorage.getItem('aag-admin') === 'true';

// ===== DATA MANAGEMENT =====
const defaultData = {
  groups: [
    {
      id: 1, name: "Grupo de Amistad — Martes",
      leader: "Lucia Kremer", day: "Martes", time: "19:00",
      address: "Friedrich-Loy-Strasse 16, 80796 München",
      map: "https://maps.google.com/?q=Friedrich-Loy-Strasse+16,+80796+M%C3%BCnchen",
      desc: "Un grupo cálido y acogedor en el norte de Munich. Vengas de donde vengas, aquí encontrarás amigos y un lugar donde crecer en la fe.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
    },
    {
      id: 2, name: "Grupo de Amistad — Miércoles",
      leader: "Jhonatan Coitiño", day: "Miércoles", time: "19:30",
      address: "Bertschstraße 26, 81673 München",
      map: "https://maps.google.com/?q=Bertschstra%C3%9Fe+26,+81673+M%C3%BCnchen",
      desc: "Grupo en el este de Munich. Un espacio de fe, conversación profunda y comunidad genuina a mitad de semana.",
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80"
    },
    {
      id: 3, name: "Grupo de Amistad — Viernes (Ottobrunn)",
      leader: "Jhonatan Coitiño", day: "Viernes", time: "20:00",
      address: "Sudetenstraße 79, 85521 Ottobrunn",
      map: "https://maps.google.com/?q=Sudentenstra%C3%9Fe+79,+85521+Ottobrunn",
      desc: "Grupo en Ottobrunn al sur de Munich. La noche del viernes es perfecta para conectar, compartir la Palabra y hacer amigos.",
      img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
    },
    {
      id: 4, name: "Grupo de Amistad — Viernes (München)",
      leader: "Jhonatan Coitiño", day: "Viernes", time: "19:30",
      address: "Stettnerstrasse 5, 81549 München",
      map: "https://maps.google.com/?q=Stettnerstrasse+5,+81549+M%C3%BCnchen",
      desc: "Grupo en el sureste de Munich. Un tiempo de adoración, oración y amistad genuina para cerrar la semana con Dios.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
    }
  ],
  sermons: [
    { id: 1, title: "Inquebrantables: Construyendo sobre la Roca", speaker: "Jhonatan Coitiño", date: "11", month: "MAY", folder: "Notas de Predicaciones", link: "#" },
    { id: 2, title: "El Poder de la Gracia Irresistible", speaker: "Jhonatan Coitiño", date: "04", month: "MAY", folder: "Notas de Predicaciones", link: "#" },
    { id: 3, title: "Renovando tu Mente", speaker: "Jhonatan Coitiño", date: "27", month: "ABR", folder: "Notas de Predicaciones", link: "#" },
    { id: 4, title: "Caminando por Fe y no por Vista", speaker: "Jhonatan Coitiño", date: "20", month: "ABR", folder: "Notas de Predicaciones", link: "#" },
    { id: 5, title: "La Oración que Mueve Montañas", speaker: "Jhonatan Coitiño", date: "13", month: "ABR", folder: "Notas de Predicaciones", link: "#" },
    { id: 6, title: "Identidad en Cristo", speaker: "Jhonatan Coitiño", date: "06", month: "ABR", folder: "Notas de Predicaciones", link: "#" }
  ],
  songs: [
    { id: 1, name: "Océanos (Donde mis pies pueden fallar)", artist: "Hillsong en Español", link: "https://youtube.com" },
    { id: 2, name: "Gracia Incomparable", artist: "Hillsong Worship", link: "https://youtube.com" },
    { id: 3, name: "Hermoso Nombre", artist: "Hillsong en Español", link: "https://youtube.com" },
    { id: 4, name: "Digno y Santo", artist: "Kari Jobe", link: "https://youtube.com" }
  ],
  devotional: {
    date: new Date().toLocaleDateString('es-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    text: "No importa lo que estés atravesando hoy, recuerda que Dios va delante de ti. Su fidelidad no depende de tus circunstancias, sino de Su carácter. Confía en Él con todo tu corazón.",
    verse: "\"Confía en el Señor con todo tu corazón, y no te apoyes en tu propio entendimiento.\" — Proverbios 3:5"
  }
};

// FORCE MOCK DATA FOR DEMO PURPOSES
let siteData = defaultData;


function saveSiteData() {
  localStorage.setItem('aag-data', JSON.stringify(siteData));
  renderAll();
  if (window.afterRender) window.afterRender();
}

// ===== TRANSLATIONS (Keep existing ones but add dynamic ones) =====
const translations = {
  es: {
    nav_home: "Inicio", nav_about: "Quiénes Somos", nav_schedule: "Horarios", nav_groups: "Grupos", nav_sermons: "Predicaciones", nav_songs: "Canciones", nav_contact: "Contacto",
    util_social: "Síguenos", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Conoce Más", hero_scroll: "Descubre",
    hero_badge: "Iglesia Apostólica — Múnich, Alemania",
    hero_verse: "\"Yo soy el camino, la verdad y la vida\" — Juan 14:6",
    hero_title_line1: "Bienvenido", hero_title_line2: "a Casa.",
    stat_groups: "Grupos de Amistad", stat_langs: "Idiomas", stat_service: "Próximo Servicio", stat_years: "Años de Ministerio", stat_services: "Servicios al Año",
    sched_prayer: "Oración de Iglesia", sched_prayer_day: "Lunes", sched_prayer_desc: "Vía Google Meet. Únete desde casa.", sched_join: "Unirse a Meet →",
    sched_groups: "Grupos de Amistad", sched_groups_day: "Lunes a Viernes", sched_groups_time: "Varios horarios", sched_groups_desc: "Grupos pequeños en casas por toda Munich.", sched_see: "Ver grupos →",
    sched_sunday: "Servicio Dominical", sched_sunday_day: "Domingos", sched_sunday_time: "11:00 – 13:00 h", sched_sunday_desc: "Adoración, predicación y comunidad. Todos bienvenidos.",
    devot_title: "Devocional del Día", devot_fab: "Devocional",
    about_label: "Nuestra Historia", about_title: "Quiénes Somos",
    about_desc: "En Apostolic Assembly Germany creemos firmemente en que cada persona tiene un propósito divino. Somos una comunidad diversa, vibrante y llena de vida, unida por el amor a Jesús.",
    about_mission_title: "Nuestra Misión",
    about_mission: "Llevar el mensaje de esperanza y salvación de Cristo a cada rincón de Alemania, construyendo una iglesia apasionada por la presencia de Dios.",
    about_vision_title: "Nuestra Visión",
    about_vision: "Ser una iglesia relevante, contemporánea y transformadora, donde las familias sean restauradas y los líderes levantados.",
    pastors_label: "Liderazgo", pastors_title: "Nuestros Pastores", pastors_name: "Jhonatan & Lucía Coitiño", pastors_role: "Pastores Principales",
    pastors_bio: "Jhonatan y Lucía Coitiño llevan 3 años al frente de la Asamblea Apostólica en Alemania con un corazón apasionado por ver a cada persona encontrar su propósito en Dios.",
    schedule_label: "Reuniones", schedule_title: "Nuestros Horarios", schedule_desc: "Te esperamos cada semana. Tres formas de conectar con nuestra comunidad.",
    groups_label: "Comunidad", groups_title: "Grupos de Amistad", groups_desc: "La iglesia es más que el domingo. Nuestros grupos de amistad son el corazón de nuestra comunidad.",
    sermons_label: "Palabra", sermons_title: "Notas de Predicaciones", sermons_desc: "Revive los mensajes que están marcando el rumbo de nuestra iglesia.",
    songs_label: "Adoración", songs_title: "Canciones del Domingo", songs_desc: "Nuestra adoración es una expresión sincera de amor a Dios.",
    songs_week: "Setlist de esta semana", song_listen: "YouTube",
    visitors_title: "¿Es tu Primera Visita?", visitors_desc: "¡Nos encantaría conocerte! No importa de dónde vengas, aquí hay un lugar para ti.", visitors_cta: "Planifica tu Visita",
    contact_label: "Conecta", contact_title: "Estamos para Ayudarte", contact_desc: "¿Tienes alguna pregunta o necesitas oración? Escríbenos.", contact_name: "Nombre Completo", contact_email: "Correo Electrónico", contact_message: "Escribe tu mensaje aquí...", contact_send: "Enviar Mensaje",
    footer_desc: "Una iglesia contemporánea en el corazón de Múnich, construyendo comunidad y compartiendo fe.", footer_rights: "Todos los derechos reservados.",
    prayer_label: "Oración", prayer_title: "Peticiones de Oración", prayer_desc: "¿Necesitas oración? Comparte tu petición con nosotros.",
    prayer_name: "Tu nombre (opcional)", prayer_placeholder: "Escribe tu petición aquí...", prayer_submit: "Enviar Petición",
    contact_address_label: "Dirección", contact_phone_label: "Teléfono", contact_email_label: "Email", contact_social_label: "Redes Sociales",
    footer_links: "Navegación", footer_services: "Recursos", footer_connect: "Conecta",
    footer_live: "Transmisión en Vivo", footer_events: "Eventos", footer_give: "Ofrendar"
  },
  en: {
    nav_home: "Home", nav_about: "About Us", nav_schedule: "Schedule", nav_groups: "Groups", nav_sermons: "Sermons", nav_songs: "Songs", nav_contact: "Contact",
    util_social: "Follow Us", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Learn More", hero_scroll: "Discover",
    hero_badge: "Apostolic Church — Munich, Germany",
    hero_verse: "\"I am the way, the truth and the life\" — John 14:6",
    hero_title_line1: "Welcome", hero_title_line2: "Home.",
    stat_groups: "Friendship Groups", stat_langs: "Languages", stat_service: "Next Service", stat_years: "Years of Ministry", stat_services: "Services per Year",
    sched_prayer: "Church Prayer", sched_prayer_day: "Mondays", sched_prayer_desc: "Via Google Meet. Join from home.", sched_join: "Join Meet →",
    sched_groups: "Friendship Groups", sched_groups_day: "Mon to Fri", sched_groups_time: "Various times", sched_groups_desc: "Small groups in homes across Munich.", sched_see: "See groups →",
    sched_sunday: "Sunday Service", sched_sunday_day: "Sundays", sched_sunday_time: "11:00 – 13:00", sched_sunday_desc: "Worship, preaching and community. Everyone welcome.",
    devot_title: "Daily Devotional", devot_fab: "Devotional",
    about_label: "Our Story", about_title: "Who We Are",
    about_desc: "At Apostolic Assembly Germany, we firmly believe every person has a divine purpose. We are a diverse, vibrant community united by the love of Jesus.",
    about_mission_title: "Our Mission",
    about_mission: "To bring the message of hope and salvation of Christ to every corner of Germany, building a church passionate about the presence of God.",
    about_vision_title: "Our Vision",
    about_vision: "To be a relevant, contemporary and transforming church where families are restored and leaders are raised.",
    pastors_label: "Leadership", pastors_title: "Our Pastors", pastors_name: "Jhonatan & Lucía Coitiño", pastors_role: "Lead Pastors",
    pastors_bio: "Jhonatan and Lucía Coitiño have led the Apostolic Assembly in Germany for 3 years with a heart passionate about seeing every person find their purpose in God.",
    schedule_label: "Services", schedule_title: "Our Schedule", schedule_desc: "Three ways to connect with our community every week.",
    groups_label: "Community", groups_title: "Friendship Groups", groups_desc: "Church is more than Sunday. Our friendship groups are the heart of our community.",
    sermons_label: "The Word", sermons_title: "Sermon Notes", sermons_desc: "Relive the messages shaping the direction of our church.",
    songs_label: "Worship", songs_title: "Songs of the Week", songs_desc: "Our worship is a sincere expression of love for God.",
    songs_week: "This week's setlist", song_listen: "YouTube",
    visitors_title: "Is This Your First Visit?", visitors_desc: "We'd love to meet you! No matter where you come from, there's a place for you here.", visitors_cta: "Plan Your Visit",
    contact_label: "Connect", contact_title: "We're Here to Help", contact_desc: "Have a question or need prayer? Write to us.", contact_name: "Full Name", contact_email: "Email Address", contact_message: "Write your message here...", contact_send: "Send Message",
    footer_desc: "A contemporary church in the heart of Munich, building community and sharing faith.", footer_rights: "All rights reserved.",
    prayer_label: "Prayer", prayer_title: "Prayer Requests", prayer_desc: "Do you need prayer? Share your request with us.",
    prayer_name: "Your name (optional)", prayer_placeholder: "Write your prayer request here...", prayer_submit: "Submit Request",
    contact_address_label: "Address", contact_phone_label: "Phone", contact_email_label: "Email", contact_social_label: "Social Media",
    footer_links: "Navigation", footer_services: "Resources", footer_connect: "Connect",
    footer_live: "Live Stream", footer_events: "Events", footer_give: "Give"
  },
  de: {
    nav_home: "Start", nav_about: "Über Uns", nav_schedule: "Gottesdienste", nav_groups: "Gruppen", nav_sermons: "Predigten", nav_songs: "Lieder", nav_contact: "Kontakt",
    util_social: "Folg Uns", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Mehr Erfahren", hero_scroll: "Entdecken",
    hero_badge: "Apostolische Kirche — München, Deutschland",
    hero_verse: "\"Ich bin der Weg, die Wahrheit und das Leben\" — Johannes 14:6",
    hero_title_line1: "Willkommen", hero_title_line2: "Zuhause.",
    stat_groups: "Freundschaftsgruppen", stat_langs: "Sprachen", stat_service: "Nächster Gottesdienst", stat_years: "Jahre Dienst", stat_services: "Gottesdienste pro Jahr",
    sched_prayer: "Kirchengebet", sched_prayer_day: "Montags", sched_prayer_desc: "Via Google Meet. Von zu Hause beitreten.", sched_join: "Meet beitreten →",
    sched_groups: "Freundschaftsgruppen", sched_groups_day: "Mo bis Fr", sched_groups_time: "Verschiedene Zeiten", sched_groups_desc: "Kleine Gruppen in Häusern in ganz München.", sched_see: "Gruppen sehen →",
    sched_sunday: "Sonntagsgottesdienst", sched_sunday_day: "Sonntags", sched_sunday_time: "11:00 – 13:00 Uhr", sched_sunday_desc: "Anbetung, Predigt und Gemeinschaft. Alle willkommen.",
    devot_title: "Tagesandacht", devot_fab: "Andacht",
    about_label: "Unsere Geschichte", about_title: "Wer Wir Sind",
    about_desc: "Bei der Apostolic Assembly Germany glauben wir fest, dass jeder Mensch einen göttlichen Zweck hat. Wir sind eine vielfältige, lebendige Gemeinschaft, vereint durch die Liebe zu Jesus.",
    about_mission_title: "Unsere Mission",
    about_mission: "Die Botschaft der Hoffnung und Erlösung Christi in jeden Winkel Deutschlands zu tragen.",
    about_vision_title: "Unsere Vision",
    about_vision: "Eine relevante, zeitgemäße und transformierende Kirche zu sein, in der Familien wiederhergestellt werden.",
    pastors_label: "Führung", pastors_title: "Unsere Pastoren", pastors_name: "Jhonatan & Lucía Coitiño", pastors_role: "Leitende Pastoren",
    pastors_bio: "Jhonatan und Lucía Coitiño leiten die Apostolische Gemeinde in Deutschland seit 3 Jahren mit einem Herz für jeden Menschen.",
    schedule_label: "Gottesdienste", schedule_title: "Unsere Zeiten", schedule_desc: "Drei Möglichkeiten, jede Woche mit unserer Gemeinschaft in Kontakt zu treten.",
    groups_label: "Gemeinschaft", groups_title: "Freundschaftsgruppen", groups_desc: "Kirche ist mehr als Sonntag. Unsere Freundschaftsgruppen sind das Herz unserer Gemeinde.",
    sermons_label: "Das Wort", sermons_title: "Predigtnotizen", sermons_desc: "Erlebe die Botschaften, die unsere Gemeinde prägen, erneut.",
    songs_label: "Anbetung", songs_title: "Lieder der Woche", songs_desc: "Unsere Anbetung ist ein aufrichtiger Ausdruck der Liebe zu Gott.",
    songs_week: "Setlist dieser Woche", song_listen: "YouTube",
    visitors_title: "Ist es Dein Erster Besuch?", visitors_desc: "Wir würden dich gerne kennenlernen! Hier ist ein Platz für dich.", visitors_cta: "Besuch Planen",
    contact_label: "Kontakt", contact_title: "Wir Sind Für Dich Da", contact_desc: "Hast du eine Frage oder brauchst Gebet? Schreib uns.", contact_name: "Vollständiger Name", contact_email: "E-Mail-Adresse", contact_message: "Schreib deine Nachricht hier...", contact_send: "Nachricht Senden",
    footer_desc: "Eine zeitgemäße Kirche im Herzen von München.", footer_rights: "Alle Rechte vorbehalten.",
    prayer_label: "Gebet", prayer_title: "Gebetsanliegen", prayer_desc: "Brauchst du Gebet? Teile dein Anliegen mit uns.",
    prayer_name: "Dein Name (optional)", prayer_placeholder: "Schreibe dein Gebetsanliegen hier...", prayer_submit: "Anliegen Einreichen",
    contact_address_label: "Adresse", contact_phone_label: "Telefon", contact_email_label: "E-Mail", contact_social_label: "Soziale Medien",
    footer_links: "Navigation", footer_services: "Ressourcen", footer_connect: "Verbinden",
    footer_live: "Live-Stream", footer_events: "Veranstaltungen", footer_give: "Spenden"
  }

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
        <p class="group-leader">👤 Líder: ${g.leader}</p>
        <p>${g.desc}</p>
        <div class="group-meta">
          <span>📅 ${g.day}</span>
          <span>🕐 ${g.time}</span>
        </div>
        <div class="group-address">
          📍 <a href="${g.map}" target="_blank">${g.address || 'Ver en Google Maps'}</a>
        </div>
        <div style="margin-top:15px; display:flex; gap:10px; align-items:center;">
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

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

  // ===== INTERSECTION OBSERVER FOR SCROLL REVEALS =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  function observeRevealElements() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger, .reveal-clip').forEach(el => revealObserver.observe(el));
  }

  observeRevealElements();

  // Re-observe after dynamic content renders
  const originalRenderAll = renderAll;
  window.afterRender = observeRevealElements;

  // ===== NUMBER COUNTER ANIMATION =====
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const suffix = el.dataset.suffix || (target > 100 ? '+' : '');
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

  // ===== PARALLAX EFFECT (optimized with RAF) =====
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  let rafId = null;
  let ticking = false;

  function updateParallax() {
    parallaxImgs.forEach(img => {
      const wrapper = img.parentElement;
      const rect = wrapper.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > windowH) return;
      const relativePos = (rect.top + rect.height / 2 - windowH / 2) / (windowH + rect.height);
      const offset = relativePos * 100;
      img.style.transform = `translateY(calc(-10% + ${offset}px))`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  // Prayer form
  const prayerForm = document.getElementById('prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('prayer-thanks').style.display = 'block';
      document.getElementById('prayer-thanks').textContent = '¡Hemos recibido tu petición! Estaremos orando por ti.';
      prayerForm.reset();
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('contact-thanks').style.display = 'block';
      document.getElementById('contact-thanks').textContent = '¡Mensaje recibido! Nos pondremos en contacto contigo muy pronto.';
      contactForm.reset();
    });
  }
});

// ===== DEVOTIONAL WIDGET =====
function renderDevotional() {
  // Primero intenta leer del archivo devotionals.js (automatico por fecha)
  let d = null;
  if (typeof getTodaysDevotional === 'function') {
    const auto = getTodaysDevotional();
    if (auto) {
      d = {
        date: formatDevotionalDate(auto.fecha),
        text: auto.texto,
        verse: auto.versiculo
      };
    }
  }
  // Si no hay en el archivo, usa el de siteData (editable por admin)
  if (!d) d = siteData.devotional;
  if (!d) return;

  const dateEl = document.getElementById('devotional-date');
  const textEl = document.getElementById('devotional-text');
  const verseEl = document.getElementById('devotional-verse');
  if (dateEl) dateEl.textContent = d.date || '';
  if (textEl) textEl.textContent = d.text || '';
  if (verseEl) verseEl.textContent = d.verse || '';
}

function formatDevotionalDate(fechaDDMM) {
  try {
    const [dd, mm] = fechaDDMM.split('-');
    const year = new Date().getFullYear();
    const date = new Date(year, parseInt(mm) - 1, parseInt(dd));
    return date.toLocaleDateString('es-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch(e) {
    return fechaDDMM;
  }
}


function toggleDevotional() {
  const widget = document.getElementById('devotional-widget');
  const fab = document.getElementById('devotional-fab');
  if (!widget) return;
  const isOpen = widget.classList.contains('open');
  widget.classList.toggle('open', !isOpen);
  if (fab) fab.classList.toggle('hidden', !isOpen);
}

function openDevotionalForm() {
  const d = siteData.devotional || {};
  const overlay = document.getElementById('form-modal');
  const content = document.getElementById('form-content');
  if (!overlay || !content) return;
  content.innerHTML = `
    <h3 style="margin-bottom:20px;">&#9998; Editar Devocional</h3>
    <div class="form-group"><label>Fecha</label><input type="text" id="d-date" value="${d.date || ''}" style="width:100%;padding:10px;border:1px solid #ccc;margin-bottom:12px;"></div>
    <div class="form-group"><label>Texto del Devocional</label><textarea id="d-text" rows="5" style="width:100%;padding:10px;border:1px solid #ccc;margin-bottom:12px;">${d.text || ''}</textarea></div>
    <div class="form-group"><label>Versículo Bíblico</label><input type="text" id="d-verse" value="${d.verse || ''}" style="width:100%;padding:10px;border:1px solid #ccc;margin-bottom:20px;"></div>
    <button class="btn-dark" onclick="saveDevotional()" style="width:100%;">Guardar</button>
    <button onclick="document.getElementById('form-modal').classList.remove('active')" style="margin-top:10px;width:100%;font-size:0.75rem;">Cancelar</button>
  `;
  overlay.classList.add('active');
}

function saveDevotional() {
  siteData.devotional = {
    date: document.getElementById('d-date').value,
    text: document.getElementById('d-text').value,
    verse: document.getElementById('d-verse').value
  };
  saveSiteData();
  renderDevotional();
  document.getElementById('form-modal').classList.remove('active');
}

// Init devotional on load
document.addEventListener('DOMContentLoaded', () => {
  renderDevotional();
  // Show FAB after 3 seconds
  setTimeout(() => {
    const fab = document.getElementById('devotional-fab');
    if (fab) fab.classList.add('visible');
  }, 3000);
});


