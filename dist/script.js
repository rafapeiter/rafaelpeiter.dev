const root = document.documentElement;
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const themeButton = document.querySelector('.theme-toggle');
const languageButtons = [...document.querySelectorAll('.language-options [data-language]')];
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const language = () => root.dataset.language === 'en' ? 'en' : 'pt';
function readPreference(key) { try { return localStorage.getItem(key); } catch { return null; } }
function remember(key, value) { try { localStorage.setItem(key, value); } catch { /* Funciona nesta visita. */ } }
let preferredTheme = readPreference('rp-theme');
if (!['light', 'dark'].includes(preferredTheme)) preferredTheme = null;

const english = new Map([
  ['PROJETOS DE ENSINO', 'TEACHING PROJECTS'], ['Tecnologia em', 'Technology in'], ['sala de aula.', 'the classroom.'],
  ['Ferramentas que desenvolvi para tornar conceitos de computação', 'Tools I developed to make computing concepts'], ['mais visuais e acessíveis nas disciplinas que leciono.', 'more visual and accessible in the courses I teach.'],
  ['Recursão e algoritmos', 'Recursion and algorithms'], ['Simulador de Fibonacci', 'Fibonacci Simulator'], ['Programação paralela', 'Parallel programming'], ['Produtor-Consumidor', 'Producer-Consumer'], ['Comunicação de dados', 'Data communications'], ['Codificação Digital-Digital', 'Digital-to-Digital Encoding'],
  ['Explore a árvore de chamadas de Fibonacci e veja como a recursão funciona, incluindo o recálculo de subproblemas.', 'Explore the Fibonacci call tree and see how recursion works, including repeated subproblem calculations.'],
  ['Acompanhe um buffer compartilhado, ajuste as velocidades e entenda a espera quando ele está cheio ou vazio.', 'Watch a shared buffer, adjust the speeds and understand why processes wait when it is full or empty.'],
  ['Transforme sequências de bits em gráficos de sinal com sete métodos de codificação, como Manchester, NRZ e AMI.', 'Turn bit sequences into signal graphs with seven encoding methods, including Manchester, NRZ and AMI.'],
  ['Experimentar', 'Try it'], ['Ver código', 'View code'],
  ['Tecnologias do simulador de Fibonacci', 'Fibonacci simulator technologies'], ['Experimentar o simulador de Fibonacci', 'Try the Fibonacci simulator'], ['Ver código do simulador de Fibonacci', 'View Fibonacci simulator code'],
  ['Tecnologias do simulador Produtor-Consumidor', 'Producer-Consumer simulator technologies'], ['Experimentar o simulador Produtor-Consumidor', 'Try the Producer-Consumer simulator'], ['Ver código do simulador Produtor-Consumidor', 'View Producer-Consumer simulator code'],
  ['Tecnologias do simulador de codificação digital', 'Digital encoding simulator technologies'], ['Experimentar o simulador de codificação digital', 'Try the digital encoding simulator'], ['Ver código do simulador de codificação digital', 'View digital encoding simulator code'],
  ['Projetos', 'Projects'], ['PROJETOS DE APLICATIVOS', 'APP PROJECTS'], ['Do código ao', 'From code to'], ['uso real.', 'everyday use.'],
  ['Aplicativos que fazem parte da minha trajetória', 'Apps that are part of my journey'], ['de desenvolvimento na CantúStange, para Android e iOS.', 'as a developer at CantúStange, for Android and iOS.'],
  ['Finanças pessoais', 'Personal finance'], ['Android e iOS', 'Android and iOS'], ['Histórico de compras', 'Purchase history'],
  ['Controle financeiro pessoal para organizar contas, receitas, despesas e cartões em um só lugar, com gráficos e resumos para acompanhar o dia a dia.', 'A personal finance app for organizing accounts, income, expenses and cards in one place, with charts and summaries for everyday tracking.'],
  ['Leitura de notas fiscais por QR Code, com histórico de compras e pesquisa de produtos para acompanhar os preços pagos no dia a dia. Desenvolvido para notas de consumidor do Rio Grande do Sul.', 'Scan receipt QR codes, keep a purchase history and search products to track the prices you have paid. Designed for consumer receipts issued in Rio Grande do Sul, Brazil.'],
  ['Receitas e despesas', 'Income and expenses'], ['Cartões de crédito', 'Credit cards'], ['Gráficos e resumos', 'Charts and summaries'], ['Leitura de QR Code', 'QR code scanning'], ['Pesquisa de produtos', 'Product search'],
  ['Lançamentos e contas no Zada Finanças', 'Transactions and accounts in Zada Finanças'], ['Gráficos e resumo financeiro no Zada Finanças', 'Charts and financial summary in Zada Finanças'], ['Histórico de notas fiscais no Tá Barato', 'Receipt history in Tá Barato'], ['Leitura de QR Code no Tá Barato', 'QR code scanning in Tá Barato'],
  ['Recursos do Zada Finanças', 'Zada Finanças features'], ['Recursos do Tá Barato', 'Tá Barato features'], ['Zada Finanças no Google Play', 'Zada Finanças on Google Play'], ['Zada Finanças na App Store', 'Zada Finanças on the App Store'], ['Tá Barato no Google Play', 'Tá Barato on Google Play'], ['Tá Barato na App Store', 'Tá Barato on the App Store'],
  ['Tecnologias', 'Technologies'], ['REPERTÓRIO TÉCNICO', 'TECHNICAL BACKGROUND'], ['Tecnologias na', 'Technologies along'], ['minha trajetória.', 'my journey.'],
  ['Linguagens, plataformas e ferramentas que já usei', 'Languages, platforms and tools I have used'], ['em projetos de software, pesquisa e ensino.', 'in software projects, research and teaching.'],
  ['Linguagens', 'Languages'], ['Ferramentas e plataformas', 'Tools and platforms'], ['Pesquisa e experimentação', 'Research and experimentation'],
  ['Na pesquisa: C# e .NET com Kinect; C++ e OpenCV para visão estéreo.', 'In research: C# and .NET with Kinect; C++ and OpenCV for stereo vision.'],
  ['Pular para o conteúdo', 'Skip to content'], ['Sobre', 'About'], ['Atuação', 'What I do'], ['Trajetória', 'Background'], ['Vamos conversar', 'Let’s talk'],
  ['GERENTE P&D · TECNOLOGIA · PROFESSOR', 'R&D MANAGER · TECHNOLOGY · LECTURER'], ['Olá, eu sou o Rafael.', 'Hi, I’m Rafael.'],
  ['Código, contexto', 'Code, context'], ['e', 'and'], ['conhecimento.', 'knowledge.'],
  ['Entre desenvolver sistemas, entender problemas e compartilhar o que aprendo: é assim que construo meu caminho em tecnologia.', 'Building systems, understanding problems and sharing what I learn: that’s how I shape my path in technology.'],
  ['Conheça minha atuação', 'Explore my work'], ['Meu LinkedIn', 'My LinkedIn'], ['Meu GitHub', 'My GitHub'], ['Tecnologia feita de conexões', 'Technology through connections'],
  ['UM OLHAR, VÁRIAS CONEXÕES', 'ONE PERSPECTIVE, MANY CONNECTIONS'], ['DESENVOLVER', 'DEVELOP'], ['Da ideia ao sistema.', 'From idea to system.'], ['ANALISAR', 'ANALYZE'], ['Entender antes de criar.', 'Understand before building.'], ['ENSINAR', 'TEACH'], ['Conhecimento em movimento.', 'Knowledge in motion.'], ['SOFTWARE ↔ PESSOAS', 'SOFTWARE ↔ PEOPLE'],
  ['NA PRÁTICA E NA SALA DE AULA', 'IN PRACTICE AND IN THE CLASSROOM'], ['Gerente P&D', 'R&D Manager'], ['Ensino em tecnologia', 'Teaching technology'], ['Explore a trajetória', 'Explore my background'],
  ['SOBRE MIM', 'ABOUT ME'], ['Tecnologia começa', 'Technology starts'], ['com boas', 'with good'], ['perguntas.', 'questions.'],
  ['Sou Rafael Peiter, Gerente P&D na CantúStange e professor na Universidade de Santa Cruz do Sul. Minha trajetória reúne desenvolvimento de software, análise de sistemas, pesquisa e ensino.', 'I’m Rafael Peiter, R&D Manager at CantúStange and a lecturer at the University of Santa Cruz do Sul. My background brings together software development, systems analysis, research and teaching.'],
  ['Gosto do encontro entre o raciocínio técnico e o contexto de quem usa a tecnologia. Desenvolver, analisar e ensinar são formas complementares de olhar para o mesmo desafio: tornar o complexo mais compreensível.', 'I enjoy connecting technical thinking with the context of the people using technology. Developing, analyzing and teaching offer complementary ways to approach the same challenge: making complexity easier to understand.'],
  ['Entender o problema. Construir a solução. Compartilhar o caminho.', 'Understand the problem. Build the solution. Share the process.'],
  ['MINHA ATUAÇÃO', 'WHAT I DO'], ['Três perspectivas.', 'Three perspectives.'], ['Um mesmo propósito.', 'One shared purpose.'], ['Da lógica do sistema à troca em sala de aula,', 'From system logic to classroom conversations,'], ['conectar conhecimento e aplicação.', 'connecting knowledge and practice.'],
  ['Desenvolvimento', 'Development'], ['Transformar ideias em software', 'Turning ideas into software'], ['CONSTRUIR', 'BUILD'],
  ['A construção de sistemas aproxima lógica, dados e necessidades de uso. É o espaço em que o conhecimento técnico se transforma em ferramentas para o dia a dia.', 'Building systems brings logic, data and user needs together. It’s where technical knowledge becomes tools for everyday work.'],
  ['Banco de dados', 'Databases'], ['Engenharia de software', 'Software engineering'], ['Análise de sistemas', 'Systems analysis'], ['Conectar o problema à solução', 'Connecting problems to solutions'], ['COMPREENDER', 'UNDERSTAND'],
  ['Minha experiência em análise de sistemas e a atuação atual como Gerente P&D na CantúStange conectam as necessidades de negócio às possibilidades do software. Entender o contexto é parte da construção de uma boa solução.', 'My experience in systems analysis and my current role as R&D Manager at CantúStange connect business needs with what software can offer. Understanding the context is part of building a good solution.'],
  ['Sistemas de informação', 'Information systems'], ['Processos', 'Processes'], ['Contexto de negócio', 'Business context'], ['Ensino e tecnologia', 'Teaching and technology'], ['Aprender também é compartilhar', 'Learning also means sharing'], ['MULTIPLICAR', 'SHARE'],
  ['Como professor na UNISC, conecto minha trajetória em computação ao ensino. A sala de aula é um espaço para explorar ideias, fazer perguntas e aproximar conceitos da prática.', 'As a lecturer at UNISC, I bring my computing background into teaching. The classroom is a place to explore ideas, ask questions and connect concepts with practice.'],
  ['Computação', 'Computing'], ['Educação', 'Education'], ['Troca de conhecimento', 'Knowledge sharing'], ['TRAJETÓRIA', 'BACKGROUND'], ['Experiência que', 'Experience that'], ['vira repertório.', 'shapes perspective.'],
  ['Uma caminhada entre a prática profissional, a formação acadêmica e o ensino.', 'A journey through professional practice, academic study and teaching.'], ['Conectar no LinkedIn', 'Connect on LinkedIn'], ['ATUAL', 'CURRENT'], ['Pesquisa e desenvolvimento de software.', 'Software research and development.'],
  ['2024 — ATUAL', '2024 — PRESENT'], ['Professor', 'Lecturer'], ['Universidade de Santa Cruz do Sul · UNISC', 'University of Santa Cruz do Sul · UNISC'], ['Universidade de Santa Cruz do Sul', 'University of Santa Cruz do Sul'], ['Ensino e troca de conhecimento em tecnologia.', 'Teaching and sharing knowledge in technology.'],
  ['Mestrado em Sistemas e Processos Industriais', 'Master’s in Industrial Systems and Processes'], ['Pesquisa em visão estéreo e detecção de obstáculos.', 'Research on stereo vision and obstacle detection.'], ['Graduação em Ciência da Computação', 'Bachelor’s in Computer Science'], ['Trabalho sobre interação entre usuário e computador com Kinect.', 'Research project on human-computer interaction using Kinect.'],
  ['DESDE 2008', 'SINCE 2008'], ['Trajetória em sistemas', 'A background in systems'], ['Experiência com análise e desenvolvimento de sistemas.', 'Experience in systems analysis and development.'], ['BOAS CONVERSAS ABREM CAMINHOS', 'GOOD CONVERSATIONS OPEN DOORS'], ['Vamos conectar', 'Let’s connect'], ['ideias?', 'ideas?'],
  ['Para conversar sobre desenvolvimento, sistemas ou ensino,', 'To talk about development, systems or teaching,'], ['me encontre no LinkedIn. Meu perfil no GitHub também está por aqui.', 'find me on LinkedIn. You can also visit my GitHub profile.'], ['Conversar no LinkedIn', 'Talk on LinkedIn'], ['Visitar meu GitHub', 'Visit my GitHub'],
  ['Código, contexto e conhecimento.', 'Code, context and knowledge.'], ['Voltar ao início', 'Back to top'], ['Sobre este protótipo', 'About this prototype'],
  ['Proposta de texto e identidade visual para Rafael Peiter. Informações de formação e atuação baseadas no', 'Proposed copy and visual identity for Rafael Peiter. Education and background information are based on the'], ['currículo público', 'public CV'], [', coletado do Lattes em setembro de 2025. A', ', retrieved from Lattes in September 2025.'], ['produção acadêmica na UNISC', 'Academic work at UNISC'], ['também foi consultada. A leitura integral do LinkedIn exige login. Datas e textos devem ser revisados pelo titular antes da publicação definitiva.', 'was also consulted. Full access to LinkedIn requires signing in. Dates and copy should be reviewed by the owner before final publication.'],
  ['Rafael Peiter, início', 'Rafael Peiter, home'], ['Navegação principal', 'Main navigation'], ['Preferências da página', 'Page preferences'], ['Idioma', 'Language'], ['CantúStange, abrir site da empresa', 'CantúStange, open company website'], ['Avatar ilustrado de Rafael Peiter, com elementos de desenvolvimento, análise e ensino', 'Illustrated avatar of Rafael Peiter with elements of development, analysis and teaching']
]);
// Mantém os nós e atributos originais para preservar links, ícones e foco.
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const original = node.nodeValue;
  if (!node.parentElement.closest('script, style') && english.has(original.trim())) textNodes.push({ node, original, key: original.trim() });
}
const attributeNodes = [...document.querySelectorAll('[aria-label], [alt]')].flatMap(element => ['aria-label', 'alt'].filter(attribute => english.has(element.getAttribute(attribute))).map(attribute => ({ element, attribute, original: element.getAttribute(attribute) })));
function updateControlLabels() {
  const en = language() === 'en';
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-label', en ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fechar menu' : 'Abrir menu'));
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', en ? (dark ? 'Switch to light mode' : 'Switch to dark mode') : (dark ? 'Alternar para modo claro' : 'Alternar para modo escuro'));
  themeButton.title = themeButton.getAttribute('aria-label');
  themeButton.setAttribute('aria-pressed', String(dark));
}
function setLanguage(value, persist = false) {
  const en = value === 'en';
  root.dataset.language = en ? 'en' : 'pt'; root.lang = en ? 'en' : 'pt-BR';
  textNodes.forEach(({ node, original, key }) => { node.nodeValue = en ? original.replace(key, english.get(key)) : original; });
  attributeNodes.forEach(({ element, attribute, original }) => element.setAttribute(attribute, en ? english.get(original) : original));
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === (en ? 'en' : 'pt'))));
  document.title = en ? 'Rafael Peiter — R&D Manager and lecturer' : 'Rafael Peiter — Gerente P&D e professor';
  document.querySelector('meta[name="description"]').content = en ? 'Rafael Peiter. R&D Manager, developer, systems analyst and lecturer. Technology, software and shared knowledge.' : 'Rafael Peiter. Gerente P&D, desenvolvedor, analista e professor. Tecnologia, software e conhecimento conectados.';
  document.querySelector('meta[property="og:title"]').content = en ? 'Rafael Peiter — Code, context and knowledge' : 'Rafael Peiter — Código, contexto e conhecimento';
  document.querySelector('meta[property="og:description"]').content = en ? 'R&D Manager, developer, systems analyst and lecturer. Explore my work and background in technology.' : 'Gerente P&D, desenvolvedor, analista e professor. Conheça minha atuação e trajetória em tecnologia.';
  updateControlLabels(); if (persist) remember('rp-language', en ? 'en' : 'pt');
}
function setTheme(value, persist = false) {
  root.dataset.theme = value; root.style.colorScheme = value;
  document.querySelector('meta[name="theme-color"]').content = value === 'dark' ? '#0c1521' : '#edf2f6';
  updateControlLabels(); if (persist) { preferredTheme = value; remember('rp-theme', value); }
}
function setMenu(open) { menuButton.setAttribute('aria-expanded', String(open)); navigation.toggleAttribute('data-open', open); updateControlLabels(); }
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
systemTheme.addEventListener('change', event => { if (!preferredTheme) setTheme(event.matches ? 'dark' : 'light'); });
window.addEventListener('storage', event => {
  if (event.key === 'rp-language' || event.key === null) setLanguage(readPreference('rp-language') === 'en' ? 'en' : 'pt');
  if (event.key === 'rp-theme' || event.key === null) {
    preferredTheme = readPreference('rp-theme'); if (!['light', 'dark'].includes(preferredTheme)) preferredTheme = null;
    setTheme(preferredTheme || (systemTheme.matches ? 'dark' : 'light'));
  }
});
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) setMenu(false); });
matchMedia('(max-width: 1100px)').addEventListener('change', () => setMenu(false));
setLanguage(language()); setTheme(root.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
