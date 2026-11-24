// ==================== CONFIGURAÇÃO DO CRONOGRAMA FECHADO ====================
const START_DATE_ISO = '2026-11-24';
const EXAM_DATE_ISO = '2027-02-27';
const XP_PER_TASK = 10;
const PENALTY_MISSED_DAY = 15;
const STORAGE_KEY = 'pm_estudos_fechado_v3';

const SUBJECTS_CONFIG = [
  { key: 'portugues', name: 'Língua Portuguesa', icon: '📘', color: 'bg-blue-500' },
  { key: 'matematica', name: 'Matemática / RLM', icon: '📐', color: 'bg-indigo-500' },
  { key: 'direito', name: 'Noções de Direito', icon: '⚖️', color: 'bg-amber-500' },
  { key: 'atualidades', name: 'História, Geo & Atualidades', icon: '🌍', color: 'bg-teal-500' },
  { key: 'informatica', name: 'Noções de Informática', icon: '💻', color: 'bg-cyan-500' },
  { key: 'redacao', name: 'Redação Dissertativa', icon: '✍️', color: 'bg-rose-500' },
  { key: 'taf', name: 'Treino Físico (TAF)', icon: '🏃', color: 'bg-emerald-500' },
  { key: 'simulado', name: 'Simulados & Revisões', icon: '🎯', color: 'bg-purple-500' }
];

const PM_ESSAY_TOPICS = [
  'O papel da Polícia Militar na prevenção da violência urbana e promoção da cidadania',
  'Os desafios da segurança pública no combate ao crime organizado nas grandes cidades',
  'A importância do policiamento comunitário para o fortalecimento da confiança entre polícia e sociedade',
  'O impacto das redes sociais na disseminação de notícias falsas e a segurança pública',
  'Violência doméstica contra a mulher: avanços legais e desafios na proteção às vítimas',
  'A redução da maioridade penal como alternativa para diminuir a criminalidade no Brasil',
  'O papel da educação e da inclusão social na prevenção da criminalidade juvenil',
  'Segurança viária e a responsabilidade do cidadão na redução de acidentes de trânsito',
  'O uso de tecnologias de monitoramento e inteligência policial no combate ao crime',
  'Saúde mental dos profissionais de segurança pública: desafios e estratégias de cuidado',
  'O sistema prisional brasileiro e os desafios da ressocialização de detentos',
  'A influência do tráfico de drogas no aumento dos índices de violência urbana'
];

const HARD_INSTRUCTOR_QUOTES = [
  '"SE NÃO SE ESFORÇAR, NÃO VAI PASSAR! A vaga na Polícia Militar não é dada de presente para quem tem preguiça."',
  '"ENQUANTO VOCÊ DORME OU PROCASTINA, SEU CONCORRENTE ESTÁ RESOLVENDO 50 QUESTÕES. ACORDA!"',
  '"NO DIA DA PROVA NÃO EXISTE DESCULPA. OU VOCÊ TEM DISCIPLINA AGORA, OU VAI VER SEU NOME FORA DA LISTA."',
  '"FARDA NÃO É PARA QUEM QUER, É PARA QUEM AGUENTA O PROCESSO TODOS OS DIAS. VOLTE PARA O COMBATE!"'
];

const WEEKDAY_TEMPLATES = {
  1: [
    { subject: 'portugues', text: 'Língua Portuguesa (Teoria)', tag: 'Teoria' },
    { subject: 'portugues', text: '20 questões de Português', tag: 'Prática' },
    { subject: 'taf', text: 'Treino TAF (Corrida 12 min)', tag: 'TAF' }
  ],
  2: [
    { subject: 'matematica', text: 'Matemática / Raciocínio Lógico', tag: 'Teoria' },
    { subject: 'matematica', text: '15 questões de Matemática', tag: 'Prática' },
    { subject: 'taf', text: 'Treino TAF (Barra / Flexão)', tag: 'TAF' }
  ],
  3: [
    { subject: 'direito', text: 'Noções de Direito / Adm. Pública', tag: 'Teoria' },
    { subject: 'direito', text: '20 questões de Direito', tag: 'Prática' },
    { subject: 'taf', text: 'Descanso ativo / Alongamento', tag: 'TAF' }
  ],
  4: [
    { subject: 'portugues', text: 'Língua Portuguesa (Gramática/Texto)', tag: 'Teoria' },
    { subject: 'redacao', text: 'Redação no caderno (1 texto + foto)', tag: 'Redação' },
    { subject: 'taf', text: 'Treino TAF (Corrida)', tag: 'TAF' }
  ],
  5: [
    { subject: 'atualidades', text: 'História, Geografia e Atualidades', tag: 'Teoria' },
    { subject: 'atualidades', text: '20 questões de Atualidades', tag: 'Prática' },
    { subject: 'taf', text: 'Treino TAF (Abdominal remador)', tag: 'TAF' }
  ],
  6: [
    { subject: 'informatica', text: 'Noções de Informática', tag: 'Teoria' },
    { subject: 'simulado', text: 'Revisão dos erros da semana', tag: 'Revisão' },
    { subject: 'taf', text: 'Treino TAF (Simulado físico)', tag: 'TAF' }
  ],
  0: [
    { subject: 'simulado', text: 'Simulado Completo PM (ou Revisão Geral)', tag: 'Simulado' },
    { subject: 'simulado', text: 'Correção detalhada e caderno de erros', tag: 'Revisão' }
  ]
};

const WEEKDAY_NAMES = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

function parseISO(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function toISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatBR(isoStr) {
  const [y, m, d] = isoStr.split('-');
  return `${d}/${m}/${y}`;
}

function diffDays(iso1, iso2) {
  const d1 = parseISO(iso1);
  const d2 = parseISO(iso2);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function addDaysISO(isoStr, daysToAdd) {
  const d = parseISO(isoStr);
  d.setDate(d.getDate() + daysToAdd);
  return toISO(d);
}

function buildClosedSchedule() {
  const days = [];
  const totalDays = diffDays(START_DATE_ISO, EXAM_DATE_ISO) + 1;
  let sundayCount = 0;

  for (let i = 0; i < totalDays; i++) {
    const iso = addDaysISO(START_DATE_ISO, i);
    const dateObj = parseISO(iso);
    const dow = dateObj.getDay();

    let phase = 'Fase 1: Base Teórica';
    if (i >= 64) phase = 'Fase 3: Reta Final';
    else if (i >= 32) phase = 'Fase 2: Aprofundamento';

    let isSimuladoSunday = false;
    let tasks = [];

    if (iso === EXAM_DATE_ISO) {
      tasks = [
        { id: `${iso}-0`, subject: 'simulado', text: 'DIA DA PROVA OFICIAL PM • Missão Cumprida!', tag: 'Prova' }
      ];
    } else {
      if (dow === 0) {
        sundayCount++;
        isSimuladoSunday = (sundayCount % 2 === 1);
      }

      const template = WEEKDAY_TEMPLATES[dow];
      tasks = template.map((t, idx) => {
        let taskText = t.text;
        if (dow === 0 && idx === 0) {
          taskText = isSimuladoSunday
            ? 'Simulado Oficial PM (Fazer na aba Simulado PM)'
            : 'Revisão Geral & Resolução de Questões';
        }
        return {
          id: `${iso}-${idx}`,
          subject: t.subject,
          text: taskText,
          tag: t.tag
        };
      });
    }

    days.push({
      index: i,
      dayNumber: i + 1,
      iso,
      brDate: formatBR(iso),
      weekdayName: WEEKDAY_NAMES[dow],
      phase,
      isSimuladoSunday,
      tasks
    });
  }
  return days;
}

const CLOSED_SCHEDULE = buildClosedSchedule();

let appState = loadState();
let viewingDayIndex = 0;
let uploadedEssayImage = null;
let currentSimuladoQuestions = [];

function getRealOrInitialToday() {
  const realToday = toISO(new Date());
  if (realToday >= START_DATE_ISO && realToday <= EXAM_DATE_ISO) return realToday;
  if (realToday > EXAM_DATE_ISO) return EXAM_DATE_ISO;
  return START_DATE_ISO;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        completedTasks: parsed.completedTasks || {},
        simulatedToday: parsed.simulatedToday || getRealOrInitialToday(),
        dayNotes: parsed.dayNotes || {},
        essayHistory: parsed.essayHistory || [],
        simuladoHistory: parsed.simuladoHistory || [],
        lastActiveRealDate: parsed.lastActiveRealDate || toISO(new Date()),
        customApiKey: parsed.customApiKey || ''
      };
    }
  } catch (e) {}
  return {
    completedTasks: {},
    simulatedToday: getRealOrInitialToday(),
    dayNotes: {},
    essayHistory: [],
    simuladoHistory: [],
    lastActiveRealDate: toISO(new Date()),
    customApiKey: ''
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {}
}

function getEffectiveTodayISO() {
  const realToday = toISO(new Date());
  if (realToday >= START_DATE_ISO && realToday <= EXAM_DATE_ISO) {
    if (realToday > appState.simulatedToday) {
      appState.simulatedToday = realToday;
      saveState();
    }
  }
  return appState.simulatedToday;
}

function getEffectiveTodayIndex() {
  const todayISO = getEffectiveTodayISO();
  const idx = CLOSED_SCHEDULE.findIndex(d => d.iso === todayISO);
  return idx >= 0 ? idx : 0;
}

function getApiKey() {
  return (appState.customApiKey && appState.customApiKey.trim()) || "";
}

function saveApiKey() {
  const val = document.getElementById('api-key-input').value.trim();
  appState.customApiKey = val;
  saveState();
  const status = document.getElementById('api-key-status');
  status.classList.remove('hidden');
  setTimeout(() => status.classList.add('hidden'), 3000);
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Este navegador não suporta notificações. Mantenha o app fixado na tela inicial!');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('🚨 INSTRUTOR PM • COBRANÇA ATIVADA', {
        body: 'Se você falhar um único dia no cronograma, eu vou cobrar. Foco total na farda!'
      });
      updateNotificationButton();
    }
  });
}

function updateNotificationButton() {
  const btn = document.getElementById('btn-enable-notifications');
  if (!btn) return;
  if ('Notification' in window && Notification.permission === 'granted') {
    btn.textContent = '🔔 Cobrança Ativa';
    btn.className = 'px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold transition-colors';
  }
}

function triggerHardReminderNotification(missedCount) {
  if ('Notification' in window && Notification.permission === 'granted' && missedCount > 0) {
    new Notification(`🚨 ALERTA DE ATRASO (${missedCount} ${missedCount === 1 ? 'DIA' : 'DIAS'})`, {
      body: 'Você não apareceu para estudar! Se não se esforçar, não vai passar. Abra o cronograma agora!'
    });
  }
}

function evaluateProgress() {
  const todayISO = getEffectiveTodayISO();
  let earnedXP = 0;
  let missedDays = [];
  let currentStreak = 0;

  const subjectStats = {};
  SUBJECTS_CONFIG.forEach(s => {
    subjectStats[s.key] = { done: 0, total: 0 };
  });

  CLOSED_SCHEDULE.forEach(dayObj => {
    const dayCompletedCount = dayObj.tasks.filter(t => appState.completedTasks[t.id]).length;
    earnedXP += dayCompletedCount * XP_PER_TASK;

    dayObj.tasks.forEach(t => {
      if (subjectStats[t.subject]) {
        subjectStats[t.subject].total += 1;
        if (appState.completedTasks[t.id]) {
          subjectStats[t.subject].done += 1;
        }
      }
    });

    if (dayObj.iso < todayISO) {
      if (dayCompletedCount === 0) {
        missedDays.push(dayObj);
        currentStreak = 0;
      } else {
        currentStreak += 1;
      }
    } else if (dayObj.iso === todayISO && dayCompletedCount > 0) {
      currentStreak += 1;
    }
  });

  const penaltyXP = missedDays.length * PENALTY_MISSED_DAY;
  const netXP = Math.max(0, earnedXP - penaltyXP);

  return {
    todayISO,
    netXP,
    missedDays,
    currentStreak,
    subjectStats
  };
}

function renderApp() {
  const stats = evaluateProgress();
  const todayIndex = getEffectiveTodayIndex();
  const currentDay = CLOSED_SCHEDULE[viewingDayIndex];

  const daysLeft = Math.max(0, diffDays(stats.todayISO, EXAM_DATE_ISO));
  document.getElementById('countdown-days').textContent = daysLeft;
  document.getElementById('simulated-today-label').textContent = formatBR(stats.todayISO);
  document.getElementById('phase-badge').textContent = CLOSED_SCHEDULE[todayIndex].phase;
  document.getElementById('total-xp').textContent = stats.netXP;
  document.getElementById('streak-count').textContent = stats.currentStreak;
  document.getElementById('missed-count').textContent = stats.missedDays.length;

  const xp = stats.netXP;
  let rank = 'Recruta', badge = '🎖️';
  if (xp >= 1200) { rank = 'Tenente'; badge = '🌟'; }
  else if (xp >= 750) { rank = 'Sargento'; badge = '⭐'; }
  else if (xp >= 350) { rank = 'Cabo'; badge = '🛡️'; }
  else if (xp >= 120) { rank = 'Soldado'; badge = '⚔️'; }
  document.getElementById('rank-name').textContent = rank;
  document.getElementById('rank-badge').textContent = badge;

  const alertBox = document.getElementById('inactivity-alert');
  if (stats.missedDays.length > 0) {
    alertBox.classList.remove('hidden');
    const lastMissed = stats.missedDays[stats.missedDays.length - 1];
    const quoteIdx = stats.missedDays.length % HARD_INSTRUCTOR_QUOTES.length;
    document.getElementById('missed-days-badge').textContent =
      `${stats.missedDays.length} ${stats.missedDays.length === 1 ? 'dia perdido' : 'dias perdidos'} (-${stats.missedDays.length * PENALTY_MISSED_DAY} XP)`;
    document.getElementById('inactivity-message').textContent =
      `Você não apareceu para estudar em ${stats.missedDays.length} ${stats.missedDays.length === 1 ? 'data' : 'datas'} (última falta: ${lastMissed.brDate}). Sua ofensiva foi zerada e seu atraso ficou registrado no histórico.`;
    document.getElementById('inactivity-hard-quote').textContent = HARD_INSTRUCTOR_QUOTES[quoteIdx];
  } else {
    alertBox.classList.add('hidden');
  }

  document.getElementById('btn-prev-day').disabled = viewingDayIndex <= 0;
  const btnNext = document.getElementById('btn-next-day');
  if (viewingDayIndex >= todayIndex) {
    btnNext.disabled = true;
    btnNext.innerHTML = '<span>Próximo 🔒</span>';
    btnNext.title = 'Bloqueado! Você só pode ver o próximo dia quando a data chegar.';
  } else {
    btnNext.disabled = false;
    btnNext.innerHTML = '<span>Próximo →</span>';
    btnNext.title = 'Avançar para o próximo dia liberado';
  }

  document.getElementById('day-number-badge').textContent = `Dia ${currentDay.dayNumber} de ${CLOSED_SCHEDULE.length}`;
  document.getElementById('day-full-title').textContent = `${currentDay.brDate} • ${currentDay.weekdayName}`;

  const doneCount = currentDay.tasks.filter(t => appState.completedTasks[t.id]).length;
  const totalCount = currentDay.tasks.length;
  const isToday = currentDay.iso === stats.todayISO;
  const isPast = currentDay.iso < stats.todayISO;
  const isOverdue = isPast && doneCount === 0;
  const isComplete = doneCount === totalCount;

  const statusPill = document.getElementById('day-status-pill');
  const missionCard = document.getElementById('daily-mission-card');
  const overdueBanner = document.getElementById('day-overdue-banner');
  const pastReviewBanner = document.getElementById('past-review-banner');

  if (isPast) {
    pastReviewBanner.classList.remove('hidden');
  } else {
    pastReviewBanner.classList.add('hidden');
    document.getElementById('ai-review-box').classList.add('hidden');
  }

  if (isOverdue) {
    statusPill.textContent = 'ATRASADO • FALTA';
    statusPill.className = 'text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-rose-600 text-white';
    missionCard.className = 'bg-white border-2 border-rose-500 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 transition-all';
    overdueBanner.classList.remove('hidden');
  } else if (isComplete) {
    statusPill.textContent = 'CONCLUÍDO ✓';
    statusPill.className = 'text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800';
    missionCard.className = 'bg-white border-2 border-emerald-400 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 transition-all';
    overdueBanner.classList.add('hidden');
  } else if (isToday) {
    statusPill.textContent = 'MISSÃO DE HOJE';
    statusPill.className = 'text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800';
    missionCard.className = 'bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 transition-all';
    overdueBanner.classList.add('hidden');
  } else {
    statusPill.textContent = 'REVISÃO';
    statusPill.className = 'text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700';
    missionCard.className = 'bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 transition-all';
    overdueBanner.classList.add('hidden');
  }

  const simCta = document.getElementById('simulado-day-cta');
  if (currentDay.isSimuladoSunday) {
    simCta.classList.remove('hidden');
  } else {
    simCta.classList.add('hidden');
  }

  const dayPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  document.getElementById('day-task-counter').textContent = `${doneCount} de ${totalCount} concluídas`;
  document.getElementById('day-progress-bar').style.width = `${dayPercent}%`;

  const tasksList = document.getElementById('daily-tasks-list');
  tasksList.innerHTML = currentDay.tasks.map(task => {
    const isChecked = !!appState.completedTasks[task.id];
    const subj = SUBJECTS_CONFIG.find(s => s.key === task.subject);
    return `
      <label class="flex items-center gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
        isChecked
          ? 'bg-emerald-50/50 border-emerald-200'
          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
      }">
        <input
          type="checkbox"
          ${isChecked ? 'checked' : ''}
          onchange="toggleTask('${task.id}', this.checked)"
          class="w-5 h-5 rounded-md border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold leading-snug ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}">
            ${task.text}
          </p>
          <span class="text-[11px] font-semibold text-slate-500">${subj ? subj.icon + ' ' + subj.name : task.tag}</span>
        </div>
        <span class="text-xs font-extrabold px-2.5 py-1 rounded-lg shrink-0 ${
          isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-white border border-slate-200 text-slate-600'
        }">
          ${isChecked ? '+10 XP ✓' : '+10 XP'}
        </span>
      </label>
    `;
  }).join('');

  document.getElementById('day-notes-input').value = appState.dayNotes[currentDay.iso] || '';

  renderSubjectsProgress(stats.subjectStats);
  renderEssayHistory();
  renderSimuladoHistory();
}

function renderSubjectsProgress(subjectStats) {
  const grid = document.getElementById('subjects-progress-grid');
  let totalDoneAll = 0;
  let totalLessonsAll = 0;

  grid.innerHTML = SUBJECTS_CONFIG.map(subj => {
    const stat = subjectStats[subj.key] || { done: 0, total: 0 };
    totalDoneAll += stat.done;
    totalLessonsAll += stat.total;
    const pct = stat.total > 0 ? Math.round((stat.done / stat.total) * 100) : 0;

    return `
      <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-base">${subj.icon}</span>
            <span class="text-xs sm:text-sm font-bold text-slate-800 truncate">${subj.name}</span>
          </div>
          <span class="text-xs font-extrabold text-slate-900 shrink-0">${stat.done}/${stat.total}</span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full ${subj.color} rounded-full transition-all duration-300" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('overall-lessons-badge').textContent = `${totalDoneAll} / ${totalLessonsAll} lições totais`;
}

function toggleTask(taskId, isChecked) {
  if (isChecked) {
    appState.completedTasks[taskId] = true;
    showToast('+10 XP', 'Lição concluída!');
  } else {
    delete appState.completedTasks[taskId];
  }
  saveState();
  renderApp();
}

function changeViewingDay(delta) {
  const todayIndex = getEffectiveTodayIndex();
  const nextIndex = viewingDayIndex + delta;
  if (nextIndex < 0) return;
  if (nextIndex > todayIndex) {
    showToast('🔒 Bloqueado', 'Você não pode ver o cronograma dos próximos dias!');
    return;
  }
  viewingDayIndex = nextIndex;
  renderApp();
}

function goToToday() {
  viewingDayIndex = getEffectiveTodayIndex();
  renderApp();
}

function advanceOneDay() {
  const nextISO = addDaysISO(appState.simulatedToday, 1);
  if (nextISO > EXAM_DATE_ISO) {
    showToast('🏁 Fim', 'Você já chegou à data da prova (27/02/2027)!');
    return;
  }
  const prevDayObj = CLOSED_SCHEDULE[getEffectiveTodayIndex()];
  const prevDone = prevDayObj.tasks.filter(t => appState.completedTasks[t.id]).length;

  appState.simulatedToday = nextISO;
  saveState();
  viewingDayIndex = getEffectiveTodayIndex();
  renderApp();

  if (prevDone === 0) {
    const stats = evaluateProgress();
    triggerHardReminderNotification(stats.missedDays.length);
    showToast('🚨 FALTA!', 'Você pulou um dia sem estudar! -15 XP.');
  } else {
    showToast('📅 Novo Dia', `Liberado: ${formatBR(nextISO)}`);
  }
}

let noteTimeout;
function saveDayNote() {
  const currentDay = CLOSED_SCHEDULE[viewingDayIndex];
  appState.dayNotes[currentDay.iso] = document.getElementById('day-notes-input').value;
  saveState();
  const badge = document.getElementById('notes-saved-badge');
  badge.classList.remove('opacity-0');
  clearTimeout(noteTimeout);
  noteTimeout = setTimeout(() => badge.classList.add('opacity-0'), 1500);
}

async function generateDayReviewAI() {
  const currentDay = CLOSED_SCHEDULE[viewingDayIndex];
  const btn = document.getElementById('btn-ai-review');
  const box = document.getElementById('ai-review-box');
  const content = document.getElementById('ai-review-content');

  const apiKey = getApiKey();
  if (!apiKey) {
    box.classList.remove('hidden');
    content.textContent = '⚠️ Configure sua Chave API Gemini no botão "📲 App / IA" no topo da tela para usar a Flash-Revisão.';
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Gerando...';
  box.classList.remove('hidden');
  content.textContent = 'Preparando resumo rápido e 2 perguntas de revisão para você fixar o conteúdo deste dia...';

  const topicsList = currentDay.tasks.map(t => t.text).join('; ');
  const userNotes = appState.dayNotes[currentDay.iso] || 'Nenhuma anotação pessoal.';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const prompt = `Você é um instrutor preparatório para concurso da Polícia Militar (PM).
O aluno está revisando o dia ${currentDay.brDate} (${currentDay.weekdayName}).
Tópicos estudados neste dia: ${topicsList}.
Anotações do aluno: ${userNotes}.

Crie uma Flash-Revisão objetiva e direta ao ponto (máximo 12 linhas) contendo:
1. 3 bizus essenciais que mais caem na prova sobre essas matérias;
2. 2 perguntas rápidas de verificação com resposta curta logo abaixo.`;

  try {
    const res = await fetchWithBackoff(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível gerar a revisão.';
    content.textContent = reply;
  } catch (e) {
    content.textContent = 'Erro ao conectar com a IA. Verifique sua chave de API e tente novamente.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>✨ Flash-Revisão IA</span>';
  }
}

function openCalendarModal() {
  const todayISO = getEffectiveTodayISO();
  const container = document.getElementById('calendar-grid-container');

  container.innerHTML = CLOSED_SCHEDULE.map(d => {
    const done = d.tasks.filter(t => appState.completedTasks[t.id]).length;
    const total = d.tasks.length;
    const isFuture = d.iso > todayISO;
    const isToday = d.iso === todayISO;
    const isOverdue = d.iso < todayISO && done === 0;
    const isComplete = done === total;

    if (isFuture) {
      return `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-100/80 text-left opacity-70 cursor-not-allowed select-none">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-500">${d.brDate}</span>
            <span class="text-xs font-extrabold text-slate-500">🔒</span>
          </div>
          <p class="text-[11px] font-semibold text-slate-400 mt-0.5">${d.weekdayName}</p>
          <span class="inline-block mt-1.5 text-[10px] font-extrabold uppercase text-slate-500">Missão Confidencial</span>
        </div>
      `;
    }

    let styleClass = 'border-slate-200 bg-white hover:border-slate-400';
    let label = `Dia ${d.dayNumber} • ${done}/${total}`;
    if (isToday) {
      styleClass = 'border-slate-900 bg-slate-900 text-white';
      label = `HOJE • ${done}/${total}`;
    } else if (isOverdue) {
      styleClass = 'border-rose-300 bg-rose-50 text-rose-900';
      label = 'FALTA (-15 XP)';
    } else if (isComplete) {
      styleClass = 'border-emerald-300 bg-emerald-50 text-emerald-900';
      label = 'REVISAR ✓';
    }

    return `
      <button
        onclick="selectDayFromCalendar(${d.index})"
        class="p-3 rounded-xl border text-left transition-all ${styleClass}"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold">${d.brDate}</span>
          <span class="text-[10px] font-bold opacity-75">#${d.dayNumber}</span>
        </div>
        <p class="text-[11px] opacity-80 truncate mt-0.5">${d.weekdayName}</p>
        <span class="inline-block mt-1.5 text-[10px] font-extrabold uppercase">${label}</span>
      </button>
    `;
  }).join('');

  document.getElementById('calendar-modal').classList.remove('hidden');
}

function closeCalendarModal() {
  document.getElementById('calendar-modal').classList.add('hidden');
}

function selectDayFromCalendar(idx) {
  const todayIndex = getEffectiveTodayIndex();
  if (idx > todayIndex) {
    showToast('🔒 Bloqueado', 'Dias futuros são confidenciais!');
    return;
  }
  viewingDayIndex = idx;
  closeCalendarModal();
  renderApp();
}

async function generateSimulado() {
  const errBox = document.getElementById('simulado-error');
  errBox.classList.add('hidden');

  const apiKey = getApiKey();
  if (!apiKey) {
    errBox.textContent = '⚠️ Configure sua Chave API Gemini no botão "📲 App / IA" no topo da tela para gerar o Simulado.';
    errBox.classList.remove('hidden');
    return;
  }

  const count = parseInt(document.getElementById('simulado-q-count').value, 10) || 10;
  const btn = document.getElementById('btn-generate-simulado');
  const btnText = document.getElementById('btn-simulado-text');
  const spinner = document.getElementById('btn-simulado-spinner');

  btn.disabled = true;
  btnText.textContent = 'Elaborando prova estilo PM...';
  spinner.classList.remove('hidden');

  document.getElementById('simulado-quiz-container').classList.add('hidden');
  document.getElementById('simulado-result-box').classList.add('hidden');

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const prompt = `Você é a banca examinadora oficial de concursos da Polícia Militar (estilo VUNESP / PM).
Elabore um simulado inédito com exatamente ${count} questões de múltipla escolha (5 alternativas: A, B, C, D, E), distribuídas equilibradamente entre: Língua Portuguesa, Matemática/Raciocínio Lógico, Noções de Direito/Constitucional, Atualidades e Noções de Informática.
Nível: Ensino Médio (Concurso Soldado PM).`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          questoes: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                numero: { type: "INTEGER" },
                materia: { type: "STRING" },
                enunciado: { type: "STRING" },
                alternativas: {
                  type: "ARRAY",
                  items: { type: "STRING" }
                },
                corretaIndex: { type: "INTEGER" },
                explicacao: { type: "STRING" }
              },
              required: ["numero", "materia", "enunciado", "alternativas", "corretaIndex", "explicacao"]
            }
          }
        },
        required: ["questoes"]
      }
    }
  };

  try {
    const response = await fetchWithBackoff(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    const rawJson = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) throw new Error('Falha ao gerar questões.');

    const parsed = JSON.parse(rawJson);
    currentSimuladoQuestions = parsed.questoes || [];
    renderSimuladoQuestions();
  } catch (e) {
    errBox.textContent = 'Erro ao gerar o simulado. Verifique sua chave de API ou conexão e tente novamente.';
    errBox.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btnText.textContent = '🎯 Gerar Novo Simulado PM';
    spinner.classList.add('hidden');
  }
}

function renderSimuladoQuestions() {
  const list = document.getElementById('simulado-questions-list');
  const letters = ['A', 'B', 'C', 'D', 'E'];

  list.innerHTML = currentSimuladoQuestions.map((q, qIdx) => `
    <div class="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-900 text-white">
          Questão ${q.numero || qIdx + 1}
        </span>
        <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
          ${q.materia}
        </span>
      </div>
      <p class="text-sm font-semibold text-slate-900 leading-relaxed whitespace-pre-line">${q.enunciado}</p>
      <div class="space-y-2 pt-1">
        ${q.alternativas.map((alt, aIdx) => `
          <label class="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-900 cursor-pointer transition-all">
            <input type="radio" name="sim-q-${qIdx}" value="${aIdx}" class="mt-0.5 text-slate-900 focus:ring-slate-900" />
            <span class="text-xs sm:text-sm text-slate-800">
              <strong class="font-extrabold text-slate-900">${letters[aIdx]})</strong> ${alt.replace(/^[A-E]\)\s*/i, '')}
            </span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');

  document.getElementById('simulado-quiz-container').classList.remove('hidden');
}

function submitSimulado() {
  const errBox = document.getElementById('simulado-error');
  errBox.classList.add('hidden');

  const userAnswers = [];
  for (let i = 0; i < currentSimuladoQuestions.length; i++) {
    const selected = document.querySelector(`input[name="sim-q-${i}"]:checked`);
    if (!selected) {
      errBox.textContent = `Responda todas as questões antes de finalizar (falta a Questão ${i + 1}).`;
      errBox.classList.remove('hidden');
      return;
    }
    userAnswers.push(parseInt(selected.value, 10));
  }

  let correctCount = 0;
  const wrongBySubject = {};
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const reviewHtml = currentSimuladoQuestions.map((q, idx) => {
    const userChoice = userAnswers[idx];
    const isRight = userChoice === q.corretaIndex;
    if (isRight) {
      correctCount++;
    } else {
      wrongBySubject[q.materia] = (wrongBySubject[q.materia] || 0) + 1;
    }

    return `
      <div class="p-4 rounded-xl border ${isRight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold ${isRight ? 'text-emerald-800' : 'text-rose-800'}">
            ${isRight ? '✅ Acertou' : '❌ Errou'} • Questão ${idx + 1} (${q.materia})
          </span>
          <span class="text-xs font-bold text-slate-700">
            Sua: ${letters[userChoice]} | Gabarito: ${letters[q.corretaIndex]}
          </span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed">${q.explicacao}</p>
      </div>
    `;
  }).join('');

  const score = Math.round((correctCount / currentSimuladoQuestions.length) * 100);
  document.getElementById('simulado-final-score').textContent = score;
  document.getElementById('simulado-review-list').innerHTML = reviewHtml;

  let verdict = 'REPROVADO NO SIMULADO • ACORDA!';
  let feedback = 'Nota abaixo do mínimo de corte (50 pontos). Se fosse hoje, você estaria eliminado. Revise cada erro abaixo imediatamente!';
  if (score >= 80) {
    verdict = 'EXCELENTE • PADRÃO APROVAÇÃO!';
    feedback = 'Desempenho de elite! Mantenha a constância e não baixe a guarda até 27/02/2027.';
  } else if (score >= 60) {
    verdict = 'NA BRIGA • PRECISA LAPIDAR';
    feedback = 'Você passou da nota mínima, mas na PM cada ponto define sua classificação. Ataque as matérias em que errou!';
  }

  document.getElementById('simulado-verdict-title').textContent = verdict;
  document.getElementById('simulado-instructor-feedback').textContent = feedback;

  const tipsList = document.getElementById('simulado-tips-list');
  const weakSubjects = Object.entries(wrongBySubject).sort((a, b) => b[1] - a[1]);
  if (weakSubjects.length === 0) {
    tipsList.innerHTML = '<li>Você gabaritou o simulado! Aumente o nível fazendo o simulado de 15 questões e cronometrando o tempo de prova.</li>';
  } else {
    tipsList.innerHTML = weakSubjects.map(([subj, errs]) =>
      `<li><strong>${subj} (${errs} ${errs === 1 ? 'erro' : 'erros'}):</strong> Refaça 20 questões específicas desta matéria e anote os conceitos errados no caderno de revisão.</li>`
    ).join('');
  }

  appState.simuladoHistory.unshift({
    date: formatBR(getEffectiveTodayISO()),
    score,
    correctCount,
    total: currentSimuladoQuestions.length
  });
  saveState();
  renderSimuladoHistory();

  document.getElementById('simulado-quiz-container').classList.add('hidden');
  const resultBox = document.getElementById('simulado-result-box');
  resultBox.classList.remove('hidden');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSimuladoHistory() {
  const box = document.getElementById('simulado-history-box');
  const list = document.getElementById('simulado-history-list');
  if (!appState.simuladoHistory || appState.simuladoHistory.length === 0) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  list.innerHTML = appState.simuladoHistory.slice(0, 8).map(item => `
    <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div>
        <p class="text-xs sm:text-sm font-bold text-slate-900">Simulado PM • ${item.correctCount}/${item.total} acertos</p>
        <span class="text-[11px] text-slate-500">Realizado em ${item.date}</span>
      </div>
      <span class="px-3 py-1 rounded-lg text-xs font-extrabold shrink-0 ${
        item.score >= 60 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      }">
        ${item.score}/100
      </span>
    </div>
  `).join('');
}

function populateEssayTopics() {
  const select = document.getElementById('essay-topic-select');
  PM_ESSAY_TOPICS.forEach(topic => {
    const opt = document.createElement('option');
    opt.value = topic;
    opt.textContent = topic;
    select.appendChild(opt);
  });
}

function selectPresetTopic(value) {
  if (value) document.getElementById('essay-topic').value = value;
}

function pickRandomTopic() {
  const randomIndex = Math.floor(Math.random() * PM_ESSAY_TOPICS.length);
  const chosen = PM_ESSAY_TOPICS[randomIndex];
  document.getElementById('essay-topic-select').value = chosen;
  document.getElementById('essay-topic').value = chosen;
  showToast('🎲 Tema Sorteado', 'Prepare a folha do caderno!');
}

function updateWordCount() {
  const text = document.getElementById('essay-text').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('word-count').textContent = `${words} ${words === 1 ? 'palavra' : 'palavras'}`;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('essay-text').value = e.target.result;
    updateWordCount();
  };
  reader.readAsText(file, 'UTF-8');
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('essay-error').classList.add('hidden');

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const MAX_DIMENSION = 1600;
      let width = img.width;
      let height = img.height;

      if (width > height && width > MAX_DIMENSION) {
        height = Math.round((height * MAX_DIMENSION) / width);
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round((width * MAX_DIMENSION) / height);
        height = MAX_DIMENSION;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      uploadedEssayImage = {
        base64: compressedDataUrl.split(',')[1],
        mimeType: 'image/jpeg',
        fileName: file.name
      };

      document.getElementById('photo-preview-img').src = compressedDataUrl;
      document.getElementById('photo-file-name').textContent = file.name;
      document.getElementById('photo-upload-controls').classList.add('hidden');
      document.getElementById('photo-preview-container').classList.remove('hidden');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearUploadedImage() {
  uploadedEssayImage = null;
  document.getElementById('essay-camera-input').value = '';
  document.getElementById('essay-gallery-input').value = '';
  document.getElementById('photo-preview-img').src = '';
  document.getElementById('photo-preview-container').classList.add('hidden');
  document.getElementById('photo-upload-controls').classList.remove('hidden');
}

async function fetchWithBackoff(url, options, maxRetries = 3) {
  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status === 429 || response.status >= 500) {
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
        continue;
      }
      throw new Error(`Erro na API: ${response.status}`);
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
}

async function correctEssay() {
  const errEl = document.getElementById('essay-error');
  errEl.classList.add('hidden');

  const apiKey = getApiKey();
  if (!apiKey) {
    errEl.textContent = '⚠️ Configure sua Chave API Gemini no botão "📲 App / IA" no topo da tela para corrigir a redação.';
    errEl.classList.remove('hidden');
    return;
  }

  const topic = document.getElementById('essay-topic').value.trim();
  const text = document.getElementById('essay-text').value.trim();

  if (!uploadedEssayImage && (!text || text.length < 50)) {
    errEl.textContent = 'Envie uma foto da sua redação no caderno ou digite/cole um texto com pelo menos 50 caracteres.';
    errEl.classList.remove('hidden');
    return;
  }

  const btn = document.getElementById('btn-correct-essay');
  const btnText = document.getElementById('btn-correct-text');
  const spinner = document.getElementById('btn-correct-spinner');

  btn.disabled = true;
  btnText.textContent = uploadedEssayImage ? 'Lendo manuscrito e corrigindo...' : 'Corrigindo...';
  spinner.classList.remove('hidden');

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
  const parts = [];

  if (uploadedEssayImage) {
    parts.push({
      inlineData: {
        mimeType: uploadedEssayImage.mimeType,
        data: uploadedEssayImage.base64
      }
    });
    parts.push({
      text: `Você é um corretor oficial de redações para concursos da Polícia Militar (PM) no Brasil.
O candidato enviou uma FOTO de sua redação escrita à mão no caderno (para treinar sem corretor automático do celular).

1. Transcreva fielmente todo o texto manuscrito da imagem no campo "transcricao", MANTENDO exatamente os erros de ortografia, acentuação, pontuação e rasuras visíveis.
2. Avalie a redação rigorosamente de 0 a 100 no padrão dissertativo-argumentativo da PM.

Tema: ${topic || 'Não informado (avalie o tema implícito)'}
${text ? 'Texto complementar digitado:\n"""\n' + text + '\n"""' : ''}`
    });
  } else {
    parts.push({
      text: `Você é um corretor oficial de redações para concursos da Polícia Militar (PM) no Brasil.
Avalie rigorosamente de 0 a 100 no padrão dissertativo-argumentativo da PM.

Tema: ${topic || 'Não informado'}
Texto:
"""
${text}
"""`
    });
  }

  const payload = {
    contents: [{ parts }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          transcricao: { type: "STRING" },
          notaFinal: { type: "INTEGER" },
          resumoGeral: { type: "STRING" },
          gramatica: {
            type: "OBJECT",
            properties: { nota: { type: "INTEGER" }, comentario: { type: "STRING" } },
            required: ["nota", "comentario"]
          },
          estrutura: {
            type: "OBJECT",
            properties: { nota: { type: "INTEGER" }, comentario: { type: "STRING" } },
            required: ["nota", "comentario"]
          },
          argumentacao: {
            type: "OBJECT",
            properties: { nota: { type: "INTEGER" }, comentario: { type: "STRING" } },
            required: ["nota", "comentario"]
          },
          pontosFortes: { type: "ARRAY", items: { type: "STRING" } },
          ondeMelhorar: { type: "ARRAY", items: { type: "STRING" } }
        },
        required: ["notaFinal", "resumoGeral", "gramatica", "estrutura", "argumentacao", "pontosFortes", "ondeMelhorar"]
      }
    }
  };

  try {
    const response = await fetchWithBackoff(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const rawJson = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) throw new Error('Falha na resposta.');

    const data = JSON.parse(rawJson);
    renderEssayResult(data, !!uploadedEssayImage, topic || 'Tema livre');
  } catch (error) {
    errEl.textContent = 'Erro ao conectar com o corretor de IA. Verifique sua chave de API ou tente novamente.';
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Corrigir Redação';
    spinner.classList.add('hidden');
  }
}

function renderEssayResult(data, hasImage, topicUsed) {
  document.getElementById('result-score').textContent = data.notaFinal;
  document.getElementById('result-summary').textContent = data.resumoGeral;

  const transcriptionBox = document.getElementById('transcription-box');
  if (hasImage && data.transcricao && data.transcricao.trim().length > 0) {
    document.getElementById('result-transcription').textContent = data.transcricao;
    transcriptionBox.classList.remove('hidden');
  } else {
    transcriptionBox.classList.add('hidden');
  }

  document.getElementById('score-gramatica').textContent = `${data.gramatica.nota}/30`;
  document.getElementById('comment-gramatica').textContent = data.gramatica.comentario;

  document.getElementById('score-estrutura').textContent = `${data.estrutura.nota}/30`;
  document.getElementById('comment-estrutura').textContent = data.estrutura.comentario;

  document.getElementById('score-argumentacao').textContent = `${data.argumentacao.nota}/40`;
  document.getElementById('comment-argumentacao').textContent = data.argumentacao.comentario;

  document.getElementById('result-strengths').innerHTML = data.pontosFortes.map(i => `<li>${i}</li>`).join('');
  document.getElementById('result-improvements').innerHTML = data.ondeMelhorar.map(i => `<li>${i}</li>`).join('');

  appState.essayHistory.unshift({
    date: formatBR(getEffectiveTodayISO()),
    topic: topicUsed,
    score: data.notaFinal
  });
  saveState();
  renderEssayHistory();

  const resultBox = document.getElementById('essay-result');
  resultBox.classList.remove('hidden');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderEssayHistory() {
  const box = document.getElementById('essay-history-box');
  const list = document.getElementById('essay-history-list');
  if (!appState.essayHistory || appState.essayHistory.length === 0) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  list.innerHTML = appState.essayHistory.slice(0, 8).map(item => `
    <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div class="min-w-0">
        <p class="text-xs sm:text-sm font-bold text-slate-900 truncate">${item.topic}</p>
        <span class="text-[11px] text-slate-500">Avaliada em ${item.date}</span>
      </div>
      <span class="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-extrabold shrink-0">
        ${item.score}/100
      </span>
    </div>
  `).join('');
}

function switchTab(tab) {
  const secCronograma = document.getElementById('section-cronograma');
  const secSimulado = document.getElementById('section-simulado');
  const secRedacao = document.getElementById('section-redacao');

  const btnCronograma = document.getElementById('tab-btn-cronograma');
  const btnSimulado = document.getElementById('tab-btn-simulado');
  const btnRedacao = document.getElementById('tab-btn-redacao');

  secCronograma.classList.add('hidden');
  secSimulado.classList.add('hidden');
  secRedacao.classList.add('hidden');

  const inactiveClass = 'flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all tab-inactive';
  const activeClass = 'flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all tab-active';

  btnCronograma.className = inactiveClass;
  btnSimulado.className = inactiveClass;
  btnRedacao.className = inactiveClass;

  if (tab === 'cronograma') {
    secCronograma.classList.remove('hidden');
    btnCronograma.className = activeClass;
  } else if (tab === 'simulado') {
    secSimulado.classList.remove('hidden');
    btnSimulado.className = activeClass;
  } else {
    secRedacao.classList.remove('hidden');
    btnRedacao.className = activeClass;
  }
}

function openAppModal() {
  document.getElementById('api-key-input').value = appState.customApiKey || '';
  document.getElementById('app-modal').classList.remove('hidden');
}

function closeAppModal() {
  document.getElementById('app-modal').classList.add('hidden');
}

function exportBackupCode() {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(appState))));
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      alert('Código de backup copiado! Cole no seu WhatsApp para guardar.');
    });
  } else {
    prompt('Copie o código abaixo:', code);
  }
}

function importBackupCode() {
  const code = prompt('Cole aqui o seu código de backup:');
  if (!code) return;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    appState = {
      completedTasks: parsed.completedTasks || {},
      simulatedToday: parsed.simulatedToday || START_DATE_ISO,
      dayNotes: parsed.dayNotes || {},
      essayHistory: parsed.essayHistory || [],
      simuladoHistory: parsed.simuladoHistory || [],
      lastActiveRealDate: toISO(new Date()),
      customApiKey: parsed.customApiKey || appState.customApiKey || ''
    };
    saveState();
    viewingDayIndex = getEffectiveTodayIndex();
    closeAppModal();
    renderApp();
    showToast('✅ Restaurado', 'Progresso recuperado!');
  } catch (e) {
    alert('Código de backup inválido.');
  }
}

function resetAllProgress() {
  if (!confirm('Tem certeza? Isso apagará todas as tarefas concluídas e voltará para 24/11/2026.')) return;
  const keepKey = appState.customApiKey || '';
  appState = {
    completedTasks: {},
    simulatedToday: START_DATE_ISO,
    dayNotes: {},
    essayHistory: [],
    simuladoHistory: [],
    lastActiveRealDate: toISO(new Date()),
    customApiKey: keepKey
  };
  saveState();
  viewingDayIndex = 0;
  closeAppModal();
  renderApp();
}

let toastTimeout;
function showToast(badge, msg) {
  const toast = document.getElementById('xp-toast');
  document.getElementById('toast-badge').textContent = badge;
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2400);
}

window.onload = function () {
  populateEssayTopics();
  updateNotificationButton();
  viewingDayIndex = getEffectiveTodayIndex();
  renderApp();

  const stats = evaluateProgress();
  if (stats.missedDays.length > 0) {
    triggerHardReminderNotification(stats.missedDays.length);
  }
};
