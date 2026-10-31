// UI text for the Toybox arcade. Judgments (PERFECT, GREAT, GOOD, MISS), tiers and ranks stay in
// English capitals in every language, as is usual for arcade rhythm games.
window.ARCADE_I18N = {
  langs: [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'Français' },
    { id: 'zh-Hans', name: '中文（简体）' },
    { id: 'ja', name: '日本語' },
    { id: 'ko', name: '한국어' }
  ],
  ui: {
    en: {
      about: x => { if (x < 59.5) { const m = Math.max(1, Math.round(x)); return `about ${m} min`; } const h = Math.floor(x / 60), m = Math.round((x % 60) / 5) * 5; return m === 60 ? (h => `about ${h} h`)(h + 1) : m ? `about ${h} h ${m} min` : `about ${h} h`; },
      longRun: 'Long run: leaving the app pauses it, and ✕ shows how far you got.',
      modeTime: '60 seconds', modeAll: 'All cards', modeTimeHint: 'As many cards as you can in 60 seconds.', modeAllHint: 'Every card once, to the end. Misses come back later.',
      noRecord: 'no record yet', paused: 'Paused · tap to continue', stoppedAt: (n, t) => `Stopped at ${n}/${t}. Records count finished runs only.`,
      difficulty: 'DIFFICULTY', music: 'Music',
      diffHint: { EASY: 'Slower, with more time to read', NORMAL: 'The track\'s own tempo', HARD: 'Faster, with less time', EXTREME: 'Very fast, with tight timing' },
      tagline: '60-second rounds or every card. Only your best records are kept, on this device.',
      play: 'PLAY', playAgain: 'PLAY AGAIN', tracks: 'Tracks', home: 'Toybox',
      calm: 'Calm mode', calmHint: 'No flashing, shaking or sparks', sound: 'Sound', language: 'Language',
      items: n => `${n} cards`, combo: 'COMBO', maxCombo: 'Max combo', accuracy: 'Accuracy', time: 'Time',
      how: 'Tap the right answer before the card reaches the line. The faster, the better. Keys 1–4 or D F J K.',
      qMeaning: 'Meaning?', qWord: 'Which word?', qGap: 'Fill the gap', qTone: 'Which tone?', qReading: 'Reading?', qChar: 'Which character?',
      loading: 'Loading…', loadFailed: 'Could not load this track. Check the connection and try again.',
      study: 'Study mode', prev: 'Previous track', next: 'Next track', answer: 'Answer'
    },
    fr: {
      about: x => { if (x < 59.5) { const m = Math.max(1, Math.round(x)); return `environ ${m} min`; } const h = Math.floor(x / 60), m = Math.round((x % 60) / 5) * 5; return m === 60 ? (h => `environ ${h} h`)(h + 1) : m ? `environ ${h} h ${m} min` : `environ ${h} h`; },
      longRun: 'Partie longue : quitter l\'appli la met en pause, et ✕ montre où vous en êtes.',
      modeTime: '60 secondes', modeAll: 'Toutes les cartes', modeTimeHint: 'Le plus de cartes possible en 60 secondes.', modeAllHint: 'Chaque carte une fois, jusqu\'au bout. Les erreurs reviennent plus tard.',
      noRecord: 'pas encore de record', paused: 'En pause · touchez pour continuer', stoppedAt: (n, t) => `Arrêté à ${n}/${t}. Seules les parties terminées comptent pour les records.`,
      difficulty: 'DIFFICULTÉ', music: 'Musique',
      diffHint: { EASY: 'Plus lent, plus de temps pour lire', NORMAL: 'Le tempo normal de la piste', HARD: 'Plus rapide, moins de temps', EXTREME: 'Très rapide, timing serré' },
      tagline: 'Des manches de 60 secondes ou toutes les cartes. Seuls vos records sont gardés, sur cet appareil.',
      play: 'JOUER', playAgain: 'REJOUER', tracks: 'Pistes', home: 'Toybox',
      calm: 'Mode calme', calmHint: 'Ni clignotements, ni secousses, ni étincelles', sound: 'Son', language: 'Langue',
      items: n => `${n} cartes`, combo: 'COMBO', maxCombo: 'Combo max', accuracy: 'Précision', time: 'Temps',
      how: 'Touchez la bonne réponse avant que la carte n\'atteigne la ligne. Plus vite, c\'est mieux. Touches 1–4 ou D F J K.',
      qMeaning: 'Quel sens ?', qWord: 'Quel mot ?', qGap: 'Complétez', qTone: 'Quel ton ?', qReading: 'Quelle lecture ?', qChar: 'Quel caractère ?',
      loading: 'Chargement…', loadFailed: 'Impossible de charger cette piste. Vérifiez la connexion et réessayez.',
      study: 'Mode étude', prev: 'Piste précédente', next: 'Piste suivante', answer: 'Réponse'
    },
    'zh-Hans': {
      about: x => { if (x < 59.5) { const m = Math.max(1, Math.round(x)); return `约 ${m} 分钟`; } const h = Math.floor(x / 60), m = Math.round((x % 60) / 5) * 5; return m === 60 ? (h => `约 ${h} 小时`)(h + 1) : m ? `约 ${h} 小时 ${m} 分钟` : `约 ${h} 小时`; },
      longRun: '时间较长：离开应用会自动暂停，点 ✕ 可以看到进度。',
      modeTime: '60 秒', modeAll: '全部卡片', modeTimeHint: '60 秒内尽量多答。', modeAllHint: '每张卡出现一次，直到全部完成。答错的稍后再出现。',
      noRecord: '还没有记录', paused: '已暂停 · 点一下继续', stoppedAt: (n, t) => `停在 ${n}/${t}。只有完成的一局才计入记录。`,
      difficulty: '难度', music: '音乐',
      diffHint: { EASY: '更慢，阅读时间更多', NORMAL: '曲目本来的速度', HARD: '更快，时间更少', EXTREME: '极快，判定更严' },
      tagline: '60 秒一局，或者全部卡片。只在本设备上保存最高记录。',
      play: '开始', playAgain: '再来一局', tracks: '曲目', home: 'Toybox',
      calm: '平静模式', calmHint: '不闪烁、不震动、无火花', sound: '声音', language: '语言',
      items: n => `${n} 张卡`, combo: 'COMBO', maxCombo: '最大连击', accuracy: '准确率', time: '时间',
      how: '在卡片到达线之前点正确答案，越快越好。键盘 1–4 或 D F J K。',
      qMeaning: '什么意思？', qWord: '哪个词？', qGap: '填空', qTone: '哪个声调？', qReading: '怎么读？', qChar: '哪个字？',
      loading: '加载中…', loadFailed: '无法加载这首曲目，请检查网络后重试。',
      study: '学习模式', prev: '上一首', next: '下一首', answer: '答案'
    },
    ja: {
      about: x => { if (x < 59.5) { const m = Math.max(1, Math.round(x)); return `約${m}分`; } const h = Math.floor(x / 60), m = Math.round((x % 60) / 5) * 5; return m === 60 ? (h => `約${h}時間`)(h + 1) : m ? `約${h}時間${m}分` : `約${h}時間`; },
      longRun: '長めです。アプリを離れると一時停止し、✕で途中結果を見られます。',
      modeTime: '60秒', modeAll: '全カード', modeTimeHint: '60秒でできるだけ多く。', modeAllHint: '全カードを1回ずつ最後まで。間違えたカードは後でもう一度。',
      noRecord: 'まだ記録なし', paused: '一時停止中 · タップで再開', stoppedAt: (n, t) => `${n}/${t}で終了。記録は最後までプレイした回だけ。`,
      difficulty: '難易度', music: '音楽',
      diffHint: { EASY: 'ゆっくり、読む時間が長い', NORMAL: 'トラック本来のテンポ', HARD: '速く、時間が短い', EXTREME: 'とても速く、判定が厳しい' },
      tagline: '60秒ラウンドか全カード。ベスト記録だけがこの端末に残ります。',
      play: 'プレイ', playAgain: 'もう一回', tracks: 'トラック', home: 'Toybox',
      calm: 'おだやかモード', calmHint: '点滅・揺れ・火花なし', sound: 'サウンド', language: '言語',
      items: n => `${n}枚`, combo: 'COMBO', maxCombo: '最大コンボ', accuracy: '正確さ', time: '時間',
      how: 'カードがラインに届く前に正しい答えをタップ。速いほど高評価。キーは 1–4 または D F J K。',
      qMeaning: '意味は？', qWord: 'どの語？', qGap: '空欄を埋めよう', qTone: 'どの声調？', qReading: '読みは？', qChar: 'どの文字？',
      loading: '読み込み中…', loadFailed: 'トラックを読み込めませんでした。接続を確認してもう一度お試しください。',
      study: '学習モード', prev: '前のトラック', next: '次のトラック', answer: '答え'
    },
    ko: {
      about: x => { if (x < 59.5) { const m = Math.max(1, Math.round(x)); return `약 ${m}분`; } const h = Math.floor(x / 60), m = Math.round((x % 60) / 5) * 5; return m === 60 ? (h => `약 ${h}시간`)(h + 1) : m ? `약 ${h}시간 ${m}분` : `약 ${h}시간`; },
      longRun: '오래 걸려요. 앱을 나가면 일시 정지되고, ✕를 누르면 거기까지의 결과를 볼 수 있어요.',
      modeTime: '60초', modeAll: '전부 풀기', modeTimeHint: '60초 동안 최대한 많이.', modeAllHint: '모든 카드를 한 번씩 끝까지. 틀린 카드는 나중에 한 번 더 나와요.',
      noRecord: '아직 기록 없음', paused: '일시 정지 · 누르면 계속', stoppedAt: (n, t) => `${n}/${t}에서 멈췄어요. 기록은 끝까지 깬 판만 남아요.`,
      difficulty: '난이도', music: '음악',
      diffHint: { EASY: '느리고 읽을 시간이 많아요', NORMAL: '트랙 원래 속도', HARD: '빠르고 시간이 짧아요', EXTREME: '아주 빠르고 판정이 엄격해요' },
      tagline: '한 판 60초, 또는 전부 풀기. 최고 기록만 이 기기에 남아요.',
      play: '플레이', playAgain: '한 판 더', tracks: '트랙', home: 'Toybox',
      calm: '차분한 모드', calmHint: '깜빡임, 흔들림, 불꽃 없음', sound: '소리', language: '언어',
      items: n => `카드 ${n}장`, combo: 'COMBO', maxCombo: '최대 콤보', accuracy: '정확도', time: '시간',
      how: '카드가 선에 닿기 전에 정답을 누르세요. 빠를수록 좋아요. 키보드 1–4 또는 D F J K.',
      qMeaning: '무슨 뜻?', qWord: '어떤 단어?', qGap: '빈칸 채우기', qTone: '몇 성?', qReading: '어떻게 읽을까?', qChar: '어떤 글자?',
      loading: '불러오는 중…', loadFailed: '트랙을 불러오지 못했어요. 연결을 확인하고 다시 시도하세요.',
      study: '학습 모드', prev: '이전 트랙', next: '다음 트랙', answer: '정답'
    }
  }
};
