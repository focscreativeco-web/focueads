/* FOCUS — معرض الأعمال
   لإضافة عمل جديد: أضف عنصرًا إلى مصفوفة WORKS أدناه وضع الصورة في assets/img
   لإضافة ريلز (فيديو): { cat:'reels', video:'assets/video/reel-1.mp4', img:'صورة الغلاف', ... } */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
let lang = 'ar';
const t = (o) => (o && typeof o === 'object') ? (o[lang] ?? o.ar) : o;

/* ---------- البيانات ---------- */
const TICKER = {
  ar: ['استراتيجيات التسويق', 'هويات بصرية', 'تصميم العبوات', 'حملات إعلانية', 'بوستات السوشال ميديا', 'ريلز وموشن جرافيك', 'إنتاج إعلاني'],
  en: ['Marketing strategy', 'Visual identity', 'Packaging design', 'Ad campaigns', 'Social media content', 'Reels & motion', 'Ad production'],
  lat: ['Marketing', 'Branding', 'Packaging', 'Advertising', 'Social Media', 'Motion', 'Production']
};

const IDEA = [
  { k: { ar: 'الدائرة', en: 'The circle' }, v: { ar: 'العدسة · الاكتمال · الحضور القوي', en: 'Lens · Completeness · Strong presence' } },
  { k: { ar: 'فتحة التركيز', en: 'The aperture' }, v: { ar: 'التبصّر · الاتجاه · الملاحظة', en: 'Insight · Direction · Observation' } },
  { k: { ar: 'حرف F', en: 'The letter F' }, v: { ar: 'FOCUS · التقدّم · المحاذاة', en: 'FOCUS · Progress · Alignment' } },
  { k: { ar: 'اللون الليموني', en: 'Electric lime' }, v: { ar: 'الطاقة · الجذب · الابتكار', en: 'Energy · Attraction · Innovation' } },
  { k: { ar: 'التباين والفراغ', en: 'Contrast & space' }, v: { ar: 'الوضوح · الثقة · الفخامة', en: 'Clarity · Trust · Elegance' } }
];

const SERVICES = [
  { ic: 'i-chart', t: { ar: 'الاستراتيجيات التسويقية', en: 'Marketing strategy' }, d: { ar: 'خطط تسويقية مبنية على فهم السوق والجمهور، تحدد الرسالة والقنوات والأهداف القابلة للقياس.', en: 'Plans built on a clear read of the market and audience — message, channels and measurable goals.' } },
  { ic: 'i-shapes', t: { ar: 'الهويات البصرية والعبوات', en: 'Identity & packaging' }, d: { ar: 'شعارات وأنظمة هوية متكاملة، وتصميم ملصقات العبوات والمنتجات بشكل حديث يلفت النظر على الرف.', en: 'Logos, complete identity systems, and modern pack and label design that stands out on the shelf.' } },
  { ic: 'i-mega', t: { ar: 'الحملات الإعلانية', en: 'Ad campaigns' }, d: { ar: 'أفكار إعلانية قصصية تربط المنتج بحياة المستهلك اليومية، من الفكرة حتى التنفيذ.', en: 'Story-led campaign ideas that tie the product to everyday life, from concept to execution.' } },
  { ic: 'i-social', t: { ar: 'محتوى السوشال ميديا', en: 'Social media content' }, d: { ar: 'تصاميم ومحتوى دوري لمنصات التواصل يحافظ على حضور العلامة وتفاعل جمهورها.', en: 'Regular designs and content that keep the brand present and its audience engaged.' } },
  { ic: 'i-reel', t: { ar: 'الريلز والموشن جرافيك', en: 'Reels & motion graphics' }, d: { ar: 'فيديوهات قصيرة وموشن جرافيك بإيقاع يناسب المنصات ويشدّ الانتباه من الثانية الأولى.', en: 'Short-form video and motion graphics paced for each platform and built to hook in the first second.' } },
  { ic: 'i-camera', t: { ar: 'الإنتاج الإعلاني', en: 'Advertising production' }, d: { ar: 'إخراج بصري وتصوير للمنتجات والإعلانات بجودة تليق بالعلامة.', en: 'Art direction and product photography at the standard your brand deserves.' } }
];

const VALUES = [
  { ic: 'i-target', t: { ar: 'التركيز', en: 'Focus' }, d: { ar: 'نصنع الهدف في المركز', en: 'We put the target at the centre' }, en: 'Focus' },
  { ic: 'i-eye', t: { ar: 'الرؤية', en: 'Vision' }, d: { ar: 'نرى ما وراء الصورة', en: 'We see beyond the image' }, en: 'Vision' },
  { ic: 'i-forward', t: { ar: 'الحركة', en: 'Motion' }, d: { ar: 'ندفع الأفكار إلى الأمام', en: 'We push ideas forward' }, en: 'Motion', flip: true },
  { ic: 'i-ruler', t: { ar: 'الدقة', en: 'Precision' }, d: { ar: 'في التنفيذ والتفاصيل', en: 'In execution and every detail' }, en: 'Precision' },
  { ic: 'i-bulb', t: { ar: 'الإبداع', en: 'Creativity' }, d: { ar: 'من الفكرة إلى الإبهار', en: 'From idea to wow' }, en: 'Creativity' },
  { ic: 'i-waves', t: { ar: 'التأثير', en: 'Impact' }, d: { ar: 'نصنع أثرًا يدوم', en: 'We leave a lasting mark' }, en: 'Impact' }
];

const STEPS = [
  { t: { ar: 'نستمع ونحلّل', en: 'Listen & analyse' }, d: { ar: 'نفهم علامتك وسوقك وجمهورك وأهدافك قبل أي تصميم.', en: 'We understand your brand, market, audience and goals before any design.' } },
  { t: { ar: 'نحدد البؤرة', en: 'Find the focus' }, d: { ar: 'نصوغ الاستراتيجية والرسالة والفكرة المحورية للحملة.', en: 'We shape the strategy, the message and the core campaign idea.' } },
  { t: { ar: 'نصنع', en: 'Create' }, d: { ar: 'نصمم وننتج الهوية والمحتوى والإعلانات بكل تفاصيلها.', en: 'We design and produce the identity, content and ads in full detail.' } },
  { t: { ar: 'نطلق ونقيس', en: 'Launch & measure' }, d: { ar: 'ننشر ونتابع الأداء ونطوّر النتائج باستمرار.', en: 'We publish, track performance and keep improving the results.' } }
];

const CATS = [
  { id: 'all', t: { ar: 'الكل', en: 'All' } },
  { id: 'campaign', t: { ar: 'حملات إعلانية', en: 'Campaigns' } },
  { id: 'packaging', t: { ar: 'تصميم عبوات', en: 'Packaging' } },
  { id: 'social', t: { ar: 'سوشال ميديا', en: 'Social media' } },
  { id: 'reels', t: { ar: 'ريلز', en: 'Reels' } }
];

/* دراسات الحالة: كل عمل في WORKS يحمل p = معرّف المشروع */
const PROJECTS = {
  najah: {
    cat: 'campaign', logo: 'assets/img/client-najah.webp', label: 'Case study · Campaign · 2026',
    title: { ar: 'شركة النجاح للصناعات الغذائية', en: 'Al-Najah Food Industries' },
    sub: { ar: 'رؤية بصرية متكاملة لتعزيز الحضور الرقمي لمنتجات الشركة: مقترح خطة تسويق، وحملة إعلانية لمنصات التواصل الاجتماعي، وريلز إعلانية.', en: 'An integrated visual vision to strengthen the digital presence of Al-Najah\u2019s products: a marketing plan proposal, a social media ad campaign and campaign reels.' },
    meta: [
      [{ ar: 'المجال', en: 'Sector' }, { ar: 'الصناعات الغذائية', en: 'Food industries' }],
      [{ ar: 'الخدمات', en: 'Services' }, { ar: 'خطة تسويق · حملة · ريلز', en: 'Marketing plan · Campaign · Reels' }],
      [{ ar: 'المنصات', en: 'Channels' }, { ar: 'منصات التواصل الاجتماعي', en: 'Social media platforms' }]
    ],
    focus: { ar: 'الفكرة المحورية: إبراز جودة المنتج وربطه بالحياة اليومية للمستهلك.', en: 'Core idea: highlight product quality and tie it to the consumer\u2019s everyday life.' }
  },
  canary: {
    cat: 'packaging', logo: 'assets/img/client-canary-badge.webp', label: 'Case study · Packaging · 2026',
    title: { ar: 'شركة ألوان الكناري للصناعات الغذائية', en: 'Canary Colors for Food Industries' },
    sub: { ar: 'تحديث شكل تصميم ليبل عبوة عصير «كروز» 200 مل بتصميم حديث.', en: 'A modern redesign of the label for the 200 ml Cruz juice pack.' },
    meta: [
      [{ ar: 'المنتج', en: 'Product' }, { ar: 'كروز — نكتار المانجو', en: 'Cruz — Mango nectar' }],
      [{ ar: 'الخدمة', en: 'Service' }, { ar: 'تحديث تصميم ليبل العبوة', en: 'Pack label redesign' }],
      [{ ar: 'الحجم', en: 'Size' }, { ar: '200 مل', en: '200 ml' }]
    ],
    focus: { ar: 'الفكرة المحورية: تصميم حديث يبرز المنتج ويمنح علامة «كروز» حضورًا أوضح على الرف.', en: 'Core idea: a modern design that puts the product forward and gives Cruz a clearer presence on the shelf.' }
  },
  kabous: {
    cat: 'social', logo: 'assets/img/client-kabous-badge.webp', label: 'Case study · Social media · 2026',
    title: { ar: 'شركة مياه الكبوس', en: 'Al-Kabous Water' },
    sub: { ar: 'تحديث بوستات السوشال ميديا لعلامة مياه الكبوس بأسلوب بصري حديث يبرز نقاء المنتج، من السماء الزرقاء إلى لحظات الحياة اليومية والمناسبات.', en: 'Refreshed social media posts for Al-Kabous Water in a modern visual style that highlights purity — from blue skies to everyday moments and occasions.' },
    meta: [
      [{ ar: 'المجال', en: 'Sector' }, { ar: 'المياه المعبأة', en: 'Bottled water' }],
      [{ ar: 'الخدمة', en: 'Service' }, { ar: 'تصميم بوستات السوشال ميديا', en: 'Social media post design' }],
      [{ ar: 'المنصات', en: 'Channels' }, { ar: 'منصات التواصل الاجتماعي', en: 'Social media platforms' }]
    ],
    focus: { ar: 'الفكرة المحورية: صور نظيفة ورسائل قصيرة تربط مياه الكبوس بالنقاء وبلحظات الحياة اليومية.', en: 'Core idea: clean imagery and short messages that tie Al-Kabous to purity and everyday moments.' }
  }
};

const GROUPS = {
  reels: { ar: 'ريلز الحملات الإعلانية', en: 'Campaign reels' }
};

const WORKS = [
  { cat: 'campaign', p: 'najah', img: 'assets/img/najah-school.webp', t: { ar: 'الطاقة والعودة للمدارس', en: 'Energy & back to school' }, d: { ar: 'تصميم إعلاني قصصي (Storytelling) يبتكر زاوية بصرية غير تقليدية تجذب الانتباه الفوري.', en: 'A storytelling ad with an unconventional visual angle that grabs attention instantly.' } },
  { cat: 'campaign', p: 'najah', img: 'assets/img/najah-study.webp', t: { ar: 'رفيق المذاكرة والإنجاز', en: 'The study companion' }, d: { ar: 'محتوى موجّه لفئة الطلاب والشباب يربط المنتج بالطاقة والتركيز أثناء الدراسة والعمل.', en: 'Content for students and young people linking the product to energy and focus while studying and working.' } },
  { cat: 'campaign', p: 'najah', img: 'assets/img/najah-family.webp', t: { ar: 'وصفات المائدة العائلية', en: 'Family table recipes' }, d: { ar: 'ربط المنتج بالمائدة العائلية والوصفات الشهية لتحفيز قرار الشراء المباشر.', en: 'Placing the product at the family table with appetising recipes to prompt purchase.' } },
  { cat: 'campaign', p: 'najah', img: 'assets/img/najah-dairy.webp', t: { ar: 'الطعم والنقاء الطبيعي', en: 'Natural taste & purity' }, d: { ar: 'يبرز جودة ونقاء منتجات الألبان اليومية من شركة النجاح.', en: 'Highlighting the quality and purity of Al-Najah’s everyday dairy.' } },
  { cat: 'packaging', p: 'canary', img: 'assets/img/canary-cruz-pack.webp', t: { ar: 'ليبل عبوة كروز — نكتار المانجو 200 مل', en: 'Cruz label — Mango nectar 200 ml' }, d: { ar: 'التصميم الجديد للعبوة: شعار «كروز» في الأعلى، واسم المنتج بالعربية والإنجليزية، ودوامة عصير مع شرائح المانجو تمنح العبوة حيوية وشهية.', en: 'The new pack: the Cruz logo up top, the product name in Arabic and English, and a juice swirl with mango slices for energy and appetite.' } },
  { cat: 'packaging', p: 'canary', img: 'assets/img/canary-cruz-ad.webp', t: { ar: 'إعلان إطلاق العبوة الجديدة', en: 'New pack launch post' }, d: { ar: 'تصميم للسوشال ميديا يقدّم العبوة بتصميمها الجديد مع رذاذ العصير وشارة «جديد».', en: 'A social post introducing the redesigned pack with a juice splash and a \u201cNew\u201d badge.' } },
  { cat: 'social', p: 'kabous', img: 'assets/img/kabous-post-1.webp', t: { ar: 'بساطة النقاء', en: 'The simplicity of purity' }, d: { ar: 'العبوة بين السماء والشريط الأزرق في تكوين نظيف يعكس نقاء المياه.', en: 'The bottle between sky and ribbon in a clean composition that reflects the water\u2019s purity.' } },
  { cat: 'social', p: 'kabous', img: 'assets/img/kabous-post-2.webp', t: { ar: 'لحظة عطش', en: 'A moment of thirst' }, d: { ar: 'مشهد من الحياة اليومية بالزي اليمني التقليدي يربط المنتج بلحظة الارتواء.', en: 'An everyday scene in traditional Yemeni dress that ties the product to the moment of refreshment.' } },
  { cat: 'social', p: 'kabous', img: 'assets/img/kabous-post-3.webp', t: { ar: 'جمعة طيبة', en: 'Blessed Friday' }, d: { ar: 'بوست تهنئة بيوم الجمعة يجمع العبوة بالتمر والمسبحة.', en: 'A Friday greeting post pairing the bottle with dates and prayer beads.' } }
  // مثال ريلز:
  // { cat: 'reels', img: 'assets/img/najah-school.webp', video: 'assets/video/reel-1.mp4', t: { ar: 'ريلز العودة للمدارس', en: 'Back to school reel' }, d: { ar: '...', en: '...' } },
];

/* ---------- الترجمة ---------- */
const EN = {
  'skip': 'Skip to content', 'menu': 'Menu', 'cursor': 'View',
  'nav.about': 'About', 'nav.services': 'Services', 'nav.work': 'Work', 'nav.values': 'Values', 'nav.contact': 'Contact',
  'hero.title': 'We put your brand<br>in <span class="brush">sharp</span> focus',
  'hero.lead': 'Focus — Marketing &amp; Advertising Production. We develop strategic concepts, visual identities and ad campaigns that put your brand at the right centre for its audience.',
  'hero.cta1': 'See our work', 'hero.cta2': 'Company profile', 'hero.scroll': 'Scroll to explore',
  'lens.dot': 'Focal point', 'lens.lens': 'The lens',
  'about.title': 'About us',
  'about.quote': '<q>The strongest ideas aren’t the loudest — they’re the ones placed in the right focus.</q>',
  'about.p1': 'Focus is a marketing and advertising production house. We work with brands from the very first idea to the moment they meet their audience: we analyse the market, build the strategy, design the identity and produce the campaign and content.',
  'about.p2': 'Our name is our method: we clear the noise, find what matters and put it at the centre. That’s why our work reads clear and confident — and is built to leave a lasting mark.',
  'about.idea': 'The idea — the lens and the focal point',
  'svc.title': 'Services', 'svc.intro': 'Everything your brand needs to be seen clearly — under one roof.',
  'work.title': 'Selected work',
  'val.title': 'Intrinsic Values',
  'proc.title': 'How we work', 'proc.intro': 'From noise to clarity, in four steps.',
  'ct.title': 'Contact', 'ct.big': 'Let’s put your brand<br>at the <span class="brush">centre</span>.',
  'ct.sub': 'The Focus marketing and advertising production team is ready to start on your next project right away.',
  'ct.mail': 'Email', 'ct.phone': 'Phone', 'ct.wa': 'WhatsApp', 'ct.ig': 'Instagram',
  'ct.cta1': 'Start your project on WhatsApp', 'ct.cta2': 'Browse the company profile',
  'foot.copy': '© 2026 Focus Marketing &amp; Advertising Production. All rights reserved.', 'foot.motion': 'Reduce motion'
};
const AR = {};
$$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (!(k in AR)) AR[k] = el.innerHTML; });

/* ---------- العرض ---------- */
const enc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let filter = 'all';

function renderStatic() {
  const words = TICKER[lang];
  const row = arr => arr.map(w => `<span>${enc(w)}<i></i></span>`).join('');
  $('#trackAr').innerHTML = row(words) + row(words) + row(words) + row(words);
  $('#trackLat').innerHTML = row(TICKER.lat).repeat(4);

  $('#ideaList').innerHTML = IDEA.map(r => `<li><b>${enc(t(r.k))}</b><i class="line"></i><span>${enc(t(r.v))}</span></li>`).join('');

  $('#svcGrid').innerHTML = SERVICES.map((s, i) => `<article class="svc rv" style="--d:${(i % 3) * .08}s" tabindex="0">
    <span class="n">0${i + 1}</span><span class="ic"><svg><use href="#${s.ic}"/></svg></span>
    <h3>${enc(t(s.t))}</h3><p>${enc(t(s.d))}</p></article>`).join('');

  $('#valGrid').innerHTML = VALUES.map((v, i) => `<div class="val rv${v.flip ? ' flip' : ''}" style="--d:${(i % 3) * .08}s">
    <span class="ic"><svg><use href="#${v.ic}"/></svg></span>
    <span class="lat">${v.en}</span><h3><span class="brush">${enc(t(v.t))}</span></h3><p>${enc(t(v.d))}</p></div>`).join('');

  $('#steps').innerHTML = STEPS.map((s, i) => `<li class="step"><span class="n">0${i + 1}</span><h3>${enc(t(s.t))}</h3><p>${enc(t(s.d))}</p></li>`).join('');

  const used = new Set(WORKS.map(w => w.cat));
  $('#filters').innerHTML = CATS.filter(c => c.id === 'all' || used.has(c.id)).map(c => {
    const n = c.id === 'all' ? WORKS.length : WORKS.filter(w => w.cat === c.id).length;
    return `<button class="chip" type="button" data-f="${c.id}" aria-pressed="${filter === c.id}">${enc(t(c.t))}<sup>${n}</sup></button>`;
  }).join('');
  renderWorks();
}

function caseHTML(id) {
  const P = PROJECTS[id], n = WORKS.filter(w => w.p === id).length;
  return `<article class="case rv${n <= 2 ? ' half' : ''}" data-cat="${P.cat}">
    <div class="case-logo"><img src="${P.logo}" alt="${enc(t(P.title))}" loading="lazy"></div>
    <div><span class="label">${P.label}</span><h3>${enc(t(P.title))}</h3><p>${enc(t(P.sub))}</p>
    <dl class="meta">${P.meta.map(([k, v]) => `<div><dt>${enc(t(k))}</dt><dd>${enc(t(v))}</dd></div>`).join('')}</dl>
    <blockquote>${enc(t(P.focus))}</blockquote></div></article>`;
}

function renderWorks() {
  let out = '';
  const seen = new Set();
  WORKS.forEach((w, i) => {
    const key = w.p || w.cat;
    if (!seen.has(key)) {
      seen.add(key);
      out += w.p ? caseHTML(w.p) : `<h3 class="grid-group" data-cat="${w.cat}"><span class="tick"></span>${enc(t(GROUPS[w.cat]))}</h3>`;
    }
    const cat = CATS.find(c => c.id === w.cat);
    const n = w.p ? WORKS.filter(x => x.p === w.p).length : 4;
    out += `<button class="card rv${n === 3 ? ' n3' : ''}" type="button" data-i="${i}" data-cat="${w.cat}" data-cursor style="--d:${(i % 4) * .07}s">
      <span class="ph"><img src="${w.img}" alt="${enc(t(w.t))}" loading="lazy" width="1047" height="1303"><span class="zoom"><svg><use href="#${w.video ? 'i-reel' : 'i-plus'}"/></svg></span></span>
      <span class="cat">${enc(t(cat.t))}</span><span class="ct">${enc(t(w.t))}</span><span class="cd">${enc(t(w.d))}</span></button>`;
  });
  $('#workGrid').innerHTML = out;
  applyFilter();
}

function applyFilter() {
  $$('#workGrid .card').forEach(c => c.classList.toggle('hide', filter !== 'all' && c.dataset.cat !== filter));
  $$('#workGrid .grid-group, #workGrid .case').forEach(g => g.classList.toggle('hide', filter !== 'all' && g.dataset.cat !== filter));
  $$('#filters .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === filter));
  observe();
}

/* ---------- اللغة ---------- */
function setLang(l) {
  lang = l;
  html.lang = l; html.dir = l === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; const v = l === 'en' ? EN[k] : AR[k]; if (v != null) el.innerHTML = v; });
  const b = $('#langBtn');
  b.textContent = l === 'ar' ? 'EN' : 'ع';
  b.setAttribute('aria-label', l === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = l === 'ar' ? 'فوكس | FOCUS — للتسويق والإنتاج الإعلاني' : 'FOCUS — Marketing & Advertising Production';
  renderStatic();
  try { localStorage.setItem('focus-lang', l); } catch (e) {}
}
$('#langBtn').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));

/* ---------- الظهور التدريجي (ضبط البؤرة) ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px', threshold: .12 }) : null;
function observe() {
  $$('.rv:not(.in), .steps:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in'));
}

/* ---------- الفلاتر ---------- */
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  filter = b.dataset.f; applyFilter();
});

/* ---------- العارض ---------- */
const lb = $('#lb'); let cur = 0;
const visible = () => WORKS.map((w, i) => i).filter(i => filter === 'all' || WORKS[i].cat === filter);
function show(i) {
  cur = i; const w = WORKS[i]; const list = visible();
  $('#lbStage').innerHTML = w.video
    ? `<video src="${w.video}" poster="${w.img}" controls autoplay playsinline></video>`
    : `<img src="${w.img}" alt="${enc(t(w.t))}">`;
  $('#lbTitle').textContent = t(w.t); $('#lbDesc').textContent = t(w.d);
  $('#lbCount').textContent = `${list.indexOf(i) + 1} / ${list.length}`;
}
function step(d) { const l = visible(); show(l[(l.indexOf(cur) + d + l.length) % l.length]); }
$('#workGrid').addEventListener('click', e => {
  const c = e.target.closest('.card'); if (!c) return;
  show(+c.dataset.i);
  if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
});
const closeLb = () => { $('#lbStage').innerHTML = ''; lb.close ? lb.close() : lb.removeAttribute('open'); };
$('#lbClose').addEventListener('click', closeLb);
$('#lbNext').addEventListener('click', () => step(1));
$('#lbPrev').addEventListener('click', () => step(-1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lbStage') closeLb(); });
lb.addEventListener('cancel', e => { e.preventDefault(); closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.open) return;
  const rtl = html.dir === 'rtl';
  if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
  if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
});
let tx = null;
lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 50) step((dx < 0) === (html.dir === 'rtl') ? 1 : -1);
});

/* ---------- الهيدر والقائمة ---------- */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const menuBtn = $('#menuBtn'), sheet = $('#sheet');
function menu(open) {
  const r = menuBtn.getBoundingClientRect();
  sheet.style.setProperty('--mx', r.left + r.width / 2 + 'px');
  sheet.style.setProperty('--my', r.top + r.height / 2 + 'px');
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open);
}
menuBtn.addEventListener('click', () => menu(!document.body.classList.contains('menu-open')));
sheet.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') menu(false); });

const links = $$('.nav-links a');
const secIo = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' }) : null;
if (secIo) $$('main section[id]').forEach(s => secIo.observe(s));

/* ---------- تقليل الحركة ---------- */
const mb = $('#motionBtn');
const syncMotion = () => mb.setAttribute('aria-pressed', html.dataset.motion === 'reduce');
mb.addEventListener('click', () => {
  const r = html.dataset.motion !== 'reduce';
  if (r) html.dataset.motion = 'reduce'; else delete html.dataset.motion;
  try { localStorage.setItem('focus-motion', r ? 'reduce' : 'full'); } catch (e) {}
  syncMotion();
});
syncMotion();

/* ---------- العدسة ونقطة البؤرة ---------- */
const lens = $('#lens');
const fine = matchMedia('(pointer: fine)').matches;
if (fine) {
  addEventListener('pointermove', e => {
    if (html.dataset.motion === 'reduce') return;
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    lens.style.setProperty('--px', x.toFixed(3)); lens.style.setProperty('--py', y.toFixed(3));
  }, { passive: true });

  const cz = $('#cursor'), dot = $('.dot', cz), ring = $('.ring', cz);
  document.body.classList.add('has-cursor');
  let mx = -100, my = -100, rx = -100, ry = -100;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
  (function loop() { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => cz.classList.toggle('big', !!e.target.closest('[data-cursor]')));
  document.addEventListener('pointerleave', () => { mx = my = -100; });
}

/* ---------- البدء ---------- */
let saved = null;
try { saved = new URLSearchParams(location.search).get('lang') || localStorage.getItem('focus-lang'); } catch (e) {}
if (saved === 'en') setLang('en'); else renderStatic();
})();
