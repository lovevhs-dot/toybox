"""Build chinese/hsk<N>/data.js from the hand-written sources in chinese/data/src/.

Usage (from the repo root): python3 chinese/tools/build_level.py <N> <number of word parts>
Needs: pip install pypinyin (for sentence pinyin of words outside the HSK lists).
Sources: hsk<N>-words.txt  hanzi|pinyin|en|fr|ja|ko, in the order of chinese/data/hsk<N>.tsv
         hsk<N>-grammar.txt pattern|sentence with ＿|answer|wrong,wrong,wrong|en|fr|ja|ko|note en|note fr|note ja|note ko
It checks the order, field counts and that no answer still shows in its sentence, fixes the
TSV readings, and adds the level to shared/toybox.js if the step has no href yet.
"""
import json, sys, re
from pypinyin import lazy_pinyin, Style
SP='chinese/data/src/'
n=int(sys.argv[1]); nparts=int(sys.argv[2])
tsvp=f'chinese/data/hsk{n}.tsv'
order=[l.split('\t')[0] for l in open(tsvp) if not l.startswith('#')]
W=[l.rstrip('\n').split('|') for l in open(SP+f'hsk{n}-words.txt') if l.strip()]
bad=[w for w in W if len(w)!=6]; assert not bad, bad
got=[w[0] for w in W]
assert got==order, [(i,a,b) for i,(a,b) in enumerate(zip(got,order)) if a!=b][:5] or (len(got),len(order))
G=[l.rstrip('\n').split('|') for l in open(SP+f'hsk{n}-grammar.txt') if l.strip()]
assert all(len(g)==12 for g in G), [g[0] for g in G if len(g)!=12]
grow=[[g[0],g[1],g[2],g[3].split(',')]+g[4:] for g in G]
for g in grow:
    assert g[2] not in g[3] and len(g[3])==3 and g[1].count('＿')==1, g[:4]
    assert g[2] not in g[1].replace('＿',''), ('leak', g[:3])
# Glossary for grammar options: every level's words so far
gl={}
for k in range(1,n+1):
    f=SP+f'hsk{k}-words.txt'
    for l in open(f):
        if l.strip():
            c=l.rstrip('\n').split('|'); gl.setdefault(c[0], c[1:6])
for w in W: gl[w[0]]=w[1:6]
# Options that are not separate HSK words
gl.setdefault('没', ['méi','not (past); not have','ne… pas (passé) ; ne pas avoir','〜しなかった；ない','안 했다; 없다'])
def py_word(w):
    if w in OVR: return OVR[w]
    if w in gl: return gl[w][0]
    return ''.join(lazy_pinyin(w, style=Style.TONE, tone_sandhi=True))
ALLW=set(gl)
for k in range(1,7):
    for l in open(f'chinese/data/hsk{k}.tsv'):
        if not l.startswith('#'): ALLW.add(l.split('\t')[0])
# Fixed readings for phrases the word-list split gets wrong, and names
OVR={'有时间':'yǒu shíjiān','天下雨':'tiān xiàyǔ','再说一遍':'zài shuō yí biàn','才能说好':'cái néng shuō hǎo',
     '长得':'zhǎng de','王小月':'Wáng Xiǎoyuè','北京':'Běijīng','这个':'zhège','那个':'nàge','十二':"shí'èr",'二十':'èrshí',
     '慢慢':'mànmàn','中国人':'Zhōngguórén','早点儿':'zǎo diǎnr','快点儿':'kuài diǎnr','玩儿':'wánr','关上':'guānshang',
     '宁可':'nìngkě','何况':'hékuàng','难怪':'nánguài','幸亏':'xìngkuī','何必':'hébì','为中心':'wéi zhōngxīn',
     '不免':'bùmiǎn','以至于':'yǐzhìyú','固然':'gùrán','何尝':'hécháng','岂不':'qǐbù','无非':'wúfēi','不惜':'bùxī',
     '鉴于':'jiànyú','而言':'éryán','唯有':'wéiyǒu','才能成功':'cái néng chénggōng','新手':'xīnshǒu','并非':'bìngfēi',
     '守时':'shǒushí','尚且':'shàngqiě','做不到':'zuò bu dào','大人':'dàrén','恨不得':'hènbude','偏偏':'piānpiān',
     '未免':'wèimiǎn','有待':'yǒudài','免得':'miǎnde','乃至':'nǎizhì','迄今':'qìjīn','不得已':'bùdéyǐ'}
def cut(t):
    # Fixed phrases first, then the longest match against the HSK word lists, else one character
    i=0
    while i<len(t):
        for L in range(min(5,len(t)-i),0,-1):
            if t[i:i+L] in OVR or L==1 or t[i:i+L] in ALLW:
                yield t[i:i+L]; i+=L; break
def py_sentence(t):
    out=[]
    for tok in cut(t):
        if re.fullmatch(r'[\u4e00-\u9fff]+', tok): out.append(py_word(tok))
        elif tok.strip(): out[-1:] = [(out[-1] if out else '') + {'，':',','。':'.','？':'?','！':'!','：':':'}.get(tok, tok)]
    s2=' '.join(out)
    # Tone change of 一 and 不 before a 4th tone (yí gè, bú qù) or other tones (yì běn)
    T4=re.compile('^[a-z]*[àèìòùǜ]')
    words=s2.split(' ')
    for k in range(len(words)-1):
        nxt=words[k+1].lower()
        if words[k] in ('yī','Yī'):
            words[k]=('yí' if T4.match(nxt) or nxt.startswith('ge') else 'yì').capitalize() if words[k][0]=='Y' else ('yí' if T4.match(nxt) or nxt.startswith('ge') else 'yì')
        if words[k] in ('bù','bú') and k>0 and words[k-1].strip(',.?!').lower()==nxt.strip(',.?!'):
            words[k]='bu'; continue  # A 不 A questions: 去不去 qù bu qù
        if words[k] in ('bù','Bù') and T4.match(nxt):
            words[k]='Bú' if words[k][0]=='B' else 'bú'
    s2=' '.join(words)
    return s2[:1].upper()+s2[1:]
# Word tiles for the "put the words in order" question: the answer stays one tile, the rest are
# words from the lists, grouped within each clause so a sentence has about 6 tiles; punctuation is left out
PUNCT='，。？！：；、'
PARTICLES=set('的了着过地得吗呢吧啊')
def tiles(g):
    before, after = g[1].split('＿')
    def clauses(t):
        # Clauses split at punctuation; particles (的 了 得 …) stay with the word before them
        out, cur = [], []
        for w in cut(t):
            if w in PUNCT:
                if cur: out.append(cur); cur = []
            elif w in PARTICLES and cur: cur[-1] += w
            else: cur.append(w)
        if cur: out.append(cur)
        return out
    b, a = clauses(before), clauses(after)
    n = sum(map(len, b + a))
    size = 1 if n <= 6 else -(-n // 5)
    group = lambda cl: [''.join(cl[i:i + size]) for i in range(0, len(cl), size)]
    return [t for cl in b for t in group(cl)] + [g[2]] + [t for cl in a for t in group(cl)]
gloss={}
for g in grow:
    g.append(py_sentence(g[1].replace('＿', g[2])))
    g.append(tiles(g))
    for o in [g[2]]+g[3]:
        gloss[o]=gl.get(o) or [py_word(o),'','','','']
# Traditional characters from the word list, kept only where they differ (shown with a setting)
trad={l.split('\t')[0]: l.split('\t')[1] for l in open(tsvp) if not l.startswith('#')}
W=[w[:6]+[trad.get(w[0],'') if trad.get(w[0],'')!=w[0] else ''] for w in W]
q,r=divmod(len(W),nparts); sizes=[q+1]*r+[q]*(nparts-r)
data={'id':f'hsk{n}','name':f'HSK {n}','words':W,'grammar':grow,'gloss':gloss,'parts':{'words':sizes,'grammar':[len(grow)]}}
with open(f'chinese/hsk{n}/data.js','w') as o:
    o.write(f'// HSK {n} (2025 syllabus): words and grammar patterns. Characters are practiced inside the words.\n'
            f'// Word list: chinese/data/hsk{n}.tsv. Meanings and example sentences are original to this repo.\n'
            '// Rows: words [hanzi, pinyin, en, fr, ja, ko, traditional (empty when the same)];\n'
            '// grammar [pattern, sentence with ＿, answer, [wrong options], en, fr, ja, ko, note en, note fr, note ja, note ko, sentence pinyin, [word tiles]];\n'
            '// gloss: grammar options {word: [pinyin, en, fr, ja, ko]} (empty meanings when not in the word lists).\n'
            'window.ZH_LEVEL = '+json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('],[','],\n[')+';\n')
wmap={w[0]:w for w in W}; out=[]
for l in open(tsvp):
    if l.startswith('#'):
        out.append(l.replace("# Readings were picked automatically; check words with other-readings when building a part.","# Readings checked by hand for this level (一 and 不 shown with their tone change).")); continue
    c=l.rstrip('\n').split('\t'); c[2]=wmap[c[0]][1]; c[4]=''; out.append('\t'.join(c)+'\n')
open(tsvp,'w').writelines(out)
p='shared/toybox.js'; s=open(p).read()
a=f"          id: 'hsk{n}',\n"
if a in s:
    s=s.replace(a,f"          id: 'hsk{n}', href: 'chinese/hsk{n}/',\n          parts: makeParts('chinese/study/', 'zh-hsk{n}', {{ words: {json.dumps(sizes).replace(',', ', ')}, grammar: [{len(grow)}] }}),\n")
    open(p,'w').write(s)
print(len(W), sizes, len(grow))
