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
      tagline: '60-second rounds. Nothing is saved, so just play.',
      play: 'PLAY', playAgain: 'PLAY AGAIN', tracks: 'Tracks', home: 'Toybox',
      calm: 'Calm mode', calmHint: 'No flashing, shaking or sparks', sound: 'Sound', language: 'Language',
      items: n => `${n} cards`, combo: 'COMBO', maxCombo: 'Max combo', accuracy: 'Accuracy', time: 'Time',
      how: 'Tap the right answer before the card reaches the line. The faster, the better. Keys 1–4 or D F J K.',
      qMeaning: 'Meaning?', qWord: 'Which word?', qGap: 'Fill the gap', qTone: 'Which tone?', qReading: 'Reading?', qChar: 'Which character?',
      loading: 'Loading…', loadFailed: 'Could not load this track. Check the connection and try again.',
      study: 'Study mode', prev: 'Previous track', next: 'Next track', answer: 'Answer'
    },
    fr: {
      tagline: 'Des manches de 60 secondes. Rien n\'est enregistré : il suffit de jouer.',
      play: 'JOUER', playAgain: 'REJOUER', tracks: 'Pistes', home: 'Toybox',
      calm: 'Mode calme', calmHint: 'Ni clignotements, ni secousses, ni étincelles', sound: 'Son', language: 'Langue',
      items: n => `${n} cartes`, combo: 'COMBO', maxCombo: 'Combo max', accuracy: 'Précision', time: 'Temps',
      how: 'Touchez la bonne réponse avant que la carte n\'atteigne la ligne. Plus vite, c\'est mieux. Touches 1–4 ou D F J K.',
      qMeaning: 'Quel sens ?', qWord: 'Quel mot ?', qGap: 'Complétez', qTone: 'Quel ton ?', qReading: 'Quelle lecture ?', qChar: 'Quel caractère ?',
      loading: 'Chargement…', loadFailed: 'Impossible de charger cette piste. Vérifiez la connexion et réessayez.',
      study: 'Mode étude', prev: 'Piste précédente', next: 'Piste suivante', answer: 'Réponse'
    },
    'zh-Hans': {
      tagline: '每局 60 秒，不保存任何记录，尽管玩。',
      play: '开始', playAgain: '再来一局', tracks: '曲目', home: 'Toybox',
      calm: '平静模式', calmHint: '不闪烁、不震动、无火花', sound: '声音', language: '语言',
      items: n => `${n} 张卡`, combo: 'COMBO', maxCombo: '最大连击', accuracy: '准确率', time: '时间',
      how: '在卡片到达线之前点正确答案，越快越好。键盘 1–4 或 D F J K。',
      qMeaning: '什么意思？', qWord: '哪个词？', qGap: '填空', qTone: '哪个声调？', qReading: '怎么读？', qChar: '哪个字？',
      loading: '加载中…', loadFailed: '无法加载这首曲目，请检查网络后重试。',
      study: '学习模式', prev: '上一首', next: '下一首', answer: '答案'
    },
    ja: {
      tagline: '1ラウンド60秒。記録は残らないので、気軽にどうぞ。',
      play: 'プレイ', playAgain: 'もう一回', tracks: 'トラック', home: 'Toybox',
      calm: 'おだやかモード', calmHint: '点滅・揺れ・火花なし', sound: 'サウンド', language: '言語',
      items: n => `${n}枚`, combo: 'COMBO', maxCombo: '最大コンボ', accuracy: '正確さ', time: '時間',
      how: 'カードがラインに届く前に正しい答えをタップ。速いほど高評価。キーは 1–4 または D F J K。',
      qMeaning: '意味は？', qWord: 'どの語？', qGap: '空欄を埋めよう', qTone: 'どの声調？', qReading: '読みは？', qChar: 'どの文字？',
      loading: '読み込み中…', loadFailed: 'トラックを読み込めませんでした。接続を確認してもう一度お試しください。',
      study: '学習モード', prev: '前のトラック', next: '次のトラック', answer: '答え'
    },
    ko: {
      tagline: '한 판 60초. 아무것도 저장되지 않으니 마음껏 즐기세요.',
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
