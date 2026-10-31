// Catalog and rendering for the Toybox home and course pages.
// To add a step, add it to a course's `steps`; give it `href`, `storageKey` and `total` once it exists.
// To add a course, add an entry to COURSES and a page at <id>/index.html (copy japanese/index.html).
(() => {
  const LANGS = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'Français' },
    { id: 'zh-Hans', name: '中文（简体）' },
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
      language: 'Language',
      confirmRestore: 'Restore the progress in this link? It is added to what is already here.',
      share: 'Share',
      restoredList: list => `Restored: ${list}`,
      emptyCode: 'This code has no saved progress in it. Make a new code on the device where you practiced.',
      nothingHere: 'No progress is saved in this browser yet.',
      continue: 'Continue',
      start: 'Start',
      allSteps: 'All steps',
      kinds: { words: 'Words', chars: 'Characters', grammar: 'Grammar', tones: 'Tones', initials: 'Initials', finals: 'Finals' },
      part: n => `Part ${n}`,
      backup: 'Back up or restore progress',
      backupNote: 'Progress is saved only in this browser. Copy a backup code to keep it safe or move it to another device.',
      copy: 'Copy backup code',
      restore: 'Restore from code',
      paste: 'Paste your backup code here',
      apply: 'Restore',
      copied: 'Copied. Keep it somewhere safe, like a note or a message to yourself.',
      copyFailed: 'Copy this code and keep it somewhere safe:',
      invalid: 'That code doesn\'t look right.',
      iosTip: 'On iPhone, add Toybox to your Home Screen. Safari may clear saved progress if you don\'t visit for a week.'
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
      language: 'Langue',
      confirmRestore: 'Restaurer la progression de ce lien ? Elle s\'ajoute à celle déjà présente.',
      share: 'Partager',
      restoredList: list => `Restauré : ${list}`,
      emptyCode: 'Ce code ne contient aucune progression. Créez un nouveau code sur l\'appareil où vous avez pratiqué.',
      nothingHere: 'Aucune progression n\'est encore enregistrée dans ce navigateur.',
      continue: 'Continuer',
      start: 'Commencer',
      allSteps: 'Toutes les étapes',
      kinds: { words: 'Vocabulaire', chars: 'Caractères', grammar: 'Grammaire', tones: 'Tons', initials: 'Initiales', finals: 'Finales' },
      part: n => `Partie ${n}`,
      backup: 'Sauvegarder ou restaurer la progression',
      backupNote: 'La progression est enregistrée uniquement dans ce navigateur. Copiez un code de sauvegarde pour la garder ou la transférer sur un autre appareil.',
      copy: 'Copier le code de sauvegarde',
      restore: 'Restaurer avec un code',
      paste: 'Collez votre code de sauvegarde ici',
      apply: 'Restaurer',
      copied: 'Copié. Gardez-le en lieu sûr, par exemple dans une note.',
      copyFailed: 'Copiez ce code et gardez-le en lieu sûr :',
      invalid: 'Ce code ne semble pas valide.',
      iosTip: 'Sur iPhone, ajoutez Toybox à l\'écran d\'accueil. Safari peut effacer la progression après une semaine sans visite.'
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
      language: '语言',
      confirmRestore: '要恢复这个链接里的进度吗？会与这里已有的进度合并。',
      share: '分享',
      restoredList: list => `已恢复：${list}`,
      emptyCode: '这个代码里没有进度。请在练习过的设备上重新生成。',
      nothingHere: '这个浏览器里还没有保存进度。',
      continue: '继续',
      start: '开始',
      allSteps: '全部阶段',
      kinds: { words: '词汇', chars: '汉字', grammar: '语法', tones: '声调', initials: '声母', finals: '韵母' },
      part: n => `第 ${n} 部分`,
      backup: '备份或恢复进度',
      backupNote: '进度只保存在这个浏览器里。复制备份码，可以妥善保存或转移到其他设备。',
      copy: '复制备份码',
      restore: '用备份码恢复',
      paste: '在这里粘贴备份码',
      apply: '恢复',
      copied: '已复制。请保存在安全的地方，比如备忘录或发给自己的消息。',
      copyFailed: '请复制这段代码并妥善保存：',
      invalid: '这个代码好像不对。',
      iosTip: '在 iPhone 上，请把 Toybox 添加到主屏幕。一周没打开的话，Safari 可能会清除进度。'
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
      language: '言語',
      confirmRestore: 'このリンクの進み具合を復元しますか？今ある進み具合に追加されます。',
      share: '共有',
      restoredList: list => `復元しました：${list}`,
      emptyCode: 'このコードには進み具合が入っていません。練習した端末で新しくコードを作ってください。',
      nothingHere: 'このブラウザにはまだ進み具合が保存されていません。',
      continue: '続ける',
      start: '始める',
      allSteps: 'すべてのステップ',
      kinds: { words: '語彙', chars: '漢字', grammar: '文法', tones: '声調', initials: '声母', finals: '韻母' },
      part: n => `パート${n}`,
      backup: '進み具合のバックアップ・復元',
      backupNote: '進み具合はこのブラウザにだけ保存されます。バックアップコードをコピーしておけば、安全に保管したり別の端末に移したりできます。',
      copy: 'バックアップコードをコピー',
      restore: 'コードから復元',
      paste: 'バックアップコードをここに貼り付け',
      apply: '復元',
      copied: 'コピーしました。メモや自分宛てのメッセージなど、安全な場所に保管してください。',
      copyFailed: 'このコードをコピーして保管してください：',
      invalid: 'コードが正しくないようです。',
      iosTip: 'iPhone では Toybox をホーム画面に追加してください。1週間開かないと Safari が進み具合を消すことがあります。'
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
      language: '언어',
      confirmRestore: '이 링크의 진행 기록을 복원할까요? 지금 있는 기록에 더해져요.',
      share: '공유',
      restoredList: list => `복원했어요: ${list}`,
      emptyCode: '이 코드에는 진행 기록이 없어요. 연습했던 기기에서 코드를 새로 만들어 주세요.',
      nothingHere: '이 브라우저에는 아직 저장된 진행 기록이 없어요.',
      continue: '이어서 하기',
      start: '시작하기',
      allSteps: '전체 단계',
      kinds: { words: '어휘', chars: '한자', grammar: '문법', tones: '성조', initials: '성모', finals: '운모' },
      part: n => `파트 ${n}`,
      backup: '진행 기록 백업·복원',
      backupNote: '진행 기록은 이 브라우저에만 저장돼요. 백업 코드를 복사해두면 안전하게 보관하거나 다른 기기로 옮길 수 있어요.',
      copy: '백업 코드 복사',
      restore: '코드로 복원',
      paste: '여기에 백업 코드를 붙여넣으세요',
      apply: '복원',
      copied: '복사했어요. 메모나 나에게 보내는 메시지처럼 안전한 곳에 보관하세요.',
      copyFailed: '이 코드를 복사해서 보관하세요:',
      invalid: '코드가 올바르지 않은 것 같아요.',
      iosTip: '아이폰에서는 Toybox를 홈 화면에 추가하세요. 일주일 동안 안 들어가면 Safari가 기록을 지울 수 있어요.'
    }
  };

  // Text fields are keyed by language id; English is the fallback
  // A level step made of small parts (about 50 items each) that share one study app.
  // counts: { words: [49, 49], chars: [50], grammar: [44] }
  function makeParts(app, level, counts) {
    return Object.entries(counts).flatMap(([kind, sizes]) => sizes.map((total, i) => ({
      kind,
      n: i + 1,
      total,
      storageKey: `${level}-${kind}-${i + 1}-v1`,
      href: `${app}?set=${level}-${kind}-${i + 1}`
    })));
  }

  const COURSES = [
    {
      id: 'japanese',
      glyph: 'あ',
      glyphClass: 'glyph-ja',
      color: '#d9452b',
      name: { en: 'Japanese', fr: 'Japonais', 'zh-Hans': '日语', ja: '日本語', ko: '일본어' },
      goal: { en: 'Step by step to JLPT N1', fr: 'Pas à pas jusqu\'au JLPT N1', 'zh-Hans': '一步步达到 JLPT N1', ja: 'JLPT N1 まで一歩ずつ', ko: 'JLPT N1까지 한 단계씩' },
      steps: [
        {
          id: 'hiragana', href: 'hiragana/', storageKey: 'hiragana-studio-v1', total: 55,
          name: { en: 'Hiragana', fr: 'Hiragana', 'zh-Hans': '平假名', ja: 'ひらがな', ko: '히라가나' },
          desc: { en: 'The basic Japanese script', fr: 'L\'écriture japonaise de base', 'zh-Hans': '日语的基本文字', ja: '日本語の基本の文字', ko: '일본어의 기본 문자' }
        },
        {
          id: 'hiragana-2',
          name: { en: 'Hiragana 2', fr: 'Hiragana 2', 'zh-Hans': '平假名 2', ja: 'ひらがな 2', ko: '히라가나 2' },
          desc: { en: 'Voiced sounds and combinations', fr: 'Sons voisés et combinaisons', 'zh-Hans': '浊音和拗音', ja: '濁音・半濁音と拗音', ko: '탁음과 요음' }
        },
        {
          id: 'katakana',
          name: { en: 'Katakana', fr: 'Katakana', 'zh-Hans': '片假名', ja: 'カタカナ', ko: '가타카나' },
          desc: { en: 'The script for foreign words', fr: 'L\'écriture des mots étrangers', 'zh-Hans': '用于外来词的文字', ja: '外来語に使う文字', ko: '외래어에 쓰는 문자' }
        },
        {
          id: 'katakana-2',
          name: { en: 'Katakana 2', fr: 'Katakana 2', 'zh-Hans': '片假名 2', ja: 'カタカナ 2', ko: '가타카나 2' },
          desc: { en: 'Voiced sounds and combinations', fr: 'Sons voisés et combinaisons', 'zh-Hans': '浊音和拗音', ja: '濁音・半濁音と拗音', ko: '탁음과 요음' }
        },
        {
          id: 'jlpt-n5',
          name: { en: 'JLPT N5', fr: 'JLPT N5', 'zh-Hans': 'JLPT N5', ja: 'JLPT N5', ko: 'JLPT N5' },
          desc: { en: 'Words, kanji and grammar', fr: 'Vocabulaire, kanji et grammaire', 'zh-Hans': '词汇、汉字和语法', ja: '語彙・漢字・文法', ko: '어휘, 한자, 문법' }
        },
        {
          id: 'jlpt-n4',
          name: { en: 'JLPT N4', fr: 'JLPT N4', 'zh-Hans': 'JLPT N4', ja: 'JLPT N4', ko: 'JLPT N4' },
          desc: { en: 'Words, kanji and grammar', fr: 'Vocabulaire, kanji et grammaire', 'zh-Hans': '词汇、汉字和语法', ja: '語彙・漢字・文法', ko: '어휘, 한자, 문법' }
        },
        {
          id: 'jlpt-n3',
          name: { en: 'JLPT N3', fr: 'JLPT N3', 'zh-Hans': 'JLPT N3', ja: 'JLPT N3', ko: 'JLPT N3' },
          desc: { en: 'Words, kanji and grammar', fr: 'Vocabulaire, kanji et grammaire', 'zh-Hans': '词汇、汉字和语法', ja: '語彙・漢字・文法', ko: '어휘, 한자, 문법' }
        },
        {
          id: 'jlpt-n2',
          name: { en: 'JLPT N2', fr: 'JLPT N2', 'zh-Hans': 'JLPT N2', ja: 'JLPT N2', ko: 'JLPT N2' },
          desc: { en: 'Words, kanji and grammar', fr: 'Vocabulaire, kanji et grammaire', 'zh-Hans': '词汇、汉字和语法', ja: '語彙・漢字・文法', ko: '어휘, 한자, 문법' }
        },
        {
          id: 'jlpt-n1',
          name: { en: 'JLPT N1', fr: 'JLPT N1', 'zh-Hans': 'JLPT N1', ja: 'JLPT N1', ko: 'JLPT N1' },
          desc: { en: 'Words, kanji and grammar', fr: 'Vocabulaire, kanji et grammaire', 'zh-Hans': '词汇、汉字和语法', ja: '語彙・漢字・文法', ko: '어휘, 한자, 문법' }
        }
      ]
    },
    {
      id: 'chinese',
      glyph: '中',
      glyphClass: 'glyph-zh',
      color: '#0f8b6c',
      name: { en: 'Chinese', fr: 'Chinois', 'zh-Hans': '中文', ja: '中国語', ko: '중국어' },
      goal: { en: 'Step by step to HSK 6', fr: 'Pas à pas jusqu\'au HSK 6', 'zh-Hans': '一步步达到 HSK 6级', ja: 'HSK 6級まで一歩ずつ', ko: 'HSK 6급까지 한 단계씩' },
      steps: [
        {
          id: 'pinyin', href: 'chinese/pinyin/',
          parts: makeParts('chinese/study/', 'zh-pinyin', { tones: [45], initials: [23], finals: [38] }),
          name: { en: 'Pinyin and tones', fr: 'Pinyin et tons', 'zh-Hans': '拼音和声调', ja: 'ピンインと声調', ko: '병음과 성조' },
          desc: { en: 'Sounds and the four tones', fr: 'Les sons et les quatre tons', 'zh-Hans': '声母、韵母和四个声调', ja: '音と4つの声調', ko: '소리와 네 가지 성조' }
        },
        {
          id: 'hsk1', href: 'chinese/hsk1/',
          parts: makeParts('chinese/study/', 'zh-hsk1', { words: [49, 49, 49, 49, 49, 49], grammar: [44] }),
          name: { en: 'HSK 1', fr: 'HSK 1', 'zh-Hans': 'HSK 1级', ja: 'HSK 1級', ko: 'HSK 1급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'hsk2', href: 'chinese/hsk2/',
          parts: makeParts('chinese/study/', 'zh-hsk2', { words: [50, 49, 49, 49], grammar: [32] }),
          name: { en: 'HSK 2', fr: 'HSK 2', 'zh-Hans': 'HSK 2级', ja: 'HSK 2級', ko: 'HSK 2급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'hsk3',
          name: { en: 'HSK 3', fr: 'HSK 3', 'zh-Hans': 'HSK 3级', ja: 'HSK 3級', ko: 'HSK 3급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'hsk4',
          name: { en: 'HSK 4', fr: 'HSK 4', 'zh-Hans': 'HSK 4级', ja: 'HSK 4級', ko: 'HSK 4급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'hsk5',
          name: { en: 'HSK 5', fr: 'HSK 5', 'zh-Hans': 'HSK 5级', ja: 'HSK 5級', ko: 'HSK 5급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'hsk6',
          name: { en: 'HSK 6', fr: 'HSK 6', 'zh-Hans': 'HSK 6级', ja: 'HSK 6級', ko: 'HSK 6급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        }
      ]
    },
    {
      id: 'korean',
      glyph: '한',
      glyphClass: 'glyph-ko',
      color: '#2f5bd3',
      name: { en: 'Korean', fr: 'Coréen', 'zh-Hans': '韩语', ja: '韓国語', ko: '한국어' },
      goal: { en: 'Step by step to TOPIK level 6', fr: 'Pas à pas jusqu\'au TOPIK niveau 6', 'zh-Hans': '一步步达到 TOPIK 6级', ja: 'TOPIK 6級まで一歩ずつ', ko: 'TOPIK 6급까지 한 단계씩' },
      steps: [
        {
          id: 'hangul', href: 'hangul/', storageKey: 'hangul-studio-v1', total: 54,
          name: { en: 'Hangul', fr: 'Hangul', 'zh-Hans': '韩文字母', ja: 'ハングル', ko: '한글' },
          desc: { en: 'All 40 letters and first syllables', fr: 'Les 40 lettres et les premières syllabes', 'zh-Hans': '全部 40 个字母和基础音节', ja: '全40文字と基本の音節', ko: '자모 40개와 기본 음절' }
        },
        {
          id: 'batchim',
          name: { en: 'Batchim', fr: 'Batchim', 'zh-Hans': '收音', ja: 'パッチム', ko: '받침' },
          desc: { en: 'Consonants at the end of a syllable', fr: 'Les consonnes en fin de syllabe', 'zh-Hans': '音节末尾的辅音', ja: '音節の終わりの子音', ko: '음절의 끝소리' }
        },
        {
          id: 'topik1',
          name: { en: 'TOPIK 1', fr: 'TOPIK 1', 'zh-Hans': 'TOPIK 1级', ja: 'TOPIK 1級', ko: 'TOPIK 1급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'topik2',
          name: { en: 'TOPIK 2', fr: 'TOPIK 2', 'zh-Hans': 'TOPIK 2级', ja: 'TOPIK 2級', ko: 'TOPIK 2급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'topik3',
          name: { en: 'TOPIK 3', fr: 'TOPIK 3', 'zh-Hans': 'TOPIK 3级', ja: 'TOPIK 3級', ko: 'TOPIK 3급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'topik4',
          name: { en: 'TOPIK 4', fr: 'TOPIK 4', 'zh-Hans': 'TOPIK 4级', ja: 'TOPIK 4級', ko: 'TOPIK 4급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'topik5',
          name: { en: 'TOPIK 5', fr: 'TOPIK 5', 'zh-Hans': 'TOPIK 5级', ja: 'TOPIK 5級', ko: 'TOPIK 5급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
        },
        {
          id: 'topik6',
          name: { en: 'TOPIK 6', fr: 'TOPIK 6', 'zh-Hans': 'TOPIK 6级', ja: 'TOPIK 6級', ko: 'TOPIK 6급' },
          desc: { en: 'Words and grammar', fr: 'Vocabulaire et grammaire', 'zh-Hans': '词汇和语法', ja: '語彙・文法', ko: '어휘, 문법' }
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
  const ICON_ARROW = '<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  const LOGO = '<span class="logo" aria-hidden="true"><span></span><span></span><span></span><span></span></span>';

  const page = document.body.dataset.page;
  const root = document.body.dataset.root || '';
  const course = COURSES.find(c => c.id === document.body.dataset.course);

  function detectLang() {
    try {
      const stored = (localStorage.getItem(LANG_KEY) || '').replace(/^zh-Hant.*/, 'zh-Hans');
      if (stored && TEXT[stored]) return stored;
    } catch (e) {}
    for (const l of navigator.languages || [navigator.language || 'en']) {
      const x = l.toLowerCase();
      const id = x.startsWith('zh') ? 'zh-Hans' : x.split('-')[0];
      if (TEXT[id]) return id;
    }
    return 'en';
  }

  let lang = detectLang();
  const pick = field => field[lang] || field.en;

  // Ask the browser not to clear saved progress when space runs low
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  /* ---------- Backup codes ---------- */
  // A code holds every app's saved progress, so it can be kept safe or moved to another device.
  // It travels as a link (#restore=...) or as text starting with TOYBOX2. (TOYBOX1: still works).
  // A step saves progress itself (storageKey) or through its parts
  COURSES.forEach(c => c.steps.forEach(step => {
    if (!step.parts) return;
    step.parts.forEach(part => { part.parent = step; });
    step.total = step.parts.reduce((n, part) => n + part.total, 0);
  }));
  const units = step => step.parts || (step.storageKey ? [step] : []);
  const allUnits = () => COURSES.flatMap(c => c.steps).flatMap(units);
  const appKeys = () => allUnits().map(u => u.storageKey);
  const unitName = u => u.parent
    ? `${pick(u.parent.name)} ${TEXT[lang].kinds[u.kind]} ${u.n}`
    : pick(u.name);

  // URL-safe base64, done by hand so no browser quirk in atob/btoa can break a code
  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  function toBase64Url(bytes) {
    let out = '';
    for (let i = 0; i < bytes.length; i += 3) {
      const n = (bytes[i] << 16) | ((bytes[i + 1] || 0) << 8) | (bytes[i + 2] || 0);
      out += B64[(n >> 18) & 63] + B64[(n >> 12) & 63];
      if (i + 1 < bytes.length) out += B64[(n >> 6) & 63];
      if (i + 2 < bytes.length) out += B64[n & 63];
    }
    return out;
  }

  // Accepts standard and URL-safe base64 and skips anything else (spaces, padding, stray marks)
  function fromBase64(text) {
    const value = ch => {
      const i = B64.indexOf(ch);
      if (i >= 0) return i;
      if (ch === '+') return 62;
      if (ch === '/') return 63;
      return -1;
    };
    const out = [];
    let buf = 0;
    let bits = 0;
    for (const ch of text) {
      const v = value(ch);
      if (v < 0) continue;
      buf = (buf << 6) | v;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        out.push((buf >> bits) & 255);
        buf &= (1 << bits) - 1;
      }
    }
    return new Uint8Array(out);
  }

  function savedData() {
    const data = {};
    appKeys().forEach(k => {
      try {
        const v = JSON.parse(localStorage.getItem(k));
        if (v && Array.isArray(v.mastered) && v.mastered.length) data[k] = { mastered: v.mastered };
      } catch (e) {}
    });
    return Object.keys(data).length ? data : null;
  }

  function payload() {
    const data = savedData();
    return data && toBase64Url(new TextEncoder().encode(JSON.stringify({ v: 1, data })));
  }

  // A link back to this home page that restores the progress when opened
  function backupLink() {
    const p = payload();
    return p && `${new URL(root || './', location.href).href.split('#')[0]}#restore=${p}`;
  }

  // Finds a code in pasted text or a link. Returns { data } or { error } with a short code to report
  function readCode(text) {
    const match = text.match(/#restore=([A-Za-z0-9_-]+)/) || text.match(/TOYBOX[12]\s*[.:：]\s*([A-Za-z0-9+/=_\-\s]+)/i);
    if (!match) return { error: 'E1' };
    let parsed;
    try {
      parsed = JSON.parse(new TextDecoder().decode(fromBase64(match[1])));
    } catch (e) {
      return { error: 'E2' };
    }
    if (!parsed || parsed.v !== 1 || !parsed.data || typeof parsed.data !== 'object') return { error: 'E3' };
    return { data: parsed.data };
  }

  // Merges into what is already here, so restoring never loses progress on this device.
  // Returns { error } for a bad code, otherwise { found: [step, count] for each app in the code }.
  function restoreCode(code) {
    const { data, error } = readCode(code);
    if (error) return { error };
    const found = [];
    allUnits().forEach(step => {
      const k = step.storageKey;
      const incoming = data[k];
      if (!incoming || !Array.isArray(incoming.mastered) || !incoming.mastered.length) return;
      found.push([step, incoming.mastered.length]);
      let local = {};
      try {
        local = JSON.parse(localStorage.getItem(k)) || {};
      } catch (e) {}
      const mastered = [...new Set([...(local.mastered || []), ...incoming.mastered.filter(x => typeof x === 'string')])];
      try {
        localStorage.setItem(k, JSON.stringify({ ...local, mastered }));
      } catch (e) {}
    });
    return { found };
  }

  function restoredMessage(found) {
    const T = TEXT[lang];
    return T.restoredList(found.map(([step, n]) => `${unitName(step)} ${n}`).join(' · '));
  }

  // Opening a backup link restores it after asking once
  function restoreFromLink() {
    if (page !== 'home' || !location.hash.startsWith('#restore=')) return;
    const link = location.hash;
    history.replaceState(null, '', location.pathname + location.search);
    if (!window.confirm(TEXT[lang].confirmRestore)) return;
    const { found, error } = restoreCode(link);
    backupMessage = error ? `${TEXT[lang].invalid} (${error})` : found.length ? restoredMessage(found) : TEXT[lang].emptyCode;
    backupOpen = true;
  }

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone;
  let backupMessage = '';
  let backupOpen = false;

  // Progress is read from each app's own saved data on this device
  function progressOf(step) {
    if (step.parts) {
      const done = step.parts.reduce((n, part) => n + progressOf(part).done, 0);
      return { done, total: step.total };
    }
    if (!step.storageKey) return null;
    let count = 0;
    try {
      const saved = JSON.parse(localStorage.getItem(step.storageKey)) || {};
      count = Math.min((saved.mastered || []).length, step.total);
    } catch (e) {}
    return { done: count, total: step.total };
  }

  const pct = (d, t) => (t ? Math.round((d / t) * 100) : 0);

  // CSS variables for a course color: hex for solid fills, r, g, b for rgba tints
  function colorVars(c) {
    const rgb = [1, 3, 5].map(i => parseInt(c.color.slice(i, i + 2), 16)).join(', ');
    return `--c: ${c.color}; --c-rgb: ${rgb}`;
  }

  function liveStats(c) {
    const live = c.steps.filter(s => s.href);
    const done = live.reduce((n, s) => n + progressOf(s).done, 0);
    const total = live.reduce((n, s) => n + s.total, 0);
    return { live, done, total };
  }

  // The unfinished step practiced most recently, as recorded by the apps
  function recentStep() {
    let key = null;
    try {
      key = localStorage.getItem('toybox-recent');
    } catch (e) {}
    const unit = allUnits().find(u => u.storageKey === key);
    const step = unit && (unit.parent || unit);
    return step && progressOf(step).done < step.total ? step : null;
  }

  // What to suggest next in a course: the step practiced last, then a started one, then the first unfinished one
  function nextStep(c) {
    const recent = recentStep();
    if (recent && c.steps.includes(recent)) return recent;
    const open = c.steps.filter(s => s.href && progressOf(s).done < s.total);
    return open.find(s => progressOf(s).done > 0) || open[0] || null;
  }

  function stepDots(c) {
    return `<span class="dots" aria-hidden="true">${c.steps.map(s => {
      const cls = !s.href ? '' : progressOf(s).done === s.total ? 'done' : 'live';
      return `<span class="${cls}"></span>`;
    }).join('')}</span>`;
  }

  function ring(percent) {
    return `<span class="ring" style="--p: ${percent}" aria-hidden="true"><span>${percent}%</span></span>`;
  }

  function topBar() {
    const back = page === 'level'
      ? `<a class="home-link" href="${root}${course.id}/">${ICON_BACK}${LOGO}<span>${pick(course.name)}</span></a>`
      : page === 'course'
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

  // Big colored card that takes you straight into a step
  function featureCard(c, s, label) {
    const p = progressOf(s);
    return `
      <a class="feature" href="${root}${s.href}" style="${colorVars(c)}">
        <span class="feature-glyph ${c.glyphClass}" aria-hidden="true">${c.glyph}</span>
        <span class="feature-label">${label}</span>
        <span class="feature-title">${pick(s.name)}</span>
        <span class="feature-sub">${p.done ? TEXT[lang].mastered(p.done, p.total) : pick(s.desc)}</span>
        <span class="feature-foot">
          <span class="meter"><span class="meter-fill" style="width:${pct(p.done, p.total)}%"></span></span>
          ${ICON_ARROW}
        </span>
      </a>`;
  }

  // On the home page: the step practiced last, or else the unfinished step furthest along
  function continueCard() {
    const recent = recentStep();
    if (recent) {
      const c = COURSES.find(course => course.steps.includes(recent));
      return featureCard(c, recent, `${TEXT[lang].continue} · ${pick(c.name)}`);
    }
    let best = null;
    COURSES.forEach(c => c.steps.filter(s => s.href).forEach(s => {
      const p = progressOf(s);
      const share = p.done / p.total;
      if (p.done > 0 && p.done < p.total && (!best || share > best.share)) best = { c, s, share };
    }));
    return best ? featureCard(best.c, best.s, `${TEXT[lang].continue} · ${pick(best.c.name)}`) : '';
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
        ${continueCard()}
        <h2 class="section-title">${T.learn}</h2>
        <div class="course-grid">
          ${COURSES.map(c => {
            const st = liveStats(c);
            return `
              <a class="course-card" href="${root}${c.id}/" style="${colorVars(c)}">
                <span class="tile ${c.glyphClass}" aria-hidden="true">${c.glyph}</span>
                <span class="course-card-text">
                  <span class="course-card-title">${pick(c.name)}</span>
                  <span class="course-card-sub">${pick(c.goal)}</span>
                  <span class="course-card-steps">${stepDots(c)}<span>${T.ready(st.live.length, c.steps.length)}</span></span>
                </span>
                ${ring(pct(st.done, st.total))}
              </a>`;
          }).join('')}
        </div>
        <details class="backup" ${backupMessage || backupOpen ? 'open' : ''}>
          <summary>${T.backup}${ICON_CHEVRON}</summary>
          <div class="backup-body">
            <p class="backup-note">${T.backupNote}</p>
            ${isIOS ? `<p class="backup-note">${T.iosTip}</p>` : ''}
            <div class="backup-actions">
              <button type="button" class="btn" data-act="copy">${T.copy}</button>
              <button type="button" class="btn btn-ghost" data-act="restore">${T.restore}</button>
            </div>
            <div class="backup-panel" data-panel="out" hidden>
              <textarea id="backup-out" rows="3" readonly spellcheck="false" autocapitalize="off" autocorrect="off"></textarea>
              ${navigator.share ? `<button type="button" class="btn" data-act="share">${T.share}</button>` : ''}
            </div>
            <div class="backup-panel" data-panel="in" hidden>
              <textarea id="backup-code" rows="3" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="${T.paste}"></textarea>
              <button type="button" class="btn" data-act="apply">${T.apply}</button>
            </div>
            <p class="backup-msg" role="status">${backupMessage}</p>
          </div>
        </details>
        <footer class="more">${T.more}</footer>
      </main>`;
  }

  function stepRow(step, i) {
    const T = TEXT[lang];
    const p = progressOf(step);
    const finished = p && p.done === p.total;
    const state = !step.href ? 'soon' : finished ? 'done' : 'live';
    const status = !step.href ? `<span class="pill">${T.soon}</span>`
      : finished ? `<span class="pill go">${T.done}</span>`
      : `<span class="step-pct">${pct(p.done, p.total)}%</span>`;
    const body = `
      <span class="step-text">
        <span class="step-name">${pick(step.name)}</span>
        <span class="step-desc">${pick(step.desc)}</span>
      </span>
      ${status}
      ${step.href ? ICON_CHEVRON : ''}`;
    return `
      <li class="step ${state}">
        <span class="step-num" aria-label="${T.step(i + 1)}">${finished ? ICON_CHECK : i + 1}</span>
        ${step.href
          ? `<a class="step-row" href="${root}${step.href}">${body}</a>`
          : `<div class="step-row" aria-disabled="true">${body}</div>`}
      </li>`;
  }

  function renderCourse() {
    const T = TEXT[lang];
    const st = liveStats(course);
    const next = nextStep(course);
    document.title = `${pick(course.name)} · Toybox`;
    const nextLabel = next && `${progressOf(next).done ? T.continue : T.start} · ${T.step(course.steps.indexOf(next) + 1)}`;
    return `
      ${topBar()}
      <main style="${colorVars(course)}">
        <section class="banner">
          <span class="banner-glyph ${course.glyphClass}" aria-hidden="true">${course.glyph}</span>
          <h1>${pick(course.name)}</h1>
          <p>${pick(course.goal)}</p>
          <div class="banner-progress">
            <span class="meter"><span class="meter-fill" style="width:${pct(st.done, st.total)}%"></span></span>
            <span>${T.ready(st.live.length, course.steps.length)}</span>
          </div>
        </section>
        ${next ? featureCard(course, next, nextLabel) : ''}
        <h2 class="section-title">${T.allSteps}</h2>
        <ol class="steps">
          ${course.steps.map(stepRow).join('')}
        </ol>
      </main>`;
  }

  // A level page lists the parts of one level step, grouped by kind
  function renderLevel() {
    const T = TEXT[lang];
    const step = course.steps.find(s => s.id === document.body.dataset.step);
    const p = progressOf(step);
    document.title = `${pick(step.name)} · ${pick(course.name)} · Toybox`;
    const kinds = [...new Set(step.parts.map(part => part.kind))];
    const single = kinds.every(k => step.parts.filter(part => part.kind === k).length === 1);
    const row = part => {
      const pp = progressOf(part);
      const finished = pp.done === pp.total;
      return `
        <li class="step ${finished ? 'done' : 'live'}">
          <span class="step-num" aria-hidden="true">${finished ? ICON_CHECK : part.n}</span>
          <a class="step-row" href="${root}${part.href}">
            <span class="step-text">
              <span class="step-name">${single ? T.kinds[part.kind] : T.part(part.n)}</span>
              <span class="step-desc">${T.mastered(pp.done, pp.total)}</span>
            </span>
            ${finished ? `<span class="pill go">${T.done}</span>` : `<span class="step-pct">${pct(pp.done, pp.total)}%</span>`}
            ${ICON_CHEVRON}
          </a>
        </li>`;
    };
    return `
      ${topBar()}
      <main style="${colorVars(course)}">
        <section class="banner">
          <span class="banner-glyph ${course.glyphClass}" aria-hidden="true">${course.glyph}</span>
          <h1>${pick(step.name)}</h1>
          <p>${pick(step.desc)}</p>
          <div class="banner-progress">
            <span class="meter"><span class="meter-fill" style="width:${pct(p.done, p.total)}%"></span></span>
            <span>${T.mastered(p.done, p.total)}</span>
          </div>
        </section>
        ${single
          ? `<h2 class="section-title">${T.allSteps}</h2><ol class="steps">${step.parts.map((part, i) => row({ ...part, n: i + 1 })).join('')}</ol>`
          : kinds.map(kind => `
          <h2 class="section-title">${T.kinds[kind]}</h2>
          <ol class="steps">${step.parts.filter(part => part.kind === kind).map(row).join('')}</ol>`).join('')}
      </main>`;
  }

  function render() {
    document.documentElement.lang = lang;
    const app = document.getElementById('app');
    app.innerHTML = page === 'level' ? renderLevel() : page === 'course' ? renderCourse() : renderHome();
    app.querySelector('#lang').addEventListener('change', e => {
      lang = e.target.value;
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (err) {}
      render();
    });
    if (page === 'home') bindBackup(app);
  }

  function bindBackup(app) {
    const T = TEXT[lang];
    const out = app.querySelector('[data-panel="out"]');
    const input = app.querySelector('[data-panel="in"]');
    const outBox = app.querySelector('#backup-out');
    const box = app.querySelector('#backup-code');
    const msg = app.querySelector('.backup-msg');
    const say = (text, bad = false) => {
      backupMessage = text;
      msg.textContent = text;
      msg.classList.toggle('bad', bad);
    };

    // The code is always shown as well, since some in-app browsers report a copy that never happened
    app.querySelector('[data-act="copy"]').addEventListener('click', () => {
      const code = backupLink();
      input.hidden = true;
      if (!code) {
        out.hidden = true;
        return say(T.nothingHere, true);
      }
      out.hidden = false;
      outBox.value = code;
      outBox.select();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => say(T.copied), () => say(T.copyFailed));
      } else {
        say(T.copyFailed);
      }
    });

    const share = app.querySelector('[data-act="share"]');
    if (share) {
      share.addEventListener('click', () => {
        navigator.share({ title: 'Toybox', url: outBox.value }).catch(() => {});
      });
    }

    app.querySelector('[data-act="restore"]').addEventListener('click', () => {
      out.hidden = true;
      input.hidden = false;
      box.value = '';
      box.focus();
      say('');
    });

    app.querySelector('[data-act="apply"]').addEventListener('click', () => {
      const { found, error } = restoreCode(box.value);
      if (error) return say(`${T.invalid} (${error})`, true);
      if (!found.length) return say(T.emptyCode, true);
      backupMessage = restoredMessage(found);
      render();
    });
  }

  restoreFromLink();
  render();
  // Coming back with the browser's back button can show a cached page; refresh the progress
  window.addEventListener('pageshow', e => { if (e.persisted) render(); });
})();
