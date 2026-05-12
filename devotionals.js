// ============================================================
//  PENSAMIENTOS DIARIOS — Asamblea Apostólica Alemania
//  Pastor Jhonatan Coitiño
// ============================================================
//
//  CÓMO AGREGAR UN PENSAMIENTO:
//  1. Copia un bloque { fecha, texto, versiculo } de los que ya hay
//  2. Cámbia la fecha al día que corresponde  (formato "DD-MM")
//  3. Escribe el texto del devocional
//  4. Escribe el versículo bíblico
//  5. Guarda el archivo y sube los cambios al repositorio
//
//  La página detecta la fecha de hoy y muestra el que corresponde
//  automáticamente. ¡No necesitas hacer nada más!
// ============================================================

const devotionalsList = [

  // ── MAYO 2026 ──────────────────────────────────────────────
  {
    fecha: "12-05",
    texto: "Hoy recuerda que la fidelidad de Dios no depende de tus circunstancias. Él ya fue fiel ayer, lo es hoy y lo será mañana. No te apoyes en lo que ves; apóyate en lo que Él ha prometido. Su Palabra no vuelve vacía.",
    versiculo: "\"Confía en el Señor con todo tu corazón, y no te apoyes en tu propio entendimiento.\" — Proverbios 3:5"
  },
  {
    fecha: "13-05",
    texto: "El descanso no es rendirse, es confiar. Hay batallas que no las ganas luchando más, sino entregándolas más. Deja hoy en manos de Dios aquello que llevas cargando solo.",
    versiculo: "\"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.\" — Mateo 11:28"
  },
  {
    fecha: "14-05",
    texto: "No subestimes los pequeños pasos. Cada día que caminas en obediencia, aunque no lo sientas, estás más cerca del propósito de Dios para tu vida. La perseverancia silenciosa también es una forma de adoración.",
    versiculo: "\"No nos cansemos de hacer el bien, pues a su tiempo cosecharemos si no desmayamos.\" — Gálatas 6:9"
  },
  {
    fecha: "15-05",
    texto: "Tu historia no terminó. Dios es el Dios de los nuevos comienzos. Lo que el enemigo quiso para destruirte, Dios lo está usando para formarte. Hoy es una oportunidad nueva.",
    versiculo: "\"Las misericordias del Señor jamás terminan, pues nunca fallan sus bondades; son nuevas cada mañana.\" — Lamentaciones 3:22-23"
  },
  {
    fecha: "16-05",
    texto: "La oración no es un último recurso, es el primer paso. Antes de buscar soluciones en tus fuerzas, habla con Dios. Él ya sabe lo que necesitas, pero quiere escucharte.",
    versiculo: "\"Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios.\" — Filipenses 4:6"
  },
  {
    fecha: "17-05",
    texto: "Hay una diferencia entre tener fe y actuar en fe. Hoy no solo creas que Dios puede, da el paso que Él te está pidiendo. La fe sin obras está muerta, pero la fe con obediencia mueve montañas.",
    versiculo: "\"Así también la fe, si no tiene obras, es muerta en sí misma.\" — Santiago 2:17"
  },
  {
    fecha: "18-05",
    texto: "Domingo es para recordar: no estás solo. La iglesia no es un edificio, es una familia. Cada vez que nos reunimos, Dios está en medio de nosotros. Hoy ven con expectativa.",
    versiculo: "\"Porque donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos.\" — Mateo 18:20"
  },
  {
    fecha: "19-05",
    texto: "Empieza la semana con gratitud. Antes de ver lo que falta, cuenta lo que tienes. Un corazón agradecido es un corazón preparado para recibir más de Dios.",
    versiculo: "\"Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros.\" — 1 Tesalonicenses 5:18"
  },
  {
    fecha: "20-05",
    texto: "No dejes que el miedo dicte tus decisiones. Dios no te dio espíritu de cobardía, sino de poder, de amor y de dominio propio. Atrévete hoy a hacer aquello que Dios puso en tu corazón.",
    versiculo: "\"Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.\" — 2 Timoteo 1:7"
  },
  {
    fecha: "21-05",
    texto: "Cuando no entiendas el proceso, confía en el Autor. Dios escribe la mejor historia con páginas que a veces no comprendemos. El final que Él tiene para ti es bueno.",
    versiculo: "\"Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.\" — Romanos 8:28"
  },

  // ── JUNIO 2026 ──────────────────────────────────────────────
  {
    fecha: "01-06",
    texto: "Nuevo mes, nueva oportunidad. Dios no mira tus errores del mes pasado para definir lo que hará en este. Su gracia se renueva cada mañana. Empieza junio con fe y expectativa.",
    versiculo: "\"He aquí que yo hago algo nuevo; ¿no lo percibes? He aquí que en el desierto abriré un camino.\" — Isaías 43:19"
  },
  {
    fecha: "15-06",
    texto: "A mitad de mes, detente un momento. ¿Cómo va tu vida de oración? ¿Estás buscando a Dios en medio de la rutina? Él no se fue a ningún lado; siempre está esperando que te acerques.",
    versiculo: "\"Acercaos a Dios, y él se acercará a vosotros.\" — Santiago 4:8"
  }

  // ── AGREGA MÁS PENSAMIENTOS AQUÍ ──────────────────────────
  // Copia el bloque de arriba y cambia la fecha y el texto
  //
  // {
  //   fecha: "DD-MM",
  //   texto: "Tu pensamiento aquí...",
  //   versiculo: "\"Texto del versículo.\" — Referencia"
  // },

];

// ============================================================
//  NO MODIFICAR ABAJO DE ESTA LÍNEA
// ============================================================
function getTodaysDevotional() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const todayKey = `${dd}-${mm}`;

  // Busca el de hoy
  const found = devotionalsList.find(d => d.fecha === todayKey);
  if (found) return found;

  // Si no hay uno para hoy, muestra el más reciente disponible
  return devotionalsList[devotionalsList.length - 1] || null;
}
