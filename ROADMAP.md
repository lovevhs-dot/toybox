# Toybox roadmap and handoff

Read CLAUDE.md first; its rules always apply. This file says what exists, how apps are built,
and what to build next, so any new session can continue without the earlier conversation.

## What exists (live on GitHub Pages)

| Path | What | Notes |
|---|---|---|
| `/` | Home | Continue card, course cards, backup links |
| `japanese/` | Course page | Hiragana live; Hiragana 2, Katakana 1-2, JLPT N5-N1 "coming soon" |
| `chinese/` | Course page | Pinyin and HSK 1-6 steps; Pinyin and HSK 1-4 live |
| `chinese/pinyin/` | Pinyin level page | Tones (45: 10 syllables x 4 tones + 5 neutral), initials (23), finals (38), each with hints in every UI language |
| `chinese/hsk1/` | HSK 1 level page | 6 word parts (294), 1 grammar part (44); characters are practiced inside the words; data in `data.js` |
| `chinese/hsk2/` | HSK 2 level page | 4 word parts (197), 1 grammar part (32) |
| `chinese/hsk3/` | HSK 3 level page | 10 word parts (487), 1 grammar part (33) |
| `chinese/hsk4/` | HSK 4 level page | 20 word parts (972), 1 grammar part (31) |
| `chinese/study/` | Shared study app | `?set=zh-hsk1-words-1` etc.; list + mastery practice; UI en/fr/ja/ko |
| `korean/` | Course page | Hangul live; Batchim, TOPIK 1-6 "coming soon" |
| `hiragana/` | Hiragana Studio | 55 cards, UI en/fr/zh-Hans/ko, readings in each UI language's own spelling |
| `hangul/` | Hangul Studio | 54 cards (40 jamo + 14 syllables), UI en/fr/zh-Hans/ja |
| `english/`, `french/` | Course pages | CEFR steps A1-C1; A1-B2 live (3 parts of 40 sentences per level), C1 coming soon |
| `sentences/` | Shared sentence app | `?set=en-a1-meet-1` or `fr-a1-meet-1`; data in `sentences/data/<level>.js` |
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
- Test locally: `python3 -m http.server 8765` in the repo root, ## English and French courses (sentence based)

Words alone are too easy for these learners (many basic words are known or shared between English
and French), so these courses teach everyday sentences, grouped by CEFR level (A1-C1, the
international framework) and by situation. No exam names are used.

- One sentence set serves both courses: each line of `sentences/src/<level>.txt` is
  `part|English|French|Chinese|Japanese|Korean`, with the key phrase in [brackets] in English and
  French. The English course shows the other four as translations; the French course likewise.
  Write all five together; sentences are original (never from textbooks or exams).
- Build with `python3 sentences/tools/build.py <levels>` (checks brackets and duplicates), add the level step with `href` and
  `makeParts('sentences/', 'en-<level>', {...})` (and `fr-`) in `shared/toybox.js`, copy
  `english/a1/` and `french/a1/` to the new level, and add the part names to `kinds` in
  `shared/toybox.js` and `sentences/i18n.js` in every language.
- Practice: each sentence goes through 4 steps (choose it from the meaning or by ear, fill in the
  key phrase, put the words in order, type it). A mistake goes back one step; the dots show the
  step. Typing ignores case and punctuation, accepts English contractions both ways, accepts French
  answers without accents (with a reminder) and either gender ending (fatigué/fatiguée).
- Review is the same as in the other apps (a 10-question review of the part that keeps progress).
- Speech: en-GB for English (British spelling, e.g. favourite), fr-FR for French.
- Done: A1 meet/daily/out, A2 past/plans/health, B1 opinions/work/stories, B2 debate/society/tact.
  Next: C1 (for example idioms and register, abstract topics, hedging and nuance), 40 per part.

then Playwright (Chromium is
  preinstalled) at mobile (390x844) and desktop widths, light and dark, and with Google Fonts blocked.
  Report anything not tested (e.g. real Safari) instead of claiming it works.

## Course design (same for all three languages)

Every course has the same shape, so they stay consistent:

1. **Script and sound steps** first, each about 50 cards: Japanese Hiragana, Hiragana 2, Katakana,
   Katakana 2; Chinese Pinyin and tones; Korean Hangul, Batchim.
2. **One step per official exam level**, up to the top of that exam: JLPT N5-N1, HSK 1-6,
   TOPIK 1-6. Each level step opens a level page with parts of about 50 items: words first, then
   kanji (Japanese only; Chinese practices characters inside words), then grammar patterns with original example sentences.
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

Course steps (listed in `shared/toybox.js`; Pinyin and HSK 1-4 are live):

| Step | Content | Data |
|---|---|---|
| Pinyin and tones (`chinese/pinyin/`) | Live: tones, initials, finals | `chinese/pinyin/data.js` |
| HSK 1 (`hsk1`) | 294 words, 6 parts | `chinese/data/hsk1.tsv` |
| HSK 2 (`hsk2`) | 197 words, 4 parts | `chinese/data/hsk2.tsv` |
| HSK 3 (`hsk3`) | 487 words, 10 parts | `chinese/data/hsk3.tsv` |
| HSK 4 (`hsk4`) | 972 words, 20 parts | `chinese/data/hsk4.tsv` |
| HSK 5 (`hsk5`) | 1,547 words, 31 parts | `chinese/data/hsk5.tsv` |
| HSK 6 (`hsk6`) | 1,684 words, 34 parts | `chinese/data/hsk6.tsv` |

How to build it:

1. **Pinyin** (done): tones by ear (or by name when no Chinese voice exists), initials and finals by
   ear or by description.
2. **Done for HSK 1-4, repeat for HSK 5 and 6:** write `chinese/data/src/hsk<N>-words.txt` (one line per
   word of `chinese/data/hsk<N>.tsv`, same order) and `hsk<N>-grammar.txt`, copy `chinese/hsk4/index.html`
   to `chinese/hsk<N>/` (change the step and titles), then run
   `python3 chinese/tools/build_level.py <N> <parts>` (parts of about 50 words). It writes `data.js`
   with sentence pinyin and option glosses, fixes the TSV readings and adds the step to `shared/toybox.js`.
   Check the printed sentence pinyin (tone changes of 一/不, names) and bump the `?v=` versions.
   - Words: meanings in en, fr, ja and ko written together; never copy dictionary definitions
     (CC-CEDICT is CC BY-SA). Check words that list other readings and fix the TSV.
   - Characters: no separate parts for Chinese (they repeated the word parts). Word practice includes
     "fill in the missing character" for words of two or more characters.
   - Grammar: after answering, the app shows the sentence pinyin, the note and every option with
     its pinyin and meaning.
   - Grammar: never use a pattern whose answer would still show in the sentence (越…越…, 一边…一边…).
   - Grammar: the level's patterns as fill-in-the-blank cards with original sentences, wrong
     options that are clearly wrong, a translation and a one-line note in every UI language.
3. The study app (`chinese/study/`) handles every kind: list view, then practice (dots under each question show the correct answers still needed) with
   character to meaning, meaning to character, audio to character (when a Chinese voice
   exists) and the missing character of a word. Progress per part is saved as `zh-hsk<N>-<kind>-<part>-v1`; home, course, level page
   and backups read it through the step's `parts`.

Levels 7-9 (advanced band, about 5,600 more words) can follow the same way later.

## Resuming in a new session

Attach the `toybox` repository and say: "Read CLAUDE.md and ROADMAP.md in the toybox repo and
continue the next unfinished step." Update the tables above when a step goes live.
