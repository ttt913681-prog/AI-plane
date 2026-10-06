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
const BANK_NAMES = [
  'Krungthai Bank', 'Bangkok Bank', 'Kasikorn Bank', 'Siam Commercial Bank',
  'Bank of America', 'Citibank', 'HSBC', 'Wells Fargo', 'Chase', 'Barclays'
];

function anonymize(text) {
  if (!text) return text;
  let out = String(text);
  BANK_NAMES.forEach((b) => {
    out = out.split(b).join('[BANK_TOKEN]');
  });
  out = out.replace(/(Mr\.|Mrs\.|Ms\.|Miss)\s?[A-Z][a-zA-Z]{2,}/g, '[PERSON_TOKEN]');
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
// "Work" block — no lunch break, no breathing exercise, no desk stretch,
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
            original: dur + ' min',
            adjusted: scaled + ' min (shortened)',
            reason: fatigueSevere
              ? `High accumulated fatigue (${formData.fatigue}/10) — shortened to prevent burnout`
              : `Limited free time in the ${windowLabel}`
          });
          dur = scaled;
          adjusted = true;
          tag = 'Adjusted';
        }
      }
      push(cursor, cursor + dur, t.title + (adjusted ? ' (adjusted)' : ''), 'Personal Growth', tag);
      cursor += dur;
    });
    return { cursor, leftover };
  }

  // ---------------- Fixed morning routine (wake -> travel-to-work) ----------------
  let mCursor = wake;
  push(mCursor, mCursor + 20, 'Wake up & Morning Stretch', 'Wellbeing', 'Health');
  mCursor += 20;
  push(mCursor, mCursor + 25, 'Breakfast', 'Routine', 'Life');
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

  const morningResult = fitQueue(morningQueue, morningWindowStart, morningWindowEnd, 'morning');
  mCursor = morningResult.cursor;

  if (morningWindowEnd > mCursor) {
    push(mCursor, morningWindowEnd, 'Free time (morning) — rest / get ready', 'Routine', 'Free Time');
    mCursor = morningWindowEnd;
  }
  if (workStart > mCursor) push(mCursor, workStart, `Commute to work${travelMinutes ? ' (~' + travelMinutes + ' min)' : ''}`, 'Routine', 'Life');

  // ---------------- Work hours: one single, untouched block ----------------
  push(workStart, workEnd, 'Work (your own schedule)', 'Work', 'Untouched');

  // ---------------- Evening: after work -> wind-down before sleep ----------------
  let eCursor = workEnd;
  if (eveningWindowStart > eCursor) push(eCursor, eveningWindowStart, `Commute home${travelMinutes ? ' (~' + travelMinutes + ' min)' : ''}`, 'Routine', 'Life');
  eCursor = eveningWindowStart;

  // Anything that didn't fit in the morning gets one more chance in the evening.
  const combinedEveningQueue = eveningQueue.concat(morningResult.leftover).sort((a, b) => prioRank(a) - prioRank(b));
  const eveningResult = fitQueue(combinedEveningQueue, eCursor, eveningWindowEnd, 'evening');
  eCursor = eveningResult.cursor;
  eveningResult.leftover.forEach((t) => {
    cuts.push({
      task: t.title,
      original: t.duration + ' min',
      adjusted: 'Skipped (no time slot)',
      reason: 'Not enough free time outside work hours to fit this activity in full. Try reducing the number of activities or adjusting your wake/sleep times.'
    });
  });

  if (eCursor < eveningWindowEnd) {
    push(eCursor, eveningWindowEnd, 'Dinner & personal free time', 'Rest', 'Health');
    eCursor = eveningWindowEnd;
  }
  push(eCursor, sleep, 'Digital Detox & wind down for bed', 'Sleep Prep', 'Rest');

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
    alert('No schedule to download yet');
    return;
  }
  const lines = state.scheduleResult.blocks.map((b) => b.time + '  ' + b.activity + '  [' + b.category + ']');
  const text =
    'Daily Schedule — AI Life Planner\n' +
    '='.repeat(40) +
    '\n\n' +
    lines.join('\n') +
    '\n\n' +
    (state.scheduleResult.cuts.length
      ? 'Activities automatically adjusted (Smart Cut):\n' +
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
    alert('No schedule to download yet');
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
    alert('No schedule to print yet');
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
    fitness: `Work style: ${formData.workStyle.split('(')[0].trim()}. Recommend a desk stretch / posture correction every 2 hours, and scale exercise intensity to your fatigue level (${formData.fatigue}/10).`,
    nutrition: `Your energy level is ${formData.energy}/10. Rest your eyes and hydrate every 2 hours, and keep mealtimes consistent to maintain energy throughout the day.`,
    mental: `Your accumulated stress is ${formData.stress}/10. Add a short 4-7-8 breathing exercise in the afternoon to lower cortisol.`,
    growth: `Use short free moments while commuting or on breaks for micro-learning — a podcast or short article instead of long reading sessions.`
  };
}

async function getAIRecommendations(formData, cuts) {
  const apiKey = getStoredApiKey();
  if (!apiKey) return null; // no key saved -> caller falls back to rule-based text

  const anonTasks = formData.tasks.map(
    (t) => anonymize(t.title) + ' (' + t.type + ', ' + t.priority + ', ' + t.duration + 'min)'
  );
  const prompt =
    'You are an AI Life Design & Schedule Architect, an expert in time allocation, fatigue reduction, and stress management.\n\n' +
    'User data (personal information has already been removed by the anonymization system):\n' +
    '- Energy level: ' + formData.energy + '/10, accumulated fatigue: ' + formData.fatigue + '/10, accumulated stress: ' + formData.stress + '/10\n' +
    '- Work style: ' + formData.workStyle + '\n' +
    '- Activity list: ' + anonTasks.join(' | ') + '\n' +
    '- Activities automatically shortened by Smart Cut: ' + (cuts.map((c) => c.task + ' -> ' + c.adjusted).join(' | ') || 'None') + '\n\n' +
    'Please suggest short recommendations (1-2 sentences per item, specific to the data above, not generic advice) across 4 dimensions ' +
    'Respond in JSON only, with no explanation outside the JSON, in this format: {"fitness": "...", "nutrition": "...", "mental": "...", "growth": "..."}';

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
    workStyle: 'Sedentary / Desk Work (sitting at a desk all day)',
    energy: 6,
    fatigue: 7,
    stress: 6,
    tasks: [
      { id: 1, title: 'Cardio exercise', duration: 45, priority: 'High', type: 'Personal', when: 'auto' },
      { id: 2, title: 'Self-development reading', duration: 30, priority: 'Medium', type: 'Personal', when: 'auto' },
      { id: 3, title: 'Meditation / breathing practice', duration: 15, priority: 'Medium', type: 'Personal', when: 'auto' },
      { id: 4, title: 'Time with family / friends', duration: 45, priority: 'Low', type: 'Personal', when: 'auto' }
    ]
  },
  isGenerated: false,
  scheduleResult: null,
  anonDemoInput: 'Meeting with Mr. John Smith from Krungthai Bank about the TechCorp Co., Ltd. project',
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
  { title: 'Exercise', duration: 45, priority: 'Medium', type: 'Personal' },
  { title: 'Self-development reading', duration: 30, priority: 'Low', type: 'Personal' },
  { title: 'Meditation / breathing practice', duration: 15, priority: 'Low', type: 'Personal' },
  { title: 'Cooking / meal prep', duration: 45, priority: 'Medium', type: 'Personal' },
  { title: 'Time with family / friends', duration: 60, priority: 'Medium', type: 'Personal' },
  { title: 'Pet care', duration: 20, priority: 'Low', type: 'Personal' },
  { title: 'Hobby (music / drawing / gaming)', duration: 30, priority: 'Low', type: 'Personal' },
  { title: 'Nap / short rest', duration: 20, priority: 'Low', type: 'Personal' }
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
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.clock} 1. Daily Routine & Work Schedule</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-xs font-medium text-slate-400 mb-1">Wake-up time</label>
          <input type="time" value="${f.wakeTime}" oninput="setFormData({wakeTime:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">Bedtime</label>
          <input type="time" value="${f.sleepTime}" oninput="setFormData({sleepTime:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">Work start</label>
          <input type="time" value="${f.workStart}" oninput="setFormData({workStart:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div><label class="block text-xs font-medium text-slate-400 mb-1">Work end</label>
          <input type="time" value="${f.workEnd}" oninput="setFormData({workEnd:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
        <div class="col-span-2"><label class="block text-xs font-medium text-slate-400 mb-1">Commute time (one-way, minutes)</label>
          <input type="number" min="0" max="180" step="5" value="${f.travelMinutes}" oninput="setFormData({travelMinutes: parseInt(this.value)||0})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
          <p class="text-[11px] text-slate-500 mt-1">Used to work out when you need to leave and when you'll get home (one-way value, applied to both directions).</p></div>
      </div>
      <div class="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-lg text-xs text-indigo-200">
        ℹ️ The "Work start–Work end" range is reserved as a single <strong>"Work"</strong> block. The system will never insert meetings, activities, or breaks into this time, since you already run your own work schedule — everything in the next step is only ever placed in the free time "before work" or "after work".
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-400 mb-1">Work style</label>
        <select onchange="setFormData({workStyle:this.value})" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none">
          <option ${f.workStyle.startsWith('Sedentary') ? 'selected' : ''}>Sedentary / Desk Work (sitting at a desk all day)</option>
          <option ${f.workStyle.startsWith('Active') ? 'selected' : ''}>Active / On the move (frequent travel/movement)</option>
          <option ${f.workStyle.startsWith('Hybrid') ? 'selected' : ''}>Hybrid Work (alternating desk work and meetings)</option>
        </select>
      </div>
      <button onclick="setState({step:2})" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex justify-center items-center gap-2 transition">Next: Energy & Physical Assessment ${Icons.arrow}</button>
    </div>`;
  } else if (state.step === 2) {
    inner = `
    <div class="space-y-6">
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.heart} 2. Body & Fatigue Assessment (Energy & Stress Sliders)</h3>
      <div class="space-y-4">
        <div><div class="flex justify-between text-sm mb-1"><span>Physical energy level:</span><span class="font-bold text-indigo-400">${f.energy} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.energy}" oninput="setFormData({energy:parseInt(this.value)})" class="w-full" /></div>
        <div><div class="flex justify-between text-sm mb-1"><span>Accumulated fatigue:</span><span class="font-bold text-amber-400">${f.fatigue} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.fatigue}" oninput="setFormData({fatigue:parseInt(this.value)})" class="w-full" style="accent-color:#f59e0b" /></div>
        <div><div class="flex justify-between text-sm mb-1"><span>Accumulated stress:</span><span class="font-bold text-rose-400">${f.stress} / 10</span></div>
          <input type="range" min="1" max="10" value="${f.stress}" oninput="setFormData({stress:parseInt(this.value)})" class="w-full" style="accent-color:#f43f5e" /></div>
      </div>
      <div class="flex gap-4">
        <button onclick="setState({step:1})" class="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium">Back</button>
        <button onclick="setState({step:3})" class="w-2/3 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex justify-center items-center gap-2">Next: Activities & Tasks ${Icons.arrow}</button>
      </div>
    </div>`;
  } else {
    inner = `
    <div class="space-y-6">
      <h3 class="font-semibold text-lg text-cyan-300 flex items-center gap-2">${Icons.zap} 3. Off-Work Activities to Schedule</h3>
      <p class="text-xs text-slate-500 -mt-4">Only add personal / self-development activities you want to do "before work" or "after work" — no need to add work tasks, meetings, or emails, since your work hours are reserved as a single untouched block.</p>
      <div class="space-y-3">
        ${f.tasks
          .map(
            (t) => `
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-lg flex justify-between items-center gap-2 flex-wrap">
            <div class="min-w-0">
              <span class="font-medium text-sm text-slate-200">${t.title}</span>
              <div class="flex gap-2 mt-1 flex-wrap">
                <span class="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded">${t.duration} min</span>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <select onchange="setTaskWhen(${t.id}, this.value)" title="Preferred window" class="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-300">
                <option value="auto" ${(!t.when || t.when === 'auto') ? 'selected' : ''}>🔀 Auto</option>
                <option value="morning" ${t.when === 'morning' ? 'selected' : ''}>🌅 Morning</option>
                <option value="evening" ${t.when === 'evening' ? 'selected' : ''}>🌙 Evening</option>
              </select>
              <span class="text-xs px-2 py-1 rounded font-medium ${t.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}">${t.priority}</span>
              <button onclick="removeTask(${t.id})" title="Remove this activity" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition">${Icons.trash}</button>
            </div>
          </div>`
          )
          .join('')}
        ${f.tasks.length === 0 ? '<p class="text-sm text-slate-500 text-center py-4">No activities yet — add some from the examples below.</p>' : ''}
      </div>
      <p class="text-[11px] text-slate-500 -mt-2">💡 "Auto" lets the system pick whichever window has more free time left. "Morning"/"Evening" pins the activity to that window only.</p>

      <div class="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">🌿 Pick from example activities (click to add instantly)</p>
        <div class="flex flex-wrap gap-2">
          ${TASK_PRESETS.map((p, i) => `<button onclick="addPresetTask(${i})" class="text-xs px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition flex items-center gap-1">${Icons.plus} ${p.title} <span class="text-slate-400">· ${p.duration}m</span></button>`).join('')}
        </div>
      </div>

      <div class="p-4 bg-slate-900/60 border border-dashed border-slate-700 rounded-xl space-y-3">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Or add a custom activity</p>
        <input id="newTaskTitle" type="text" placeholder="Activity name, e.g. band practice" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
        <div class="grid grid-cols-3 gap-2">
          <select id="newTaskDuration" class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white">
            <option value="15">15 min</option><option value="30" selected>30 min</option><option value="45">45 min</option><option value="60">60 min</option><option value="90">90 min</option><option value="120">120 min</option>
          </select>
          <select id="newTaskPriority" class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white">
            <option>High</option><option selected>Medium</option><option>Low</option>
          </select>
          <select id="newTaskWhen" class="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white">
            <option value="auto" selected>🔀 Auto</option>
            <option value="morning">🌅 Morning</option>
            <option value="evening">🌙 Evening</option>
          </select>
        </div>
        <button onclick="addTask()" class="w-full py-2 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium flex justify-center items-center gap-2 transition">${Icons.plus} Add activity</button>
      </div>

      <div class="flex gap-4 pt-4 border-t border-slate-700">
        <button onclick="setState({step:2})" class="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium">Back</button>
        <button onclick="handleGeneratePlan()" class="w-2/3 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2">${Icons.sparkles} Generate Smart Life Schedule</button>
      </div>
    </div>`;
  }

  return `
  <div class="max-w-3xl mx-auto bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 backdrop-blur shadow-xl">
    <div class="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
      <div><h2 class="text-2xl font-bold text-indigo-300">Daily Life Planning Questionnaire</h2>
        <p class="text-slate-400 text-sm">Enter your schedule, physical condition, and workload so the system can calculate the most suitable timetable.</p></div>
      <span class="text-xs font-semibold px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">Step ${state.step} of 3</span>
    </div>
    ${inner}
  </div>`;
}

function renderChart(blocks) {
  const totals = {};
  blocks.forEach((b) => {
    const dur = b.e - b.s;
    totals[b.category] = (totals[b.category] || 0) + dur;
  });
  const total = Object.values(totals).reduce((a, c) => a + c, 0) || 1;
  const palette = ['#6366f1', '#22d3ee', '#f59e0b', '#f43f5e', '#10b981', '#a78bfa', '#eab308', '#38bdf8'];
  let acc = 0;
  const stops = [];
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  entries.forEach(([cat, val], i) => {
    const pct = (val / total) * 100;
    stops.push(`${palette[i % palette.length]} ${acc}% ${acc + pct}%`);
    acc += pct;
  });
  const gradient = `conic-gradient(${stops.join(',')})`;
  const legend = entries
    .map(
      ([cat, val], i) =>
        `<div class="flex items-center gap-2 text-xs text-slate-300"><span class="w-3 h-3 rounded-full inline-block shrink-0" style="background:${palette[i % palette.length]}"></span>${cat} · ${Math.round((val / total) * 100)}% (${Math.round(val)} min)</div>`
    )
    .join('');
  return `<div class="flex items-center gap-6 flex-wrap">
    <div style="width:110px;height:110px;border-radius:50%;background:${gradient};flex-shrink:0;"></div>
    <div class="space-y-1.5">${legend}</div>
  </div>`;
}

function renderDashboard() {
  if (!state.scheduleResult) return '';
  const { blocks, cuts, recommendations, aiStatus, focusMinutes } = state.scheduleResult;
  const focusHours = (focusMinutes / 60).toFixed(1);

  const aiBadge =
    aiStatus === 'loading'
      ? `<span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">${Icons.robot} Processing...</span>`
      : aiStatus === 'ai'
      ? `<span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">${Icons.sparkles} Generated by AI (Claude via your API key)</span>`
      : `<span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">${Icons.alert} Offline mode (rule-based — no API key set)</span>`;

  const dims = recommendations
    ? [
        { key: 'fitness', title: '1. Fitness & Movement', icon: Icons.dumbbell, color: 'emerald', text: recommendations.fitness },
        { key: 'nutrition', title: '2. Nutrition & Rest', icon: Icons.heart, color: 'amber', text: recommendations.nutrition },
        { key: 'mental', title: '3. Mental Wellbeing', icon: Icons.brain, color: 'cyan', text: recommendations.mental },
        { key: 'growth', title: '4. Personal Growth', icon: Icons.zap, color: 'indigo', text: recommendations.growth }
      ]
    : [];

  return `
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
      <div class="bg-slate-800/80 border border-slate-700/80 p-5 rounded-xl">
        <div class="flex items-center gap-3 mb-2">${Icons.heart}<span class="text-sm font-semibold text-slate-300">Physical readiness today</span></div>
        <div class="text-2xl font-bold text-white">Fatigue: ${state.formData.fatigue}/10</div>
        <p class="text-xs ${state.formData.fatigue >= 7 ? 'text-amber-400' : 'text-emerald-400'} mt-1">${state.formData.fatigue >= 7 ? '⚠️ Schedule intensity reduced to prevent burnout' : '✓ Fatigue level is within a healthy range'}</p>
      </div>
      <div class="bg-slate-800/80 border border-slate-700/80 p-5 rounded-xl">
        <div class="flex items-center gap-3 mb-2">${Icons.clock}<span class="text-sm font-semibold text-slate-300">Work hours (as you specified)</span></div>
        <div class="text-2xl font-bold text-indigo-300">${focusHours} hours</div>
        <p class="text-xs text-emerald-400 mt-1">✓ Reserved as a single block — never split or altered by the system</p>
      </div>
      <div class="bg-slate-800/80 border border-slate-700/80 p-5 rounded-xl">
        <div class="flex items-center gap-3 mb-2">${Icons.brain}<span class="text-sm font-semibold text-slate-300">Smart Cut Efficiency</span></div>
        <div class="text-2xl font-bold text-cyan-300">${cuts.length} Tasks Adjusted</div>
        <p class="text-xs text-slate-400 mt-1">Adjusts timing without skipping important goals</p>
      </div>
    </div>

    ${
      cuts.length
        ? `
    <div class="bg-amber-950/40 border border-amber-500/40 p-5 rounded-xl no-print">
      <h3 class="font-semibold text-amber-300 flex items-center gap-2 mb-3">${Icons.alert} Smart Cut & Dynamic Task Adjustment Log</h3>
      <div class="space-y-2">
        ${cuts
          .map(
            (c) => `<div class="text-sm bg-slate-900/60 p-3 rounded-lg border border-amber-500/20">
          <div class="flex justify-between font-medium text-amber-200 flex-wrap gap-1"><span>${c.task}</span><span>${c.original} ➔ <span class="text-emerald-400">${c.adjusted}</span></span></div>
          <p class="text-xs text-slate-400 mt-1">Reason: ${c.reason}</p></div>`
          )
          .join('')}
      </div>
    </div>`
        : ''
    }

    <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur" id="printArea">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h3 class="font-bold text-xl text-white flex items-center gap-2">${Icons.calendar} Smart Life Schedule (Time-Blocking Schedule)</h3>
        <div class="flex flex-wrap gap-2 no-print">
          <button onclick="downloadSchedule()" class="flex items-center gap-2 text-xs font-medium px-3 py-2 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg transition">${Icons.download} .txt</button>
          <button onclick="printSchedule()" class="flex items-center gap-2 text-xs font-medium px-3 py-2 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg transition">${Icons.download} PDF (print)</button>
          <button onclick="downloadCalendar()" class="flex items-center gap-2 text-xs font-medium px-3 py-2 bg-slate-700 hover:bg-indigo-600 text-white rounded-lg transition">${Icons.download} Calendar (.ics)</button>
        </div>
      </div>
      <div class="space-y-3">
        ${blocks
          .map(
            (b) => `<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 transition">
          <div class="flex items-center gap-4"><span class="text-sm font-mono font-semibold text-indigo-400 w-32">${b.time}</span>
            <div><div class="font-medium text-slate-200">${b.activity}</div><span class="text-xs text-slate-500">${b.category}</span></div></div>
          <span class="mt-2 sm:mt-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300">${b.tag}</span>
        </div>`
          )
          .join('')}
      </div>
    </div>

    <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur no-print">
      <h3 class="font-bold text-lg text-white mb-4">Time Allocation by Category</h3>
      ${renderChart(blocks)}
    </div>

    <div class="no-print">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 class="font-bold text-lg text-white">Personalized 4-Dimension Recommendations</h3>
        ${aiBadge}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${
          aiStatus === 'loading'
            ? `
        <div class="md:col-span-2 bg-slate-800/60 border border-slate-700/60 p-6 rounded-xl text-center text-slate-400 text-sm flex items-center justify-center gap-2">
          <span class="spin inline-block">${Icons.refresh}</span> Generating personalized recommendations...
        </div>`
            : dims
                .map(
                  (d) => `
        <div class="bg-slate-800/60 border border-slate-700/60 p-6 rounded-xl">
          <h4 class="font-semibold text-${d.color}-400 flex items-center gap-2 mb-3">${d.icon} ${d.title}</h4>
          <p class="text-sm text-slate-300">${d.text}</p>
        </div>`
                )
                .join('')
        }
      </div>
    </div>
  </div>`;
}

function renderPrompt() {
  const f = state.formData;
  const promptText = `<system_prompt>
  <role>
    You are an expert "AI Life Design & Schedule Architect" specializing in workload balancing, circadian rhythm optimization, and stress reduction.
  </role>

  <context>
    User is a digital worker experiencing fatigue (Level ${f.fatigue}/10) and stress (Level ${f.stress}/10).
    Workstyle: ${f.workStyle}.
  </context>

  <task_instructions>
    1. NEVER schedule anything inside work_start–work_end; keep it as one single, untouched "Work" block.
    2. Only place personal/growth tasks in the free windows before work_start (morning) or after work_end (evening).
    3. Apply Smart Cut algorithm if available free time is less than task duration.
    4. Ensure time-blocking does not overlap.
  </task_instructions>

  <input_data>
    <schedule wake="${f.wakeTime}" sleep="${f.sleepTime}" work_start="${f.workStart}" work_end="${f.workEnd}" />
    <tasks>
      ${f.tasks.map((t) => `<task name="${anonymize(t.title)}" duration="${t.duration}m" priority="${t.priority}" />`).join('\n      ')}
    </tasks>
  </input_data>
</system_prompt>`;

  const hasKey = !!getStoredApiKey();

  return `
  <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur space-y-4">
    <div class="flex justify-between items-center border-b border-slate-700 pb-3 flex-wrap gap-2">
      <h2 class="text-xl font-bold text-indigo-300 flex items-center gap-2">${Icons.code} RCTF & XML System Prompt Architecture</h2>
      <span class="text-xs ${hasKey ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'} px-3 py-1 rounded-full border flex items-center gap-1">${Icons.robot} ${hasKey ? 'Connected to Claude API with your key' : 'No API key set (offline mode)'}</span>
    </div>
    <p class="text-sm text-slate-400">Prompt design using the <strong>RCTF Framework</strong> (Role, Context, Task, Format) together with <strong>XML Tags</strong> for precise AI time allocation — the tasks shown below have already been anonymized before being sent:</p>
    <pre class="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">${promptText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    <p class="text-xs text-slate-500">Note: the time-blocking schedule is always computed with a deterministic, rule-based Smart Cut algorithm in the browser — it works with no AI at all. The 4-dimension recommendations on the Dashboard only call the real Claude API once you add your own API key in the <strong>Privacy & AI Settings</strong> tab, and only anonymized data is ever sent. Without a key, the system falls back to rule-based recommendations instead.</p>
  </div>`;
}

function renderPrivacy() {
  const liveTasks = state.formData.tasks
    .map(
      (t) => `<div class="grid grid-cols-2 gap-2 text-xs font-mono py-1 border-b border-slate-800/60 last:border-0">
    <span class="text-slate-400 truncate">${t.title}</span><span class="text-emerald-400 truncate">${anonymize(t.title)}</span></div>`
    )
    .join('');

  const hasKey = !!getStoredApiKey();

  return `
  <div class="space-y-6">
  <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur space-y-6">
    <div class="flex items-center gap-3 border-b border-slate-700 pb-4">
      <div class="text-emerald-400">${Icons.shield}</div>
      <div><h2 class="text-xl font-bold text-white">Privacy-First Data Shield</h2>
        <p class="text-sm text-slate-400">A personal-data protection and substitution system (Anonymization Layer) — runs for real in your browser before anything is sent to AI.</p></div>
    </div>

    <div>
      <h4 class="font-semibold text-slate-300 text-sm mb-2">Try typing text containing personal information (Live Demo)</h4>
      <textarea id="anonDemoInput" oninput="setState({anonDemoInput:this.value})" rows="2" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none font-mono">${state.anonDemoInput}</textarea>
      <div class="mt-2 p-3 bg-slate-950 border border-emerald-500/20 rounded-lg text-xs font-mono text-emerald-400">${anonymize(state.anonDemoInput)}</div>
    </div>

    <div>
      <h4 class="font-semibold text-slate-300 text-sm mb-2">Your current activity list ➔ what the system actually sends to AI</h4>
      <div class="bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div class="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-500 pb-1 border-b border-slate-800"><span>Raw data</span><span>After anonymization</span></div>
        ${liveTasks || '<p class="text-xs text-slate-500 py-2">No activities in your list yet</p>'}
      </div>
    </div>

    <div class="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
      ✓ Anonymization always happens in your browser before any AI call is made. Raw data never leaves your device, and the schedule computed by the local algorithm works with no AI at all (AI is only used to enrich the recommendations).
    </div>
  </div>

  <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur space-y-4">
    <div class="flex items-center gap-3 border-b border-slate-700 pb-4">
      <div class="text-indigo-400">${Icons.key}</div>
      <div><h2 class="text-xl font-bold text-white">Enable real AI (optional)</h2>
        <p class="text-sm text-slate-400">Add your own Anthropic API key so Claude can write specific 4-dimension recommendations, instead of the rule-based fallback used by default.</p>
      </div>
    </div>
    <div class="space-y-3">
      <label class="block text-xs font-medium text-slate-400">Anthropic API Key</label>
      <input id="apiKeyInput" type="password" placeholder="sk-ant-..." value="${state.apiKeyInput || ''}" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono focus:border-indigo-500 outline-none" />
      <div class="flex gap-3">
        <button onclick="handleSaveApiKey()" class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Save key</button>
        <button onclick="handleClearApiKey()" class="flex-1 py-2.5 bg-slate-700 hover:bg-rose-600 text-white rounded-lg text-sm font-medium">Clear key</button>
      </div>
      <p class="text-xs ${hasKey ? 'text-emerald-400' : 'text-slate-500'}">${hasKey ? '✓ Found an API key saved in this browser. The system will call the real Claude API next time you click Generate.' : 'Not set yet — the system will keep using rule-based fallback recommendations.'}</p>
      <div class="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs text-amber-200">
        ⚠️ Your key is stored only in this browser's <code>localStorage</code> and sent directly from your browser to the Anthropic API — no other server is involved. This is fine for personal use on a device you trust, but this key should not be used on a page published for other people to share.
      </div>
    </div>
  </div>
  </div>`;
}

function render() {
  let mainContent = '';
  if (state.activeTab === 'wizard') mainContent = renderWizard();
  else if (state.activeTab === 'dashboard') mainContent = renderDashboard();
  else if (state.activeTab === 'prompt') mainContent = renderPrompt();
  else if (state.activeTab === 'privacy') mainContent = renderPrivacy();

  document.getElementById('app').innerHTML = `
    <div class="min-h-screen bg-slate-900 text-slate-100 pb-12">
      ${renderHeader()}
      <main class="max-w-7xl mx-auto px-6 mt-8">${mainContent}</main>
    </div>`;
}
// =========================================================================
// Boot: render once, then try to restore the visitor's last saved plan
// from this browser's localStorage.
// =========================================================================
(function boot() {
  render();
  const saved = loadSavedPlan();
  if (saved && saved.formData && saved.scheduleResult) {
    state.formData = saved.formData;
    state.scheduleResult = saved.scheduleResult;
    state.isGenerated = true;
    state.activeTab = 'dashboard';
    render();
  }
})();
