# Toybox roadmap and handoff

Read CLAUDE.md first; its rules always apply. This file says what exists, how apps are built,
and what to build next, so any new session can continue without the earlier conversation.

## What exists (live on GitHub Pages)

| Path | What | Notes |
|---|---|---|
| `/` | Home | Continue card, course cards, backup links |
| `japanese/` | Course page | Hiragana live; Hiragana 2, Katakana 1-2, JLPT N5-N1 "coming soon" |
| `chinese/` | Course page | Pinyin and HSK 1-6 steps, all "coming soon"; word lists in `chinese/data/` |
| `korean/` | Course page | Hangul live; Batchim, TOPIK 1-6 "coming soon" |
| `hiragana/` | Hiragana Studio | 55 cards, UI en/fr/zh-Hans/ko, readings in each UI language's own spelling |
| `hangul/` | Hangul Studio | 54 cards (40 jamo + 14 syllables), UI en/fr/zh-Hans/ja |
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

## Course design (same for all three languages)

Every course has the same shape, so they stay consistent:

1. **Script and sound steps** first, each about 50 cards: Japanese Hiragana, Hiragana 2, Katakana,
   Katakana 2; Chinese Pinyin and tones; Korean Hangul, Batchim.
2. **One step per official exam level**, up to the top of that exam: JLPT N5-N1, HSK 1-6,
   TOPIK 1-6. Each level step opens a level page with parts of about 50 items: words first, then
   characters (kanji or hanzi, not for Korean), then grammar patterns with original example sentences.
3. One shared word app per language takes the level and part from the URL (see the Chinese plan
   below); the same app and level page serve Japanese and Korean.
4. Readings: Hepburn, Hanyu Pinyin and Revised Romanization, plus a notation switch in each app
   that shows the reading in the learner's own system (both script apps already have it; new
   users start with their own notation).
5. Meanings are written in every UI language together; never copy dictionary definitions.

Word list sources (check licenses before copying any file):

| Exam | Official list? | Plan |
|---|---|---|
| HSK 1-6 | Yes (2025 syllabus) | `chinese/data/hsk<N>.tsv`, already in the repo |
| JLPT N5-N1 | No official list since 2010 | Use the widely used pre-2010 lists by level (common estimates: about 800 / 1,500 / 3,700 / 6,000 / 10,000 words and 100 / 300 / 650 / 1,000 / 2,000 kanji, cumulative); note the source |
| TOPIK 1-6 | No official list | Use the National Institute of Korean Language standard curriculum vocabulary (10,635 words in grades 1-6; grade 1: 735, 2: 1,100, 3: 1,655); note the source |

Hiragana today has 55 cards: 46 basic, 5 voiced (が ざ だ ば ぱ) and 4 combinations. Hiragana 2
covers the remaining 20 voiced sounds and 29 combinations (49 cards). Katakana follows the same split.

## Next: Chinese course (`chinese/`), following the HSK standard

The course follows HSK, the international Chinese proficiency standard, using the 2025 syllabus
for levels 1-6 (regular exams from December 2026). No textbook is followed.
UI languages: English, Français, 日本語, 한국어 (no 中文, since the course teaches Chinese).
Course color #0f8b6c, glyph 中 with system Chinese fonts. Speech uses `zh-CN`.

Course steps (already listed in `shared/toybox.js`, all "coming soon"):

| Step | Content | Data |
|---|---|---|
| Pinyin and tones (`pinyin/`) | 4 tones + neutral tone, 21 initials, main finals, about 50 cards | written by hand |
| HSK 1 (`hsk1`) | 294 words, 6 parts | `chinese/data/hsk1.tsv` |
| HSK 2 (`hsk2`) | 197 words, 4 parts | `chinese/data/hsk2.tsv` |
| HSK 3 (`hsk3`) | 487 words, 10 parts | `chinese/data/hsk3.tsv` |
| HSK 4 (`hsk4`) | 972 words, 20 parts | `chinese/data/hsk4.tsv` |
| HSK 5 (`hsk5`) | 1,547 words, 31 parts | `chinese/data/hsk5.tsv` |
| HSK 6 (`hsk6`) | 1,684 words, 34 parts | `chinese/data/hsk6.tsv` |

How to build it:

1. **Pinyin app** first: example syllable plus character for speech (mā 妈 / má 麻 / mǎ 马 / mà 骂).
   Practice: hear a syllable and pick its tone; see pinyin and pick the sound.
2. **One shared word app** (`chinese/words/`) instead of one folder per part: the URL picks the
   level and part, e.g. `chinese/words/?hsk=1&part=2`. Parts are about 50 words in the TSV order
   (most frequent first), so every part stays easy to finish. Each part saves its own progress
   (`zh-hsk<N>-<part>-v1`).
3. A level step opens a level page listing its parts with progress, like a course page. Add
   `parts` support to steps in `shared/toybox.js` (progress = sum of the parts) and make backups
   include every part key.
4. **Meanings**: write short meanings in en, fr, ja and ko together for each part when it is built
   (store them next to the list, e.g. `chinese/data/hsk1-meanings.tsv`). Do not copy dictionary
   definitions (CC-CEDICT is CC BY-SA). Check words that list other readings.
5. Practice per word: character to meaning, audio to character, meaning to character; look-alike
   characters as distractors. Later, per level: a short grammar-pattern part with original
   example sentences.

Levels 7-9 (advanced band, about 5,600 more words) can follow the same way later.

## Resuming in a new session

Attach the `toybox` repository and say: "Read CLAUDE.md and ROADMAP.md in the toybox repo and
continue the next unfinished step." Update the tables above when a step goes live.
