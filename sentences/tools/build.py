"""Build sentences/data/<level>.js from sentences/src/<level>.txt.

Usage (from the repo root): python3 sentences/tools/build.py a1 a2 b1 b2 idioms writing
Each source line is part|English|French|Chinese|Japanese|Korean with one [key phrase] in English
and French. Parts keep the order in which they first appear.
In long sentences (more than LONG words) the app types only the key phrase and keeps it as one
tile when ordering, so there the brackets must sit on word boundaries.
"""
import json, re, sys

LONG = 12  # keep in sync with LONG_WORDS in sentences/index.html


def words(s):
    return [w for w in re.sub(r'\s+([?!:;])', r'\1', s.replace('[', '').replace(']', '')).split() if w.strip('.,!?;:…')]

for level in sys.argv[1:]:
    rows = [l.rstrip('\n').split('|') for l in open(f'sentences/src/{level}.txt', encoding='utf-8')
            if l.strip() and not l.startswith('#')]
    bad = [r for r in rows if len(r) != 6 or any(r[c].count('[') != 1 or r[c].count(']') != 1 for c in (1, 2))]
    assert not bad, bad[:3]
    edge = [r[c] for r in rows for c in (1, 2)
            if len(words(r[c])) > LONG and not re.fullmatch(r'(.*(^|\s))?\[[^\]]+\]([\s.,!?;:…].*)?', r[c])]
    assert not edge, edge[:3]
    parts = {}
    for r in rows:
        parts.setdefault(r[0], []).append(r[1:])
    for k, v in parts.items():
        for c in (0, 1):
            texts = [x[c].replace('[', '').replace(']', '') for x in v]
            dup = {t for t in texts if texts.count(t) > 1}
            assert not dup, (level, k, dup)
    data = {'id': level, 'name': level.upper(), 'parts': {k: [len(v)] for k, v in parts.items()}, 'rows': parts}
    with open(f'sentences/data/{level}.js', 'w', encoding='utf-8') as o:
        o.write(f'// {level.upper()} sentences in English, French, Chinese (Simplified), Japanese and Korean.\n'
                f'// Source: sentences/src/{level}.txt. [brackets] mark the key phrase. Original to this repo.\n'
                'window.SENTENCES = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('],[', '],\n[') + ';\n')
    print(level, {k: len(v) for k, v in parts.items()})
