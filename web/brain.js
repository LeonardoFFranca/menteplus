'use strict';
/* ================= Mente+ · Treino da mente ================= */
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const uniqOpts = (ans, cands, n = 4) => { const o = [ans]; for (const c of shuf(cands)) { if (o.length >= n) break; if (!o.includes(c) && c !== undefined && c !== null && (typeof c !== 'number' || c >= 0)) o.push(c); } let k = 1; while (o.length < n && typeof ans === 'number') { if (!o.includes(ans + k)) o.push(ans + k); k++; } const s = shuf(o); return {opts:s.map(String), a:s.indexOf(ans)}; };

const SKILLS = [
  {id:'mem', ic:'🧠', t:'Memória', c:'#22b573', d:'#178a57', l:'#e3f8ee', desc:'Guardar números, símbolos, palavras e posições.',
   guide:`Memória de trabalho é a "bancada" onde você segura informações por alguns segundos. Ela melhora com estratégia:<br><br><b>1. Agrupe (chunking).</b> Em vez de 9 8 1 4 7 2, pense em <b>981 · 472</b>. Dois blocos são mais fáceis que seis números soltos.<br><br><b>2. Crie imagens.</b> Para lembrar "gato, ponte, vela", imagine um <b>gato atravessando uma ponte segurando uma vela</b>. Quanto mais absurda a cena, melhor ela gruda.<br><br><b>3. Palácio da memória.</b> Coloque cada item em um cômodo da sua casa e "caminhe" por ela para lembrar.<br><br><b>4. Repita em voz baixa</b> enquanto memoriza, e confie no ritmo.<br><br>Dormir bem e revisar em dias diferentes ajuda o cérebro a guardar de verdade.`},
  {id:'log', ic:'🧩', t:'Lógica', c:'#ff9a1f', d:'#d47908', l:'#fff1df', desc:'Sequências, deduções e problemas de raciocínio.',
   guide:`Raciocínio lógico é procurar a <b>regra escondida</b>. Um roteiro que funciona sempre:<br><br><b>1. Olhe as diferenças.</b> Em 3, 6, 11, 18... calcule quanto aumenta: +3, +5, +7. Agora a regra aparece: os saltos crescem de 2 em 2.<br><br><b>2. Teste multiplicações.</b> Se os números crescem rápido demais, provavelmente são ×2 ou ×3.<br><br><b>3. Desenhe.</b> Em problemas de ordem ("Ana chegou antes de Bia..."), escreva uma fila e vá encaixando os nomes.<br><br><b>4. Elimine alternativas.</b> Às vezes é mais fácil provar que três opções estão erradas.<br><br><b>5. Confira o resultado</b> voltando ao enunciado antes de responder.`},
  {id:'ate', ic:'🎯', t:'Atenção', c:'#2c9cf2', d:'#1b78c0', l:'#e2f1fd', desc:'Foco, detalhes e controle de impulsos.',
   guide:`Atenção é escolher <b>no que focar</b> e ignorar o resto.<br><br><b>Varra com método.</b> Para achar o diferente numa grade, olhe linha por linha, como quem lê um livro. Olhar "solto" faz você pular partes.<br><br><b>Efeito Stroop.</b> Quando a palavra AZUL aparece pintada de vermelho, o cérebro quer ler a palavra. Responder a <b>cor</b> exige frear esse impulso, e é exatamente isso que treina o controle da atenção.<br><br><b>Uma coisa por vez.</b> Pare um segundo, leia a pergunta inteira e só então responda.<br><br><b>Conte em grupos</b> de 2 ou 3 para não se perder em contagens.`},
  {id:'cal', ic:'➗', t:'Cálculo mental', c:'#9b5de5', d:'#7a3fc4', l:'#f2eafd', desc:'Contas de cabeça, do básico às porcentagens.',
   guide:`Fazer contas de cabeça é usar <b>atalhos</b>:<br><br><b>Decompor.</b> 23 × 7 = 20 × 7 + 3 × 7 = 140 + 21 = <b>161</b>.<br><br><b>Arredondar e compensar.</b> 49 + 37 = 50 + 37 − 1 = <b>86</b>.<br><br><b>10% é dividir por 10.</b> 10% de 340 = 34. Então 20% = 68 e 5% = 17.<br><br><b>25% é a metade da metade.</b> 25% de 80 → 40 → <b>20</b>.<br><br><b>× 5 é × 10 dividido por 2.</b> 48 × 5 = 480 ÷ 2 = <b>240</b>.<br><br><b>× 11 com dois dígitos:</b> some os dígitos e coloque no meio. 36 × 11 → 3 (3+6) 6 = <b>396</b>.`},
  {id:'ver', ic:'📝', t:'Raciocínio verbal', c:'#f2547d', d:'#c93660', l:'#fde7ed', desc:'Analogias, sinônimos, antônimos e anagramas.',
   guide:`Raciocínio verbal é entender <b>relações entre palavras</b>.<br><br><b>Analogias:</b> descubra a relação do primeiro par e aplique no segundo. "Médico está para hospital" é <b>quem trabalha → onde trabalha</b>. Então professor está para <b>escola</b>.<br><br>Relações comuns: função (tesoura → cortar), parte e todo (página → livro), oposto (quente → frio), causa e efeito (chuva → enchente).<br><br><b>Prefixos ajudam:</b> in-, des- e a- costumam negar (feliz → infeliz).<br><br><b>Anagramas:</b> procure sílabas conhecidas primeiro (CA, TA, LHO, ÇÃO) e monte a partir delas.<br><br>Ler um pouco todo dia é o melhor treino para o vocabulário.`},
  {id:'vel', ic:'⚡', t:'Velocidade', c:'#11a8a0', d:'#0b827c', l:'#ddf6f4', desc:'Decidir rápido e certo, contra o relógio.',
   guide:`Velocidade de processamento é quanto tempo você leva para entender e decidir.<br><br><b>Precisão primeiro.</b> No começo, prefira acertar. A velocidade vem naturalmente com a repetição.<br><br><b>Estime.</b> Para saber se 7 × 8 é maior que 50, nem precisa da conta exata: 7 × 8 ≈ 56.<br><br><b>Não trave.</b> Se não souber, escolha a melhor opção e siga. Ficar parado custa mais caro.<br><br><b>A barra laranja</b> mostra o tempo que falta. Ela fica mais curta a cada nível.`}
];
const SK = Object.fromEntries(SKILLS.map(s => [s.id, s]));
if (!S.brain) S.brain = {};
SKILLS.forEach(s => { if (S.brain[s.id] == null) S.brain[s.id] = 0; });
const skVars = s => `--c:${s.c};--d:${s.d};--l:${s.l};--sec:${s.c};--secD:${s.d};--secL:${s.l}`;

/* ---------- Bancos ---------- */
const PT_WORDS = ['mesa','gato','nuvem','chave','livro','praia','bola','janela','relógio','cavalo','sapato','ponte','flor','espelho','martelo','lâmpada','cobra','vela','piano','escada','maçã','foguete','tambor','camelo','sino','vulcão','pente','barco','queijo','anel','tigre','castelo','garfo','pipa','lua','trem','girafa','cadeado','bússola','violino'];
const ANAGRAMS = ['GATO','CASA','BOLA','LIVRO','PRAIA','PEIXE','ESCOLA','JANELA','CAMISA','CADEIRA','PANELA','ESTRELA','MONTANHA','TELEFONE','BORBOLETA','CHOCOLATE','ABACAXI','CAMINHO','PRIMAVERA','BICICLETA','FLORESTA','MORANGO','CIDADE','SORVETE','TARTARUGA','HOSPITAL','PIRULITO','TOMATE','CAVALO','JARDIM'];
const VERBAL = [
// [nível, pergunta, opções, índice correto, explicação]
[1,'Pássaro está para voar assim como peixe está para...',['nadar','andar','cantar','pular'],0,'Relação: animal → como se move.'],
[1,'Dia está para noite assim como quente está para...',['frio','sol','verão','morno'],0,'Relação de opostos.'],
[1,'Qual é o sinônimo de ALEGRE?',['feliz','triste','bravo','lento'],0,'Alegre e feliz têm o mesmo sentido.'],
[1,'Qual é o contrário de ALTO?',['baixo','grande','largo','forte'],0,'Alto ↔ baixo.'],
[1,'Qual palavra não pertence ao grupo?',['maçã','banana','cenoura','uva'],2,'Cenoura é legume; as outras são frutas.'],
[2,'Livro está para ler assim como música está para...',['ouvir','ver','comer','correr'],0,'Relação: objeto → o que fazemos com ele.'],
[2,'Mão está para luva assim como pé está para...',['sapato','chapéu','anel','cinto'],0,'Relação: parte do corpo → o que a veste.'],
[2,'Qual é o sinônimo de RÁPIDO?',['veloz','devagar','pesado','alto'],0,'Rápido = veloz.'],
[2,'Qual é o contrário de CHEIO?',['vazio','pesado','completo','largo'],0,'Cheio ↔ vazio.'],
[2,'Qual palavra não pertence ao grupo?',['cachorro','gato','águia','cavalo'],2,'A águia é ave; os outros são mamíferos.'],
[3,'Médico está para hospital assim como professor está para...',['escola','giz','aluno','livro'],0,'Relação: profissional → local de trabalho.'],
[3,'Filhote está para cachorro assim como girino está para...',['sapo','peixe','cobra','pato'],0,'O girino é o filhote do sapo.'],
[3,'Qual é o sinônimo de COMEÇAR?',['iniciar','terminar','parar','esperar'],0,'Começar = iniciar.'],
[3,'Qual é o contrário de ACEITAR?',['recusar','receber','pegar','querer'],0,'Aceitar ↔ recusar.'],
[3,'Qual palavra não pertence ao grupo?',['violão','piano','flauta','pincel'],3,'Pincel não é instrumento musical.'],
[4,'Pintor está para pincel assim como escritor está para...',['caneta','tela','tinta','livraria'],0,'Relação: profissional → ferramenta.'],
[4,'Qual é o sinônimo de ENORME?',['gigantesco','minúsculo','médio','estreito'],0,'Enorme = gigantesco.'],
[4,'Qual é o contrário de GENEROSO?',['mesquinho','bondoso','rico','alegre'],0,'Generoso ↔ mesquinho.'],
[4,'Qual palavra não pertence ao grupo?',['Brasil','Argentina','Lisboa','Chile'],2,'Lisboa é uma cidade; os outros são países.'],
[5,'Sede está para água assim como fome está para...',['comida','sono','frio','cansaço'],0,'Relação: necessidade → o que a satisfaz.'],
[5,'Termômetro está para temperatura assim como balança está para...',['peso','altura','tempo','velocidade'],0,'Relação: instrumento → o que mede.'],
[5,'Qual é o sinônimo de CORAJOSO?',['destemido','medroso','tímido','cansado'],0,'Corajoso = destemido.'],
[5,'Qual é o contrário de ABUNDANTE?',['escasso','farto','enorme','comum'],0,'Abundante ↔ escasso.'],
[5,'Qual palavra não pertence ao grupo?',['quadrado','triângulo','cubo','círculo'],2,'O cubo é tridimensional; os outros são figuras planas.'],
[6,'Arquipélago está para ilha assim como constelação está para...',['estrela','planeta','galáxia','céu'],0,'Relação: conjunto → elemento.'],
[6,'Qual é o sinônimo de EFÊMERO?',['passageiro','eterno','pesado','brilhante'],0,'Efêmero = que dura pouco.'],
[6,'Qual é o contrário de OTIMISTA?',['pessimista','realista','alegre','sonhador'],0,'Otimista ↔ pessimista.'],
[6,'Qual palavra não pertence ao grupo?',['Mercúrio','Vênus','Lua','Marte'],2,'A Lua é um satélite, não um planeta.'],
[7,'Efêmero está para duradouro assim como raro está para...',['comum','precioso','escasso','único'],0,'Relação de opostos.'],
[7,'Qual é o sinônimo de PERSPICAZ?',['sagaz','ingênuo','lento','distraído'],0,'Perspicaz = sagaz, que percebe rápido.'],
[7,'Qual é o contrário de EFÊMERO?',['duradouro','breve','rápido','leve'],0,'Efêmero ↔ duradouro.'],
[7,'Qual palavra não pertence ao grupo?',['baleia','tubarão','golfinho','foca'],1,'O tubarão é peixe; os outros são mamíferos.'],
[8,'Prólogo está para livro assim como prelúdio está para...',['música','filme','teatro','poema'],0,'Relação: introdução → obra.'],
[8,'Qual é o sinônimo de PROLIXO?',['verboso','conciso','calado','breve'],0,'Prolixo = que fala ou escreve demais.'],
[8,'Qual é o contrário de PROLIXO?',['conciso','longo','confuso','verboso'],0,'Prolixo ↔ conciso.'],
[8,'Qual palavra não pertence ao grupo?',['sete','onze','treze','quinze'],3,'Quinze não é número primo (3 × 5).'],
[9,'Ourives está para ouro assim como oleiro está para...',['barro','óleo','madeira','ferro'],0,'Relação: artesão → material.'],
[9,'Qual é o sinônimo de INEXORÁVEL?',['implacável','flexível','gentil','incerto'],0,'Inexorável = que não se pode deter.'],
[9,'Qual é o contrário de ALTRUÍSTA?',['egoísta','generoso','humilde','solidário'],0,'Altruísta ↔ egoísta.'],
[9,'Qual palavra não pertence ao grupo?',['tomate','abacate','berinjela','batata'],3,'Batata é tubérculo; os outros são frutos (botanicamente).'],
[10,'Míope está para longe assim como hipermetrope está para...',['perto','longe','escuro','cores'],0,'Relação: problema de visão → distância que fica embaçada.'],
[10,'Qual é o sinônimo de IDIOSSINCRASIA?',['peculiaridade','semelhança','regra','multidão'],0,'Idiossincrasia = traço próprio de alguém.'],
[10,'Qual é o contrário de EXÓGENO?',['endógeno','externo','estranho','alheio'],0,'Exógeno (de fora) ↔ endógeno (de dentro).'],
[10,'Qual palavra não pertence ao grupo?',['haicai','soneto','romance','ode'],2,'Romance é prosa; os outros são formas de poema.']
];
const MORE_LOGIC = [
{d:3,q:'Se hoje é quarta-feira, que dia será daqui a 10 dias?',opts:['Sábado','Sexta-feira','Domingo','Quinta-feira'],a:0,why:'10 dias = 1 semana + 3 dias. Quarta + 3 = sábado.'},
{d:4,q:'Todos os bancos estão fechados no domingo. Hoje o banco está aberto. Então hoje...',opts:['Não é domingo','É sábado','É segunda','É feriado'],a:0,why:'Se fosse domingo, estaria fechado.'},
{d:5,q:'Um caracol sobe 3 m de dia e escorrega 2 m à noite. Em quantos dias sai de um poço de 10 m?',opts:['8 dias','10 dias','7 dias','9 dias'],a:0,why:'Em 7 dias chega a 7 m; no 8º dia sobe 3 m e sai antes de escorregar.'},
{d:6,q:'Uma bola e um taco custam R$ 110. O taco custa R$ 100 a mais que a bola. Quanto custa a bola?',opts:['R$ 5','R$ 10','R$ 15','R$ 1'],a:0,why:'Bola = x, taco = x + 100. 2x + 100 = 110 → x = 5.'},
{d:7,q:'Em uma corrida, você ultrapassa o segundo colocado. Em que posição você fica?',opts:['Segundo','Primeiro','Terceiro','Depende'],a:0,why:'Você toma o lugar de quem ultrapassou: o segundo.'},
{d:8,q:'Se 3 gatos pegam 3 ratos em 3 minutos, quantos gatos pegam 100 ratos em 100 minutos?',opts:['3','100','33','30'],a:0,why:'Cada gato pega 1 rato a cada 3 minutos; em 100 minutos 3 gatos pegam 100 ratos.'},
{d:9,q:'Quantas vezes o algarismo 1 aparece de 1 a 20?',opts:['12','11','10','2'],a:0,why:'1, 10, 12–19 (8), mais 11 conta duas vezes: 1 + 1 + 2 + 8 = 12.'},
{d:10,q:'Um lago tem uma mancha de plantas que dobra de tamanho todo dia. Em 30 dias cobre o lago. Em que dia cobria metade?',opts:['Dia 29','Dia 15','Dia 20','Dia 28'],a:0,why:'Se dobra todo dia, no dia anterior ao total cobria a metade.'}
];

/* ---------- Geradores por habilidade ---------- */
const BG = {};
// MEMÓRIA
BG.symSeq = d => { const sym = ['🔵','🟡','🟣','🟢','🔴','🟠','⚫','🟤'].slice(0, Math.min(8, 4 + Math.floor(d / 2))); const n = Math.min(9, 3 + Math.floor(d / 1.6)); const seq = Array.from({length:n}, () => rnd(sym)); const opts = [seq.join('')]; let g = 0; while (opts.length < 3 && g++ < 50) { const v = seq.slice(); const a = ri(0, n - 1), b = ri(0, n - 1); if (Math.random() < .5 && a !== b && v[a] !== v[b]) [v[a], v[b]] = [v[b], v[a]]; else v[a] = rnd(sym.filter(x => x !== v[a])); const j = v.join(''); if (!opts.includes(j)) opts.push(j); } const o = shuf(opts); return [{k:'numshow', title:'Memorize a sequência', show:`<div class="seq">${seq.join('')}</div>`, ms:1000 + n * 650}, {k:'mcq', kind:'🧠 Memória', title:'Qual era a sequência?', opts:o, a:o.indexOf(seq.join(''))}]; };
BG.digits = d => { const n = Math.min(10, 3 + Math.floor(d * .65)); const back = d >= 6 && Math.random() < .5; let s = ''; while (s.length < n) { const c = String(ri(0, 9)); if (s.slice(-1) !== c) s += c; } const ans = back ? s.split('').reverse().join('') : s; return [{k:'numshow', title:'Memorize os números', show:`<div class="digits">${s.split('').join(' ')}</div>`, ms:900 + n * 700}, {k:'calc', kind:'🧠 Memória', title:back ? 'Digite os números de TRÁS PARA FRENTE' : 'Digite os números na mesma ordem', a:ans, why:n >= 6 ? 'Dica: agrupe de 3 em 3 para memorizar (ex.: ' + s.slice(0, 3) + ' · ' + s.slice(3, 6) + '...).' : ''}]; };
BG.words = d => { const n = Math.min(10, 3 + Math.floor(d / 1.5)); const list = shuf(PT_WORDS).slice(0, n); const rest = PT_WORDS.filter(w => !list.includes(w)); const yes = rnd(list); const o1 = shuf([yes, ...shuf(rest).slice(0, 3)]); const no = rnd(rest.filter(w => !o1.includes(w))); const o2 = shuf([no, ...shuf(list).slice(0, 3)]); return [{k:'numshow', title:'Memorize as palavras', show:`<div class="wlist">${list.map(w => `<span>${w}</span>`).join('')}</div>`, ms:1500 + n * 1100}, {k:'mcq', kind:'🧠 Memória', title:'Qual destas palavras ESTAVA na lista?', opts:o1, a:o1.indexOf(yes)}, {k:'mcq', kind:'🧠 Memória', title:'Qual destas NÃO estava na lista?', opts:o2, a:o2.indexOf(no), why:'A lista era: ' + list.join(', ') + '.'}]; };
BG.pairs = d => [{k:'memgrid', pairs:Math.min(8, 3 + Math.floor(d / 2))}];
BG.corsi = d => { const size = d >= 5 ? 4 : 3; const n = Math.min(8, 3 + Math.floor(d / 2)); const seq = []; while (seq.length < n) { const c = ri(0, size * size - 1); if (seq[seq.length - 1] !== c) seq.push(c); } return [{k:'corsi', size, seq}]; };
// LÓGICA
BG.seqNum = d => {
  const types = ['arit']; if (d >= 2) types.push('arit2'); if (d >= 3) types.push('geo'); if (d >= 4) types.push('alt'); if (d >= 5) types.push('sq', 'incr'); if (d >= 6) types.push('fib'); if (d >= 7) types.push('mul1', 'inter'); if (d >= 9) types.push('cube');
  const t = rnd(types.slice(-4)); let s = [], why = '';
  if (t === 'arit' || t === 'arit2') { const a = ri(1, 12), b = t === 'arit' ? ri(2, 5) : -ri(2, 9) * (Math.random() < .5 ? -1 : 1); const a0 = b < 0 ? a + 60 : a; s = [0, 1, 2, 3, 4, 5].map(i => a0 + b * i); why = `${b > 0 ? 'Some' : 'Subtraia'} ${Math.abs(b)} a cada passo.`; }
  else if (t === 'geo') { const a = ri(1, 4), r = rnd([2, 3]); s = [0, 1, 2, 3, 4].map(i => a * r ** i); why = `Cada número é o anterior × ${r}.`; }
  else if (t === 'alt') { const a = ri(10, 30), p = ri(3, 7), m = ri(1, p - 1); s = [a]; for (let i = 1; i < 7; i++) s.push(s[i - 1] + (i % 2 ? p : -m)); why = `Alterna: +${p}, −${m}, +${p}, −${m}...`; }
  else if (t === 'sq') { const n = ri(1, 5); s = [0, 1, 2, 3, 4, 5].map(i => (n + i) ** 2); why = `Quadrados: ${n}², ${n + 1}², ${n + 2}²...`; }
  else if (t === 'incr') { const a = ri(1, 10), k = ri(1, 3); s = [a]; for (let i = 1; i < 6; i++) s.push(s[i - 1] + k * i); why = `As diferenças crescem: +${k}, +${2 * k}, +${3 * k}...`; }
  else if (t === 'fib') { let a = ri(1, 4), b = ri(2, 6); s = [a, b]; while (s.length < 7) s.push(s[s.length - 1] + s[s.length - 2]); why = 'Cada número é a soma dos dois anteriores.'; }
  else if (t === 'mul1') { let a = ri(1, 4); s = [a]; const m = rnd([2, 3]), p = rnd([1, -1, 2]); while (s.length < 5) s.push(s[s.length - 1] * m + p); why = `Multiplique por ${m} e ${p > 0 ? 'some' : 'subtraia'} ${Math.abs(p)}.`; }
  else if (t === 'inter') { const a = ri(1, 5), b = ri(20, 40), p = ri(2, 4), q = ri(2, 5); s = []; for (let i = 0; i < 7; i++) s.push(i % 2 ? b - q * (i >> 1) : a + p * (i >> 1)); why = `São duas sequências intercaladas: uma sobe ${p}, a outra desce ${q}.`; }
  else { const n = ri(1, 3); s = [0, 1, 2, 3, 4].map(i => (n + i) ** 3); why = 'Cubos: n × n × n.'; }
  const ans = s.pop(); const diff = Math.abs(s[s.length - 1] - s[s.length - 2]) || 2;
  const {opts, a} = uniqOpts(ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + diff, ans - diff, ans + 10]);
  return [{k:'mcq', kind:'🧩 Lógica', title:'Qual número vem a seguir?', q:s.join(',  ') + ',  ?', opts, a, why}];
};
BG.order = d => {
  const n = Math.min(6, 3 + Math.floor(d / 3)); const names = shuf(['Ana', 'Bia', 'Caio', 'Davi', 'Eva', 'Fábio', 'Gil', 'Hugo']).slice(0, n);
  const clues = shuf(names.slice(1).map((x, i) => `${names[i]} chegou antes de ${x}.`));
  const qs = [['Quem chegou primeiro?', 0], ['Quem chegou por último?', n - 1]]; if (n >= 4) qs.push(['Quem chegou em segundo lugar?', 1]); if (n >= 5) qs.push(['Quem chegou em terceiro lugar?', 2]);
  const [qq, pos] = rnd(qs); const o = shuf(names.slice(0, 4).includes(names[pos]) ? names.slice(0, 4) : [names[pos], ...shuf(names.filter(x => x !== names[pos])).slice(0, 3)]);
  return [{k:'mcq', kind:'🧩 Lógica', title:qq, q:clues.join('  '), opts:o, a:o.indexOf(names[pos]), why:'Ordem de chegada: ' + names.join(' → ') + '.'}];
};
BG.age = d => { const j = ri(4, 18), k = d >= 6 ? rnd([2, 3, 4]) : rnd([2, 3]); const sum = j * (k + 1); const word = {2:'o dobro', 3:'o triplo', 4:'o quádruplo'}[k]; const {opts, a} = uniqOpts(j, [j + 2, j - 2, Math.round(sum / 2), j * k, j + 1]); return [{k:'mcq', kind:'🧩 Lógica', title:'Problema', q:`Pedro tem ${word} da idade de João. Juntos eles têm ${sum} anos. Quantos anos tem João?`, opts:opts.map(x => x + ' anos'), a, why:`João = x e Pedro = ${k}x. Então ${k + 1}x = ${sum}, logo x = ${j}.`}]; };
BG.puzzle = d => { const pool = PUZZLES.map(p => Object.assign({d:3}, p)).concat(MORE_LOGIC).filter(p => p.d <= d + 1); const p = rnd(pool.length ? pool : PUZZLES); return [{k:'mcq', kind:'🧩 Lógica', title:'Desafio', q:p.q, opts:p.opts, a:p.a, why:p.why}]; };
// ATENÇÃO
const ODD = [['🙂', '🙃'], ['6', '9'], ['b', 'd'], ['O', 'Q'], ['p', 'q'], ['M', 'N'], ['8', 'B'], ['E', 'F'], ['5', 'S'], ['🍏', '🍎'], ['⌛', '⏳'], ['🌕', '🌝'], ['🐶', '🐕'], ['Z', '2'], ['u', 'n'], ['☁️', '🌥️'], ['🔷', '🔹'], ['W', 'V']];
BG.odd = (d, limit) => { const cols = Math.min(8, 3 + Math.floor(d / 1.5)); const rows = cols + (d >= 4 ? 1 : 0); const pair = shuf(rnd(ODD.slice(0, 6 + d))); const n = cols * rows, a = ri(0, n - 1); return [{k:'oddgrid', kind:'🎯 Atenção', cols, cells:Array.from({length:n}, (_, i) => i === a ? pair[1] : pair[0]), a, limit}]; };
const COLORS = [['VERMELHO', '#e53935'], ['AZUL', '#1e88e5'], ['VERDE', '#2e9d4a'], ['AMARELO', '#f2b100'], ['ROXO', '#8e24aa'], ['LARANJA', '#fb8c00']];
BG.stroop = (d, limit) => { const cs = COLORS.slice(0, Math.min(6, 3 + Math.floor(d / 3))); const w = rnd(cs), ink = rnd(cs.filter(c => c !== w)); const askWord = d >= 6 && Math.random() < .35; const ans = askWord ? w[0] : ink[0], trap = askWord ? ink[0] : w[0]; const o = [ans, trap, ...shuf(cs.map(c => c[0]).filter(x => x !== ans && x !== trap))].slice(0, 4); const oo = shuf(o); return [{k:'mcq', kind:'🎯 Atenção', title:askWord ? 'Toque no que está ESCRITO' : 'Toque na COR da tinta', qhtml:`<div class="stroop" style="color:${ink[1]}">${w[0]}</div>`, opts:oo.map(x => x[0] + x.slice(1).toLowerCase()), a:oo.indexOf(ans), limit, why:askWord ? 'Desta vez valia a palavra, não a cor.' : 'Ignore a palavra: vale a cor da tinta.'}]; };
BG.count = (d, limit) => { const syms = shuf(['🔺', '⭐', '🔷', '🟢', '❤️', '🌙']).slice(0, Math.min(5, 2 + Math.floor(d / 3))); const n = Math.min(36, 8 + d * 2); const cells = Array.from({length:n}, () => rnd(syms)); const t = rnd(syms); const ans = cells.filter(c => c === t).length; const {opts, a} = uniqOpts(ans, [ans + 1, ans - 1, ans + 2, ans - 2]); return [{k:'mcq', kind:'🎯 Atenção', title:`Quantos ${t} há?`, qhtml:`<div class="cgrid">${cells.map(c => `<span>${c}</span>`).join('')}</div>`, opts, a, limit, why:'Dica: conte linha por linha, em grupos de 2 ou 3.'}]; };
// CÁLCULO
function mathQ(d) {
  let q, a, why = '';
  const t = rnd([[1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]][d - 1]);
  switch (t) {
    case 1: { const x = ri(1, 10), y = ri(1, 10); q = `${x} + ${y}`; a = x + y; break; }
    case 2: { if (Math.random() < .5) { const x = ri(10, 40), y = ri(2, 19); q = `${x} + ${y}`; a = x + y; } else { const x = ri(15, 50), y = ri(2, x - 5); q = `${x} − ${y}`; a = x - y; } break; }
    case 3: { if (Math.random() < .5) { const x = ri(21, 79), y = ri(11, 99 - x); q = `${x} + ${y}`; a = x + y; why = `Some as dezenas e depois as unidades: ${x - x % 10} + ${y - y % 10} = ${x - x % 10 + y - y % 10}, mais ${x % 10} + ${y % 10}.`; } else { const x = ri(40, 99), y = ri(12, x - 10); q = `${x} − ${y}`; a = x - y; why = `Tire primeiro ${y - y % 10} e depois ${y % 10}.`; } break; }
    case 4: { const x = ri(2, 9), y = ri(2, 9); q = `${x} × ${y}`; a = x * y; break; }
    case 5: { if (Math.random() < .55) { const x = ri(12, 39), y = ri(3, 9); q = `${x} × ${y}`; a = x * y; why = `${x} × ${y} = ${x - x % 10} × ${y} + ${x % 10} × ${y} = ${(x - x % 10) * y} + ${(x % 10) * y}.`; } else { const y = ri(3, 9), r = ri(4, 15); q = `${y * r} ÷ ${y}`; a = r; why = `Pense: ${y} × ? = ${y * r}.`; } break; }
    case 6: { const p = rnd([10, 20, 25, 50]), base = rnd([40, 60, 80, 120, 200, 240, 360, 400, 500]); q = `${p}% de ${base}`; a = base * p / 100; why = p === 10 ? `10% é dividir por 10.` : p === 20 ? `10% de ${base} = ${base / 10}; dobre: ${a}.` : p === 25 ? `25% é a metade da metade: ${base / 2} → ${a}.` : `50% é a metade.`; break; }
    case 7: { if (Math.random() < .5) { const x = ri(3, 9), y = ri(3, 9), z = ri(5, 30); q = `${x} × ${y} + ${z}`; a = x * y + z; why = 'Multiplicação antes da soma.'; } else { const x = ri(11, 15); q = `${x}²`; a = x * x; why = `${x}² = ${x} × ${x}.`; } break; }
    case 8: { if (Math.random() < .5) { const x = ri(11, 19), y = ri(11, 19); q = `${x} × ${y}`; a = x * y; why = `${x} × ${y} = ${x} × 10 + ${x} × ${y - 10} = ${x * 10} + ${x * (y - 10)}.`; } else { const p = rnd([15, 30, 75]), base = rnd([40, 80, 120, 200, 400]); q = `${p}% de ${base}`; a = base * p / 100; why = p === 15 ? `10% + 5%: ${base / 10} + ${base / 20}.` : p === 30 ? `10% × 3: ${base / 10} × 3.` : `75% = 50% + 25%: ${base / 2} + ${base / 4}.`; } break; }
    case 9: { if (Math.random() < .5) { const [n, m] = rnd([[2, 3], [3, 4], [3, 5], [2, 5], [4, 5]]); const base = m * ri(4, 20); q = `${n}/${m} de ${base}`; a = base / m * n; why = `Divida por ${m} (${base / m}) e multiplique por ${n}.`; } else { const x = ri(5, 20), y = ri(2, 9), z = ri(2, 9); q = `${x} + ${y} × ${z}`; a = x + y * z; why = `Primeiro ${y} × ${z} = ${y * z}, depois some ${x}.`; } break; }
    default: { const r = ri(0, 2); if (r === 0) { const x = ri(101, 299), y = ri(3, 8); q = `${x} × ${y}`; a = x * y; why = `${x - x % 100} × ${y} + ${x % 100} × ${y}.`; } else if (r === 1) { const x = ri(2, 9), y = ri(2, 9), z = ri(2, 6), w = ri(1, 15); q = `(${x} + ${y}) × ${z} − ${w}`; a = (x + y) * z - w; why = `Parênteses primeiro: ${x + y} × ${z} = ${(x + y) * z}, menos ${w}.`; } else { const base = rnd([80, 120, 150, 200, 250]), p = rnd([10, 20, 30]); q = `${base} + ${p}%`; a = base * (100 + p) / 100; why = `${p}% de ${base} = ${base * p / 100}; some ao valor.`; } }
  }
  return {q, a};
}
BG.math = d => { const m = mathQ(d); return [{k:'calc', kind:'➗ Cálculo', title:'Quanto é?', expr:m.q, a:String(m.a), why:m.why}]; };
BG.compare = (d, limit) => { const e = () => { const m = mathQ(Math.max(1, Math.min(8, d))); return m; }; let A = e(), B = e(), g = 0; while (A.a === B.a && g++ < 10) B = e(); return [{k:'mcq', kind:'⚡ Velocidade', title:'Qual resultado é MAIOR?', opts:[A.q, B.q], a:A.a > B.a ? 0 : 1, limit, why:`${A.q} = ${A.a}  ·  ${B.q} = ${B.a}`, big:true}]; };
BG.quick = (d, limit) => { const m = mathQ(Math.max(1, d - 2)); const {opts, a} = uniqOpts(m.a, [m.a + 1, m.a - 1, m.a + 10, m.a - 10, m.a + 2]); return [{k:'mcq', kind:'⚡ Velocidade', title:'Rápido: quanto é?', q:m.q, opts, a, limit, big:true}]; };
// VERBAL
BG.verbal = d => { const pool = VERBAL.filter(v => v[0] <= d && v[0] >= d - 2); const v = rnd(pool.length ? pool : VERBAL); const o = shuf(v[2].map((x, i) => [x, i])); return [{k:'mcq', kind:'📝 Verbal', title:v[1], opts:o.map(x => x[0]), a:o.findIndex(x => x[1] === v[3]), why:v[4]}]; };
BG.anagram = d => { const len = 4 + Math.floor(d / 1.7); let pool = ANAGRAMS.filter(w => Math.abs(w.length - len) <= 1); if (pool.length < 4) pool = ANAGRAMS; const w = rnd(pool); let sc; do { sc = shuf(w.split('')).join(''); } while (sc === w); const o = shuf([w, ...shuf(pool.filter(x => x !== w)).slice(0, 3)]); return [{k:'mcq', kind:'📝 Verbal', title:'Que palavra se forma com estas letras?', qhtml:`<div class="letters">${sc.split('').map(c => `<span>${c}</span>`).join('')}</div>`, opts:o, a:o.indexOf(w), why:`As letras formam ${w}.`}]; };

function genBrain(id, d) {
  const it = [], add = g => it.push(...g);
  const lim = d >= 5 ? Math.max(4, 10 - d * .6) : null;
  if (id === 'mem') { add(BG.symSeq(d)); add(BG.digits(d)); add(BG.pairs(d)); add(BG.words(d)); add(BG.corsi(d)); add(BG.digits(d)); if (d >= 3) add(BG.corsi(d)); }
  else if (id === 'log') { add(BG.seqNum(d)); add(BG.order(d)); add(BG.seqNum(d)); add(BG.puzzle(d)); add(BG.seqNum(d)); if (d >= 3) add(BG.age(d)); else add(BG.seqNum(d)); add(BG.order(d)); add(BG.seqNum(d)); }
  else if (id === 'ate') { add(BG.odd(d)); add(BG.stroop(d, lim)); add(BG.count(d)); add(BG.odd(d)); add(BG.stroop(d, lim)); add(BG.odd(d)); add(BG.count(d)); add(BG.stroop(d, lim)); }
  else if (id === 'cal') { for (let i = 0; i < 10; i++) add(BG.math(Math.max(1, d - (i < 3 ? 1 : 0)))); }
  else if (id === 'ver') { for (let i = 0; i < 9; i++) add(i % 3 === 2 ? BG.anagram(d) : BG.verbal(d)); }
  else { const L2 = Math.max(2.5, 8 - d * .55); for (let i = 0; i < 10; i++) add([BG.compare, BG.quick, BG.stroop, BG.odd][i % 4](d, L2)); }
  return it;
}

/* ---------- Telas ---------- */
let bskill = null;
const bLevel = id => S.brain[id] || 0;
const totalBrain = () => SKILLS.reduce((t, s) => t + bLevel(s.id), 0);
function brainHTML() {
  if (bskill) return skillPathHTML(SK[bskill]);
  return `${topbar()}<div class="page"><h1>Treine sua mente</h1><p class="sub">Exercícios curtos que ficam mais difíceis conforme você evolui. Leia as técnicas: elas fazem toda a diferença.</p>
  <div class="daily">${mascot('happy')}<div style="flex:1"><small>Treino do dia</small><h2>3 habilidades, ~3 minutos</h2><button class="btn" style="background:#fff;color:#178a57;box-shadow:0 4px 0 #0002" onclick="startDaily()">Começar treino</button></div></div>
  <div class="skill-grid">${SKILLS.map(s => `<button class="skill" style="${skVars(s)}" onclick="openSkill('${s.id}')"><div class="si">${s.ic}</div><strong>${s.t}</strong><small>Nível ${Math.min(10, bLevel(s.id) + 1)} de 10</small><div class="pbar"><div style="width:${bLevel(s.id) * 10}%"></div></div></button>`).join('')}</div>
  <div class="grp-title">Jogos livres</div><div class="tile-list"><button class="ptile" onclick="startMemory()"><div class="em" style="background:#e3f8ee">🃏</div><div><strong>Jogo da memória</strong><small>8 pares${S.best ? ' · recorde: ' + S.best + ' tentativas' : ''}</small></div><span class="chev">›</span></button><button class="ptile" onclick="startLogic()"><div class="em" style="background:#fff1df">💡</div><div><strong>Charadas de lógica</strong><small>Desafios clássicos para pensar</small></div><span class="chev">›</span></button></div>
  <p style="color:#a0a0b0;font-weight:700;font-size:13px;line-height:1.5;text-align:center;margin-top:22px">Os treinos melhoram principalmente as habilidades praticadas. Sono, leitura e atividade física também fortalecem o cérebro.</p></div>`;
}
function openSkill(id) { bskill = id; SFX.tap(); render(); window.scrollTo(0, 0); setTimeout(() => { const n = document.querySelector('.node.current'); if (n) n.scrollIntoView({block:'center', behavior:'smooth'}); }, 80); }
const LVL_NAMES = ['Aquecimento', 'Iniciante', 'Básico', 'Em forma', 'Intermediário', 'Afiado', 'Avançado', 'Expert', 'Mestre', 'Lenda'];
function skillPathHTML(s) {
  const lv = bLevel(s.id);
  let h = `<div class="topbar"><button class="xbtn" style="font-size:24px" onclick="bskill=null;render()">←</button><div style="font-weight:900;font-size:18px">${s.ic} ${s.t}</div><div class="chip xp">⚡ ${S.xp}</div></div>
  <div class="section-head" style="${skVars(s)}"><small>Nível ${Math.min(10, lv + 1)} de 10 · ${LVL_NAMES[Math.min(9, lv)]}</small><h2>${s.t}</h2><p>${s.desc}</p><div class="bar"><div style="width:${lv * 10}%"></div></div><button class="jump" onclick="openSkillGuide('${s.id}')">📖 Ver técnicas</button></div><div style="${skVars(s)}"><div class="path">`;
  for (let i = 0; i < 10; i++) {
    const done = i < lv, open = i <= lv, cur = i === Math.min(lv, 9) && lv < 10;
    h += `<div class="node-wrap" style="transform:translateX(${OFF[i % 8]}px)">${cur ? `<div class="start-tip">${i === 0 ? 'Começar' : 'Continuar'}</div>` : ''}<button class="node ${done ? 'done' : !open ? 'locked' : ''} ${cur ? 'current' : ''}" onclick="tapLevel('${s.id}',${i})"><span class="ic">${done ? '✔️' : i === 9 ? '👑' : s.ic}</span></button><div class="node-label">Nível ${i + 1}</div></div>`;
  }
  h += `<div class="path-mascot" style="left:calc(50% - 188px);top:120px">${mascot('think')}</div></div></div>`;
  if (lv >= 10) h += `<div class="path-end">${mascot('wow').replace('class="mas"', 'class="mas" style="width:110px"')}<br>Você zerou ${s.t}! 👑<br>Continue jogando qualquer nível para manter a forma.</div>`;
  return h;
}
function openSkillGuide(id) { const s = SK[id]; L = null; SAYS = []; showOverlay(`<div class="lhead"><button class="xbtn" onclick="closeOverlay()">✕</button><div style="flex:1;font-weight:900;color:var(--ink2);text-transform:uppercase;letter-spacing:.8px;font-size:14px">Técnicas</div></div><div class="lbody"><div class="guide" style="${skVars(s)}"><div class="hero">${mascot('happy')}<div><small>${s.ic} Treino da mente</small><h2>${s.t}</h2></div></div><div class="txt">${s.guide}</div></div></div><div class="lfoot"><div class="inner"><button class="btn sec" style="${skVars(s)}" onclick="closeOverlay()">Entendi!</button></div></div>`); }
function tapLevel(id, i) {
  const s = SK[id]; if (i > bLevel(id)) { SFX.bad(); toast('🔒 Passe o nível anterior para liberar este'); return; }
  SFX.tap();
  sheet(`<div style="${skVars(s)}"><div style="font-size:54px">${i === 9 ? '👑' : s.ic}</div><h3>${s.t} · Nível ${i + 1}</h3><p>${LVL_NAMES[i]}. ${i < bLevel(id) ? 'Você já passou este nível. Jogue de novo para treinar!' : 'Acerte pelo menos 60% para liberar o próximo nível.'}${!S.bguides || !S.bguides[id] ? '<br><br>💡 Antes de começar, veja as técnicas. Leva 1 minuto!' : ''}</p><button class="btn sec" onclick="closeSheet();startLevel('${id}',${i})">Começar · +15 XP</button>${!S.bguides || !S.bguides[id] ? `<button class="link" onclick="closeSheet();S.bguides=S.bguides||{};S.bguides['${id}']=true;save();openSkillGuide('${id}')">Ver as técnicas</button>` : ''}</div>`);
}
function startLevel(id, i) {
  const s = SK[id];
  runLesson({items:genBrain(id, i + 1), title:s.t, xp:15, noRetry:true, s:0, onDone(acc) {
    const pass = acc >= 60; let msg;
    if (pass && i === bLevel(id)) { S.brain[id] = i + 1; msg = {title:i === 9 ? `${s.t} zerada! 👑` : `Nível ${i + 1} concluído!`, phrase:i === 9 ? 'Você chegou ao topo desta habilidade. Incrível!' : `Nível ${i + 2} liberado. Ele vai ser um pouco mais difícil.`}; }
    else if (pass) msg = {title:'Treino concluído!', phrase:'Mandou bem! Sua mente agradece.'};
    else msg = {title:'Quase lá!', phrase:'Você precisa de 60% de acertos para liberar o próximo nível. Leia as técnicas e tente de novo, você consegue!', mood:'wow'};
    return msg;
  }});
}
function startDaily() {
  const ids = shuf(SKILLS.map(s => s.id)).slice(0, 3); let it = [];
  ids.forEach(id => { const g = genBrain(id, Math.min(10, bLevel(id) + 1)); let take = [], graded = 0; for (const e of g) { take.push(e); if (!ungraded(e.k)) graded++; if (graded >= 3) break; } it = it.concat(take); });
  runLesson({items:it, title:'Treino do dia', xp:20, noRetry:true, onDone:acc => ({title:'Treino do dia concluído! 🎉', phrase:acc >= 80 ? 'Sua mente está afiada hoje!' : 'Ótimo exercício! Volte amanhã para outro treino diferente.'})});
}
function brainProfileHTML() { return `<div class="grp-title">Treino da mente</div><div class="card">${SKILLS.map(s => `<div class="sec-row" style="--c:${s.c}"><div class="r1">${s.ic} ${s.t}<span>Nível ${bLevel(s.id)}/10</span></div><div class="pbar"><div style="width:${bLevel(s.id) * 10}%"></div></div></div>`).join('')}</div>`; }

/* ---------- Novos tipos de exercício ---------- */
R.numshow = ex => `${kindTag('🧠 Memorize')}<div class="qtitle">${ex.title}</div><div class="timer"><div style="animation-duration:${ex.ms}ms"></div></div><div class="card showbox">${ex.show}</div>`;
R.calc = ex => { L.val = ''; return `${ex.kind ? kindTag(ex.kind) : ''}<div class="qtitle">${ex.title}</div>${ex.expr ? `<div class="expr">${esc(ex.expr)} = ?</div>` : ''}<div class="calc-display" id="cd">&nbsp;</div><div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, '✓'].map(k => `<button class="key ${k === '✓' ? 'go' : k === '⌫' ? 'del' : ''}" onclick="kp('${k}')">${k}</button>`).join('')}</div>`; };
function kp(k) { if (!L || L.checked) return; if (k === '✓') return check(); if (k === '⌫') L.val = L.val.slice(0, -1); else if (L.val.length < 12) L.val += k; SFX.tap(); $('#cd').innerHTML = L.val || '&nbsp;'; setReady(L.val.length > 0); }
R.memgrid = ex => { const ic = shuf(['🌙', '⭐', '🌿', '🔥', '💎', '🚀', '🎈', '🍀', '🐱', '🎵']).slice(0, ex.pairs); L.mg = {grid:shuf(ic.concat(ic)), open:[], ok:[], moves:0, lock:false}; const cols = ex.pairs <= 3 ? 3 : 4; return `${kindTag('🧠 Memória')}<div class="qtitle">Encontre os ${ex.pairs} pares</div><div class="mem-grid" style="grid-template-columns:repeat(${cols},1fr)">${L.mg.grid.map((v, i) => `<button class="mem" id="mg${i}" onclick="mgFlip(${i})"><span>?</span></button>`).join('')}</div><p style="text-align:center;color:var(--ink2);font-weight:800;margin-top:16px" id="mgm">Tentativas: 0</p>`; };
function mgFlip(i) {
  const m = L.mg; if (!m || m.lock || m.open.includes(i) || m.ok.includes(i) || L.checked) return;
  m.open.push(i); const el = $('#mg' + i); el.classList.add('open'); el.firstChild.textContent = m.grid[i]; SFX.tap();
  if (m.open.length < 2) return;
  m.moves++; $('#mgm').textContent = 'Tentativas: ' + m.moves; const [a, b] = m.open;
  if (m.grid[a] === m.grid[b]) { m.ok.push(a, b); m.open = []; SFX.pair(); [a, b].forEach(j => $('#mg' + j).classList.add('ok')); if (m.ok.length === m.grid.length) { const n = m.grid.length / 2, good = m.moves <= n * 2 + 1; setTimeout(() => finishCheck(good, `Você usou ${m.moves} tentativas${good ? '. Ótima memória!' : ` (meta: até ${n * 2 + 1}).`}`), 400); } }
  else { m.lock = true; setTimeout(() => { [a, b].forEach(j => { const e = $('#mg' + j); if (e) { e.classList.remove('open'); e.firstChild.textContent = '?'; } }); m.open = []; m.lock = false; }, 750); }
}
R.corsi = ex => { L.cs = {phase:'show', pos:0}; return `${kindTag('🧠 Memória')}<div class="qtitle" id="cst">Observe os quadrados acendendo...</div><div class="corsi" style="grid-template-columns:repeat(${ex.size},1fr)">${Array.from({length:ex.size * ex.size}, (_, i) => `<button class="cs" id="cs${i}" onclick="csTap(${i})"></button>`).join('')}</div><p style="text-align:center;color:var(--ink2);font-weight:800;margin-top:16px">${ex.seq.length} quadrados para lembrar</p>`; };
S_AUTO.corsi = ex => { let k = 0; const step = () => { if (!L || L.ex !== ex) return; if (k > 0) { const p = $('#cs' + ex.seq[k - 1]); if (p) p.classList.remove('lit'); } if (k >= ex.seq.length) { L.cs.phase = 'input'; const t = $('#cst'); if (t) t.textContent = 'Agora toque na mesma ordem!'; return; } setTimeout(() => { if (!L || L.ex !== ex) return; $('#cs' + ex.seq[k]).classList.add('lit'); tone([[440 + ex.seq[k] * 40, .15, 'sine', .08]]); k++; setTimeout(step, 620); }, 220); }; setTimeout(step, 400); };
function csTap(i) {
  const ex = L.ex, c = L.cs; if (!c || c.phase !== 'input' || L.checked) return;
  const el = $('#cs' + i); el.classList.add('tap'); setTimeout(() => el.classList.remove('tap'), 250);
  if (ex.seq[c.pos] !== i) { c.phase = 'done'; ex.seq.forEach((s, j) => { const e = $('#cs' + s); e.classList.add('show'); e.textContent = j + 1; }); return finishCheck(false, 'A ordem certa está numerada na grade.'); }
  c.pos++; tone([[440 + i * 40, .12, 'sine', .08]]);
  if (c.pos === ex.seq.length) { c.phase = 'done'; finishCheck(true, `Você lembrou os ${ex.seq.length} quadrados!`); }
}
R.oddgrid = ex => `${kindTag(ex.limit ? '⚡ Velocidade' : '🎯 Atenção')}<div class="qtitle">Encontre o diferente</div>${ex.limit ? `<div class="timer"><div style="animation-duration:${ex.limit}s"></div></div>` : ''}<div class="ogrid" style="grid-template-columns:repeat(${ex.cols},1fr);font-size:${ex.cols > 6 ? 21 : ex.cols > 4 ? 26 : 32}px">${ex.cells.map((c, i) => `<button class="og" id="og${i}" onclick="ogTap(${i})">${c}</button>`).join('')}</div>`;
function ogTap(i) { if (L.checked) return; const ok = i === L.ex.a; $('#og' + L.ex.a).classList.add('right'); if (!ok) $('#og' + i).classList.add('wrong'); finishCheck(ok, ok ? '' : 'O diferente está marcado em verde.'); }
