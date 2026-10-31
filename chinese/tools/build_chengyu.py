"""Build chinese/chengyu/data.js from chinese/data/src/chengyu.txt.

Usage (from the repo root): python3 chinese/tools/build_chengyu.py
Source lines: part|hanzi|pinyin|en|fr|ja|ko (part is idioms or phrases). Checks field counts,
duplicates, punctuation in hanzi and overlap with the HSK 1-6 lists, then splits each part
into chunks of about 50 for the study app (?set=zh-chengyu-idioms-1).
"""
import json, re, math
rows = [l.rstrip('\n').split('|') for l in open('chinese/data/src/chengyu.txt', encoding='utf-8')
        if l.strip() and not l.startswith('#')]
assert all(len(r) == 7 for r in rows), [r for r in rows if len(r) != 7][:3]
hz = [r[1] for r in rows]
assert len(hz) == len(set(hz)), sorted({h for h in hz if hz.count(h) > 1})
assert not [h for h in hz if re.search(r'[^一-鿿]', h)]
hsk = set()
for k in range(1, 7):
    hsk |= {l.split('\t')[0] for l in open(f'chinese/data/hsk{k}.tsv', encoding='utf-8') if not l.startswith('#')}
assert not [h for h in hz if h in hsk], [h for h in hz if h in hsk]
data = {'id': 'chengyu',
        'name': {'en': 'Idioms and sayings', 'fr': 'Expressions et dictons', 'ja': '成語とことわざ', 'ko': '성어와 속담'},
        'parts': {}}
for part in dict.fromkeys(r[0] for r in rows):
    items = [r[1:] for r in rows if r[0] == part]
    n = math.ceil(len(items) / 50)
    q, rem = divmod(len(items), n)
    data[part] = items
    data['parts'][part] = [q + 1] * rem + [q] * (n - rem)
with open('chinese/chengyu/data.js', 'w', encoding='utf-8') as o:
    o.write('// Chinese idioms (chengyu), sayings and colloquial expressions, not in the HSK 1-6 lists.\n'
            '// Source: chinese/data/src/chengyu.txt. Meanings are original to this repo.\n'
            '// Rows: [hanzi, pinyin, en, fr, ja, ko].\n'
            'window.ZH_LEVEL = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('],[', '],\n[') + ';\n')
print(data['parts'])
