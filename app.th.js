// =========================================================================
// Icons (inline SVG, lucide-style)
// =========================================================================
const icon = (path, size = 20) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const Icons = {
  calendar: icon('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  clock: icon('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  dumbbell: icon('<path d="M6.5 6.5 17.5 17.5"/><path d="m21 21-1-1M4 4 3 3M18 18l-2-2M8 8 6 6"/><path d="M3.5 8.5 8.5 3.5"/><path d="m15.5 20.5 5-5"/>'),
  heart: icon('<path d="M19 14c1.5-1.5 3-3.28 3-5.5A5.5 5.5 0 0 0 12 6a5.5 5.5 0 0 0-10 2.5C2 10.5 3.5 12.5 5 14l7 7Z"/><path d="M3.22 9H9.5l1.5-2 2 4 1-2h6.28"/>'),
  brain: icon('<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5A2.5 2.5 0 0 1 4.96 17H4.5A2.5 2.5 0 0 1 2 14.5v-1a2.5 2.5 0 0 1 1.5-2.29A2.5 2.5 0 0 1 5 6.5A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5A2.5 2.5 0 0 0 19.04 17h.46a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-1.5-2.29A2.5 2.5 0 0 0 19 6.5A2.5 2.5 0 0 0 14.5 2Z"/>'),
  shield: icon('<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/>'),
  sparkles: icon('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>'),
  check: icon('<path d="M20 6 9 17l-5-5"/>'),
  alert: icon('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/>'),
  refresh: icon('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>'),
  zap: icon('<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>'),
  eye: icon('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'),
  code: icon('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'),
  arrow: icon('<path d="M5 12h14M13 6l6 6-6 6"/>', 16),
  user: icon('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
  download: icon('<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>', 16),
  plus: icon('<path d="M12 5v14M5 12h14"/>', 16),
  trash: icon('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6"/>', 14),
  robot: icon('<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 2v6M9 13h.01M15 13h.01"/>')
};

// =========================================================================
// Anonymization engine (Privacy Shield)
// =========================================================================
const THAI_BANKS = [
  'กสิกรไทย', 'ไทยพาณิชย์', 'กรุงไทย', 'กรุงเทพ', 'กรุงศรีอยุธยา', 'กรุงศรี',
  'ทหารไทยธนชาต', 'ทีเอ็มบีธนชาต', 'ออมสิน', 'ธ.ก.ส', 'ยูโอบี', 'ซีไอเอ็มบี',
  'แลนด์แอนด์เฮ้าส์'
];

function anonymize(text) {
  if (!text) return text;
  let out = String(text);
  THAI_BANKS.forEach((b) => {
    out = out.split(b).join('[BANK_TOKEN]');
  });
  out = out.replace(/(คุณ|นาย|นาง|นางสาว)[ก-๙a-zA-Z]{2,}/g, '[PERSON_TOKEN]');
  out = out.replace(/บริษัท[ก-๙a-zA-Z0-9\s]{2,40}?(จำกัด(มหาชน)?)?/g, '[ORG_TOKEN]');
  out = out.replace(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g, '[PERSON_TOKEN]');
  out = out.replace(/[A-Z][A-Za-z]*\s?(Corp\.?|Co\.,?\s?Ltd\.?|Inc\.?|Company)/g, '[ORG_TOKEN]');
  return out;
}

// =========================================================================
// Rule-based Dynamic Scheduling Engine (Smart Cut algorithm)
// =========================================================================
function toMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function fmtTime(m) {
  m = ((m % 1440) + 1440) % 1440;
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}
function prioRank(t) {
  return t.priority === 'High' ? 0 : t.priority === 'Medium' ? 1 : 2;
}

function computeSchedule(formData) {
  const wake = toMin(formData.wakeTime);
  let sleep = toMin(formData.sleepTime);
  if (sleep <= wake) sleep += 1440;
  const workStart = toMin(formData.workStart);
  let workEnd = toMin(formData.workEnd);
  if (workEnd <= workStart) workEnd += 1440;
  const travelMinutes = Math.max(0, Number(formData.travelMinutes) || 0);

  const blocks = [];
  const cuts = [];
  const push = (s, e, activity, category, tag) => {
    if (e > s) blocks.push({ s, e, time: fmtTime(s) + ' - ' + fmtTime(e), activity, category, tag });
  };

  const fatigueSevere = formData.fatigue >= 7;
  const fatigueFactor = fatigueSevere ? 0.35 : formData.fatigue >= 5 ? 0.6 : 1;

  function fitQueue(queue, cursor, limit, windowLabel) {
    const leftover = [];
    queue.forEach((t) => {
      const avail = limit - cursor;
      if (avail <= 10) {
        leftover.push(t);
        return;
      }
      let dur = t.duration,
        tag = t.priority + ' Priority',
        adjusted = false;
      if (dur > avail || fatigueSevere) {
        const scaled = Math.max(10, Math.round(Math.min(avail, dur * fatigueFactor)));
        if (scaled < dur) {
          cuts.push({
            task: t.title,
            original: dur + ' นาที',
            adjusted: scaled + ' นาที (ปรับย่อ)',
            reason: fatigueSevere
              ? `ความเหนื่อยล้าสะสมสูง (${formData.fatigue}/10) ปรับเพื่อป้องกัน Burnout`
              : `เวลาว่าง${windowLabel}มีจำกัด`
          });
          dur = scaled;
          adjusted = true;
          tag = 'Adjusted';
        }
      }
      push(cursor, cursor + dur, t.title + (adjusted ? ' (ปรับเวลา)' : ''), 'Personal Growth', tag);
      cursor += dur;
    });
    return { cursor, leftover };
  }

  let mCursor = wake;
  push(mCursor, mCursor + 20, 'ตื่นนอน & Morning Stretch', 'Wellbeing', 'Health');
  mCursor += 20;
  push(mCursor, mCursor + 25, 'อาหารเช้า', 'Routine', 'Life');
  mCursor += 25;

  const morningWindowStart = mCursor;
  const morningWindowEnd = Math.max(mCursor, workStart - travelMinutes);
  const morningCapacity = morningWindowEnd - morningWindowStart;

  const eveningWindowStart = workEnd + travelMinutes;
  const eveningWindowEnd = Math.max(eveningWindowStart, sleep - 40);
  const eveningCapacity = eveningWindowEnd - eveningWindowStart;

  const allTasks = formData.tasks.filter((t) => t.type !== 'Work');
  const morningQueue = [];
  const eveningQueue = [];
  const autoQueue = [];
  allTasks.forEach((t) => {
    if (t.when === 'morning') morningQueue.push(t);
    else if (t.when === 'evening') eveningQueue.push(t);
    else autoQueue.push(t);
  });

  let simMorningRemain = morningCapacity - morningQueue.reduce((s, t) => s + t.duration, 0);
  let simEveningRemain = eveningCapacity - eveningQueue.reduce((s, t) => s + t.duration, 0);
  autoQueue
    .slice()
    .sort((a, b) => prioRank(a) - prioRank(b))
    .forEach((t) => {
      if (simMorningRemain >= simEveningRemain) {
        morningQueue.push(t);
        simMorningRemain -= t.duration;
      } else {
        eveningQueue.push(t);
        simEveningRemain -= t.duration;
      }
    });
  morningQueue.sort((a, b) => prioRank(a) - prioRank(b));
  eveningQueue.sort((a, b) => prioRank(a) - prioRank(b));

  const morningResult = fitQueue(morningQueue, morningWindowStart, morningWindowEnd, 'ช่วงเช้า');
  mCursor = morningResult.cursor;

  if (morningWindowEnd > mCursor) {
    push(mCursor, morningWindowEnd, 'เวลาว่างช่วงเช้า (พักผ่อน/เตรียมตัว)', 'Routine', 'Free Time');
    mCursor = morningWindowEnd;
  }
  if (workStart > mCursor) push(mCursor, workStart, `เดินทางไปทำงาน${travelMinutes ? ' (~' + travelMinutes + ' นาที)' : ''}`, 'Routine', 'Life');

  push(workStart, workEnd, 'ทำงาน (ตามตารางงานของคุณ)', 'Work', 'ไม่แตะต้อง');

  let eCursor = workEnd;
  if (eveningWindowStart > eCursor) push(eCursor, eveningWindowStart, `เดินทางกลับบ้าน${travelMinutes ? ' (~' + travelMinutes + ' นาที)' : ''}`, 'Routine', 'Life');
  eCursor = eveningWindowStart;

  const combinedEveningQueue = eveningQueue.concat(morningResult.leftover).sort((a, b) => prioRank(a) - prioRank(b));
  const eveningResult = fitQueue(combinedEveningQueue, eCursor, eveningWindowEnd, 'ช่วงเย็น');
  eCursor = eveningResult.cursor;
  eveningResult.leftover.forEach((t) => {
    cuts.push({
      task: t.title,
      original: t.duration + ' นาที',
      adjusted: 'งดไว้ก่อน (No time slot)',
      reason: 'เวลาว่างนอกเวลางานไม่พอสำหรับกิจกรรมนี้ทั้งหมด ลองลดจำนวนกิจกรรมหรือขยับเวลานอน/ตื่นดูอีกครั้ง'
    });
  });

  if (eCursor < eveningWindowEnd) {
    push(eCursor, eveningWindowEnd, 'อาหารเย็น & เวลาว่างส่วนตัว', 'Rest', 'Health');
    eCursor = eveningWindowEnd;
  }
  push(eCursor, sleep, 'Digital Detox & เตรียมตัวนอน', 'Sleep Prep', 'Rest');

  blocks.sort((a, b) => a.s - b.s);

  const workMinutes = workEnd - workStart;
  return { blocks, cuts, focusMinutes: workMinutes };
}

// =========================================================================
// Persistence & Export
// =========================================================================
const PLAN_STORAGE_KEY = 'aiLifePlanner:lastPlan';

function loadSavedPlan() {
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function savePlan(payload) {
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {}
}

function downloadFile(filename, text, mime) {
  const blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadSchedule() {
  if (!state.scheduleResult) {
    alert('ยังไม่มีตารางเวลาให้ดาวน์โหลด');
    return;
  }
  const lines = state.scheduleResult.blocks.map((b) => b.time + '  ' + b.activity + '  [' + b.category + ']');
  const text =
    'ตารางเวลาประจำวัน — AI Life Planner\n' +
    '='.repeat(40) +
    '\n\n' +
    lines.join('\n') +
    '\n\n' +
    (state.scheduleResult.cuts.length
      ? 'รายการที่ระบบปรับลดเวลาอัตโนมัติ (Smart Cut):\n' +
        state.scheduleResult.cuts
          .map((c) => '- ' + c.task + ': ' + c.original + ' -> ' + c.adjusted + ' (' + c.reason + ')')
          .join('\n')
      : '');
  downloadFile('my-schedule.txt', text, 'text/plain');
}

function downloadCalendar() {
  if (!state.scheduleResult) {
    alert('ยังไม่มีตารางเวลาให้ดาวน์โหลด');
    return;
  }
  const now = new Date();
  const y = now.getFullYear(),
    m = now.getMonth(),
    d = now.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  const toICS = (mins) => {
    const dayOffset = Math.floor(mins / 1440);
    const mm = ((mins % 1440) + 1440) % 1440;
    const dt = new Date(y, m, d + dayOffset, Math.floor(mm / 60), mm % 60, 0);
    return dt.getFullYear() + pad(dt.getMonth() + 1) + pad(dt.getDate()) + 'T' + pad(dt.getHours()) + pad(dt.getMinutes()) + '00';
  };
  const stampNow = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + 'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + 'Z';
  const esc = (s) => String(s).replace(/([,;])/g, '\\$1');
  let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//AI Life Planner//TH\r\nCALSCALE:GREGORIAN\r\n';
  state.scheduleResult.blocks.forEach((b, i) => {
    ics +=
      'BEGIN:VEVENT\r\n' +
      'UID:ai-life-planner-' + Date.now() + '-' + i + '@local\r\n' +
      'DTSTAMP:' + stampNow + '\r\n' +
      'DTSTART:' + toICS(b.s) + '\r\n' +
      'DTEND:' + toICS(b.e) + '\r\n' +
      'SUMMARY:' + esc(b.activity) + '\r\n' +
      'CATEGORIES:' + esc(b.category) + '\r\n' +
      'END:VEVENT\r\n';
  });
  ics += 'END:VCALENDAR\r\n';
  downloadFile('my-schedule.ics', ics, 'text/calendar');
}

function printSchedule() {
  if (!state.scheduleResult) {
    alert('ยังไม่มีตารางเวลาให้พิมพ์');
    return;
  }
  window.print();
}

// =========================================================================
// Rule-based Recommendations (Offline 100%)
// =========================================================================
function getRuleRecommendations(formData) {
  return {
    fitness: `ลักษณะงาน: ${formData.workStyle.split('(')[0].trim()} แนะนำ Desk Stretch / Posture Correction ทุก ๆ 2 ชั่วโมง และปรับความหนักของการออกกำลังกายให้เหมาะกับระดับความเหนื่อยล้า (${formData.fatigue}/10)`,
    nutrition: `พลังงานกายอยู่ที่ ${formData.energy}/10 ควรพักสายตาและเติมน้ำทุก 2 ชั่วโมง พร้อมกำหนดมื้ออาหารให้ตรงเวลาเพื่อรักษาระดับพลังงานตลอดวัน`,
    mental: `ความเครียดสะสมอยู่ที่ ${formData.stress}/10 แทรกโปรแกรมฝึกหายใจ 4-7-8 Breathing Technique สั้น ๆ ช่วงบ่ายเพื่อลดคอร์ติซอล`,
    growth: `ใช้ช่วงเวลาว่างสั้น ๆ ระหว่างเดินทางหรือพักเบรกสำหรับ Micro-Learning เช่น ฟัง Podcast หรือบทความสั้นแทนการอ่านยาว`
  };
}

// =========================================================================
// State
// =========================================================================
let state = {
  activeTab: 'wizard',
  step: 1,
  formData: {
    wakeTime: '06:30',
    sleepTime: '23:00',
    workStart: '09:00',
    workEnd: '18:00',
    travelMinutes: 30,
    workStyle: 'Sedentary / Desk Work (นั่งโต๊ะทำงานทั้งวัน)',
    energy: 6,
    fatigue: 7,
    stress: 6,
    tasks: [
      { id: 1, title: 'ออกกำลังกายแบบ Cardio', duration: 45, priority: 'High', type: 'Personal', when: 'auto' },
      { id: 2, title: 'อ่านหนังสือพัฒนาตนเอง', duration: 30, priority: 'Medium', type: 'Personal', when: 'auto' },
      { id: 3, title: 'นั่งสมาธิ / ฝึกหายใจ', duration: 15, priority: 'Medium', type: 'Personal', when: 'auto' },
      { id: 4, title: 'พบปะครอบครัว / เพื่อน', duration: 45, priority: 'Low', type: 'Personal', when: 'auto' }
    ]
  },
  isGenerated: false,
  scheduleResult: null,
  anonDemoInput: 'ประชุมกับคุณอนันต์ ธนาคารกรุงไทย เรื่องโปรเจกต์ของ บริษัท เทคคอร์ป จำกัด'
};

function setState(patch) {
  state = { ...state, ...patch };
  render();
}
function setFormData(patch) {
  state.formData = { ...state.formData, ...patch };
  render();
}

const TASK_PRESETS = [
  { title: 'ออกกำลังกาย', duration: 45, priority: 'Medium', type: 'Personal' },
  { title: 'อ่านหนังสือพัฒนาตนเอง', duration: 30, priority: 'Low', type: 'Personal' },
  { title: 'นั่งสมาธิ / ฝึกหายใจ', duration: 15, priority: 'Low', type: 'Personal' },
  { title: 'ทำอาหาร / เตรียมมื้ออาหาร', duration: 45, priority: 'Medium', type: 'Personal' },
  { title: 'พบปะครอบครัว / เพื่อน', duration: 60, priority: 'Medium', type: 'Personal' },
  { title: 'ดูแลสัตว์เลี้ยง', duration: 20, priority: 'Low', type: 'Personal' },
  { title: 'งานอดิเรก (ดนตรี / วาดรูป / เกม)', duration: 30, priority: 'Low', type: 'Personal' },
  { title: 'นอนกลางวัน / งีบพักสั้น', duration: 20, priority: 'Low', type: 'Personal' }
];

function addPresetTask(idx) {
  const p = TASK_PRESETS[idx];
  if (!p) return;
  state.formData.tasks = [...state.formData.tasks, { id: Date.now() + Math.random(), ...p }];
  render();
}

function addTask() {
  const titleEl = document.getElementById('newTaskTitle');
  const title = titleEl ? titleEl.value.trim() : '';
  if (!title) {
    if (titleEl) titleEl.focus();
    return;
  }
  const duration = parseInt(document.getElementById('newTaskDuration').value) || 30;
  const priority = document.getElementById('newTaskPriority').value;
  const when = document.getElementById('newTaskWhen').value;
  state.formData.tasks = [...state.formData.tasks, { id: Date.now(), title, duration, priority, type: 'Personal', when }];
  render();
}
function removeTask(id) {
  state.formData.tasks = state.formData.tasks.filter((t) => t.id !== id);
  render();
}
function setTaskWhen(id, when) {
  state.formData.tasks = state.formData.tasks.map((t) => (t.id === id ? { ...t, when } : t));
  render();
}

function handleGeneratePlan() {
  const result = computeSchedule(state.formData);
  const recs = getRuleRecommendations(state.formData);
  state.scheduleResult = { 
    blocks: result.blocks, 
    cuts: result.cuts, 
    focusMinutes: result.focusMinutes, 
    recommendations: recs, 
    aiStatus: 'offline' 
  };
  state.isGenerated = true;
  state.activeTab = 'dashboard';
  render();

  savePlan({ formData: state.formData, scheduleResult: state.scheduleResult, savedAt: Date.now() });
}

// =========================================================================
// Render helpers & Navigation
// =========================================================================
function navButton(id, label, iconSvg, disabled) {
  const active = state.activeTab === id;
  const cls = active
    ? 'bg-indigo-600 text-white shadow-md'
    : disabled
    ? 'text-slate-600 cursor-not-allowed'
    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800';
  return `<button ${disabled ? 'disabled' : ''} onclick="${disabled ? '' : `setState({activeTab:'${id}'})`}"
    class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${cls}">${iconSvg}${label}</button>`;
}

function renderHeader() {
  return `
  <header class="no-print border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-wrap justify-between items-center" style="padding-top: calc(1rem + env(safe-area-inset-top, 0px));">
    <div class="flex items-center gap-3">
      <div class="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">${Icons.sparkles}</div>
      <div>
        <h1 class="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">AI Life Planner & Dashboard</h1>
        <p class="text-xs text-slate-400">Time-Blocking & Lifestyle Architecture</p>
      </div>
    </div>
    <nav class="flex gap-2 mt-4 sm:mt-0 flex-wrap">
      ${navButton('wizard', 'Setup Wizard', Icons.clock)}
      ${navButton('dashboard', 'Life Dashboard', Icons.calendar, !state.isGenerated)}
      ${navButton('prompt', 'RCTF Prompt Engine', Icons.code)}
      ${navButton('privacy', 'Privacy & Shield', Icons.shield)}
    </nav>
  </header>`;
}
