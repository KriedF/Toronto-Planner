/* ================================
   Toronto Trip Planner — app.js
   ================================ */

// ─── ACTIVITY DATA ────────────────────────────────────────────────
// type:
//   'full-day-exclusive' — fills all 3 slots, nothing else that day
//   'half-day'           — fills morning OR afternoon
//   'any-time'           — morning, afternoon, or evening

const ACTIVITIES = {
  wonderland: {
    id: 'wonderland', name: "Canada's Wonderland", emoji: '🎢',
    color: '#C46A6A', bg: '#FDEAEA',
    type: 'full-day-exclusive', allowedSlots: ['morning','afternoon','evening'],
    duration: 'Full day (8–10 hrs)',
    rule: 'Full day only · Must be the only activity that day · Rides, shows & waterpark'
  },
  niagara: {
    id: 'niagara', name: 'Niagara Falls', emoji: '🌊',
    color: '#5A9EC8', bg: '#E4F2FD',
    type: 'full-day-exclusive', allowedSlots: ['morning','afternoon','evening'],
    duration: 'Full day (8+ hrs)',
    rule: 'Full day only · Day trip from Toronto · ~1.5 hr each way by bus/car'
  },
  zoo: {
    id: 'zoo', name: 'Toronto Zoo', emoji: '🦁',
    color: '#7AAE6A', bg: '#EAF5E4',
    type: 'full-day-exclusive', allowedSlots: ['morning','afternoon','evening'],
    duration: 'Full day (5–7 hrs)',
    rule: 'Full day only · Open 9:30am–4:30pm · Best to arrive early'
  },
  islands: {
    id: 'islands', name: 'Toronto Islands', emoji: '🏝️',
    color: '#C8A85A', bg: '#FDF6E4',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: 'Half day (3–4 hrs)',
    rule: 'Morning or afternoon · Ferry from Jack Layton Terminal · Bike hire, beaches, picnic'
  },
  highpark: {
    id: 'highpark', name: 'High Park', emoji: '🌳',
    color: '#6AAE7A', bg: '#E8F5EC',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: 'Half day (2–3 hrs)',
    rule: 'Morning or afternoon · Free entry · Cherry blossoms in spring · Grenadier Pond'
  },
  bluffs: {
    id: 'bluffs', name: 'Scarborough Bluffs', emoji: '🏔️',
    color: '#7AB8C8', bg: '#E4F4F8',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: 'Half day (3–4 hrs)',
    rule: 'Morning or afternoon · Free · Dawn to dusk · Bluffer\'s Park + beach in summer'
  },
  rom: {
    id: 'rom', name: 'Royal Ontario Museum', emoji: '🏛️',
    color: '#C8A456', bg: '#FDF5E4',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: 'Half day (2–3 hrs)',
    rule: 'Morning or afternoon · Largest museum in Canada · Use Weston entrance (Bloor St under construction until 2027)'
  },
  ago: {
    id: 'ago', name: 'Art Gallery of Ontario', emoji: '🎨',
    color: '#9B7EC8', bg: '#EFE8FF',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '2 hrs',
    rule: 'Morning or afternoon · Free for under-25s · Free Wed 6–9pm · Frank Gehry building'
  },
  casaloma: {
    id: 'casaloma', name: 'Casa Loma', emoji: '🏰',
    color: '#8494C8', bg: '#EAF0FF',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '2 hrs',
    rule: 'Morning or afternoon · Gothic Revival castle · Great views of the city'
  },
  cntower: {
    id: 'cntower', name: 'CN Tower', emoji: '🗼',
    color: '#7A9EC8', bg: '#E4EFFE',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '1–2 hrs',
    rule: 'Morning or afternoon · Book in advance · EdgeWalk + 360 Restaurant available'
  },
  aquarium: {
    id: 'aquarium', name: "Ripley's Aquarium", emoji: '🐠',
    color: '#5A9EC8', bg: '#E4F2FD',
    type: 'any-time', allowedSlots: ['morning','afternoon','evening'],
    duration: '2 hrs',
    rule: 'Any time · Open 9am–9pm (Thu 9am–8pm) · Great evening option · Pairs well with CN Tower'
  },
  distillery: {
    id: 'distillery', name: 'Distillery District', emoji: '🏭',
    color: '#C89070', bg: '#FDF1E8',
    type: 'any-time', allowedSlots: ['morning','afternoon','evening'],
    duration: '2–3 hrs',
    rule: 'Any time · Free to explore · Victorian industrial architecture · Galleries, cafés & bars'
  },
  stlawrence: {
    id: 'stlawrence', name: 'St. Lawrence Market', emoji: '🛍️',
    color: '#C88056', bg: '#FDF0E8',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '1–2 hrs',
    rule: 'Morning best · Closed Mondays · Tue–Sat 9am–8pm, Sun 10am–5pm · Pairs well with a Distillery visit'
  },
  kensington: {
    id: 'kensington', name: 'Kensington Market', emoji: '🎪',
    color: '#C87A6A', bg: '#FDE8E8',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '2 hrs',
    rule: 'Afternoon best (11am–7pm) · Vintage shops, street food & cafés · Last Sun of month = Pedestrian Sunday'
  },
  harbourfront: {
    id: 'harbourfront', name: "Harbourfront + Queen's Quay", emoji: '⛵',
    color: '#5ABEC8', bg: '#E4F8F9',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '2 hrs',
    rule: 'Morning or afternoon · Free · Waterfront walk, Trillium Park, sugar beach'
  },
  hockeyHall: {
    id: 'hockeyHall', name: 'Hockey Hall of Fame', emoji: '🏒',
    color: '#7A84C8', bg: '#EAECFF',
    type: 'half-day', allowedSlots: ['morning','afternoon'],
    duration: '1.5 hrs',
    rule: 'Morning or afternoon · Best-value paid attraction in the city · Near Union Station'
  },
  dinner: {
    id: 'dinner', name: 'Dinner Out', emoji: '🍽️',
    color: '#C87A70', bg: '#FDE8E6',
    type: 'evening', allowedSlots: ['evening'],
    duration: 'Evening',
    rule: 'Evening · Toronto has great spots in Chinatown, Little Italy, Ossington & King West'
  },
  theatre: {
    id: 'theatre', name: 'Theatre / Show', emoji: '🎭',
    color: '#8B72C8', bg: '#EDE8FF',
    type: 'evening', allowedSlots: ['evening'],
    weekendSlots: ['afternoon','evening'],
    duration: 'Evening',
    rule: 'Evening (weekdays) · Afternoon or evening on weekends · Mirvish, Second City, Hot Docs'
  },
  sports: {
    id: 'sports', name: 'Sports Game', emoji: '🏀',
    color: '#6AAE9A', bg: '#E4F5F0',
    type: 'evening', allowedSlots: ['evening'],
    weekendSlots: ['afternoon','evening'],
    duration: 'Evening',
    rule: 'Evening most nights · Leafs (hockey), Raptors (basketball), Blue Jays (baseball) · Check schedule'
  }
};

const CATEGORIES = [
  { key: 'full-day',       label: '🗓 Full Day',             ids: ['wonderland', 'niagara', 'zoo'] },
  { key: 'museums',        label: '🏛 Museums & Landmarks',  ids: ['rom', 'ago', 'casaloma', 'cntower', 'hockeyHall', 'aquarium'] },
  { key: 'outdoors',       label: '🌿 Parks & Outdoors',     ids: ['islands', 'highpark', 'bluffs', 'harbourfront'] },
  { key: 'neighbourhoods', label: '🏙 Neighbourhoods',       ids: ['distillery', 'kensington', 'stlawrence'] },
  { key: 'evenings',       label: '🌙 Evenings',             ids: ['dinner', 'theatre', 'sports'] },
];

const SLOT_LABELS = [
  { id: 'morning',   label: '☀️ Morning'   },
  { id: 'afternoon', label: '🌤️ Afternoon' },
  { id: 'evening',   label: '🌙 Evening'   }
];

const WEEKEND_DAYS = new Set([0, 6]); // Sunday=0, Saturday=6 in JS Date

// ─── STATE ────────────────────────────────────────────────────────

let startDate = new Date();
startDate.setDate(startDate.getDate() + 1); // default: tomorrow

function emptySchedule() {
  const s = {};
  for (let i = 0; i < 7; i++) {
    s[`day${i}`] = { morning: null, afternoon: null, evening: null };
  }
  return s;
}

let schedule = emptySchedule();
let dragging = null;

// ─── DATE HELPERS ─────────────────────────────────────────────────

function getDays() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const weekday = d.getDay(); // 0=Sun, 6=Sat
    return {
      id: `day${i}`,
      label: d.toLocaleDateString('en-CA', { weekday: 'long' }),
      date:  d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
      isWeekend: weekday === 0 || weekday === 6,
      weekday
    };
  });
}

function toInputValue(date) {
  return date.toISOString().slice(0, 10);
}

// ─── PERSIST ──────────────────────────────────────────────────────

function saveState() {
  localStorage.setItem('toronto_planner_v1', JSON.stringify({
    startDate: toInputValue(startDate),
    schedule
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem('toronto_planner_v1');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.startDate) {
      startDate = new Date(data.startDate + 'T12:00:00');
    }
    if (data.schedule) {
      for (let i = 0; i < 7; i++) {
        const key = `day${i}`;
        if (data.schedule[key]) {
          SLOT_LABELS.forEach(s => {
            const v = data.schedule[key][s.id];
            if (v === null || ACTIVITIES[v]) schedule[key][s.id] = v;
          });
        }
      }
    }
  } catch (e) {
    console.warn('Could not load saved state', e);
  }
}

// ─── VALIDATION ───────────────────────────────────────────────────

function getAllowedSlots(activityId, dayIndex) {
  const act = ACTIVITIES[activityId];
  const d = new Date(startDate);
  d.setDate(d.getDate() + dayIndex);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  if (act.weekendSlots && isWeekend) return act.weekendSlots;
  return act.allowedSlots;
}

function getDayIndex(dayId) {
  return parseInt(dayId.replace('day', ''), 10);
}

function validateDrop(activityId, dayId, slotId) {
  const act = ACTIVITIES[activityId];
  if (!act) return { valid: false, message: 'Unknown activity' };

  const dayIndex = getDayIndex(dayId);
  const allowed  = getAllowedSlots(activityId, dayIndex);

  // 1. Slot type allowed?
  if (!allowed.includes(slotId)) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + dayIndex);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const dayType = isWeekend ? 'weekend' : 'weekday';
    return { valid: false, message: `${act.name} can't go in the ${slotId} on a ${dayType} 🚫` };
  }

  const day = schedule[dayId];
  const existing = [...new Set(Object.values(day).filter(a => a !== null && a !== activityId))];

  // 2. Full-day exclusive needs empty day
  if (act.type === 'full-day-exclusive' && existing.length > 0) {
    return { valid: false, message: `${act.name} needs the whole day to itself! 🚫` };
  }

  // 3. Can't add to a day that already has an exclusive activity
  if (existing.some(a => ACTIVITIES[a]?.type === 'full-day-exclusive')) {
    return { valid: false, message: `That day is already reserved for a full-day trip! 🚫` };
  }

  // 4. Slot already occupied?
  if (day[slotId] && day[slotId] !== activityId) {
    return { valid: false, message: `That slot is taken — try another slot or day!` };
  }

  return { valid: true };
}

// ─── PLACE / REMOVE ───────────────────────────────────────────────

function removeActivityFromSchedule(activityId) {
  for (let i = 0; i < 7; i++) {
    const key = `day${i}`;
    SLOT_LABELS.forEach(s => {
      if (schedule[key][s.id] === activityId) schedule[key][s.id] = null;
    });
  }
}

function placeActivity(activityId, dayId, slotId) {
  const act = ACTIVITIES[activityId];
  removeActivityFromSchedule(activityId);

  if (act.type === 'full-day-exclusive') {
    schedule[dayId].morning   = activityId;
    schedule[dayId].afternoon = activityId;
    schedule[dayId].evening   = activityId;
  } else {
    schedule[dayId][slotId] = activityId;
  }

  saveState();
  renderAll();
  showToast(`${act.emoji} ${act.name} added!`, 'success');
}

function isPlaced(activityId) {
  return Object.keys(schedule).some(day =>
    SLOT_LABELS.some(s => schedule[day][s.id] === activityId)
  );
}

// ─── RENDER ───────────────────────────────────────────────────────

function renderAll() {
  renderPool();
  renderSchedule();
}

function makeActivityCard(act) {
  const placed = isPlaced(act.id);
  const card = document.createElement('div');
  card.className = `activity-card${placed ? ' placed' : ''}`;
  card.draggable = true;
  card.dataset.activityId = act.id;
  card.style.cssText = `background:${act.bg}; border-color:${act.color}; color:${act.color};`;
  card.innerHTML = `
    <span class="ac-emoji">${act.emoji}</span>
    <div class="ac-text">
      <span class="ac-name">${act.name}</span>
      <span class="ac-duration">${act.duration}</span>
    </div>
  `;
  card.addEventListener('dragstart', e => {
    dragging = { activityId: act.id, fromPool: true };
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { card.style.opacity = '0.4'; }, 0);
  });
  card.addEventListener('dragend', () => {
    card.style.opacity = '';
    dragging = null;
  });
  return card;
}

function renderPool() {
  const pool = document.getElementById('activity-pool');
  pool.innerHTML = '';

  const filterEl = document.getElementById('category-filter');
  const activeFilter = filterEl ? filterEl.value : 'all';
  const filtered = activeFilter === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(cat => cat.key === activeFilter);
  const showLabels = activeFilter === 'all';

  filtered.forEach(cat => {
    if (showLabels) {
      const label = document.createElement('div');
      label.className = 'category-label';
      label.textContent = cat.label;
      pool.appendChild(label);
    }

    cat.ids.forEach(id => {
      const act = ACTIVITIES[id];
      if (act) pool.appendChild(makeActivityCard(act));
    });
  });
}

function renderSchedule() {
  const container = document.getElementById('schedule');
  container.innerHTML = '';
  const days = getDays();

  // Corner
  const corner = document.createElement('div');
  corner.className = 'day-header';
  container.appendChild(corner);

  // Day headers
  days.forEach(day => {
    const h = document.createElement('div');
    h.className = `day-header day-col${day.isWeekend ? ' weekend' : ''}`;
    h.innerHTML = `<div class="day-name">${day.label}</div><div class="day-date">${day.date}</div>`;
    container.appendChild(h);
  });

  // Slot rows
  SLOT_LABELS.forEach(slot => {
    const label = document.createElement('div');
    label.className = 'slot-label';
    label.textContent = slot.label;
    container.appendChild(label);

    days.forEach(day => {
      const activityId = schedule[day.id][slot.id];
      const zone = document.createElement('div');
      zone.className = 'slot-zone' + (activityId ? '' : ' empty');
      zone.dataset.dayId  = day.id;
      zone.dataset.slotId = slot.id;

      if (activityId) {
        const act = ACTIVITIES[activityId];
        const isFullDay = act.type === 'full-day-exclusive';
        const isFirst   = !isFullDay || slot.id === 'morning';

        if (isFullDay) {
          if (slot.id === 'morning')   zone.classList.add('fd-top');
          if (slot.id === 'afternoon') zone.classList.add('fd-mid');
          if (slot.id === 'evening')   zone.classList.add('fd-bot');
        }

        const card = document.createElement('div');
        card.className = 'placed-card' + (isFirst ? '' : ' continuation');
        card.style.cssText = `background:${act.bg}; border-color:${act.color}; color:${act.color};`;

        if (isFirst) {
          card.draggable = true;
          card.innerHTML = `
            <span class="p-emoji">${act.emoji}</span>
            <span class="p-name">${act.name}</span>
            <span class="p-dur">${act.duration}</span>
          `;
          card.addEventListener('dragstart', e => {
            dragging = { activityId: act.id, fromPool: false, fromDay: day.id, fromSlot: slot.id };
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => { card.style.opacity = '0.3'; }, 0);
          });
          card.addEventListener('dragend', () => {
            card.style.opacity = '';
            dragging = null;
            renderAll();
          });
        } else {
          card.innerHTML = `<span>${act.emoji}</span>`;
        }

        zone.appendChild(card);
      }

      // Drop
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        if (!dragging) return;
        const result = validateDrop(dragging.activityId, day.id, slot.id);
        zone.classList.toggle('drag-over-valid',   result.valid);
        zone.classList.toggle('drag-over-invalid', !result.valid);
      });
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over-valid', 'drag-over-invalid');
      });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over-valid', 'drag-over-invalid');
        if (!dragging) return;
        const result = validateDrop(dragging.activityId, day.id, slot.id);
        if (result.valid) {
          placeActivity(dragging.activityId, day.id, slot.id);
        } else {
          showToast(`❌ ${result.message}`, 'error');
          renderAll();
        }
        dragging = null;
      });

      container.appendChild(zone);
    });
  });
}

// ─── DAY COMBOS ──────────────────────────────────────────────────

const DAY_COMBOS = [
  {
    title: '🌊 Waterfront Day',
    steps: [
      { time: 'Morning',   text: 'CN Tower — views + EdgeWalk' },
      { time: 'Afternoon', text: "Ripley's Aquarium next door" },
      { time: 'Evening',   text: "Harbourfront walk + dinner on King West" },
    ],
    tip: 'CN Tower and Aquarium share a plaza — no travel between them.'
  },
  {
    title: '🏛 Culture Day',
    steps: [
      { time: 'Morning',   text: 'Royal Ontario Museum (ROM)' },
      { time: 'Afternoon', text: 'AGO or Kensington Market (10 min walk apart)' },
      { time: 'Evening',   text: 'Dinner in Chinatown or Little Italy' },
    ],
    tip: 'AGO is free for under-25s. ROM is best with 2–3 hrs.'
  },
  {
    title: '🏰 Historic East Side',
    steps: [
      { time: 'Morning',   text: 'St. Lawrence Market — grab breakfast' },
      { time: 'Afternoon', text: 'Distillery District — galleries & patios' },
      { time: 'Evening',   text: 'Theatre show or sports game downtown' },
    ],
    tip: 'St. Lawrence closes Mondays. Market is busiest on Saturday mornings.'
  },
  {
    title: '🏝 Islands + Waterfront',
    steps: [
      { time: 'Morning',   text: 'Ferry to Toronto Islands from Jack Layton Terminal' },
      { time: 'Afternoon', text: "Return + Harbourfront + Queen's Quay stroll" },
      { time: 'Evening',   text: 'Dinner on the waterfront or King West' },
    ],
    tip: 'Check ferry times — they run every 15–30 min. Last ferry ~11pm in summer.'
  },
  {
    title: '🌳 Parks & Views',
    steps: [
      { time: 'Morning',   text: 'High Park — trails, Grenadier Pond, free entry' },
      { time: 'Afternoon', text: 'Scarborough Bluffs — 15km east, free, stunning views' },
      { time: 'Evening',   text: 'The Beaches neighbourhood for dinner' },
    ],
    tip: 'These are far apart — grab an Uber between them (~25 min). Worth it.'
  },
  {
    title: '🎢 Big Day Out',
    steps: [
      { time: 'All day',   text: "Canada's Wonderland or Niagara Falls" },
    ],
    tip: "Leave by 8am. Both are 1–2 hrs from downtown. Book Wonderland tickets online to skip the queue."
  },
];

function renderCombos() {
  const grid = document.getElementById('combos-grid');
  grid.innerHTML = '';
  DAY_COMBOS.forEach(combo => {
    const card = document.createElement('div');
    card.className = 'combo-card';
    const stepsHtml = combo.steps.map(s =>
      `<div class="combo-step"><span class="combo-step-time">${s.time}</span>${s.text}</div>`
    ).join('');
    card.innerHTML = `
      <div class="combo-title">${combo.title}</div>
      <div class="combo-steps">${stepsHtml}</div>
      <div class="combo-tip">💡 ${combo.tip}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── TRANSIT ─────────────────────────────────────────────────────

const TRANSIT_CARDS = [
  {
    icon: '🪙',
    title: 'Presto Card',
    body: '$3.30/ride. Load at Union Station, Pearson Airport, or any subway station. Tap on buses, streetcars and subway. Transfers included within 2 hours.',
    tag: 'Get one first thing'
  },
  {
    icon: '🚇',
    title: 'TTC Subway',
    body: 'Line 1 (Yonge–University) runs north–south through downtown. Line 2 (Bloor–Danforth) crosses east–west. Most attractions are on or near Line 1.',
    tag: 'Runs until ~1:30am'
  },
  {
    icon: '✈️',
    title: 'UP Express',
    body: '$12.35 from Pearson Airport to Union Station in 25 minutes. Runs every 15 min. Much faster than a taxi through downtown traffic.',
    tag: 'Airport → downtown'
  },
  {
    icon: '🚲',
    title: 'Bike Share Toronto',
    body: '$7/day or $15/3-day pass. Hundreds of docks downtown. Great for the waterfront trail and flat routes around the city.',
    tag: 'Best for waterfront'
  },
  {
    icon: '🚗',
    title: 'Uber / Lyft',
    body: 'Reliable and usually quick. Best for late nights, far-flung spots (Bluffs, High Park) and rainy days. Avoid driving downtown — parking is $20–30/day.',
    tag: 'Skip the rental car'
  },
];

function renderTransit() {
  const grid = document.getElementById('transit-grid');
  grid.innerHTML = '';
  TRANSIT_CARDS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'transit-card';
    card.innerHTML = `
      <span class="transit-icon">${item.icon}</span>
      <div>
        <div class="transit-title">${item.title}</div>
        <div class="transit-body">${item.body}</div>
        <span class="transit-tag">${item.tag}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ─── NEIGHBOURHOODS ───────────────────────────────────────────────

const NEIGHBOURHOODS = [
  {
    title: '🌊 The Waterfront',
    vibe: 'Scenic · Relaxed · All ages',
    body: "Lake Ontario from Harbourfront to Sugar Beach. Walk or bike the Martin Goodman Trail. Ferry terminal for Toronto Islands. Beautiful at sunset.",
    tip: "Don't miss: Trillium Park and the view from the end of the pier at dusk."
  },
  {
    title: '🏙 King West / Entertainment District',
    vibe: 'Busy · Trendy · Night out',
    body: "Toronto's nightlife hub. Great restaurants, rooftop bars and live music. Home to the CN Tower and Rogers Centre. Buzzing any night of the week.",
    tip: "Don't miss: a walk down King St W from Spadina to University."
  },
  {
    title: '🎨 Queen West',
    vibe: 'Indie · Stylish · Coffee + art',
    body: "Boutiques, galleries, vintage shops and some of the best coffee in the city. Spills into West Queen West which is even more eclectic.",
    tip: "Don't miss: Trinity Bellwoods Park on a sunny weekend afternoon."
  },
  {
    title: '🌿 Kensington Market',
    vibe: 'Bohemian · Multicultural · Affordable',
    body: "Toronto's most colourful neighbourhood. Vintage clothing, street food, indie cafés, cheese shops and live music pouring out of windows.",
    tip: "Don't miss: last Sunday of the month = Pedestrian Sunday (cars banned, street festival vibes)."
  },
  {
    title: '🏭 Distillery District',
    vibe: 'Historic · Artisan · Instagram-worthy',
    body: "Perfectly preserved Victorian industrial architecture. Cobblestone streets lined with galleries, chocolate shops, microbreweries and restaurants.",
    tip: "Don't miss: the seasonal festivals (Christmas Market in Nov–Dec is magical)."
  },
  {
    title: '📚 The Annex',
    vibe: 'University · Bookshops · Brunch',
    body: "University of Toronto neighbourhood full of good bookshops, pubs and brunch spots. Bloor St W here is one of the best stretches for eating.",
    tip: "Don't miss: Bloor Street Diner for brunch, then walk south to ROM."
  },
  {
    title: '🍳 Leslieville',
    vibe: 'Relaxed · East-end · Brunch capital',
    body: "Quieter east-end neighbourhood popular with locals. Excellent brunch spots, independent coffee shops and a community feel far from the tourist crowds.",
    tip: "Don't miss: Lady Marmalade or Saving Grace for brunch (arrive early on weekends)."
  },
  {
    title: '🥟 Chinatown & Little Italy',
    vibe: 'Lively · Affordable · Great food',
    body: "Two of Toronto's most lively food neighbourhoods, side by side along College and Spadina. Endless restaurants, late-night bakeries and street energy.",
    tip: "Don't miss: dim sum on Spadina (any weekend morning) or a Kensington visit right after."
  },
];

function renderNeighbourhoods() {
  const grid = document.getElementById('neighbourhood-grid');
  grid.innerHTML = '';
  NEIGHBOURHOODS.forEach(nb => {
    const card = document.createElement('div');
    card.className = 'nb-card';
    card.innerHTML = `
      <div class="nb-title">${nb.title}</div>
      <div class="nb-vibe">${nb.vibe}</div>
      <div class="nb-body">${nb.body}</div>
      <div class="nb-tip">✦ ${nb.tip}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── TRASH ────────────────────────────────────────────────────────

function setupTrash() {
  const trash = document.getElementById('trash-zone');
  trash.addEventListener('dragover', e => { e.preventDefault(); trash.classList.add('drag-over'); });
  trash.addEventListener('dragleave', () => trash.classList.remove('drag-over'));
  trash.addEventListener('drop', e => {
    e.preventDefault();
    trash.classList.remove('drag-over');
    if (dragging && !dragging.fromPool) {
      const act = ACTIVITIES[dragging.activityId];
      removeActivityFromSchedule(dragging.activityId);
      saveState();
      renderAll();
      showToast(`🗑️ ${act.name} removed`, 'info');
    }
    dragging = null;
  });
}

// ─── DATE PICKER ──────────────────────────────────────────────────

function setupDatePicker() {
  const input = document.getElementById('start-date');
  input.value = toInputValue(startDate);
  input.addEventListener('change', () => {
    if (!input.value) return;
    startDate = new Date(input.value + 'T12:00:00');
    saveState();
    renderSchedule(); // no need to re-render pool
  });
}

// ─── TOAST ────────────────────────────────────────────────────────

let toastTimer = null;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── INIT ─────────────────────────────────────────────────────────

loadState();
renderAll();
renderCombos();
renderTransit();
renderNeighbourhoods();
setupTrash();
setupDatePicker();
document.getElementById('category-filter').addEventListener('change', renderPool);
