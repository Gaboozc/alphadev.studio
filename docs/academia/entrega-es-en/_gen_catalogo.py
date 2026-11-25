#!/usr/bin/env python3
"""Genera catalogo/catalogo-academia.{json,csv} y catalogo/lecciones-legado.csv.
Fuentes: curriculo-rework.md (tablas de cursos), decisiones-lecciones.csv, ../../inventario.csv,
y los árboles ../../semestre-0 y ../../semestre-0-en. Solo lee; no toca el repo."""
import csv, json, re, os, collections
H = os.path.dirname(os.path.abspath(__file__)); A = os.path.abspath(os.path.join(H, '..', '..'))
md = open(os.path.join(H, 'curriculo-rework.md'), encoding='utf-8').read()

EN = {
'S0-C1':'Working with AI','S0-C2':'Problem Solving and Critical Thinking','S0-C3':'Professional and Persuasive Writing',
'IS-101':'Terminal, Git and GitHub','IS-102':'Programming I: Python','IS-103':'Web I: HTML and CSS','IS-104':'Logic and Math for Programming',
'IS-201':'Programming II: JavaScript','IS-202':'TypeScript','IS-203':'Software Quality','IS-301':'Front End: React and Next.js',
'IS-302':'Relational Databases','IS-303':'Back End with Python and FastAPI','IS-401':'Platforms: Supabase and Vercel',
'IS-402':'Authentication and Web Security','IS-501':'Models, Embeddings and RAG','IS-403':'Containers with Docker (elective)',
'IS-502':'Agentic Engineering','IS-503':'LangGraph','IS-504':'External Tools and MCP','IS-601':'Multi-Agent Systems',
'IS-602':'Evaluation and Observability','IS-603':'Architecture, Async and Real Time','IS-604':'Security and Responsible AI','IS-TES':'Thesis',
'DP-101':'UX/UI Fundamentals','DP-102':'Visual Theory and Typography','DP-103':'Drawing and Composition','DP-201':'Professional Figma',
'DP-202':'User Research and Testing','DP-203':'Advanced UX Writing and Content Accessibility','DP-301':'Brand Strategy',
'DP-302':'Visual Identity','DP-303':'Design Systems','DP-401':'Motion for Interfaces','DP-402':'No-Code Design: Webflow and Framer',
'DP-403':'Advanced Interaction (elective)','DP-501':'Brand Guidelines and Applications','DP-502':'Portfolio and Case Study',
'DP-503':'Project Studio','DP-TES':'Thesis',
'MK-101':'Marketing Fundamentals and Positioning','MK-102':'Analytics I: GA4, GTM and UTM','MK-103':'Community Management',
'MK-104':'Statistics for Marketing','MK-201':'Digital Advertising I','MK-202':'Meta Ads','MK-203':'Google Ads and Google Business Profile',
'MK-301':'Email Marketing','MK-302':'Copy for Web, Ads and Landing Pages','MK-303':'Video for Social Media',
'MK-401':'SEO I: Intent, Keywords and On-Page','MK-402':'Technical SEO','MK-403':'Authority and Link Building',
'MK-501':'SEO for Agencies','MK-502':'GEO: Generative Search','MK-503':'Analytics II: Funnels, Experiments and Reporting',
'MK-601':'Consultative Sales and Proposals','MK-602':'TikTok and Organic Strategy','MK-TES':'Thesis: 30-Day Integrated Campaign',
'OPT-01':'No-Code Automation with AI','OPT-02':'Creative AI: Image, Video and Audio'}
PROG = {'S0':('Semestre 0 · Tronco común','Semester 0 · Shared Core'),
 'IS':('Ingeniería de Software e IA','Software and AI Engineering'),
 'DP':('Diseño de Producto','Product Design'),
 'MK':('Marketing Digital y Crecimiento','Digital Marketing and Growth'),
 'OPT':('Optativas transversales','Cross-Program Electives')}
NUEVO = {'IS-104','DP-103','MK-104'}; PARCIAL = {'DP-102'}

def units(s): return [u.strip() for u in re.split(r'\s·\s', s) if u.strip()]
courses = []
for line in md.splitlines():
    m = re.match(r'^\| (S[1-6]) \| ((?:IS|DP|MK)-\w+) (.+?) \| (\d+) \| (\d+) \| (\d+) \| (.+?) \| (.+?) \| (.+?) \|$', line)
    if m:
        sem, code, t, w, hw, h, u, src, pre = m.groups()
        courses.append(dict(code=code, program=code[:2], semester=sem, title_es=t, weeks=int(w), hours_per_week=int(hw), hours=int(h), units_es=units(u), sources=src, prereq_recommended=pre))
        continue
    m = re.match(r'^\| (OPT-0\d) (.+?) \| (\d+) \| (\d+) \| (\d+) \| (.+?) \| (.+?) \|$', line)
    if m:
        code, t, w, hw, h, u, src = m.groups()
        courses.append(dict(code=code, program='OPT', semester='—', title_es=t, weeks=int(w), hours_per_week=int(hw), hours=int(h), units_es=units(u), sources=src, prereq_recommended='S0'))
s0 = [('S0-C1','Trabajo con IA',10,60,'01-trabajo-con-ia',['U1 Cómo funciona un LLM','U2 Anatomía del prompt','U3 Técnicas y contexto','U4 La IA como sistema de trabajo'],['U1 How an LLM Works','U2 Anatomy of a Prompt','U3 Techniques and Context','U4 AI as a Work System']),
      ('S0-C2','Resolución de problemas y pensamiento crítico',11,66,'02-pensamiento-critico',['U1 Definir el problema','U2 Causas, hipótesis y evidencia','U3 Razonamiento y falacias','U4 Sesgos y fuentes','U5 Decidir bajo incertidumbre'],['U1 Defining the Problem','U2 Causes, Hypotheses and Evidence','U3 Reasoning and Fallacies','U4 Biases and Sources','U5 Deciding Under Uncertainty']),
      ('S0-C3','Escritura profesional y persuasiva',10,60,'03-escritura-profesional',['U1 Escribir para que te entiendan','U2 Escribir para persuadir','U3 UX writing','U4 Propuestas y correos'],['U1 Writing to Be Understood','U2 Writing to Persuade','U3 UX Writing','U4 Proposals and Emails'])]
for code,t,w,h,folder,ues,uen in s0:
    files_es = sorted(os.path.relpath(os.path.join(r,f), os.path.join(A,'semestre-0')) for r,_,fs in os.walk(os.path.join(A,'semestre-0',folder)) for f in fs)
    files_en = sorted(os.path.relpath(os.path.join(r,f), os.path.join(A,'semestre-0-en')) for r,_,fs in os.walk(os.path.join(A,'semestre-0-en',folder)) for f in fs)
    courses.insert(len([c for c in courses if c['program']=='S0']), dict(code=code, program='S0', semester='S0', title_es=t, weeks=w, hours_per_week=6, hours=h, units_es=ues, units_en=uen, sources='semestre-0/'+folder, prereq_recommended='—', files_es=files_es, files_en=files_en))

dec = list(csv.DictReader(open(os.path.join(H,'decisiones-lecciones.csv'), encoding='utf-8')))
inv = list(csv.DictReader(open(os.path.join(A,'inventario.csv'), encoding='utf-8')))
legacy = []
for d, i in zip(dec, inv):
    assert d['id'] == i['lesson'] and d['modulo'] == i['module']
    dest = re.split(r'[ ;·]', d['destino'].strip())[0]
    legacy.append(dict(legacy_key=f"{i['rama']}/{i['module']}/{i['lesson']}", id=d['id'], rama=i['rama'], modulo=i['module'], titulo=d['titulo'],
        palabras_total=i['words_total'], palabras_cuerpo=i['content_words'], decision=d['decision'], destino=d['destino'], curso_destino=dest, motivo=d['motivo'],
        ruta_actual=f"/academia/{i['rama']}/{i['module']}/{i['lesson']}", ruta_en=f"/en/academia/{i['rama']}/{i['module']}/{i['lesson']}",
        idioma_disponible='es', etiqueta_ui={'mantener':'Lección de la Biblioteca','reescribir':'Versión anterior · en reescritura','fusionar':'Versión anterior · se fusiona en '+dest,'retirar':'Retirada · reemplazada por '+d['destino']}[d['decision']]))
byc = collections.defaultdict(collections.Counter)
for l in legacy: byc[l['curso_destino']][l['decision']] += 1
for c in courses:
    c['title_en'] = EN.get(c['code'], '')
    c['program_es'], c['program_en'] = PROG[c['program']]
    c['legacy_lessons'] = dict(byc.get(c['code'], {}))
    if c['program']=='S0': c['status']='escrito_es_en'
    elif c['code'] in NUEVO: c['status']='en_preparacion_sin_fuente'
    elif c['code'] in PARCIAL: c['status']='en_preparacion_fuente_parcial'
    else: c['status']='en_preparacion_con_lecciones_legado'
    c['slug'] = c['code'].lower()
    c['route_es'] = f"/academia/{'semestre-0' if c['program']=='S0' else {'IS':'ingenieria-software-ia','DP':'diseno-producto','MK':'marketing-digital','OPT':'optativas'}[c['program']]}/{c['slug']}"
    c['route_en'] = '/en' + c['route_es']
out = os.path.join(H, 'catalogo')
json.dump(dict(generated_by='_gen_catalogo.py', courses=courses, legacy_lessons=legacy), open(os.path.join(out,'catalogo-academia.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=1)
with open(os.path.join(out,'catalogo-academia.csv'),'w',newline='',encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(['programa','semestre','codigo','titulo_es','title_en','horas','semanas','unidades_es','prerreq_recomendado','estado','legado_mantener','legado_reescribir','legado_fusionar','legado_retirar','ruta_es','ruta_en','fuentes'])
    for c in courses:
        L=c['legacy_lessons']; w.writerow([c['program'],c['semester'],c['code'],c['title_es'],c['title_en'],c['hours'],c['weeks'],' · '.join(c['units_es']),c['prereq_recommended'],c['status'],L.get('mantener',0),L.get('reescribir',0),L.get('fusionar',0),L.get('retirar',0),c['route_es'],c['route_en'],c['sources']])
with open(os.path.join(out,'lecciones-legado.csv'),'w',newline='',encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(legacy[0].keys())); w.writeheader(); w.writerows(legacy)
tot = collections.Counter(l['decision'] for l in legacy)
hp = collections.Counter(); [hp.update({c['program']: c['hours']}) for c in courses]
print(len(courses), 'cursos', dict(hp), dict(tot), 'sin destino de curso:', sorted(set(l['curso_destino'] for l in legacy) - {c['code'] for c in courses}))
