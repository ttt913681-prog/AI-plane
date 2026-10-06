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
  robot: icon('<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 2v6M9 13h.01M15 13h.01"/>'),
  key: icon('<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5 19 11l3-3-3.5-3.5"/>', 16)
};
// =========================================================================
// Anonymization engine (Privacy Shield)
// Scrubs likely personal names, companies and Thai bank names before any
// data leaves the browser. Runs 100% client-side.
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
// Runs entirely offline/deterministically from the user's real inputs.
// This is the app's functional backbone; the optional AI layer on top
// (see js/recommendations.js) only adds natural-language personalised tips.
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

// -------------------------------------------------------------------------
// Scheduling philosophy: work hours are OFF LIMITS. The user already runs
// their own work schedule (meetings, writing, tasks) elsewhere, so between
// workStart and workEnd this engine only ever writes a single, untouched
// "ทำงาน" block — no lunch break, no breathing exercise, no desk stretch,
// nothing else is inserted there. All personal/growth activities are only
// ever placed in the two free windows that actually belong to the user:
// the morning before work, and the evening after work.
// -------------------------------------------------------------------------
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

  // Helper: place as many queued personal activities as fit into [cursor, limit),
  // Smart-Cutting (shrinking) any that don't fit or that fatigue says to shrink.
  // Returns the tasks it couldn't fit at all, plus the new cursor.
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

  // ---------------- Fixed morning routine (wake -> travel-to-work) ----------------
  let mCursor = wake;
  push(mCursor, mCursor + 20, 'ตื่นนอน & Morning Stretch', 'Wellbeing', 'Health');
  mCursor += 20;
  push(mCursor, mCursor + 25, 'อาหารเช้า', 'Routine', 'Life');
  mCursor += 25;

  const morningWindowStart = mCursor;
  const morningWindowEnd = Math.max(mCursor, workStart - travelMinutes);
  const morningCapacity = morningWindowEnd - morningWindowStart;

  // ---------------- Fixed evening window (after work+travel -> wind-down) ----------------
  const eveningWindowStart = workEnd + travelMinutes;
  const eveningWindowEnd = Math.max(eveningWindowStart, sleep - 40);
  const eveningCapacity = eveningWindowEnd - eveningWindowStart;

  // Every task is a free-time personal activity now (no "Work" tasks are
  // scheduled by this engine — work time is a single fixed block below).
  // Each task can be pinned to a window via t.when ('morning' | 'evening'),
  // or left as 'auto' so the engine puts it wherever there's actually room —
  // instead of always cramming everything into the morning first.
  const allTasks = formData.tasks.filter((t) => t.type !== 'Work');
  const morningQueue = [];
  const eveningQueue = [];
  const autoQueue = [];
  allTasks.forEach((t) => {
    if (t.when === 'morning') morningQueue.push(t);
    else if (t.when === 'evening') eveningQueue.push(t);
    else autoQueue.push(t);
  });

  // Greedily send each auto task to whichever window currently has more
  // *remaining* room, so free evening time actually gets used instead of
  // sitting empty while the morning gets overstuffed.
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

  // ---------------- Work hours: one single, untouched block ----------------
  push(workStart, workEnd, 'ทำงาน (ตามตารางงานของคุณ)', 'Work', 'ไม่แตะต้อง');

  // ---------------- Evening: after work -> wind-down before sleep ----------------
  let eCursor = workEnd;
  if (eveningWindowStart > eCursor) push(eCursor, eveningWindowStart, `เดินทางกลับบ้าน${travelMinutes ? ' (~' + travelMinutes + ' นาที)' : ''}`, 'Routine', 'Life');
  eCursor = eveningWindowStart;

  // Anything that didn't fit in the morning gets one more chance in the evening.
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
// Persistence — remembers the visitor's last plan in THIS browser only.
// No account, no server: plain localStorage, so it works on GitHub Pages
// or any static host with zero backend.
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
  } catch (e) {
    /* storage full/unavailable — non-fatal */
  }
}

function clearSavedPlan() {
  try {
    localStorage.removeItem(PLAN_STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
}

// =========================================================================
// Export — plain browser download via Blob, no server round-trip needed.
// =========================================================================
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
function downloadTextFile(filename, text) {
  downloadFile(filename, text, 'text/plain');
}

function downloadSchedule() {
  if (!state.scheduleResult) {
    alert('ยังไม่มีตารางเวลาให้ดาวน์โหลด');
    return;
  }
  const lines = state.scheduleResult.blocks.map((b) => b.time + '  ' + b.activity + '  [' + b.category + ']');
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
  downloadTextFile('my-schedule.txt', text);
}

// ICS (.ics) calendar file — importable into Google Calendar, Outlook,
// Apple Calendar, etc. Events are placed on today's date; the person can
// drag them to another day, or set it to repeat daily, after importing.
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

// PDF — no library needed: trigger the browser's native print dialog with a
// print stylesheet that hides everything except the schedule, so "Save as
// PDF" in that dialog produces a clean PDF.
function printSchedule() {
  if (!state.scheduleResult) {
    alert('ยังไม่มีตารางเวลาให้พิมพ์');
    return;
  }
  window.print();
}
// =========================================================================
// 4-dimension recommendations
//
// Mode 1 (default, always available): deterministic rule-based text built
// from the user's own numbers — no network call, works completely offline.
//
// Mode 2 (optional): if the visitor pastes their own Anthropic API key into
// the Privacy & AI Settings panel, the app calls the real Claude API
// directly from the browser to generate a personalised version instead.
// The key never leaves this browser except in that direct call — there is
// no server of ours in between.
// =========================================================================

const AI_KEY_STORAGE_KEY = 'aiLifePlanner:anthropicApiKey';
const AI_MODEL = 'claude-haiku-4-5';

function getStoredApiKey() {
  try {
    return localStorage.getItem(AI_KEY_STORAGE_KEY) || '';
  } catch (e) {
    return '';
  }
}
function setStoredApiKey(key) {
  try {
    if (key) localStorage.setItem(AI_KEY_STORAGE_KEY, key);
    else localStorage.removeItem(AI_KEY_STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
}

function fallbackRecommendations(formData) {
  return {
    fitness: `ลักษณะงาน: ${formData.workStyle.split('(')[0].trim()} แนะนำ Desk Stretch / Posture Correction ทุก ๆ 2 ชั่วโมง และปรับความหนักของการออกกำลังกายให้เหมาะกับระดับความเหนื่อยล้า (${formData.fatigue}/10)`,
    nutrition: `พลังงานกายอยู่ที่ ${formData.energy}/10 ควรพักสายตาและเติมน้ำทุก 2 ชั่วโมง พร้อมกำหนดมื้ออาหารให้ตรงเวลาเพื่อรักษาระดับพลังงานตลอดวัน`,
    mental: `ความเครียดสะสมอยู่ที่ ${formData.stress}/10 แทรกโปรแกรมฝึกหายใจ 4-7-8 Breathing Technique สั้น ๆ ช่วงบ่ายเพื่อลดคอร์ติซอล`,
    growth: `ใช้ช่วงเวลาว่างสั้น ๆ ระหว่างเดินทางหรือพักเบรกสำหรับ Micro-Learning เช่น ฟัง Podcast หรือบทความสั้นแทนการอ่านยาว`
  };
}

async function getAIRecommendations(formData, cuts) {
  const apiKey = getStoredApiKey();
  if (!apiKey) return null; // no key saved -> caller falls back to rule-based text

  const anonTasks = formData.tasks.map(
    (t) => anonymize(t.title) + ' (' + t.type + ', ' + t.priority + ', ' + t.duration + 'min)'
  );
  const prompt =
    'คุณคือ AI Life Design & Schedule Architect ผู้เชี่ยวชาญด้านการจัดสรรเวลา ลดความเหนื่อยล้า และความเครียด\n\n' +
    'ข้อมูลผู้ใช้ (ข้อมูลส่วนบุคคลถูกลบออกแล้วโดยระบบ Anonymization):\n' +
    '- ระดับพลังงาน: ' + formData.energy + '/10, ความเหนื่อยล้าสะสม: ' + formData.fatigue + '/10, ความเครียดสะสม: ' + formData.stress + '/10\n' +
    '- ลักษณะงาน: ' + formData.workStyle + '\n' +
    '- รายการกิจกรรม: ' + anonTasks.join(' | ') + '\n' +
    '- รายการที่ระบบ Smart Cut ปรับลดเวลาอัตโนมัติ: ' + (cuts.map((c) => c.task + ' -> ' + c.adjusted).join(' | ') || 'ไม่มี') + '\n\n' +
    'กรุณาแนะนำกิจกรรมสั้น ๆ (1-2 ประโยคภาษาไทยต่อข้อ เจาะจงกับข้อมูลข้างต้น ไม่ใช่คำแนะนำทั่วไป) ใน 4 มิติ ' +
    'ตอบเป็น JSON เท่านั้น ห้ามมีคำอธิบายอื่นใดนอก JSON ตามรูปแบบนี้: {"fitness": "...", "nutrition": "...", "mental": "...", "growth": "..."}';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.content || []).map((b) => b.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    if (parsed && parsed.fitness) return parsed;
    return null;
  } catch (e) {
    console.warn('AI recommendation call failed, using offline fallback instead:', e);
    return null;
  }
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
  anonDemoInput: 'ประชุมกับคุณอนันต์ ธนาคารกรุงไทย เรื่องโปรเจกต์ของ บริษัท เทคคอร์ป จำกัด',
  apiKeyInput: getStoredApiKey()
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

async function handleGeneratePlan() {
  const result = computeSchedule(state.formData);
  state.scheduleResult = { blocks: result.blocks, cuts: result.cuts, focusMinutes: result.focusMinutes, recommendations: null, aiStatus: 'loading' };
  state.isGenerated = true;
  state.activeTab = 'dashboard';
  render();

  const recs = await getAIRecommendations(state.formData, result.cuts);
  state.scheduleResult.recommendations = recs || fallbackRecommendations(state.formData);
  state.scheduleResult.aiStatus = recs ? 'ai' : 'fallback';
  render();

  savePlan({ formData: state.formData, scheduleResult: state.scheduleResult, savedAt: Date.now() });
}

function handleSaveApiKey() {
  const el = document.getElementById('apiKeyInput');
  const val = el ? el.value.trim() : '';
  setStoredApiKey(val);
  setState({ apiKeyInput: val });
}
function handleClearApiKey() {
  setStoredApiKey('');
  setState({ apiKeyInput: '' });
}
// =========================================================================
// Render helpers
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
      ${navButton('privacy', 'Privacy & AI Settings', Icons.shield)}
    </nav>
  </header>`;
}

function renderWizard() {
  const f = state.formData;
  let inner = '';
  if (state.step === 1) {
    inner = `
    <div class="space-y-6">
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.clock} 1. ช่วงเวลาปกติและตารางงาน (Daily Routine)</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-xs font-medium text-slate-400 mb-1">เวลาตื่นนอน</label>
          <input type="time" value="${f.wakeTime}" oninput="setFormData({wakeTime:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">เข้านอน</label>
          <input type="time" value="${f.sleepTime}" oninput="setFormData({sleepTime:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">เริ่มงาน</label>
          <input type="time" value="${f.workStart}" oninput="setFormData({workStart:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">เลิกงาน</label>
          <input type="time" value="${f.workEnd}" oninput="setFormData({workEnd:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div class="col-span-2"><label class="block text-xs font-medium text-slate-400 mb-1">เวลาเดินทาง (ต่อเที่ยว, นาที)</label>
          <input type="number" min="0" max="180" step="5" value="${f.travelMinutes}" oninput="setFormData({travelMinutes: parseInt(this.value)||0})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
          <p class="text-[11px] text-slate-500 mt-1">ใช้คำนวณเวลาออกจากบ้านและเวลาถึงบ้าน (นับเที่ยวเดียว จะถูกใช้ทั้งขาไปและขากลับ)</p></div>
      </div>
      <div class="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-lg text-xs text-indigo-200">
        ℹ️ ช่วง "เริ่มงาน–เลิกงาน" จะถูกกันไว้เป็นบล็อก <strong>"ทำงาน"</strong> เดียว ระบบจะไม่แทรกกิจกรรม ประชุม หรือพักเบรกใด ๆ ลงไปในช่วงเวลานี้ทั้งสิ้น เพราะถือว่าคุณมีตารางงานของตัวเองอยู่แล้ว — ระบบจะจัดกิจกรรมทั้งหมดในขั้นตอนถัดไปเฉพาะช่วงเวลาว่าง "ก่อนเข้างาน" หรือ "หลังเลิกงาน" เท่านั้น
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-400 mb-1">ลักษณะงาน (Work Style)</label>
        <select onchange="setFormData({workStyle:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none">
          <option ${f.workStyle.startsWith('Sedentary') ? 'selected' : ''}>Sedentary / Desk Work (นั่งโต๊ะทำงานทั้งวัน)</option>
          <option ${f.workStyle.startsWith('Active') ? 'selected' : ''}>Active / On the move (ต้องเดินทาง/เคลื่อนไหวบ่อย)</option>
          <option ${f.workStyle.startsWith('Hybrid') ? 'selected' : ''}>Hybrid Work (สลับนั่งโต๊ะและประชุม)</option>
        </select>
      </div>
      <button onclick="setState({step:2})" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex justify-center items-center gap-2 transition">ถัดไป: ประเมินพลังงานและกายภาพ ${Icons.arrow}</button>
    </div>`;
  } else if (state.step === 2) {
    inner = `
    <div class="space-y-6">
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.heart} 2. ประเมินสภาวะร่างกายและความล้า (Energy & Stress Sliders)</h3>
      <div class="space-y-4">
        <div><div class="flex justify-between text-sm mb-1"><span>ระดับพลังงานกาย (Energy Level):</span><span class="font-bold text-indigo-400">${f.energy} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.energy}" oninput="setFormData({energy:parseInt(this.value)})" class="w-full" /></div>
        <div><div class="flex justify-between text-sm mb-1"><span>ความเหนื่อยล้าสะสม (Fatigue):</span><span class="font-bold text-amber-400">${f.fatigue} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.fatigue}" oninput="setFormData({fatigue:parseInt(this.value)})" class="w-full" style="accent-color:#f59e0b" /></div>
        <div><div class="flex justify-between text-sm mb-1"><span>ความเครียดสะสม (Stress):</span><span class="font-bold text-rose-400">${f.stress} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.stress}" oninput="setFormData({stress:parseInt(this.value)})" class="w-full" style="accent-color:#f43f5e" /></div>
      </div>
      <div class="flex gap-4">
        <button onclick="setState({step:1})" class="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium">ย้อนกลับ</button>
        <button onclick="setState({step:3})" class="w-2/3 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex justify-center items-center gap-2">ถัดไป: งานและกิจกรรมที่ต้องทำ ${Icons.arrow}</button>
      </div>
    </div>`;
  } else {
    inner = `
    <div class="space-y-6">
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.zap} 3. กิจกรรมนอกเวลางานที่ต้องการจัดลงตาราง</h3>
      <p class="text-xs text-slate-500 -mt-4">ใส่เฉพาะกิจกรรมส่วนตัว/พัฒนาตนเองที่อยากทำ "ก่อนเข้างาน" หรือ "หลังเลิกงาน" เท่านั้น — ไม่ต้องใส่งาน ประชุม หรืออีเมล เพราะช่วงเวลาทำงานของคุณจะถูกกันไว้เป็นบล็อกเดียวโดยไม่ถูกแตะต้อง</p>
      <div class="space-y-3">
        ${f.tasks
          .map(
            (t) => `
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg flex justify-between items-center gap-2 flex-wrap">
            <div class="min-w-0">
              <span class="font-medium text-sm text-slate-200">${t.title}</span>
              <div class="flex gap-2 mt-1 flex-wrap">
                <span class="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded">${t.duration} นาที</span>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <select onchange="setTaskWhen(${t.id}, this.value)" title="ช่วงเวลาที่ต้องการ" class="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-300">
                <option value="auto" ${(!t.when || t.when === 'auto') ? 'selected' : ''}>🔀 อัตโนมัติ</option>
                <option value="morning" ${t.when === 'morning' ? 'selected' : ''}>🌅 เช้า</option>
                <option value="evening" ${t.when === 'evening' ? 'selected' : ''}>🌙 เย็น</option>
              </select>
              <span class="text-xs px-2 py-1 rounded font-medium ${t.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}">${t.priority}</span>
              <button onclick="removeTask(${t.id})" title="ลบงานนี้" class="p-1.5 rounded-l
