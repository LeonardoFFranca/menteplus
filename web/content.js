// Curso Mente+ — do zero ao fluente.
// Formato de cada unidade: [seção, título, explicação, exemplos "en=pt;...", palavras "en|pt|emoji;...", frases "en|pt;..."]
const SECTIONS = [
  {t:'Primeiros passos', lvl:'A1', c:'#22b573', d:'#178a57', l:'#e3f8ee', desc:'Do absoluto zero: cumprimentos, pessoas, números e o básico do dia a dia.'},
  {t:'Dia a dia', lvl:'A1+', c:'#2c9cf2', d:'#1b78c0', l:'#e2f1fd', desc:'Rotina, horários, casa, compras e como se virar na cidade.'},
  {t:'Conversas', lvl:'A2', c:'#ff9a1f', d:'#d47908', l:'#fff1df', desc:'Falar do passado e do futuro, viajar, pedir comida e cuidar da saúde.'},
  {t:'Independente', lvl:'B1', c:'#9b5de5', d:'#7a3fc4', l:'#f2eafd', desc:'Experiências, comparações, trabalho, opiniões e phrasal verbs essenciais.'},
  {t:'Avançado', lvl:'B2', c:'#f2547d', d:'#c93660', l:'#fde7ed', desc:'Hipóteses, voz passiva, deduções e textos mais longos e conectados.'},
  {t:'Fluente', lvl:'C1', c:'#11a8a0', d:'#0b827c', l:'#ddf6f4', desc:'Arrependimentos, expressões idiomáticas, linguagem formal e nuances de nativo.'}
];

const RAW = [
// ───────── SEÇÃO 1 · A1
[0,'Saudações',
'Cumprimentar em inglês é simples. <b>Hello</b> serve para qualquer hora; <b>Hi</b> é mais informal, entre amigos. De manhã diga <b>Good morning</b>, à tarde <b>Good afternoon</b> e à noite, ao chegar, <b>Good evening</b>. <b>Good night</b> é só para se despedir ou ir dormir.',
'Hi, I am Ana.=Oi, eu sou a Ana.;Good afternoon!=Boa tarde!;Thank you very much.=Muito obrigado.',
'hello|olá|👋;goodbye|tchau|🙋;please|por favor|🙏;thank you|obrigado|💐;yes|sim|✅;no|não|❌',
'Hello, how are you?|Olá, como você está?;I am fine, thank you.|Eu estou bem, obrigado.;Good morning!|Bom dia!;Good night!|Boa noite!;Nice to meet you.|Prazer em conhecer você.;See you later!|Até mais tarde!'],

[0,'Eu e você',
'O verbo <b>to be</b> significa <b>ser</b> e <b>estar</b> ao mesmo tempo. Ele muda conforme a pessoa: <b>I am</b>, <b>you are</b>, <b>he/she/it is</b>, <b>we are</b>, <b>they are</b>. Na fala é comum juntar: I\'m, you\'re, she\'s, we\'re. Em inglês o sujeito nunca some: diga sempre <b>I am</b>, nunca só "am".',
'I am Brazilian.=Eu sou brasileiro.;She is tired.=Ela está cansada.;They are my friends.=Eles são meus amigos.',
'I|eu|🙋;you|você|👉;he|ele|👦;she|ela|👧;we|nós|👫;they|eles|👨‍👩‍👧',
'I am a student.|Eu sou um estudante.;You are my friend.|Você é meu amigo.;She is happy.|Ela está feliz.;He is tall.|Ele é alto.;We are from Brazil.|Nós somos do Brasil.;They are at home.|Eles estão em casa.'],

[0,'Família',
'Para dizer de quem é algo, use os possessivos: <b>my</b> (meu/minha), <b>your</b> (seu/sua), <b>his</b> (dele), <b>her</b> (dela), <b>our</b> (nosso) e <b>their</b> (deles). Eles não mudam com masculino, feminino ou plural: <b>my</b> brother, <b>my</b> sisters.',
'This is my son.=Este é meu filho.;Her father is a doctor.=O pai dela é médico.;Their house is big.=A casa deles é grande.',
'mother|mãe|👩;father|pai|👨;brother|irmão|👦;sister|irmã|👧;son|filho|🧒;grandmother|avó|👵',
'This is my mother.|Esta é minha mãe.;My father is a teacher.|Meu pai é professor.;I have two brothers.|Eu tenho dois irmãos.;Her sister is very kind.|A irmã dela é muito gentil.;Our family is big.|Nossa família é grande.;My grandmother lives with us.|Minha avó mora conosco.'],

[0,'Números e idade',
'Atenção: idade em inglês usa o verbo <b>to be</b>, não "ter". Dizemos <b>I am twenty</b> ou <b>I am twenty years old</b>. Para perguntar: <b>How old are you?</b> Para quantidades, use <b>How many...?</b>',
'I am thirty years old.=Eu tenho trinta anos.;How many cats do you have?=Quantos gatos você tem?;I have one car.=Eu tenho um carro.',
'one|um|1️⃣;two|dois|2️⃣;three|três|3️⃣;ten|dez|🔟;twenty|vinte|🎂;hundred|cem|💯',
'I am twenty years old.|Eu tenho vinte anos.;How old are you?|Quantos anos você tem?;She has three cats.|Ela tem três gatos.;There are ten books.|Há dez livros.;I need two tickets.|Eu preciso de dois ingressos.;It costs one hundred dollars.|Custa cem dólares.'],

[0,'Comida e bebida',
'Antes de uma palavra no singular use <b>a</b> (um/uma). Se ela começar com som de vogal, use <b>an</b>: <b>an apple</b>, <b>an egg</b>. Para perguntar, comece com <b>Do</b>: <b>Do you want coffee?</b> Para negar, use <b>don\'t</b>: <b>I don\'t eat meat.</b>',
'I want an egg.=Eu quero um ovo.;Do you like tea?=Você gosta de chá?;I don\'t drink milk.=Eu não bebo leite.',
'water|água|💧;bread|pão|🍞;apple|maçã|🍎;coffee|café|☕;milk|leite|🥛;cheese|queijo|🧀',
'I drink water.|Eu bebo água.;She eats an apple.|Ela come uma maçã.;I like coffee with milk.|Eu gosto de café com leite.;Do you want bread?|Você quer pão?;We don\'t eat cheese.|Nós não comemos queijo.;The food is delicious.|A comida está deliciosa.'],

[0,'Cores e objetos',
'Em inglês o adjetivo vem <b>antes</b> do substantivo: <b>a blue car</b> (um carro azul). E o adjetivo nunca vai para o plural: <b>two red cars</b>. Para apontar, use <b>this</b> (este, perto) e <b>that</b> (aquele, longe).',
'A big house.=Uma casa grande.;Two green apples.=Duas maçãs verdes.;That car is old.=Aquele carro é velho.',
'red|vermelho|🔴;blue|azul|🔵;green|verde|🟢;book|livro|📕;car|carro|🚗;house|casa|🏠',
'The car is red.|O carro é vermelho.;I have a blue book.|Eu tenho um livro azul.;Their house is green.|A casa deles é verde.;This is my car.|Este é meu carro.;That book is new.|Aquele livro é novo.;The sky is blue.|O céu é azul.'],

// ───────── SEÇÃO 2 · A1+
[1,'Rotina',
'Para hábitos e rotina usamos o <b>presente simples</b>. O segredo: com <b>he, she</b> e <b>it</b> o verbo ganha <b>-s</b> (she works, he drinks). Para negar: <b>don\'t</b> / <b>doesn\'t</b>. Para perguntar: <b>Do</b> / <b>Does</b>. Depois de doesn\'t e does o verbo volta sem -s.',
'He plays guitar.=Ele toca violão.;She doesn\'t like tea.=Ela não gosta de chá.;Do you work here?=Você trabalha aqui?',
'wake up|acordar|⏰;work|trabalhar|💼;study|estudar|📚;sleep|dormir|😴;eat|comer|🍽️;always|sempre|🔁',
'I wake up at seven.|Eu acordo às sete.;She works in a hospital.|Ela trabalha em um hospital.;We study English every day.|Nós estudamos inglês todo dia.;He always drinks coffee.|Ele sempre bebe café.;They don\'t work on Sundays.|Eles não trabalham aos domingos.;Does she sleep early?|Ela dorme cedo?'],

[1,'Horas e dias',
'Três preposições de tempo resolvem quase tudo: <b>at</b> para horas (at 7 o\'clock), <b>on</b> para dias (on Monday) e <b>in</b> para partes do dia, meses e anos (in the morning, in May). Exceção famosa: <b>at night</b>.',
'The class is at nine.=A aula é às nove.;I travel on Friday.=Eu viajo na sexta.;She was born in 1990.=Ela nasceu em 1990.',
'Monday|segunda-feira|📅;Friday|sexta-feira|🎉;today|hoje|📍;tomorrow|amanhã|➡️;morning|manhã|🌅;night|noite|🌙',
'What time is it?|Que horas são?;It is three o\'clock.|São três horas.;Today is Monday.|Hoje é segunda-feira.;I work in the morning.|Eu trabalho de manhã.;See you on Friday.|Vejo você na sexta-feira.;We go out at night.|Nós saímos à noite.'],

[1,'Em casa',
'<b>There is</b> (singular) e <b>there are</b> (plural) significam "há" ou "tem": <b>There is a cat</b>, <b>There are two beds</b>. Para dar instruções use o verbo sozinho, sem sujeito: <b>Open</b> the door, <b>Sit</b> down.',
'There is a sofa in the room.=Há um sofá na sala.;There are three chairs.=Há três cadeiras.;Sit down, please.=Sente-se, por favor.',
'kitchen|cozinha|🍳;bedroom|quarto|🛏️;bathroom|banheiro|🛁;door|porta|🚪;window|janela|🪟;chair|cadeira|🪑',
'The kitchen is small.|A cozinha é pequena.;There is a bed in my bedroom.|Há uma cama no meu quarto.;Close the door, please.|Feche a porta, por favor.;Open the window.|Abra a janela.;Where is the bathroom?|Onde fica o banheiro?;The chair is next to the table.|A cadeira está ao lado da mesa.'],

[1,'Roupas e compras',
'Para perguntar preço: <b>How much is...?</b> (singular) ou <b>How much are...?</b> (plural). Use <b>this/these</b> para coisas perto de você e <b>that/those</b> para coisas longe. <b>Can I...?</b> é o jeito educado de pedir permissão.',
'How much are these jeans?=Quanto custam estas calças jeans?;I like that jacket.=Eu gosto daquela jaqueta.;Can I try it on?=Posso experimentar?',
'shirt|camisa|👕;shoes|sapatos|👟;dress|vestido|👗;cheap|barato|🏷️;expensive|caro|💰;size|tamanho|📏',
'How much is this shirt?|Quanto custa esta camisa?;These shoes are expensive.|Estes sapatos são caros.;Do you have a smaller size?|Você tem um tamanho menor?;I want to buy a dress.|Eu quero comprar um vestido.;Can I pay by card?|Posso pagar com cartão?;It is very cheap.|É muito barato.'],

[1,'Na cidade',
'Para pedir informação comece com <b>Excuse me</b> (com licença). Depois: <b>Where is...?</b> As direções básicas são <b>turn left</b> (vire à esquerda), <b>turn right</b> (à direita) e <b>go straight ahead</b> (siga em frente).',
'Excuse me, where is the station?=Com licença, onde fica a estação?;Turn right at the bank.=Vire à direita no banco.;It is near the park.=Fica perto do parque.',
'bank|banco|🏦;hospital|hospital|🏥;school|escola|🏫;street|rua|🛣️;left|esquerda|⬅️;right|direita|➡️',
'Where is the bank?|Onde fica o banco?;Turn left.|Vire à esquerda.;The school is on this street.|A escola fica nesta rua.;Go straight ahead.|Siga em frente.;The hospital is near here.|O hospital fica perto daqui.;Is it far from here?|É longe daqui?'],

[1,'O que você sabe fazer',
'<b>Can</b> expressa habilidade (saber) e possibilidade (poder). Ele é igual para todas as pessoas, sem -s, e o verbo seguinte vem sem "to": <b>She can swim</b>. Negativo: <b>can\'t</b>. Pergunta: <b>Can you...?</b>',
'I can play the piano.=Eu sei tocar piano.;He can\'t come today.=Ele não pode vir hoje.;Can you speak slowly?=Você pode falar devagar?',
'swim|nadar|🏊;cook|cozinhar|👨‍🍳;drive|dirigir|🚙;sing|cantar|🎤;dance|dançar|💃;speak|falar|🗣️',
'I can swim.|Eu sei nadar.;She can\'t drive.|Ela não sabe dirigir.;Can you cook?|Você sabe cozinhar?;We can speak English.|Nós sabemos falar inglês.;He can sing very well.|Ele sabe cantar muito bem.;Can you help me?|Você pode me ajudar?'],

// ───────── SEÇÃO 3 · A2
[2,'Passado: verbos regulares',
'Para falar do passado, a maioria dos verbos ganha <b>-ed</b>: work → <b>worked</b>, play → <b>played</b>, study → <b>studied</b>. É igual para todas as pessoas! Para perguntar e negar usamos <b>did</b> / <b>didn\'t</b> e o verbo volta à forma normal: <b>Did you work?</b> <b>I didn\'t work.</b>',
'I cleaned the house.=Eu limpei a casa.;Did she call you?=Ela te ligou?;We didn\'t travel.=Nós não viajamos.',
'played|jogou|⚽;watched|assistiu|📺;visited|visitou|🧳;cooked|cozinhou|🍝;yesterday|ontem|⏪;last week|semana passada|📆',
'I watched a movie yesterday.|Eu assisti a um filme ontem.;She visited her parents last week.|Ela visitou os pais dela semana passada.;We played football.|Nós jogamos futebol.;Did you cook dinner?|Você cozinhou o jantar?;He didn\'t work yesterday.|Ele não trabalhou ontem.;They studied all night.|Eles estudaram a noite toda.'],

[2,'Passado: verbos irregulares',
'Alguns verbos muito comuns têm passado próprio, que vale decorar: go → <b>went</b>, eat → <b>ate</b>, see → <b>saw</b>, buy → <b>bought</b>, have → <b>had</b>, be → <b>was/were</b>. Mas com <b>did</b> o verbo volta ao normal: <b>Did you go?</b> (e não "did you went").',
'I had a dream.=Eu tive um sonho.;We were at home.=Nós estávamos em casa.;Did you buy it?=Você comprou isso?',
'went|foi|✈️;ate|comeu|🍕;saw|viu|👀;bought|comprou|🛍️;had|teve|🎁;made|fez|🔨',
'I went to the beach.|Eu fui à praia.;We ate pizza last night.|Nós comemos pizza ontem à noite.;She saw a beautiful bird.|Ela viu um pássaro lindo.;He bought a new phone.|Ele comprou um celular novo.;It was a great day.|Foi um ótimo dia.;Did you see the game?|Você viu o jogo?'],

[2,'Viagem',
'Em viagens, algumas frases salvam vidas: <b>I have a reservation</b> (tenho uma reserva), <b>How long...?</b> (quanto tempo?) e <b>Where is...?</b>. Note: "passagem" de avião é <b>ticket</b>, e "bagagem" é <b>luggage</b>, que não vai para o plural.',
'I would like a window seat.=Eu gostaria de um assento na janela.;My luggage is heavy.=Minha bagagem está pesada.;What time is check-in?=Que horas é o check-in?',
'airport|aeroporto|🛫;passport|passaporte|🛂;ticket|passagem|🎫;hotel|hotel|🏨;luggage|bagagem|🧳;flight|voo|✈️',
'I need a ticket to London.|Eu preciso de uma passagem para Londres.;Where is my passport?|Onde está meu passaporte?;The flight is delayed.|O voo está atrasado.;I have a reservation.|Eu tenho uma reserva.;Our hotel is near the beach.|Nosso hotel fica perto da praia.;How long is the flight?|Quanto tempo dura o voo?'],

[2,'No restaurante',
'Para pedir com educação, troque "I want" por <b>I would like</b> (eu gostaria), ou <b>I\'d like</b>. Para pedidos, use <b>Could I...?</b> ou <b>Could we...?</b> (eu poderia / nós poderíamos). Soa muito mais gentil!',
'I\'d like a juice, please.=Eu gostaria de um suco, por favor.;Could I have some water?=Eu poderia tomar um pouco de água?;Is service included?=O serviço está incluído?',
'menu|cardápio|📋;bill|conta|🧾;waiter|garçom|🤵;dessert|sobremesa|🍰;order|pedir|🗒️;hungry|com fome|😋',
'Can I see the menu?|Posso ver o cardápio?;I would like a salad.|Eu gostaria de uma salada.;Could we have the bill, please?|Poderíamos ver a conta, por favor?;I am very hungry.|Eu estou com muita fome.;We want to order now.|Nós queremos pedir agora.;The dessert was amazing.|A sobremesa estava incrível.'],

[2,'Saúde e corpo',
'Para dores, use <b>have a ...ache</b>: headache (dor de cabeça), stomachache (dor de barriga). Ou diga que algo <b>hurts</b>: <b>My back hurts</b>. Para dar conselho use <b>should</b> (deveria): <b>You should rest.</b>',
'I have a stomachache.=Eu estou com dor de barriga.;My leg hurts.=Minha perna dói.;You should drink water.=Você deveria beber água.',
'head|cabeça|🙆;doctor|médico|🩺;sick|doente|🤒;medicine|remédio|💊;pain|dor|🤕;better|melhor|💪',
'I have a headache.|Eu estou com dor de cabeça.;She feels sick today.|Ela se sente doente hoje.;You should see a doctor.|Você deveria ir ao médico.;Take this medicine twice a day.|Tome este remédio duas vezes por dia.;My back hurts.|Minhas costas doem.;I feel better now.|Eu me sinto melhor agora.'],

[2,'Planos e futuro',
'Há dois futuros principais. <b>Going to</b> é para planos já decididos: <b>I am going to travel</b>. <b>Will</b> é para decisões na hora, promessas e previsões: <b>I will help you</b>, <b>It will rain</b>. Ambos são traduzidos como "vou" ou pelo futuro.',
'I am going to cook tonight.=Eu vou cozinhar hoje à noite.;I will call you later.=Eu te ligo mais tarde.;It will be fun.=Vai ser divertido.',
'plan|plano|🗺️;next|próximo|⏭️;soon|em breve|⏳;maybe|talvez|🤔;travel|viajar|🌍;tonight|hoje à noite|🌃',
'I am going to travel next month.|Eu vou viajar no próximo mês.;She is going to study tonight.|Ela vai estudar hoje à noite.;Maybe it will rain tomorrow.|Talvez chova amanhã.;I will call you soon.|Eu vou ligar para você em breve.;We are going to buy a house.|Nós vamos comprar uma casa.;Will you help me?|Você vai me ajudar?'],

// ───────── SEÇÃO 4 · B1
[3,'Experiências (present perfect)',
'O <b>present perfect</b> (<b>have/has</b> + particípio) liga passado e presente. Use para experiências sem data (<b>I have been to Paris</b>), coisas que acabaram de acontecer (<b>I have just eaten</b>) e situações que continuam (<b>I have lived here since 2020</b>). Se disser <b>quando</b> foi, volte ao passado simples.',
'Have you ever seen snow?=Você já viu neve?;I have known her for years.=Eu a conheço há anos.;She has just left.=Ela acabou de sair.',
'ever|alguma vez|🌟;never|nunca|🚫;already|já|✔️;yet|ainda|⌛;just|acabou de|⚡;since|desde|📌',
'Have you ever been to Japan?|Você já esteve no Japão?;I have never eaten sushi.|Eu nunca comi sushi.;She has already finished her homework.|Ela já terminou a lição de casa.;They haven\'t arrived yet.|Eles ainda não chegaram.;I have just seen your message.|Eu acabei de ver sua mensagem.;We have lived here since 2020.|Nós moramos aqui desde 2020.'],

[3,'Comparações',
'Adjetivos curtos ganham <b>-er</b> para comparar e <b>-est</b> para o superlativo: big → bigger → <b>the biggest</b>. Adjetivos longos usam <b>more</b> e <b>the most</b>: more expensive, the most expensive. "Do que" é <b>than</b>. Irregulares: good → better → best; bad → worse → worst.',
'He is older than me.=Ele é mais velho do que eu.;This is the most beautiful beach.=Esta é a praia mais bonita.;It is as cold as yesterday.=Está tão frio quanto ontem.',
'bigger|maior|🐘;better|melhor|👍;worse|pior|👎;the best|o melhor|🏆;than|do que|⚖️;easier|mais fácil|🧸',
'My city is bigger than yours.|Minha cidade é maior do que a sua.;This is the best day of my life.|Este é o melhor dia da minha vida.;Today is worse than yesterday.|Hoje está pior do que ontem.;She is as tall as her brother.|Ela é tão alta quanto o irmão dela.;English is easier than I thought.|Inglês é mais fácil do que eu pensava.;It is the most expensive car here.|É o carro mais caro daqui.'],

[3,'Trabalho',
'Para ações acontecendo agora ou neste período, use o <b>presente contínuo</b>: <b>am/is/are + verbo-ing</b>. <b>I am looking for a job</b> (estou procurando emprego). Atenção: "pretender" não é pretend! Para planos diga <b>I intend to</b> ou <b>I plan to</b>.',
'I am working from home this week.=Estou trabalhando de casa esta semana.;She is preparing a report.=Ela está preparando um relatório.;We plan to hire two people.=Nós planejamos contratar duas pessoas.',
'job|emprego|💼;meeting|reunião|👥;boss|chefe|👔;salary|salário|💵;interview|entrevista|🎙️;deadline|prazo|⏰',
'I have a job interview tomorrow.|Eu tenho uma entrevista de emprego amanhã.;The meeting starts at ten.|A reunião começa às dez.;My boss is very demanding.|Meu chefe é muito exigente.;We need to meet the deadline.|Nós precisamos cumprir o prazo.;I am looking for a new job.|Eu estou procurando um novo emprego.;She got a promotion last year.|Ela conseguiu uma promoção no ano passado.'],

[3,'Se... então (condicional)',
'Para situações reais e prováveis: <b>If</b> + presente, <b>will</b> + verbo. <b>If it rains, I will stay home.</b> Depois de <b>if, when, as soon as</b> e <b>unless</b> o verbo fica no presente, mesmo falando do futuro. <b>Unless</b> = a menos que.',
'If you call me, I will answer.=Se você me ligar, eu vou atender.;When I get home, I will eat.=Quando eu chegar em casa, eu vou comer.;I won\'t go unless you go.=Eu não vou a menos que você vá.',
'if|se|🔀;unless|a menos que|🚧;when|quando|🕐;as soon as|assim que|⏱️;in case|caso|🧰;otherwise|caso contrário|↩️',
'If it rains, we will stay home.|Se chover, nós vamos ficar em casa.;I will call you when I arrive.|Eu vou te ligar quando eu chegar.;Unless you hurry, you will miss the bus.|A menos que você se apresse, você vai perder o ônibus.;Take an umbrella in case it rains.|Leve um guarda-chuva caso chova.;As soon as I finish, I will help you.|Assim que eu terminar, eu vou te ajudar.;If you study, you will pass.|Se você estudar, você vai passar.'],

[3,'Dando opiniões',
'Para opinar: <b>I think...</b>, <b>In my opinion...</b>, <b>I believe...</b>. Para concordar: <b>I agree</b> (e não "I am agree"!). Para discordar com educação: <b>I see your point, but...</b>. <b>However</b> (porém) introduz contraste e costuma vir no início da frase.',
'I believe it is a good idea.=Eu acredito que é uma boa ideia.;I agree with you.=Eu concordo com você.;I see your point, but I disagree.=Entendo seu ponto, mas eu discordo.',
'I think|eu acho|💭;agree|concordar|🤝;disagree|discordar|🙅;however|porém|↔️;because|porque|❓;probably|provavelmente|📊',
'I think you are right.|Eu acho que você está certo.;I don\'t agree with that idea.|Eu não concordo com essa ideia.;In my opinion, it is too expensive.|Na minha opinião, é caro demais.;It is a good plan. However, it is risky.|É um bom plano. Porém, é arriscado.;She is probably at work.|Ela provavelmente está no trabalho.;I stayed home because I was tired.|Eu fiquei em casa porque estava cansado.'],

[3,'Phrasal verbs essenciais',
'<b>Phrasal verbs</b> são verbos + uma partícula (up, on, off, out...) que formam um novo significado. <b>Turn on</b> = ligar, <b>turn off</b> = desligar, <b>give up</b> = desistir. Eles são muito usados por nativos — aprenda como se fossem palavras novas.',
'Wake up, it is late!=Acorde, está tarde!;Put on your coat.=Vista o seu casaco.;I will pick you up at eight.=Eu vou te buscar às oito.',
'get up|levantar-se|🛏️;turn on|ligar|💡;turn off|desligar|🔌;look for|procurar|🔍;give up|desistir|🏳️;find out|descobrir|🕵️',
'I get up at six every day.|Eu me levanto às seis todo dia.;Please turn off the lights.|Por favor, desligue as luzes.;I am looking for my keys.|Eu estou procurando minhas chaves.;Don\'t give up on your dreams.|Não desista dos seus sonhos.;She found out the truth.|Ela descobriu a verdade.;Can you turn on the TV?|Você pode ligar a TV?'],

// ───────── SEÇÃO 5 · B2
[4,'Hipóteses (se eu fosse...)',
'Para situações imaginárias: <b>If</b> + passado, <b>would</b> + verbo. <b>If I had money, I would travel</b> (se eu tivesse dinheiro, viajaria). Com o verbo to be usamos <b>were</b> para todos: <b>If I were you...</b> (se eu fosse você). <b>I wish</b> + passado expressa um desejo sobre o presente.',
'If I were you, I would accept.=Se eu fosse você, eu aceitaria.;I wish I could fly.=Eu queria poder voar.;What would you do?=O que você faria?',
'wish|desejar|🌠;would|-ria (faria, iria)|💫;rich|rico|💎;afford|ter dinheiro para|💳;imagine|imaginar|🌈;lottery|loteria|🎰',
'If I were rich, I would travel the world.|Se eu fosse rico, eu viajaria pelo mundo.;What would you do if you won the lottery?|O que você faria se ganhasse na loteria?;I wish I had more free time.|Eu queria ter mais tempo livre.;If I could afford it, I would buy it.|Se eu tivesse dinheiro, eu compraria.;She would help you if she knew.|Ela te ajudaria se soubesse.;Imagine if we lived by the sea.|Imagine se nós morássemos perto do mar.'],

[4,'Voz passiva',
'Na voz passiva o foco é na ação, não em quem faz: <b>be + particípio</b>. <b>The house was built in 1950</b> (a casa foi construída). Quem fez aparece com <b>by</b>: <b>written by Machado de Assis</b>. Muito usada em notícias, textos técnicos e acadêmicos.',
'The car is being repaired.=O carro está sendo consertado.;The letter was sent yesterday.=A carta foi enviada ontem.;Dinner will be served at eight.=O jantar será servido às oito.',
'built|construído|🏗️;written|escrito|✍️;invented|inventado|💡;sold|vendido|🏷️;known|conhecido|🌐;spoken|falado|🗣️',
'This house was built in 1950.|Esta casa foi construída em 1950.;The book was written by a famous author.|O livro foi escrito por um autor famoso.;English is spoken all over the world.|O inglês é falado no mundo todo.;The phone was invented in the nineteenth century.|O telefone foi inventado no século dezenove.;All the tickets have been sold.|Todos os ingressos foram vendidos.;This city is known for its beaches.|Esta cidade é conhecida por suas praias.'],

[4,'Ligando ideias (who, which, where)',
'Para dar mais informação sobre algo use as palavras relativas: <b>who</b> para pessoas, <b>which</b> para coisas, <b>where</b> para lugares e <b>whose</b> para posse (cujo). <b>That</b> pode substituir who e which na fala do dia a dia.',
'The man who called is my uncle.=O homem que ligou é meu tio.;The car which I bought is red.=O carro que eu comprei é vermelho.;The city where I was born is small.=A cidade onde eu nasci é pequena.',
'who|que (pessoas)|🧑;which|que (coisas)|📦;where|onde|📍;whose|cujo|🔑;that|que|🔗;people|pessoas|👥',
'The woman who lives next door is a doctor.|A mulher que mora ao lado é médica.;This is the book which I told you about.|Este é o livro sobre o qual eu te falei.;That is the restaurant where we met.|Aquele é o restaurante onde nós nos conhecemos.;I have a friend whose father is a pilot.|Eu tenho um amigo cujo pai é piloto.;The movie that we watched was boring.|O filme que nós assistimos foi chato.;People who exercise live longer.|Pessoas que se exercitam vivem mais.'],

[4,'Deduções e suposições',
'Os modais mostram o quanto você tem certeza. <b>Must</b> = tenho quase certeza que sim. <b>Might/could</b> = talvez. <b>Can\'t</b> = tenho certeza que não. Para o passado, acrescente <b>have + particípio</b>: <b>He must have left</b> (ele deve ter saído). <b>Should have</b> = deveria ter (arrependimento ou crítica).',
'You must be hungry.=Você deve estar com fome.;She might be late.=Pode ser que ela se atrase.;They must have missed the train.=Eles devem ter perdido o trem.',
'must|deve (certeza)|🎯;might|pode ser que|🎲;could|poderia|🌥️;forgotten|esquecido|🫥;earlier|antes|⏮️;true|verdade|✔️',
'She must be tired after the trip.|Ela deve estar cansada depois da viagem.;It might rain later.|Pode ser que chova mais tarde.;That can\'t be true.|Isso não pode ser verdade.;He must have forgotten our meeting.|Ele deve ter esquecido da nossa reunião.;You should have told me earlier.|Você deveria ter me contado antes.;They could be at the party.|Eles poderiam estar na festa.'],

[4,'Contando o que alguém disse',
'No discurso indireto o verbo costuma "voltar" um tempo: "I am tired" → <b>She said that she was tired</b>. Diferença importante: <b>say</b> não leva pessoa depois (she said that...), já <b>tell</b> leva (she told <b>me</b> that...). Perguntas viram <b>asked if...</b>',
'He said he was busy.=Ele disse que estava ocupado.;She told us a secret.=Ela nos contou um segredo.;I asked where she lived.=Eu perguntei onde ela morava.',
'said|disse|💬;told|contou|🗨️;asked|perguntou|❔;explained|explicou|📖;promised|prometeu|🤞;suggested|sugeriu|💡',
'She said that she was tired.|Ela disse que estava cansada.;He told me he would come.|Ele me disse que viria.;They asked if I was ready.|Eles perguntaram se eu estava pronto.;My teacher explained that the test was easy.|Minha professora explicou que a prova era fácil.;He promised to call me.|Ele prometeu me ligar.;She suggested going to the cinema.|Ela sugeriu ir ao cinema.'],

[4,'Conectores',
'Conectores deixam seu inglês fluido. Contraste: <b>although</b> (embora) + frase; <b>despite</b> (apesar de) + substantivo ou -ing. Consequência: <b>therefore</b> (portanto). Adição: <b>moreover</b> (além disso). Comparação de contraste: <b>whereas</b> (enquanto).',
'Although he was tired, he came.=Embora estivesse cansado, ele veio.;Despite being late, she smiled.=Apesar de estar atrasada, ela sorriu.;It is cheap. Moreover, it works.=É barato. Além disso, funciona.',
'although|embora|🌗;despite|apesar de|🧱;therefore|portanto|➡️;moreover|além disso|➕;whereas|enquanto|⚖️;meanwhile|enquanto isso|⏳',
'Although it was late, we kept working.|Embora fosse tarde, nós continuamos trabalhando.;Despite the rain, the game continued.|Apesar da chuva, o jogo continuou.;He studied hard. Therefore, he passed.|Ele estudou muito. Portanto, ele passou.;The hotel is cheap. Moreover, it is clean.|O hotel é barato. Além disso, é limpo.;I like tea, whereas my wife prefers coffee.|Eu gosto de chá, enquanto minha esposa prefere café.;Meanwhile, the kids were sleeping.|Enquanto isso, as crianças estavam dormindo.'],

// ───────── SEÇÃO 6 · C1
[5,'Arrependimentos (se eu tivesse...)',
'Para imaginar um passado diferente: <b>If</b> + <b>had</b> + particípio, <b>would have</b> + particípio. <b>If I had known, I would have helped</b> (se eu soubesse, teria ajudado). Para lamentar: <b>I wish I had...</b> ou <b>If only I had...</b> (quem dera eu tivesse...).',
'If she had called, I would have answered.=Se ela tivesse ligado, eu teria atendido.;I wish I had studied more.=Eu queria ter estudado mais.;If only we had left earlier.=Quem dera tivéssemos saído antes.',
'regret|arrepender-se|😞;if only|quem dera|🙏;would have|teria|🔙;missed|perdeu|🚌;chance|chance|🎟️;invited|convidou|💌',
'If I had known, I would have helped you.|Se eu soubesse, eu teria te ajudado.;We would have won if we had trained more.|Nós teríamos ganhado se tivéssemos treinado mais.;I regret not studying harder.|Eu me arrependo de não ter estudado mais.;If only I had listened to you.|Quem dera eu tivesse te ouvido.;She would have come if you had invited her.|Ela teria vindo se você a tivesse convidado.;I wish I hadn\'t missed that chance.|Eu queria não ter perdido aquela chance.'],

[5,'Expressões idiomáticas',
'Expressões idiomáticas não podem ser traduzidas ao pé da letra. <b>A piece of cake</b> não é "um pedaço de bolo": significa <b>moleza</b>. <b>Under the weather</b> é estar indisposto. Usá-las no momento certo faz você soar como nativo.',
'It costs an arm and a leg.=Custa os olhos da cara.;Break a leg!=Boa sorte!;I am all ears.=Sou todo ouvidos.',
'piece of cake|moleza|🍰;break the ice|quebrar o gelo|🧊;same page|em sintonia|📄;hit the road|pegar a estrada|🛣️;under the weather|indisposto|🌧️;once in a blue moon|muito raramente|🌕',
'The test was a piece of cake.|A prova foi moleza.;He told a joke to break the ice.|Ele contou uma piada para quebrar o gelo.;Let\'s make sure we are on the same page.|Vamos garantir que estamos em sintonia.;It is late, we should hit the road.|Está tarde, nós deveríamos pegar a estrada.;I am feeling a bit under the weather.|Eu estou me sentindo um pouco indisposto.;We see each other once in a blue moon.|Nós nos vemos muito raramente.'],

[5,'Phrasal verbs avançados',
'Alguns phrasal verbs têm três partes: <b>come up with</b> (ter uma ideia), <b>put up with</b> (tolerar), <b>run out of</b> (ficar sem), <b>look forward to</b> (estar ansioso por). Atenção: depois de <b>look forward to</b> o verbo vai com <b>-ing</b>: <b>looking forward to seeing you</b>.',
'We ran out of time.=Nós ficamos sem tempo.;I can\'t put up with him.=Eu não consigo aguentar ele.;She came up with a plan.=Ela bolou um plano.',
'come up with|ter (uma ideia)|💡;put up with|tolerar|😤;run out of|ficar sem|🪫;look forward to|estar ansioso por|🗓️;carry on|continuar|▶️;figure out|entender|🧩',
'She came up with a brilliant idea.|Ela teve uma ideia brilhante.;I can\'t put up with this noise.|Eu não consigo tolerar esse barulho.;We have run out of milk.|Nós ficamos sem leite.;I am looking forward to seeing you.|Eu estou ansioso para te ver.;Carry on, you are doing great.|Continue, você está indo muito bem.;I can\'t figure out this problem.|Eu não consigo entender esse problema.'],

[5,'Inglês formal e e-mails',
'No trabalho, o tom muda. Em vez de "I want", diga <b>I would like</b>. Em vez de "about", use <b>regarding</b>. Para pedir: <b>I would appreciate it if...</b>. Para encerrar um e-mail: <b>I look forward to hearing from you</b> e <b>Kind regards</b> ou <b>Sincerely</b>.',
'Dear Mr. Smith,=Prezado Sr. Smith,;Kind regards.=Atenciosamente.;Please let me know if you have any questions.=Por favor, me avise se tiver alguma dúvida.',
'regarding|referente a|📎;attached|em anexo|📧;appreciate|agradecer|🙌;request|solicitar|📝;available|disponível|🟢;sincerely|atenciosamente|✒️',
'I am writing regarding your application.|Eu estou escrevendo referente à sua candidatura.;Please find the report attached.|Segue o relatório em anexo.;I would appreciate your help.|Eu agradeceria a sua ajuda.;I would like to request a meeting.|Eu gostaria de solicitar uma reunião.;Are you available next Tuesday?|Você está disponível na próxima terça-feira?;I look forward to hearing from you.|Eu fico no aguardo do seu retorno.'],

[5,'Ênfase e nuance',
'Pequenas palavras mudam o tom: <b>actually</b> (na verdade — não é "atualmente"!), <b>definitely</b> (com certeza), <b>hardly</b> (mal, quase não), <b>rather</b> (um tanto). Para ênfase formal, nativos invertem a frase: <b>Never have I seen...</b> (nunca vi...), <b>Not only is she...</b>',
'Actually, I disagree.=Na verdade, eu discordo.;I hardly ever watch TV.=Eu quase nunca vejo TV.;Rarely do we see such talent.=Raramente vemos tanto talento.',
'actually|na verdade|🎭;definitely|com certeza|💯;hardly|mal|🤏;rather|um tanto|🎚️;worth it|vale a pena|💎;such|tão / tal|✨',
'Actually, I have never been there.|Na verdade, eu nunca estive lá.;It was definitely worth it.|Com certeza valeu a pena.;I can hardly hear you.|Eu mal consigo te ouvir.;The movie was rather long.|O filme foi um tanto longo.;Not only is she smart, but she is also kind.|Ela não só é inteligente, mas também é gentil.;Never have I seen such a beautiful place.|Nunca vi um lugar tão bonito.'],

[5,'Falsos cognatos',
'Falsos cognatos parecem português, mas enganam! <b>Pretend</b> = fingir. <b>Push</b> = empurrar (puxar é pull). <b>Library</b> = biblioteca (livraria é bookstore). <b>Parents</b> = pais (parentes é relatives). <b>Realize</b> = perceber. <b>Eventually</b> = no fim, com o tempo.',
'Pull the door.=Puxe a porta.;I bought it at the bookstore.=Eu comprei na livraria.;All my relatives came.=Todos os meus parentes vieram.',
'pretend|fingir|🎭;push|empurrar|👐;library|biblioteca|📚;parents|pais|👪;realize|perceber|💡;eventually|no fim|⌛',
'He pretended to be sick.|Ele fingiu estar doente.;Push the door to open it.|Empurre a porta para abri-la.;I study at the library.|Eu estudo na biblioteca.;My parents live in Rio.|Meus pais moram no Rio.;I realized I was wrong.|Eu percebi que estava errado.;Eventually, everything worked out.|No fim, tudo deu certo.']
];

const UNITS = RAW.map((r, i) => ({
  id: i, s: r[0], t: r[1], tip: r[2],
  ex: r[3].split(';').map(x => x.split('=')),
  w: r[4].split(';').map(x => x.split('|')),
  f: r[5].split(';').map(x => x.split('|'))
}));

// Leituras (histórias com perguntas)
const STORIES=[
{title:'Rotina e hábitos',level:'A1+',story:'My name is Olivia. I usually wake up at seven. I work at a bookstore near my house. On Fridays, I finish work early and visit my sister.',vocab:[['usually','geralmente'],['near','perto de'],['early','cedo']],q:[['Where does Olivia work?',['At a bookstore','At a hospital','At a school'],0,'Bookstore significa livraria.'],['When does she visit her sister?',['On Mondays','On Fridays','On Sundays'],1,'On Fridays = às sextas-feiras.'],['What does “near my house” mean?',['Longe da minha casa','Dentro da minha casa','Perto da minha casa'],2,'Near = perto de.']]},
{title:'Passado e futuro',level:'A2',story:'Last Saturday, Emma wanted to buy a laptop, but the computers were too expensive. She found a tutorial and repaired her old computer. Next weekend, she is going to visit her grandparents.',vocab:[['wanted','queria'],['found','encontrou'],['next weekend','próximo fim de semana']],q:[['Why did Emma not buy a laptop?',['It was too expensive','The store was closed','She lost her money'],0,'Too expensive = caro demais.'],['What did she do instead?',['Bought a phone','Repaired her computer','Called her grandparents'],1,'Repaired = consertou.'],['What will she do next weekend?',['Go shopping','Work late','Visit her grandparents'],2,'Is going to indica um plano futuro.']]},
{title:'Mensagens e e-mails',level:'A2',story:'Hi Alex, I received your message. The meeting has moved from Tuesday to Thursday at 10 a.m. Please send me the report before Wednesday evening. Thanks, Sarah.',vocab:[['received','recebi'],['moved','foi transferida'],['before','antes de']],q:[['When is the meeting now?',['Tuesday at 10','Thursday at 10','Wednesday evening'],1,'Moved from Tuesday to Thursday.'],['What must Alex send?',['A report','A photo','An invitation'],0,'Report = relatório.'],['What is the deadline?',['Thursday morning','Tuesday morning','Wednesday evening'],2,'Before Wednesday evening.']]},
{title:'Compras e preços',level:'A2',story:'This jacket costs $45, but there is a 20% discount today. Mia likes the blue one, although the black jacket is cheaper. She decides to wait until next week.',vocab:[['discount','desconto'],['although','embora'],['cheaper','mais barato']],q:[['What is on sale?',['A jacket','A backpack','A pair of shoes'],0,'Jacket = jaqueta.'],['Which jacket is cheaper?',['Blue','Black','Both cost the same'],1,'The black jacket is cheaper.'],['Does Mia buy it today?',['Yes','She buys two','No, she waits'],2,'She decides to wait.']]},
{title:'Viagem e direções',level:'A2',story:'The train leaves at 8:30, so Daniel arrives at the station twenty minutes early. His ticket says platform four, but the announcement changes it to platform six.',vocab:[['leaves','parte'],['platform','plataforma'],['announcement','aviso']],q:[['When does the train leave?',['8:10','8:30','8:50'],1,'Leaves at 8:30.'],['What platform is announced?',['Four','Five','Six'],2,'It changes to platform six.'],['Why does Daniel arrive early?',['To be at the station before departure','To buy food','To meet a friend'],0,'He arrives twenty minutes early.']]},
{title:'Tecnologia e problemas',level:'A2',story:'Lena could not open an important file because her computer was running out of storage. After deleting some old videos, she restarted the computer and opened the file successfully.',vocab:[['storage','armazenamento'],['deleting','apagando'],['successfully','com sucesso']],q:[['What was the problem?',['No internet','Low storage','Broken keyboard'],1,'Running out of storage = ficando sem espaço.'],['What did she delete?',['Old videos','Documents','Photos'],0,'Some old videos.'],['Did she open the file?',['No','Not mentioned','Yes'],2,'Successfully indica que conseguiu.']]},
{title:'Escolhas e consequências',level:'B1',story:'Although Rafael had enough money to buy a new bicycle, he chose to repair his old one. He saved the remaining money for a trip, which he had been planning for months.',vocab:[['although','embora'],['remaining','restante'],['had been planning','vinha planejando']],q:[['Why did Rafael not buy a new bicycle?',['He chose to repair his old one','He had no money','The shop was closed'],0,'He chose to repair his old one.'],['What did he save money for?',['A computer','A trip','A car'],1,'For a trip.'],['How long had he planned the trip?',['A few days','A week','Months'],2,'For months.']]},
{title:'Notícias e fatos',level:'B1',story:'A local library has extended its opening hours after a survey showed that many residents preferred visiting in the evening. The new schedule will be tested for three months.',vocab:[['extended','ampliou'],['survey','pesquisa'],['residents','moradores']],q:[['What changed?',['Book prices','Opening hours','The library address'],1,'Extended its opening hours.'],['Why was it changed?',['Residents preferred evenings','The library moved','Books were missing'],0,'Many residents preferred visiting in the evening.'],['How long is the test?',['One month','Six months','Three months'],2,'For three months.']]},
{title:'Comparações',level:'B1',story:'The smaller apartment is closer to the city center, but it is noisier and more expensive. The larger apartment is farther away, although it has a beautiful garden.',vocab:[['closer','mais perto'],['noisier','mais barulhento'],['farther','mais distante']],q:[['Which apartment costs more?',['The smaller one','The larger one','They cost the same'],0,'The smaller apartment is more expensive.'],['Which one has a garden?',['Smaller','Larger','Both'],1,'The larger apartment has a garden.'],['Which is closer to the center?',['Larger','Neither','Smaller'],2,'The smaller apartment is closer.']]},
{title:'Planos e condições',level:'B1',story:'If the weather improves tomorrow, Nina will go hiking with her friends. Otherwise, they will stay indoors and watch a documentary. They have already prepared everything they need.',vocab:[['if','se'],['otherwise','caso contrário'],['already','já']],q:[['What will they do if the weather improves?',['Go hiking','Watch a movie','Visit a museum'],0,'If the weather improves, they will go hiking.'],['What happens if it does not improve?',['They cancel all plans','They stay indoors','They go swimming'],1,'Otherwise, they will stay indoors.'],['Are they prepared?',['No','Not mentioned','Yes'],2,'They have already prepared everything.']]},
{title:'Entendendo opiniões',level:'B2',story:'In my opinion, working from home saves time because people do not need to commute. However, some workers find it harder to concentrate when they are surrounded by distractions.',vocab:[['commute','deslocar-se ao trabalho'],['however','porém'],['surrounded','cercados']],q:[['What is one benefit of working from home?',['Saving time','Getting a promotion','Working fewer days'],0,'People do not need to commute.'],['What is one disadvantage?',['More travel','Difficulty concentrating','Higher rent'],1,'Harder to concentrate.'],['Does the text present only advantages?',['Yes','It does not mention work','No'],2,'However introduces a contrasting idea.']]},
{title:'Interpretação avançada',level:'B2',story:'Despite several unexpected delays, the team completed the project before the deadline. Their manager praised their flexibility but suggested improving communication to avoid similar problems in the future.',vocab:[['despite','apesar de'],['praised','elogiou'],['deadline','prazo final']],q:[['Was the project completed on time?',['Yes','No','It was canceled'],0,'Before the deadline = antes do prazo.'],['What did the manager praise?',['Their budget','Their flexibility','Their equipment'],1,'Praised their flexibility.'],['What needs improvement?',['The building','The deadline','Communication'],2,'Suggested improving communication.']]}];

const PUZZLES=[{q:'Qual número continua a sequência? 2, 4, 8, 16, ...',opts:['24','32','30'],a:1,why:'Cada número é o dobro do anterior.'},{q:'Se todos os gatos são animais, qual afirmação é necessariamente verdadeira?',opts:['Todos os animais são gatos','Alguns animais não existem','Todos os gatos são animais'],a:2,why:'É exatamente a relação dada.'},{q:'Qual número falta? 3, 6, 11, 18, 27, ...',opts:['38','36','40'],a:0,why:'As diferenças são 3, 5, 7, 9 e 11.'},{q:'Uma camiseta custa R$ 80 e tem 25% de desconto. Qual o preço final?',opts:['R$ 65','R$ 60','R$ 55'],a:1,why:'25% de 80 = 20; 80 − 20 = 60.'},{q:'Ana é mais alta que Bia. Bia é mais alta que Carla. Quem é a mais baixa?',opts:['Ana','Bia','Carla'],a:2,why:'Carla está abaixo das outras duas na comparação.'},{q:'Qual palavra não pertence ao grupo?',opts:['Triângulo','Quadrado','Círculo'],a:2,why:'O círculo não possui lados retos.'},{q:'Se 5 máquinas fazem 5 peças em 5 minutos, quanto tempo 100 máquinas levam para fazer 100 peças?',opts:['100 minutos','5 minutos','20 minutos'],a:1,why:'Cada máquina faz 1 peça em 5 minutos, não importa quantas sejam.'},{q:'Complete: 1, 1, 2, 3, 5, 8, ...',opts:['11','12','13'],a:2,why:'Cada número é a soma dos dois anteriores (5 + 8).'},{q:'Um relógio marca 3h15. Qual o ângulo aproximado entre os ponteiros?',opts:['0°','7,5°','15°'],a:1,why:'O ponteiro das horas já andou 1/4 do caminho até o 4: 30° × 1/4 = 7,5°.'},{q:'Qual destas palavras é o “intruso”? Maçã, Banana, Cenoura, Uva',opts:['Banana','Cenoura','Uva'],a:1,why:'Cenoura é legume; as outras são frutas.'}];
