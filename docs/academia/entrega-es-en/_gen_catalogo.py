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

UNITS_EN = {
'IS-101': ['U1 Terminal and File System', 'U2 Local Git: Commits, Branches, and Conflicts', 'U3 GitHub: PRs and Teamwork'],
'IS-102': ['U1 Environment and Syntax', 'U2 Data Structures', 'U3 Files, JSON, and HTTP', 'U4 Types, Modules, and Tools'],
'IS-103': ['U1 Semantic HTML', 'U2 Box Model, Flexbox, and Grid', 'U3 Typography, Color, and Accessibility', 'U4 Responsive Design'],
'IS-104': ['U1 Propositional Logic', 'U2 Sets and Functions', 'U3 Algorithms and Basic Complexity', 'U4 Probability for Programmers'],
'IS-201': ['U1 Variables, Functions, and Control Flow', 'U2 Arrays and Objects', 'U3 DOM and Events', 'U4 Asynchrony: Promises and fetch'],
'IS-202': ['U1 Types and Inference', 'U2 Interfaces, Unions, and Narrowing', 'U3 Generics, Utility Types, and TS in React'],
'IS-203': ['U1 Error Handling', 'U2 Evidence-Based Debugging', 'U3 Unit Testing (Vitest and pytest)', 'U4 TDD', 'U5 UI Testing (RTL and E2E)', 'U6 Coding with AI Assistants and Reviewing Their Code'],
'IS-301': ['U1 Components, Props, and State', 'U2 App Router and Server Components', 'U3 Global State', 'U4 Server Actions', 'U5 Performance'],
'IS-302': ['U1 Choosing a Database', 'U2 Modeling and Normalization', 'U3 SQL', 'U4 Postgres on Supabase', 'U5 ORMs and Migrations'],
'IS-303': ['U1 What a Back End Does', 'U2 First API and Pydantic', 'U3 Structure and Architectures', 'U4 Documenting and Testing'],
'IS-401': ['U1 Supabase: Database, Auth, and Storage', 'U2 Deployment and Environments on Vercel', 'U3 Storage and Environment Variables'],
'IS-402': ['U1 Authn and Authz', 'U2 Passwords', 'U3 Sessions and Tokens', 'U4 Protecting Routes', 'U5 Recovery and Verification'],
'IS-501': ['U1 Python for AI and LLMs in Code', 'U2 ML and Pretrained Models', 'U3 Embeddings and Semantic Search', 'U4 RAG'],
'IS-403': ['U1 What a Container Solves', 'U2 Dockerfile', 'U3 Compose'],
'IS-502': ['U1 What an Agent Is', 'U2 Tools', 'U3 Memory and State', 'U4 Failures, Retries, and Human-in-the-Loop'],
'IS-503': ['U1 From Loop to Graph', 'U2 ToolNode and State', 'U3 Persistence', 'U4 Send and Subgraphs'],
'IS-504': ['Units per iaeng-mcp (8 lessons)'],
'IS-601': ['Units per iaeng-3 (8 lessons)'],
'IS-602': ['U1 Measuring the Non-Deterministic', 'U2 Golden Set and Scoring', 'U3 Traces (OpenTelemetry)', 'U4 Cost and Latency'],
'IS-603': ['U1 Architecture and Cost', 'U2 Queues, Workers, and Cron', 'U3 Streaming and Notifications'],
'IS-604': ['U1 Threats in AI Apps', 'U2 Applied OWASP', 'U3 Governance and Responsible AI'],
'IS-TES': ['Option A: Production SaaS (web-capstone)', 'Option B: AI Product for a Client (iaeng-capstone)'],
'DP-101': ['U1 UX vs. UI', 'U2 UX Laws and Heuristics', 'U3 Screen Audit'],
'DP-102': ['U1 Hierarchy, Contrast, Alignment, and Proximity', 'U2 Color', 'U3 Typography', 'U4 Grid and Composition'],
'DP-103': ['U1 Sketching', 'U2 Shapes and Proportion', 'U3 Composition', 'U4 From Sketch to Wireframe'],
'DP-201': ['U1 Frames, Layers, and Text', 'U2 Auto Layout', 'U3 Components and Variants', 'U4 Prototyping', 'U5 FigJam and Flows'],
'DP-202': ['U1 Research Methods', 'U2 Remote and In-Person Testing', 'U3 Analysis (SUS, Task Completion)', 'U4 Prioritization'],
'DP-203': ['U1 Microcopy', 'U2 Voice and Tone', 'U3 Copy Accessibility'],
'DP-301': ['U1 What a Brand Is', 'U2 Positioning and UVP (shared lesson with MK-101)', 'U3 Personality and Archetypes'],
'DP-302': ['U1 Logo', 'U2 Palette', 'U3 Brand Typography'],
'DP-303': ['U1 What a Design System Is', 'U2 Variables and Tokens', 'U3 Documentation and Governance'],
'DP-401': ['U1 Purposeful Motion', 'U2 Timing and Easing', 'U3 Smart Animate', 'U4 After Effects and Lottie', 'U5 Transitions and Storytelling'],
'DP-402': ['U1 Decision Map', 'U2 Webflow and CMS', 'U3 Framer', 'U4 Publishing and Basic SEO'],
'DP-403': ['U1 Rive', 'U2 Spline', 'U3 Unicorn Studio', 'U4 Choosing One and Mastering It'],
'DP-501': ['U1 Brand Voice', 'U2 Brand Book'],
'DP-502': ['U1 What Employers Look For', 'U2 Writing a Case Study'],
'DP-503': ['Bank of 14 `up-*` projects by level (Mobile, Desktop, and Responsive); student completes 3'],
'DP-TES': ['Option A: Complete Product (uiux-capstone)', 'Option B: Complete Identity (branding-capstone)'],
'MK-101': ['U1 Buyer Persona', 'U2 Positioning and UVP (lesson from DP-301)', 'U3 Digital Presence and First Posts'],
'MK-102': ['U1 GA4 Data Model', 'U2 Google Tag Manager', 'U3 UTMs'],
'MK-103': ['U1 The Role', 'U2 Content Calendar (single version)', 'U3 Engagement, Crisis, and Metrics'],
'MK-104': ['U1 Descriptive Statistics', 'U2 Probability', 'U3 Samples and Intervals', 'U4 Significance for A/B Testing'],
'MK-201': ['U1 Ecosystem and Auction', 'U2 Campaign Structure', 'U3 Creatives'],
'MK-202': ['U1 Business Manager and Pixel', 'U2 Launching and Optimizing', 'U3 Retargeting', 'U4 Structured Testing', 'U5 Reporting'],
'MK-203': ['U1 GBP', 'U2 Search: Keywords and Structure', 'U3 PMax and Display', 'U4 Bidding and Budget', 'Project: 90-Day Paid Media Plan'],
'MK-301': ['U1 Why Email and the List', 'U2 Anatomy of an Email', 'U3 Welcome Sequence (single project)', 'U4 Advanced Flows', 'U5 Deliverability and Segmentation'],
'MK-302': ['U1 Headlines', 'U2 Landing Page Structure', 'U3 Copy for Meta Ads', 'Project: High-Converting Landing Page'],
'MK-303': ['U1 Strategy and Hooks', 'U2 Script', 'U3 Editing: Pacing, Captions, and B-Roll', 'U4 Color and Audio', 'U5 Thumbnails and Titles'],
'MK-401': ['U1 How Google Works', 'U2 Keyword Research', 'U3 On-Page', 'U4 Clusters'],
'MK-402': ['U1 Core Web Vitals', 'U2 Schema and Metadata', 'U3 Crawler Audit', 'U4 Crawl Budget and Logs', 'U5 JS SEO', 'U6 Hreflang'],
'MK-403': ['U1 Why Links Matter', 'U2 Ethical Strategies'],
'MK-501': ['U1 Full Audit', 'U2 Reporting and ROI', 'Project: 6-Month Strategy; or the 8-Week SEO Capstone'],
'MK-502': ['U1 What GEO Is', 'U2 Citable Content and Authority', 'U3 Metrics and Plan', 'Project: GEO Strategy'],
'MK-503': ['U1 Funnels', 'U2 Segmentation and Cohorts', 'U3 Looker Studio', 'U4 A/B Testing', 'U5 KPIs and Reporting', 'Project: Analytics Infrastructure'],
'MK-601': ['U1 Consultative Process', 'U2 Objections', 'U3 Lead Funnels', 'U4 Follow-Up'],
'MK-602': ['U1 TikTok for Business', 'U2 Content Strategy', 'U3 Case Study and Growth'],
'MK-TES': ['Integrated Ads, Email, SEO, and Reporting'],
'OPT-01': ['U1 When to Automate', 'U2 First Workflow in n8n', 'U3 Agents with n8n and LLMs', 'Project: Automation That Saves Real Time'],
'OPT-02': ['U1 Generative Image', 'U2 Generative Video and Audio'],
}

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
        idioma_disponible=('es, en' if d['decision']=='mantener' else 'es'),
        etiqueta_ui={'mantener':'Lección de la Biblioteca','reescribir':'Versión anterior · en reescritura','fusionar':'Versión anterior · se fusiona en '+dest,'retirar':'Retirada · reemplazada por '+d['destino']}[d['decision']],
        etiqueta_ui_en={'mantener':'Library lesson','reescribir':'Previous version · being rewritten','fusionar':'Previous version · merging into '+dest,'retirar':'Retired · replaced by '+d['destino']}[d['decision']]))
byc = collections.defaultdict(collections.Counter)
for l in legacy: byc[l['curso_destino']][l['decision']] += 1
for c in courses:
    c['title_en'] = EN.get(c['code'], '')
    if 'units_en' not in c:
        c['units_en'] = UNITS_EN[c['code']]
    assert len(c['units_en']) == len(c['units_es']), (c['code'], c['units_es'], c['units_en'])
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
    w = csv.writer(f); w.writerow(['programa','semestre','codigo','titulo_es','title_en','horas','semanas','unidades_es','units_en','prerreq_recomendado','estado','legado_mantener','legado_reescribir','legado_fusionar','legado_retirar','ruta_es','ruta_en','fuentes'])
    for c in courses:
        L=c['legacy_lessons']; w.writerow([c['program'],c['semester'],c['code'],c['title_es'],c['title_en'],c['hours'],c['weeks'],' · '.join(c['units_es']),' · '.join(c['units_en']),c['prereq_recommended'],c['status'],L.get('mantener',0),L.get('reescribir',0),L.get('fusionar',0),L.get('retirar',0),c['route_es'],c['route_en'],c['sources']])
with open(os.path.join(out,'lecciones-legado.csv'),'w',newline='',encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(legacy[0].keys())); w.writeheader(); w.writerows(legacy)
tot = collections.Counter(l['decision'] for l in legacy)
hp = collections.Counter(); [hp.update({c['program']: c['hours']}) for c in courses]
print(len(courses), 'cursos', dict(hp), dict(tot), 'sin destino de curso:', sorted(set(l['curso_destino'] for l in legacy) - {c['code'] for c in courses}))
