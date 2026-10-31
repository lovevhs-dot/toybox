# Rules for working on this repository

This repository is public. Never put personal or sensitive information in it:

- No names, emails, phone numbers, locations, chat IDs, account IDs, tokens, keys, watchlists,
  saved lists or message text in code, commits, commit messages, logs, issues or pull requests.
- Commit author email: GitHub's private noreply address only, never a personal one.
  Check `git config user.email` before committing.
- Secrets live only in GitHub Actions secrets; personal data is stored encrypted (state.enc).
- Logs print only counts and error types, never what was looked up or who sent it.
- Code and comments are written in English.
- Language pickers list languages by their own names: Latin-script names first in
  alphabetical order, then other scripts in Unicode order. Currently: English, Français,
  中文（简体）, 中文（繁體）, 日本語, 한국어. English is the default. A learning app leaves out
  the language it teaches (Hiragana Studio has no 日本語, Hangul Studio has no 한국어).
- Follow international standards and widely accepted conventions wherever one exists, e.g.
  BCP 47 language tags (en, fr, zh-Hans, zh-Hant, ja, ko), ISO 8601 dates, ISO 639/3166 codes,
  Unicode and UTF-8, WCAG accessibility, semantic HTML, and established romanization systems
  (Hepburn for Japanese, Revised Romanization for Korean, Hanyu Pinyin for Chinese).
  When no standard exists, use the most common practice and note the choice.
- Courses and their steps are listed in shared/toybox.js; the home page and each course page
  (japanese/, korean/) render from it. A new app gets its own folder and an entry there.
  Keep each app small (about 50 cards) so progress stays easy to finish.
- GitHub Pages caches files for about 10 minutes, so pages load shared/*.css, shared/*.js and
  each app's i18n.js with a `?v=YYYY-MM-DD.N` query. Whenever one of those files changes, bump
  the version in every page that loads it.
- ROADMAP.md tracks what exists and what to build next; keep it updated when a step goes live.
- Check all of the above before every commit and push.
