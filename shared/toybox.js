// Catalog and rendering for the Toybox home and course pages.
// To add a step, add it to a course's `steps`; give it `href`, `storageKey` and `total` once it exists.
// To add a course, add an entry to COURSES and a page at <id>/index.html (copy japanese/index.html).
(() => {
  const LANGS = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'Français' },
    { id: 'zh-Hans', name: '中文（简体）' },
    { id: 'zh-Hant', name: '中文（繁體）' },
    { id: 'ja', name: '日本語' },
    { id: 'ko', name: '한국어' }
  ];

  const TEXT = {
    en: {
      tagline: 'Small things to play with and use.',
      learn: 'Learn a language',
      ready: (r, t) => `${r} of ${t} steps ready`,
      mastered: (d, t) => `${d}/${t} mastered`,
      notStarted: 'Not started',
      done: 'Done',
      soon: 'Coming soon',
      step: n => `Step ${n}`,
      more: 'More coming soon.',
      language: 'Language'
    },
    fr: {
      tagline: 'De petites choses pour jouer et s\'en servir.',
      learn: 'Apprendre une langue',
      ready: (r, t) => `${r} étape${r > 1 ? 's' : ''} sur ${t} disponible${r > 1 ? 's' : ''}`,
      mastered: (d, t) => `${d}/${t} maîtrisés`,
      notStarted: 'Pas encore commencé',
      done: 'Terminé',
      soon: 'Bientôt',
      step: n => `Étape ${n}`,
      more: 'D\'autres arrivent bientôt.',
      language: 'Langue'
    },
    'zh-Hans': {
      tagline: '好玩又好用的小东西。',
      learn: '学语言',
      ready: (r, t) => `${t} 个阶段中已开放 ${r} 个`,
      mastered: (d, t) => `已掌握 ${d}/${t}`,
      notStarted: '尚未开始',
      done: '已完成',
      soon: '即将推出',
      step: n => `第 ${n} 步`,
      more: '更多内容即将推出。',
      language: '语言'
    },
    'zh-Hant': {
      tagline: '好玩又好用的小東西。',
      learn: '學語言',
      ready: (r, t) => `${t} 個階段中已開放 ${r} 個`,
      mastered: (d, t) => `已掌握 ${d}/${t}`,
      notStarted: '尚未開始',
      done: '已完成',
      soon: '即將推出',
      step: n => `第 ${n} 步`,
      more: '更多內容即將推出。',
      language: '語言'
    },
    ja: {
      tagline: '遊んだり使ったりできる小さなもの。',
      learn: '言語を学ぶ',
      ready: (r, t) => `${t}ステップ中 ${r}つ公開中`,
      mastered: (d, t) => `${d}/${t} 覚えた`,
      notStarted: '未開始',
      done: '完了',
      soon: '準備中',
      step: n => `ステップ ${n}`,
      more: '今後も追加予定です。',
      language: '言語'
    },
    ko: {
      tagline: '가지고 놀고 쓰는 작은 것들.',
      learn: '언어 배우기',
      ready: (r, t) => `${t}단계 중 ${r}단계 공개`,
      mastered: (d, t) => `${d}/${t} 외움`,
      notStarted: '시작 전',
      done: '완료',
      soon: '준비 중',
      step: n => `${n}단계`,
      more: '더 추가될 예정이에요.',
      language: '언어'
    }
  };

  // Text fields are keyed by language id; English is the fallback
  const COURSES = [
    {
      id: 'japanese',
      glyph: 'あ',
      glyphClass: 'glyph-ja',
      color: '#d9452b',
      name: { en: 'Japanese', fr: 'Japonais', 'zh-Hans': '日语', 'zh-Hant': '日語', ja: '日本語', ko: '일본어' },
      goal: { en: 'Step by step to JLPT N5', fr: 'Pas à pas jusqu\'au JLPT N5', 'zh-Hans': '一步步达到 JLPT N5', 'zh-Hant': '一步步達到 JLPT N5', ja: 'JLPT N5 まで一歩ずつ', ko: 'JLPT N5까지 한 단계씩' },
      steps: [
        {
          id: 'hiragana', href: 'hiragana/', storageKey: 'hiragana-studio-v1', total: 55,
          name: { en: 'Hiragana', fr: 'Hiragana', 'zh-Hans': '平假名', 'zh-Hant': '平假名', ja: 'ひらがな', ko: '히라가나' },
          desc: { en: 'The basic Japanese script', fr: 'L\'écriture japonaise de base', 'zh-Hans': '日语的基本文字', 'zh-Hant': '日語的基本文字', ja: '日本語の基本の文字', ko: '일본어의 기본 문자' }
        },
        {
          id: 'katakana',
          name: { en: 'Katakana', fr: 'Katakana', 'zh-Hans': '片假名', 'zh-Hant': '片假名', ja: 'カタカナ', ko: '가타카나' },
          desc: { en: 'The script for foreign words', fr: 'L\'écriture des mots étrangers', 'zh-Hans': '用于外来词的文字', 'zh-Hant': '用於外來詞的文字', ja: '外来語に使う文字', ko: '외래어에 쓰는 문자' }
        },
        {
          id: 'n5-words',
          name: { en: 'N5 words', fr: 'Vocabulaire N5', 'zh-Hans': 'N5 词汇', 'zh-Hant': 'N5 詞彙', ja: 'N5 単語', ko: 'N5 단어' },
          desc: { en: 'About 800 everyday words', fr: 'Environ 800 mots courants', 'zh-Hans': '约 800 个常用词', 'zh-Hant': '約 800 個常用詞', ja: 'よく使う約800語', ko: '자주 쓰는 단어 약 800개' }
        },
        {
          id: 'n5-kanji',
          name: { en: 'N5 kanji', fr: 'Kanji N5', 'zh-Hans': 'N5 汉字', 'zh-Hant': 'N5 漢字', ja: 'N5 漢字', ko: 'N5 한자' },
          desc: { en: 'About 100 basic kanji', fr: 'Environ 100 kanji de base', 'zh-Hans': '约 100 个基础汉字', 'zh-Hant': '約 100 個基礎漢字', ja: '基本の漢字 約100字', ko: '기초 한자 약 100자' }
        },
        {
          id: 'n5-grammar',
          name: { en: 'N5 grammar', fr: 'Grammaire N5', 'zh-Hans': 'N5 语法', 'zh-Hant': 'N5 語法', ja: 'N5 文法', ko: 'N5 문법' },
          desc: { en: 'Basic sentence patterns', fr: 'Structures de phrase de base', 'zh-Hans': '基础句型', 'zh-Hant': '基礎句型', ja: '基本の文型', ko: '기본 문형' }
        }
      ]
    },
    {
      id: 'korean',
      glyph: '한',
      glyphClass: 'glyph-ko',
      color: '#2f5bd3',
      name: { en: 'Korean', fr: 'Coréen', 'zh-Hans': '韩语', 'zh-Hant': '韓語', ja: '韓国語', ko: '한국어' },
      goal: { en: 'Step by step to TOPIK I level 1', fr: 'Pas à pas jusqu\'au TOPIK I niveau 1', 'zh-Hans': '一步步达到 TOPIK I 一级', 'zh-Hant': '一步步達到 TOPIK I 一級', ja: 'TOPIK I 1級まで一歩ずつ', ko: 'TOPIK I 1급까지 한 단계씩' },
      steps: [
        {
          id: 'hangul', href: 'hangul/', storageKey: 'hangul-studio-v1', total: 54,
          name: { en: 'Hangul', fr: 'Hangul', 'zh-Hans': '韩文字母', 'zh-Hant': '韓文字母', ja: 'ハングル', ko: '한글' },
          desc: { en: 'All 40 letters and first syllables', fr: 'Les 40 lettres et les premières syllabes', 'zh-Hans': '全部 40 个字母和基础音节', 'zh-Hant': '全部 40 個字母和基礎音節', ja: '全40文字と基本の音節', ko: '자모 40개와 기본 음절' }
        },
        {
          id: 'batchim',
          name: { en: 'Batchim', fr: 'Batchim', 'zh-Hans': '收音', 'zh-Hant': '收音', ja: 'パッチム', ko: '받침' },
          desc: { en: 'Consonants at the end of a syllable', fr: 'Les consonnes en fin de syllabe', 'zh-Hans': '音节末尾的辅音', 'zh-Hant': '音節末尾的輔音', ja: '音節の終わりの子音', ko: '음절의 끝소리' }
        },
        {
          id: 'topik1-words',
          name: { en: 'TOPIK I words', fr: 'Vocabulaire TOPIK I', 'zh-Hans': 'TOPIK I 词汇', 'zh-Hant': 'TOPIK I 詞彙', ja: 'TOPIK I 単語', ko: 'TOPIK I 단어' },
          desc: { en: 'About 800 everyday words', fr: 'Environ 800 mots courants', 'zh-Hans': '约 800 个常用词', 'zh-Hant': '約 800 個常用詞', ja: 'よく使う約800語', ko: '자주 쓰는 단어 약 800개' }
        },
        {
          id: 'ko-grammar',
          name: { en: 'Basic grammar', fr: 'Grammaire de base', 'zh-Hans': '基础语法', 'zh-Hant': '基礎語法', ja: '基本文法', ko: '기초 문법' },
          desc: { en: 'Particles and sentence endings', fr: 'Particules et terminaisons', 'zh-Hans': '助词和词尾', 'zh-Hant': '助詞和詞尾', ja: '助詞と語尾', ko: '조사와 어미' }
        }
      ]
    }
  ];

  // Shared with every app so the choice carries across pages
  const LANG_KEY = 'toybox-lang';

  const ICON_GLOBE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><path d="M1.8 8h12.4M8 1.8c1.8 1.7 2.6 3.8 2.6 6.2S9.8 12.5 8 14.2C6.2 12.5 5.4 10.4 5.4 8S6.2 3.5 8 1.8z"/></svg>';
  const ICON_CHEVRON = '<svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>';
  const ICON_BACK = '<svg class="back" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>';
  const ICON_CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8.5 3.2 3L13 4.5"/></svg>';
  const LOGO = '<span class="logo" aria-hidden="true"><span></span><span></span><span></span><span></span></span>';

  const page = document.body.dataset.page;
  const root = document.body.dataset.root || '';
  const course = COURSES.find(c => c.id === document.body.dataset.course);

  function detectLang() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored && TEXT[stored]) return stored;
    } catch (e) {}
    for (const l of navigator.languages || [navigator.language || 'en']) {
      const x = l.toLowerCase();
      const id = x.startsWith('zh') ? (/hant|tw|hk|mo/.test(x) ? 'zh-Hant' : 'zh-Hans') : x.split('-')[0];
      if (TEXT[id]) return id;
    }
    return 'en';
  }

  let lang = detectLang();
  const pick = field => field[lang] || field.en;

  // Progress is read from each app's own saved data on this device
  function progressOf(step) {
    if (!step.storageKey) return null;
    let count = 0;
    try {
      const saved = JSON.parse(localStorage.getItem(step.storageKey)) || {};
      count = Math.min((saved.mastered || []).length, step.total);
    } catch (e) {}
    return { done: count, total: step.total };
  }

  function courseSummary(c) {
    const T = TEXT[lang];
    const live = c.steps.filter(s => s.href);
    const done = live.reduce((n, s) => n + progressOf(s).done, 0);
    const total = live.reduce((n, s) => n + s.total, 0);
    const parts = [T.ready(live.length, c.steps.length)];
    if (done > 0) parts.push(T.mastered(done, total));
    return parts.join(' · ');
  }

  function topBar() {
    const back = page === 'course'
      ? `<a class="home-link" href="${root}">${ICON_BACK}${LOGO}<span>Toybox</span></a>`
      : `<span class="home-link">${LOGO}<span>Toybox</span></span>`;
    return `
      <header class="top">
        ${back}
        <label class="lang">
          ${ICON_GLOBE}
          <select id="lang" aria-label="${TEXT[lang].language}">
            ${LANGS.map(l => `<option value="${l.id}" ${l.id === lang ? 'selected' : ''}>${l.name}</option>`).join('')}
          </select>
        </label>
      </header>`;
  }

  function renderHome() {
    const T = TEXT[lang];
    document.title = 'Toybox';
    return `
      ${topBar()}
      <main>
        <section class="hero">
          <h1>Toybox</h1>
          <p class="tagline">${T.tagline}</p>
        </section>
        <h2 class="section-title">${T.learn}</h2>
        <ul class="rows">
          ${COURSES.map(c => `
            <li>
              <a class="row" href="${root}${c.id}/" style="--c: ${c.color}">
                <span class="tile ${c.glyphClass}" aria-hidden="true">${c.glyph}</span>
                <span class="row-text">
                  <span class="row-title">${pick(c.name)}</span>
                  <span class="row-sub">${courseSummary(c)}</span>
                </span>
                ${ICON_CHEVRON}
              </a>
            </li>`).join('')}
        </ul>
        <footer class="more">${T.more}</footer>
      </main>`;
  }

  function stepHtml(step, i) {
    const T = TEXT[lang];
    const p = progressOf(step);
    const finished = p && p.done === p.total;
    const state = !step.href ? 'soon' : finished ? 'done' : 'live';
    const pill = !step.href ? `<span class="pill">${T.soon}</span>`
      : finished ? `<span class="pill go">${T.done}</span>` : '';
    const progress = step.href ? `
      <div class="step-progress">
        <div class="meter" aria-hidden="true"><div class="meter-fill" style="width:${(p.done / p.total) * 100}%"></div></div>
        <span>${p.done ? T.mastered(p.done, p.total) : T.notStarted}</span>
      </div>` : '';
    const body = `
      <div class="step-head">
        <span class="step-label">${T.step(i + 1)}</span>
        ${pill}
      </div>
      <p class="step-name">${pick(step.name)}</p>
      <p class="step-desc">${pick(step.desc)}</p>
      ${progress}`;
    return `
      <li class="step ${state}">
        <span class="step-num">${finished ? ICON_CHECK : i + 1}</span>
        ${step.href
          ? `<a class="step-card" href="${root}${step.href}">${body}</a>`
          : `<div class="step-card" aria-disabled="true">${body}</div>`}
      </li>`;
  }

  function renderCourse() {
    const live = course.steps.filter(s => s.href);
    const done = live.reduce((n, s) => n + progressOf(s).done, 0);
    const total = live.reduce((n, s) => n + s.total, 0);
    document.title = `${pick(course.name)} · Toybox`;
    return `
      ${topBar()}
      <main style="--c: ${course.color}">
        <section class="course-hero">
          <span class="tile ${course.glyphClass}" aria-hidden="true">${course.glyph}</span>
          <div>
            <h1>${pick(course.name)}</h1>
            <p>${pick(course.goal)}</p>
          </div>
        </section>
        <div class="meter" style="margin-top: 18px" aria-hidden="true"><div class="meter-fill" style="width:${total ? (done / total) * 100 : 0}%"></div></div>
        <ol class="steps">
          ${course.steps.map(stepHtml).join('')}
        </ol>
      </main>`;
  }

  function render() {
    document.documentElement.lang = lang;
    const app = document.getElementById('app');
    app.innerHTML = page === 'course' ? renderCourse() : renderHome();
    app.querySelector('#lang').addEventListener('change', e => {
      lang = e.target.value;
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (err) {}
      render();
    });
  }

  render();
  // Coming back with the browser's back button can show a cached page; refresh the progress
  window.addEventListener('pageshow', e => { if (e.persisted) render(); });
})();
