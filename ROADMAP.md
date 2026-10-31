# Toybox roadmap and handoff

Read CLAUDE.md first; its rules always apply. This file says what exists, how apps are built,
and what to build next, so any new session can continue without the earlier conversation.

## What exists (live on GitHub Pages)

| Path | What | Notes |
|---|---|---|
| `/` | Home | Continue card, course cards, backup links |
| `japanese/` | Course page | Step 1 Hiragana live, later steps "coming soon" |
| `korean/` | Course page | Step 1 Hangul live, later steps "coming soon" |
| `hiragana/` | Hiragana Studio | 55 cards, UI en/fr/zh-Hans/zh-Hant-HK/ko, readings in each UI language's own spelling (Cantonese for 中文（香港）) |
| `hangul/` | Hangul Studio | 54 cards (40 jamo + 14 syllables), UI en/fr/zh-Hans/zh-Hant-HK/ja |
| `shared/` | Catalog, home/course rendering, shared CSS | Courses and steps live in `shared/toybox.js` |

## How a studio app works (copy `hangul/` for a new one)

- One `index.html` per app plus `i18n.js` (translations) and `og.png` (link preview, 1200x630).
- Data array of cards: `{ char, romaji, say, cat, mnemonic, example: { word, romaji, meaning } }`.
  `say` is what speech synthesis reads. `cat` is the group id listed in `CATEGORIES`.
- Look-alike pairs: `CONFUSABLE = [[a, b, 'English tip'], ...]`; translated tips in `i18n.js`
  in the same order.
- Pronunciation shown per UI language: `I18N.sound[lang][char]`; English uses `romaji`.
- Practice: a card is mastered after 2 correct in a row (3 after a miss); 5 cards rotate.
  Finished groups offer a 10-question review that leaves saved progress alone.
- Progress is saved in `localStorage` under a unique key (`<app>-studio-v1`) and must be listed
  with `storageKey` and `total` in `shared/toybox.js` so home, course pages and backups see it.
- Speech: `Sound.utterance()` sets the language tag (`ja-JP`, `ko-KR`; Chinese uses `zh-CN`).
- After changing `shared/*` or an `i18n.js`, bump `?v=YYYY-MM-DD.N` everywhere it is loaded.
- Fonts load without blocking (mainland China blocks Google Fonts); color tints use `rgba(var(--c-rgb))`.
- Test locally: `python3 -m http.server 8765` in the repo root, then Playwright (Chromium is
  preinstalled) at mobile (390x844) and desktop widths, light and dark, and with Google Fonts blocked.
  Report anything not tested (e.g. real Safari) instead of claiming it works.

## Next: Chinese course (`chinese/`)

UI languages: English, Français, 日本語, 한국어 (no 中文, since the course teaches Chinese).
Color and glyph: pick a new course color; glyph 中 with system Chinese fonts.

Steps, each about 50 cards so it stays easy to finish:

1. **Pinyin and tones** (`pinyin/`): 4 tones + neutral tone, 21 initials, the main finals.
   Each card has an example syllable with a character for speech, e.g. mā 妈 / má 麻 / mǎ 马 / mà 骂.
   Practice: hear a syllable and pick its tone; see pinyin and pick the sound.
2. **Words 1-4** (`zh-words-1/` ... `zh-words-4/`): from `chinese/data/book2-words.tsv`
   (196 words). Split by lessons 1-2 (54), 3-4 (45), 5-6 (48), 7-8 (49).
   Practice: character to meaning, audio to character, look-alike characters.
   The TSV has English only; add French, Japanese and Korean meanings together.
3. **Sentences 1-2** (`zh-sentences-1/`, `zh-sentences-2/`): about 45 each, covering lessons 1-4
   and 5-8. Write original sentences with the same words and grammar points below. Never copy
   the textbook's sentences or translations into this public repo.
   Practice: sentence to meaning, and fill in the key word (e.g. 你想吃包子___饺子？ → 还是).

Grammar points by lesson (for writing sentences):
1 `A 还是 B` questions, `想` · 2 subject-predicate predicates (`他工作很忙`), `忙不忙` questions ·
3 degree complement `得`, `会` · 4 experience `过`, verb reduplication (`看看`) ·
5 completed `了`, serial verbs (`去郊区滑雪`), pivotal sentences (`请你去`) ·
6 `有点儿` + adjective, change `了`, `能` · 7 progressive `正在……呢`, `给`, `得(děi)` ·
8 comparison `比`, approximate `多`.

## Later: HSK levels up to 6

- Follow the HSK 3.0 word lists (2021 standard) level by level; they include the older HSK 2.0
  words, so both exam versions are covered. Check current exam formats when starting.
- Store each level as `chinese/data/hsk<N>.tsv` (hanzi, pinyin, English, French, Japanese, Korean).
  Official lists are facts and fine to use; check the license of any third-party file before copying.
- Split each level into apps of about 50 words, ordered by topic or frequency.
- `shared/toybox.js` lists steps flat today. Before adding many HSK apps, add an optional
  `section` field (e.g. "HSK 3") and group steps by section on the course page.

## Resuming in a new session

Attach the `toybox` repository and say: "Read CLAUDE.md and ROADMAP.md in the toybox repo and
continue the next unfinished step." Update the tables above when a step goes live.
