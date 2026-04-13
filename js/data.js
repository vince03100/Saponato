const TOURNAMENT = {
  name: "SapoNaMi",
  edition: "2025",
  dates: "7 — 13 Luglio 2025",
  location: "Campo Sportivo Municipale",
};

const GROUPS = {
  A: {
    teams: [
      { name: "Latine Selvaggi",   g:3, v:3, p:0, s:0, gf:8,  gs:2,  highlight: true },
      { name: "Colosseo FC",       g:3, v:2, p:0, s:1, gf:5,  gs:4  },
      { name: "Ostia Pirates",     g:3, v:1, p:0, s:2, gf:3,  gs:5  },
      { name: "Primavalle Lions",  g:3, v:0, p:0, s:3, gf:1,  gs:6  },
    ]
  },
  B: {
    teams: [
      { name: "I Gladiatori",      g:3, v:2, p:1, s:0, gf:7,  gs:3  },
      { name: "Trastevere Tigers", g:3, v:1, p:2, s:0, gf:5,  gs:4  },
      { name: "EUR Eagles",        g:3, v:1, p:0, s:2, gf:3,  gs:5  },
      { name: "Tiburtina Exp.",    g:3, v:0, p:1, s:2, gf:3,  gs:6  },
    ]
  },
  C: {
    teams: [
      { name: "Muri Storici",      g:3, v:2, p:1, s:0, gf:6,  gs:3  },
      { name: "Garbatella FC",     g:3, v:2, p:0, s:1, gf:5,  gs:3  },
      { name: "Ponte Milvio",      g:3, v:1, p:0, s:2, gf:4,  gs:5  },
      { name: "Flaminio Sharks",   g:3, v:0, p:1, s:2, gf:2,  gs:6  },
    ]
  },
  D: {
    teams: [
      { name: "Carbonara Utd",     g:3, v:3, p:0, s:0, gf:9,  gs:3  },
      { name: "Pigneto United",    g:3, v:1, p:1, s:1, gf:4,  gs:5  },
      { name: "I Sette Re",        g:3, v:1, p:1, s:1, gf:4,  gs:5  },
      { name: "Casilino Warr.",    g:3, v:0, p:0, s:3, gf:2,  gs:6  },
    ]
  },
  E: {
    teams: [
      { name: "Lupa Capitolina",   g:3, v:3, p:0, s:0, gf:7,  gs:2  },
      { name: "Prati Warriors",    g:3, v:2, p:0, s:1, gf:5,  gs:3  },
      { name: "Centocelle Vip.",   g:3, v:1, p:0, s:2, gf:3,  gs:5  },
      { name: "Appio Latino",      g:3, v:0, p:0, s:3, gf:1,  gs:6  },
    ]
  },
  F: {
    teams: [
      { name: "Testaccio Boys",    g:3, v:2, p:1, s:0, gf:6,  gs:3  },
      { name: "Nomentana Stars",   g:3, v:1, p:2, s:0, gf:5,  gs:4  },
      { name: "Tor Bella Mon.",    g:3, v:1, p:0, s:2, gf:3,  gs:5  },
      { name: "Tuscolano FC",      g:3, v:0, p:1, s:2, gf:3,  gs:5  },
    ]
  },
  G: {
    teams: [
      { name: "Trionfale FC",      g:3, v:2, p:1, s:0, gf:6,  gs:3  },
      { name: "Aurelia FC",        g:3, v:2, p:0, s:1, gf:5,  gs:3  },
      { name: "Prenestino Bulls",  g:3, v:1, p:0, s:2, gf:4,  gs:5  },
      { name: "Quadraro United",   g:3, v:0, p:1, s:2, gf:2,  gs:6  },
    ]
  },
  H: {
    teams: [
      { name: "Monte Sacro FC",    g:3, v:3, p:0, s:0, gf:8,  gs:2  },
      { name: "Portuense FC",      g:3, v:1, p:1, s:1, gf:4,  gs:5  },
      { name: "Marconi Boys",      g:3, v:1, p:0, s:2, gf:3,  gs:5  },
      { name: "Parioli Elegance",  g:3, v:0, p:1, s:2, gf:2,  gs:5  },
    ]
  },
};

const PLAYED = [
  {
    day: "Lunedì 7 Luglio", label: "Giornata 1",
    matches: [
      { home:"Latine Selvaggi", away:"Primavalle Lions", sh:3, sa:0, grp:"A" },
      { home:"Colosseo FC",     away:"Ostia Pirates",    sh:2, sa:1, grp:"A" },
      { home:"I Gladiatori",    away:"Tiburtina Exp.",   sh:3, sa:1, grp:"B" },
      { home:"Trastevere Tigers",away:"EUR Eagles",      sh:2, sa:1, grp:"B" },
      { home:"Muri Storici",    away:"Flaminio Sharks",  sh:2, sa:1, grp:"C" },
      { home:"Garbatella FC",   away:"Ponte Milvio",     sh:1, sa:0, grp:"C" },
      { home:"Carbonara Utd",   away:"Casilino Warr.",   sh:4, sa:1, grp:"D" },
      { home:"Pigneto United",  away:"I Sette Re",       sh:2, sa:1, grp:"D" },
    ]
  },
  {
    day: "Martedì 8 Luglio", label: "Giornata 2",
    matches: [
      { home:"Latine Selvaggi",  away:"Ostia Pirates",      sh:2, sa:1, grp:"A" },
      { home:"Colosseo FC",      away:"Primavalle Lions",   sh:1, sa:0, grp:"A" },
      { home:"I Gladiatori",     away:"EUR Eagles",         sh:3, sa:1, grp:"B" },
      { home:"Trastevere Tigers",away:"Tiburtina Exp.",     sh:2, sa:1, grp:"B" },
      { home:"Ponte Milvio",     away:"Flaminio Sharks",    sh:4, sa:0, grp:"C" },
      { home:"Garbatella FC",    away:"Muri Storici",       sh:2, sa:1, grp:"C" },
      { home:"Carbonara Utd",    away:"I Sette Re",         sh:3, sa:2, grp:"D" },
      { home:"Pigneto United",   away:"Casilino Warr.",     sh:1, sa:1, grp:"D" },
      { home:"Lupa Capitolina",  away:"Appio Latino",       sh:3, sa:0, grp:"E" },
      { home:"Prati Warriors",   away:"Centocelle Vip.",    sh:2, sa:1, grp:"E" },
      { home:"Testaccio Boys",   away:"Tuscolano FC",       sh:2, sa:1, grp:"F" },
      { home:"Nomentana Stars",  away:"Tor Bella Mon.",     sh:2, sa:1, grp:"F" },
      { home:"Trionfale FC",     away:"Quadraro United",    sh:3, sa:1, grp:"G" },
      { home:"Aurelia FC",       away:"Prenestino Bulls",   sh:2, sa:1, grp:"G" },
      { home:"Monte Sacro FC",   away:"Parioli Elegance",   sh:4, sa:0, grp:"H" },
      { home:"Portuense FC",     away:"Marconi Boys",       sh:2, sa:1, grp:"H" },
    ]
  },
  {
    day: "Mercoledì 9 Luglio", label: "Giornata 3",
    matches: [
      { home:"Latine Selvaggi",  away:"Colosseo FC",        sh:3, sa:2, grp:"A" },
      { home:"Ostia Pirates",    away:"Primavalle Lions",   sh:1, sa:1, grp:"A" },
      { home:"I Gladiatori",     away:"Trastevere Tigers",  sh:1, sa:1, grp:"B" },
      { home:"EUR Eagles",       away:"Tiburtina Exp.",     sh:1, sa:1, grp:"B" },
      { home:"Muri Storici",     away:"Ponte Milvio",       sh:2, sa:2, grp:"C" },
      { home:"Garbatella FC",    away:"Flaminio Sharks",    sh:2, sa:1, grp:"C" },
      { home:"Carbonara Utd",    away:"Pigneto United",     sh:2, sa:1, grp:"D" },
      { home:"I Sette Re",       away:"Casilino Warr.",     sh:1, sa:0, grp:"D" },
      { home:"Lupa Capitolina",  away:"Centocelle Vip.",    sh:2, sa:1, grp:"E" },
      { home:"Prati Warriors",   away:"Appio Latino",       sh:3, sa:1, grp:"E" },
      { home:"Testaccio Boys",   away:"Nomentana Stars",    sh:2, sa:2, grp:"F" },
      { home:"Tor Bella Mon.",   away:"Tuscolano FC",       sh:2, sa:1, grp:"F" },
      { home:"Trionfale FC",     away:"Prenestino Bulls",   sh:2, sa:2, grp:"G" },
      { home:"Aurelia FC",       away:"Quadraro United",    sh:1, sa:0, grp:"G" },
      { home:"Monte Sacro FC",   away:"Marconi Boys",       sh:2, sa:1, grp:"H" },
      { home:"Portuense FC",     away:"Parioli Elegance",   sh:1, sa:1, grp:"H" },
    ]
  },
];

const UPCOMING = [
  {
    day: "Venerdì 11 Luglio", label: "Quarti di Finale",
    matches: [
      { home:"Latine Selvaggi",  away:"Trastevere Tigers", time:"17:00", grp:"QF" },
      { home:"Carbonara Utd",    away:"Muri Storici",      time:"17:45", grp:"QF" },
      { home:"Lupa Capitolina",  away:"Nomentana Stars",   time:"18:30", grp:"QF" },
      { home:"Monte Sacro FC",   away:"Trionfale FC",      time:"19:15", grp:"QF" },
      { home:"Colosseo FC",      away:"I Gladiatori",      time:"20:00", grp:"QF" },
      { home:"Garbatella FC",    away:"Pigneto United",    time:"20:45", grp:"QF" },
      { home:"Prati Warriors",   away:"Testaccio Boys",    time:"21:30", grp:"QF" },
      { home:"Aurelia FC",       away:"Portuense FC",      time:"22:15", grp:"QF" },
    ]
  },
  {
    day: "Sabato 12 Luglio", label: "Semifinali",
    matches: [
      { home:"Vincitore QF1", away:"Vincitore QF2", time:"17:00", grp:"SF" },
      { home:"Vincitore QF3", away:"Vincitore QF4", time:"18:15", grp:"SF" },
      { home:"Vincitore QF5", away:"Vincitore QF6", time:"19:30", grp:"SF" },
      { home:"Vincitore QF7", away:"Vincitore QF8", time:"20:45", grp:"SF" },
    ]
  },
  {
    day: "Domenica 13 Luglio", label: "Gran Finale",
    matches: [
      { home:"Semifinalista 1", away:"Semifinalista 2", time:"17:00", grp:"3°" },
      { home:"Finalista 1",     away:"Finalista 2",     time:"19:30", grp:"FINALE", isFinal: true },
    ]
  },
];
