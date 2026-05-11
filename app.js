// ===== APP STATE =====
let currentLang = localStorage.getItem('aag-lang') || 'es';
let isAdmin = sessionStorage.getItem('aag-admin') === 'true';

// ===== DATA MANAGEMENT =====
const defaultData = {
  groups: [
    { id: 1, name: "Juventud Sin Límites", leader: "David & Sarah", desc: "Un espacio dinámico para jóvenes de 18 a 30 años. Música, amigos y conversaciones profundas.", day: "Viernes", time: "19:00", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80" },
    { id: 2, name: "Matrimonios Fuertes", leader: "Familia Gómez", desc: "Construyendo matrimonios con propósito. Una noche relajada de cena, comunidad y enseñanza.", day: "Sábados", time: "18:30", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80" },
    { id: 3, name: "Mujeres de Propósito", leader: "Pastora Elena", desc: "Reunión quincenal de mujeres para estudiar la Palabra, apoyarnos y tomar un buen café.", day: "Jueves", time: "10:00", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
    { id: 4, name: "Hombres de Valor", leader: "Carlos Ramírez", desc: "Desayuno mensual de hombres. Hablamos de liderazgo, familia y fe en el mundo de hoy.", day: "Sábados", time: "09:00", map: "https://maps.google.com", img: "https://images.unsplash.com/photo-1556484687-3063615661bc?w=800&q=80" }
  ],
  sermons: [
    { id: 1, title: "Inquebrantables: Construyendo sobre la Roca", speaker: "Pastor Principal", date: "11", month: "MAY", link: "#" },
    { id: 2, title: "El Poder de la Gracia Irresistible", speaker: "Pastor Invitado", date: "04", month: "MAY", link: "#" },
    { id: 3, title: "Renovando tu Mente", speaker: "Líder de Jóvenes", date: "27", month: "ABR", link: "#" },
    { id: 4, title: "Caminando por Fe y no por Vista", speaker: "Pastor Principal", date: "20", month: "ABR", link: "#" }
  ],
  songs: [
    { id: 1, name: "Océanos (Donde mis pies pueden fallar)", artist: "Hillsong en Español", link: "https://youtube.com" },
    { id: 2, name: "Gracia Incomparable", artist: "Hillsong Worship", link: "https://youtube.com" },
    { id: 3, name: "Hermoso Nombre", artist: "Hillsong en Español", link: "https://youtube.com" },
    { id: 4, name: "Digno y Santo", artist: "Kari Jobe", link: "https://youtube.com" }
  ]
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
    util_social: "Síguenos", hero_title: "Bienvenido a Casa", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Conoce Más", hero_scroll: "Descubre",
    about_label: "Nuestra Historia", about_title: "Quiénes Somos", 
    about_desc: "En Apostolic Assembly Germany creemos firmemente en que cada persona tiene un propósito divino. Somos una comunidad diversa, vibrante y llena de vida, unida por el amor a Jesús. Desde el primer momento en que cruzas nuestras puertas, nuestro mayor deseo es que te sientas en casa, rodeado de una familia que te acepta, te inspira y te acompaña en tu caminar.",
    about_mission_title: "Nuestra Misión", 
    about_mission: "Llevar el mensaje de esperanza y salvación de Cristo a cada rincón de Alemania, construyendo una iglesia apasionada por la presencia de Dios y comprometida con el amor al prójimo.",
    about_vision_title: "Nuestra Visión", 
    about_vision: "Ser una iglesia relevante, contemporánea y transformadora, donde las familias sean restauradas y los líderes sean levantados para influenciar positivamente a nuestra sociedad.",
    pastors_label: "Liderazgo", pastors_title: "Nuestros Pastores", pastors_name: "Pastores Marcos y Elena Gómez", pastors_role: "Pastores Principales", 
    pastors_bio: "Con más de 15 años de ministerio, los pastores Marcos y Elena tienen el profundo deseo de levantar una generación apasionada por Jesús en Europa. Su enfoque es la restauración familiar y la enseñanza de principios bíblicos prácticos que transforman el día a día. Han dedicado su vida a construir una iglesia auténtica donde todos puedan experimentar el poder del Espíritu Santo.",
    schedule_label: "Reuniones", schedule_title: "Nuestros Horarios", schedule_desc: "Nuestras puertas están abiertas. Únete a nosotros cada semana para experimentar una adoración poderosa, comunidad genuina y mensajes que impactarán tu vida.",
    sched_sunday: "Servicio Dominical", sched_sunday_day: "Domingos", sched_sunday_time: "10:00 & 12:30",
    sched_wednesday: "Noche de Liderazgo", sched_wednesday_day: "Miércoles", sched_wednesday_time: "19:00",
    sched_friday: "Viernes de Oración", sched_friday_day: "Viernes", sched_friday_time: "19:30",
    groups_label: "Comunidad", groups_title: "Grupos de Conexión", groups_desc: "La iglesia es más que un servicio de domingo. Es hacer la vida juntos. Nuestros grupos son el lugar perfecto para hacer amigos y crecer.",
    sermons_label: "Palabra", sermons_title: "Notas de Predicaciones", sermons_desc: "Revive los mensajes que están marcando el rumbo de nuestra iglesia. Lleva la Palabra contigo a donde vayas.",
    songs_label: "Adoración", songs_title: "Canciones del Domingo", songs_desc: "Nuestra adoración es una expresión sincera de amor a Dios. Escucha la lista de reproducción que cantaremos esta semana.",
    songs_week: "Setlist de esta semana", song_listen: "YouTube",
    visitors_title: "¿Es tu Primera Visita?", visitors_desc: "¡Nos encantaría conocerte! No importa de dónde vengas, cuál sea tu trasfondo o tu historia, aquí hay un lugar para ti. Ven tal como eres y acompáñanos a disfrutar de un gran café y un ambiente de fe.", visitors_cta: "Planifica tu Visita",
    contact_label: "Conecta", contact_title: "Estamos para Ayudarte", contact_desc: "¿Tienes alguna pregunta, necesitas oración o quieres saber más sobre nosotros? Déjanos un mensaje y nuestro equipo se contactará contigo.", contact_name: "Nombre Completo", contact_email: "Correo Electrónico", contact_message: "Escribe tu mensaje aquí...", contact_send: "Enviar Mensaje",
    footer_desc: "Una iglesia contemporánea en el corazón de Múnich, construyendo comunidad y compartiendo fe.", footer_rights: "Todos los derechos reservados.",
    prayer_label: "Oración", prayer_title: "Peticiones de Oración", prayer_desc: "¿Necesitas oración? Comparte tu petición con nosotros y estaremos intercediendo por ti.",
    prayer_name: "Tu nombre (opcional)", prayer_placeholder: "Escribe tu petición de oración aquí...", prayer_submit: "Enviar Petición",
    contact_address_label: "Dirección", contact_phone_label: "Teléfono", contact_email_label: "Email", contact_social_label: "Redes Sociales",
    footer_links: "Navegación", footer_services: "Recursos", footer_connect: "Conecta",
    footer_live: "Transmisión en Vivo", footer_events: "Eventos", footer_give: "Ofrendar"
  },
  en: {
    nav_home: "Home", nav_about: "About Us", nav_schedule: "Schedule", nav_groups: "Groups", nav_sermons: "Sermons", nav_songs: "Songs", nav_contact: "Contact",
    util_social: "Follow Us", hero_title: "Welcome Home", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Learn More", hero_scroll: "Discover",
    about_label: "Our Story", about_title: "Who We Are",
    about_desc: "At Apostolic Assembly Germany, we firmly believe that every person has a divine purpose. We are a diverse, vibrant community united by the love of Jesus. From the very first moment you walk through our doors, our greatest desire is for you to feel at home, surrounded by a family that accepts, inspires, and walks alongside you.",
    about_mission_title: "Our Mission",
    about_mission: "To bring the message of hope and salvation of Christ to every corner of Germany, building a church passionate about the presence of God and committed to loving our neighbors.",
    about_vision_title: "Our Vision",
    about_vision: "To be a relevant, contemporary and transforming church, where families are restored and leaders are raised to positively influence our society.",
    pastors_label: "Leadership", pastors_title: "Our Pastors", pastors_name: "Pastors Marcos & Elena Gómez", pastors_role: "Lead Pastors",
    pastors_bio: "With over 15 years of ministry, Pastors Marcos and Elena have a deep desire to raise a generation passionate about Jesus in Europe. Their focus is on family restoration and teaching practical biblical principles that transform everyday life.",
    schedule_label: "Services", schedule_title: "Our Schedule", schedule_desc: "Our doors are open. Join us every week to experience powerful worship, genuine community, and messages that will impact your life.",
    sched_sunday: "Sunday Service", sched_sunday_day: "Sundays", sched_sunday_time: "10:00 & 12:30",
    sched_wednesday: "Leadership Night", sched_wednesday_day: "Wednesdays", sched_wednesday_time: "7:00 PM",
    sched_friday: "Prayer Friday", sched_friday_day: "Fridays", sched_friday_time: "7:30 PM",
    groups_label: "Community", groups_title: "Connection Groups", groups_desc: "Church is more than a Sunday service. It's doing life together. Our groups are the perfect place to make friends and grow.",
    sermons_label: "The Word", sermons_title: "Sermon Notes", sermons_desc: "Relive the messages shaping the direction of our church. Take the Word with you wherever you go.",
    songs_label: "Worship", songs_title: "Songs of the Week", songs_desc: "Our worship is a sincere expression of love for God. Listen to the playlist we'll sing this week.",
    songs_week: "This week's setlist", song_listen: "YouTube",
    visitors_title: "Is This Your First Visit?", visitors_desc: "We'd love to meet you! No matter where you come from or what your background is, there's a place for you here. Come as you are and join us for great coffee and a faith-filled atmosphere.", visitors_cta: "Plan Your Visit",
    contact_label: "Connect", contact_title: "We're Here to Help", contact_desc: "Do you have a question, need prayer, or want to know more about us? Leave us a message and our team will get back to you.", contact_name: "Full Name", contact_email: "Email Address", contact_message: "Write your message here...", contact_send: "Send Message",
    footer_desc: "A contemporary church in the heart of Munich, building community and sharing faith.", footer_rights: "All rights reserved.",
    prayer_label: "Prayer", prayer_title: "Prayer Requests", prayer_desc: "Do you need prayer? Share your request with us and we will be interceding for you.",
    prayer_name: "Your name (optional)", prayer_placeholder: "Write your prayer request here...", prayer_submit: "Submit Request",
    contact_address_label: "Address", contact_phone_label: "Phone", contact_email_label: "Email", contact_social_label: "Social Media",
    footer_links: "Navigation", footer_services: "Resources", footer_connect: "Connect",
    footer_live: "Live Stream", footer_events: "Events", footer_give: "Give"
  },
  de: {
    nav_home: "Start", nav_about: "Über Uns", nav_schedule: "Gottesdienste", nav_groups: "Gruppen", nav_sermons: "Predigten", nav_songs: "Lieder", nav_contact: "Kontakt",
    util_social: "Folg Uns", hero_title: "Willkommen Zuhause", hero_subtitle: "Apostolic Assembly Germany", hero_cta: "Mehr Erfahren", hero_scroll: "Entdecken",
    about_label: "Unsere Geschichte", about_title: "Wer Wir Sind",
    about_desc: "Bei der Apostolic Assembly Germany glauben wir fest daran, dass jeder Mensch einen göttlichen Zweck hat. Wir sind eine vielfältige, lebendige Gemeinschaft, vereint durch die Liebe zu Jesus. Von dem Moment an, in dem du unsere Türen durchschreitest, ist unser größter Wunsch, dass du dich wie zu Hause fühlst.",
    about_mission_title: "Unsere Mission",
    about_mission: "Die Botschaft der Hoffnung und Erlösung Christi in jeden Winkel Deutschlands zu tragen und eine Kirche aufzubauen, die leidenschaftlich in der Gegenwart Gottes lebt.",
    about_vision_title: "Unsere Vision",
    about_vision: "Eine relevante, zeitgemäße und transformierende Kirche zu sein, in der Familien wiederhergestellt und Führungspersönlichkeiten aufgebaut werden.",
    pastors_label: "Führung", pastors_title: "Unsere Pastoren", pastors_name: "Pastoren Marcos & Elena Gómez", pastors_role: "Leitende Pastoren",
    pastors_bio: "Mit über 15 Jahren Dienst haben die Pastoren Marcos und Elena den tiefen Wunsch, eine Generation zu erwecken, die leidenschaftlich für Jesus in Europa ist. Ihr Fokus liegt auf der Familienwiederherstellung und der Vermittlung praktischer biblischer Prinzipien.",
    schedule_label: "Gottesdienste", schedule_title: "Unsere Zeiten", schedule_desc: "Unsere Türen stehen offen. Komm jede Woche zu uns, um kraftvolle Anbetung, echte Gemeinschaft und lebensverändernde Botschaften zu erleben.",
    sched_sunday: "Sonntagsgottesdienst", sched_sunday_day: "Sonntags", sched_sunday_time: "10:00 & 12:30",
    sched_wednesday: "Führungsabend", sched_wednesday_day: "Mittwochs", sched_wednesday_time: "19:00 Uhr",
    sched_friday: "Gebetsabend", sched_friday_day: "Freitags", sched_friday_time: "19:30 Uhr",
    groups_label: "Gemeinschaft", groups_title: "Verbindungsgruppen", groups_desc: "Kirche ist mehr als ein Sonntagsgottesdienst. Es geht darum, das Leben gemeinsam zu gestalten. Unsere Gruppen sind der perfekte Ort, um Freunde zu finden und zu wachsen.",
    sermons_label: "Das Wort", sermons_title: "Predigtnotizen", sermons_desc: "Erlebe die Botschaften, die unsere Gemeinde prägen, erneut. Nimm das Wort Gottes überall hin mit.",
    songs_label: "Anbetung", songs_title: "Lieder der Woche", songs_desc: "Unsere Anbetung ist ein aufrichtiger Ausdruck der Liebe zu Gott. Höre die Playlist, die wir diese Woche singen werden.",
    songs_week: "Setlist dieser Woche", song_listen: "YouTube",
    visitors_title: "Ist es Dein Erster Besuch?", visitors_desc: "Wir würden dich gerne kennenlernen! Egal woher du kommst – hier ist ein Platz für dich. Komm wie du bist und genieße einen guten Kaffee in einer glaubensvollen Atmosphäre.", visitors_cta: "Besuch Planen",
    contact_label: "Kontakt", contact_title: "Wir Sind Für Dich Da", contact_desc: "Hast du eine Frage, brauchst du Gebet oder möchtest mehr über uns erfahren? Hinterlasse uns eine Nachricht und unser Team wird sich bei dir melden.", contact_name: "Vollständiger Name", contact_email: "E-Mail-Adresse", contact_message: "Schreib deine Nachricht hier...", contact_send: "Nachricht Senden",
    footer_desc: "Eine zeitgemäße Kirche im Herzen von München, die Gemeinschaft aufbaut und den Glauben teilt.", footer_rights: "Alle Rechte vorbehalten.",
    prayer_label: "Gebet", prayer_title: "Gebetsanliegen", prayer_desc: "Brauchst du Gebet? Teile dein Anliegen mit uns und wir werden für dich eintreten.",
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

