let goodNames = ["Haku", "Howl", "San"]; //Nombres de los buenos
let villainNames = ["Yubaba", "La Bruja del Páramo", "Lady Eboshi"]; // Nombres de los malos
let movButtons = []; //Botones HTML de los ataques
let charButtons = []; //Botones HTML de los personajes
let damageToVillain; //Daño que recibirá el villano
let damageToGood; //Daño que recibirá el bueno
let currVillain; //Malo actual
let goodChangesTo; //Personaje al que va a cambiar el bueno actual en el proximo turno. Si no se cmbiará, vale -1.
let villainChangesTo; //Personaje al que va a cambiar el malo actual en el proximo turno
let settedGoodMov; //Movimiento elegido por el jugador
let settedVillainMov; //Movimiento elegido por el malo
let gamePhase; //Fase actual del juego. Las fases del juego son: attack phase: para elegir el ataque;
//change phase: para cambiar de personaje; mov phase: en la que un personaje hace un movimiento y se guardan los resultados en variables
//mov effect phase: en la que se actualiza el efecto del movimiento anterior
let movNumber; //Numero de movimiento relizado en la ronda (1 o 2, ya que ambos personajes deben usar su movimiento)
let order; //Guarda el orden en el que se realizarán los ataque en la próxima ronda puede valer 'villainFirse' o 'goodFirst', según quien vaya primero
let mustChange; //Es true cuando el jugador está obigado a cambiar de personaje (Si acaba de morir)
let nextSentence; //Guarda la proxima frase que se mostrará en pantalla
let dragonHaku; //Variable para controlar el ataque "metamorfosis"
//Descripciones de los ataques de los buenos (primero los de Haku, luego los de Howl, luego los de San)
let goodDescriptions = [
  [
    "Causa daño al rival.",
    "Transforma a Haku en dragón por el proximo turno.",
    "Aumenta la velocidad de Haku.",
  ],
  [
    "Quema al rival lastimandolo durante los proximos turnos.",
    "Causa algo de daño al rival, y aumenta el ataque del equipo.",
    "Disminuye el ataque del rival.",
  ],
  [
    "Causa daño al rival.",
    "Aumenta mucho la velocidad y el ataque de San.",
    "Disminuye la defensa del rival.",
  ],
];
//Frases que se usarán durante el juego
let sentences = [
  "Disminuyó el ataque de todo tu equipo.",
  "Selecciona un movimiento.",
  "¡Has frenado las fuerzas del mal! Pero a qué costo...",
  "¡Felicidades, has ganado!",
  "Lo lamento, has perdido :(",
  "Selecciona un personaje.",
  "Causó daño.",
  "Haku se transfrmó en dragón.",
  "Aumentó su velocidad",
  "Aumentó el ataque de todo tu equipo.",
  "Disminuyó el ataque de su rival.",
  "Disminuyó la defenza de su rival.",
  "Quemó al rival.",
  "Entristeció al rival.",
  "Aumentó mucho su ataque",
  "aumentó mucho su velocidad",
  "La transformación terminó",
];
//Nombres de los ataques de los buenos
let goodAttackNames = [
  ["golpe", "Metamorfosis", "Agilidad"],
  ["Fuego", "Conjuro", "Encanto"],
  ["Puñal", "Montura", "Máscara"],
];
//Nombres de los ataques de los malos
let villainAttackNames = [
  ["Hechizo", "Ilusión", "Expl. laboral"],
  ["Envejecimiento", "Sequía", "Tristeza"],
  ["Fusil", "Progreso", "Estrategia"],
];
//para construir frase tipo "Haku ha usado rugido".
function movStatement(player) {
  if (player == "good") {
    return `${goods[currGood].name} ha usado ${settedGoodMov.name}.`;
  } else {
    return `${villains[currVillain].name} ha usado ${settedVillainMov.name}.`;
  }
}
//Para contrsuir frase tipo "Haku ya no puede combatir"
function cantFight(index) {
  return `${goods[index].name} ya no puede combatir.`;
}
//Para contruir frase tipo "Haku ya está en combate"
function isInCombat() {
  return `${goods[currGood].name} ya está en combate.`;
}
//Para contruir frase tipo "Haku ha salido del combate. Howl ha entrado en combate."
function charChangesSentence(type, actual, next) {
  return `${type[actual].name} ha salido del combate. ${type[next].name} ha entrado en combate.`;
}
//Para contruir frase tipo "Las llamas lastiman a Yubaba."
function isBurned() {
  return `Las llamas lastiman a ${villains[currVillain].name}.`;
}
//Para contruir frase tipo "Las tristeza lastima a Haku."
function isSad() {
  return `La tristeza lastima a ${goods[currGood].name}.`;
}
//Para contruir frase tipo "Yubaba ya no está quemada."
function isNotBurned() {
  return `${villains[currVillain].name} ya no está quemada.`;
}
//Para contruir frase tipo "Haku ya no está quemada."
function isNotSad() {
  return `${goods[currGood].name} ya no está triste.`;
}
//Función para ir construyendo la próxima frase que se mostrará. Si ya hay una frase, la siguiente se suma con un salto de línea. Si no, se establece una nueva
function addSentence(newSentence) {
  if (nextSentence == "none") {
    nextSentence = newSentence;
  } else {
    nextSentence += "<br>" + newSentence;
  }
}
//Para mostrar frases en el feedback container.
function showSentence(sentence) {
  document.getElementById("feedback_container").innerHTML = sentence;
  //Como ya se mostró la frase, la siguiente frase está por definir.
  nextSentence = "none";
}
//lista de ataques de los buenos con sus nombres (sacados del array de nombres), sus efectos
//y las descripciones que se muestran al poner el cursos sobre el boton (sacadas de su array).
//La mayoría de los ataques hacen un daño que se calcula con calcDamage(), y añaden una frase a mostrar.
let goodMovList = [
  [
    {
      name: goodAttackNames[0][0],
      effect: function () {
        damageToVillain = calcDamage(
          20,
          goods[currGood],
          villains[currVillain]
        );
        addSentence(sentences[6]);
      },
      description: goodDescriptions[0][0],
    },
    {
      name: goodAttackNames[0][1],
      effect: function () {
        dragonHaku = 1; //Establece que Haku se transformó en dragón
        addSentence(sentences[7]);
      },
      description: goodDescriptions[0][1],
    },
    {
      name: goodAttackNames[0][2],
      effect: function () {
        goods[currGood].vel += 1; //suma 1 a su velocidad
        addSentence(sentences[8]);
      },
      description: goodDescriptions[0][2],
    },
  ],
  [
    {
      name: goodAttackNames[1][0],
      effect: function () { //cambia el estado del rival a "burned", y el 1 es el contador de turnos que pasaron desde que se quemó
        villains[currVillain].state = ["burned", 1];
        addSentence(sentences[12]);
      },
      description: goodDescriptions[1][0],
    },
    {
      name: goodAttackNames[1][1],
      effect: function () {
        damageToVillain = calcDamage(
          20,
          goods[currGood],
          villains[currVillain]
        );
        for (let i = 0; i < goods.length; i++) { //A todos los personajes buenos les aumenta el ataque
          goods[i].extraAttack += 2;
        }
        addSentence(sentences[6]);
        addSentence(sentences[9]);
      },
      description: goodDescriptions[1][1],
    },
    {
      name: goodAttackNames[1][2],
      effect: function () { //Le resta ataque al enemigo
        villains[currVillain].extraAttack -= 2;
        addSentence(sentences[10]);
      },
      description: goodDescriptions[1][2],
    },
  ],
  [
    {
      name: goodAttackNames[2][0],
      effect: function () {
        damageToVillain = calcDamage(
          20,
          goods[currGood],
          villains[currVillain]
        );
        addSentence(sentences[6]);
      },
      description: goodDescriptions[2][0],
    },
    {
      name: goodAttackNames[2][1],
      effect: function () {//Suma ataque y velocidad
        goods[currGood].extraAttack += 3;
        goods[currGood].vel += 3;
        addSentence(sentences[14]);
        addSentence(sentences[15]);
      },
      description: goodDescriptions[2][1],
    },
    {
      name: goodAttackNames[2][2],
      effect: function () {//Resta a la defenza del rival, pero no puede pasar de -9
        villains[currVillain].def -= 2
        if (goods[currGood].def < -9) {
          goods[currGood].def = -9;
        }
        addSentence(sentences[11]);
      },
      description: goodDescriptions[2][2],
    },
  ],
];
//lista de ataques de los malos.
let villainMovList = [
  [
    {
      name: villainAttackNames[0][0],
      effect: function () {
        damageToGood = calcDamage(15, villains[currVillain], goods[currGood]);
        addSentence(sentences[6]);
      },
    },
    {
      name: villainAttackNames[0][1],
      effect: function () { //resta ataque a todos los personajes buenos
        for (let i = 0; i < goods.length; i++) {
          goods[i].extraAttack -= 1;
        }
        addSentence(sentences[0]);
      },
    },
    {
      name: villainAttackNames[0][2],
      effect: function () {
        damageToGood = calcDamage(15, villains[currVillain], goods[currGood]);
        addSentence(sentences[6]);
      },
    },
  ],
  [
    {
      name: villainAttackNames[1][0],
      effect: function () {
        goods[currGood].def -= 1
        if (goods[currGood].def < -9) {
          goods[currGood].def = -9;
        }
        addSentence(sentences[11]);
      },
    },
    {
      name: villainAttackNames[1][1],
      effect: function () {
        damageToGood = calcDamage(15, villains[currVillain], goods[currGood]);
        addSentence(sentences[6]);
      },
    },
    {
      name: villainAttackNames[1][2],
      effect: function () { //Establece que el estado de tu personaje es igual a "sad". El segundo parámetro es el contador de puntos
        goods[currGood].state = ["sad", 1];
        addSentence(sentences[13]);
      },
    },
  ],
  [
    {
      name: villainAttackNames[2][0],
      effect: function () {
        damageToGood = calcDamage(25, villains[currVillain], goods[currGood]);
        addSentence(sentences[6]);
      },
    },
    {
      name: villainAttackNames[2][1],
      effect: function () {//Se suma ataque
        villains[currVillain].extraAttack += 3;
        addSentence(sentences[14]);
      },
    },
    {
      name: villainAttackNames[2][2],
      effect: function () {//Se suma velocidad
        villains[currVillain].vel += 1;
        addSentence(sentences[8]);
      },
    },
  ],
];

let goods = [];//Array de personajes buenos
let villains = [];//Array de personajes malos

//Para iniciar el juego
function start() {
  //Se acomadan los elementos HTML.
  movButtons = document.getElementsByClassName("mov_button");
  charButtons = document.getElementsByClassName("char_button");
  document.getElementById("game_container").style.display = "flex";
  document.getElementById("start_button").style.display = "none";
  document.getElementById("game_over").style.display = "none";
  document.getElementById("cover").style.display = "none";
  document.getElementById("game_over").style.display = "none";
  for(let i = 0; i < charButtons.length; i ++) {
    charButtons[i].classList.remove('button_active')
  }
  //Se inicializan personajes buenos y malos con sus estadisticas, su imagen, nombre, ataque, movimientos y estado, que podrá ser "none", "burned" o "sad"
  goods = [
    {
      name: goodNames[0],
      hp: 100,
      vel: 0.1,
      def: 1.5,
      extraAttack: 0,
      state: "none",
      movs: goodMovList[0],
      image: "images/haku.png",
    },
    {
      name: goodNames[1],
      hp: 100,
      vel: 0.5,
      def: 1,
      extraAttack: 0,
      state: "none",
      movs: goodMovList[1],
      image: "images/howl.png",
    },
    {
      name: goodNames[2],
      hp: 100,
      vel: 0.3,
      def: 0,
      extraAttack: 0,
      state: "none",
      movs: goodMovList[2],
      image: "images/san.png",
    },
  ];

  //Personajes malos
  villains = [
    {
      name: villainNames[0],
      hp: 100,
      vel: 0.6,
      def: 1.5,
      extraAttack: 0,
      state: "none",
      movs: villainMovList[0],
      image: "images/yubaba.png",
    },
    {
      name: villainNames[1],
      hp: 100,
      vel: 0.4,
      def: 1,
      extraAttack: 0,
      state: "none",
      movs: villainMovList[1],
      image: "images/witch-of-the-waste.png",
    },
    {
      name: villainNames[2],
      hp: 100,
      vel: 0.2,
      def: 0,
      extraAttack: 0,
      state: "none",
      movs: villainMovList[2],
      image: "images/eboshi.png",
    },
  ];

  
  //Se setean los pjs iniciales
  currGood = 0;
  currVillain = 0;
  //Se establece que los personajes no están por cambiar, ni por hacerse daño
  goodChangesTo = -1;
  villainChangesTo = -1;
  damageToVillain = 0;
  damageToGood = 0;
  //se inicializa la variable de control del ataque "metamorfosis"
  dragonHaku = 0;
  //Todavía no hay una frase que mostrar
  nextSentence = "none";
  //Se pasa a la attack phase
  attackPhase();
}

//Attack phase
function attackPhase() {
  //Se acomodan los elementos HTML
  document.getElementById("attack_button").style.display = "block";
  document.getElementById("attack_button").classList.add("button_active");
  document.getElementById("change_button").style.display = "block";
  document.getElementById("change_button").classList.remove("button_active");
  document.getElementById("next_button").style.display = "none";
  for (let i = 0; i < movButtons.length; i++) {
    movButtons[i].style.display = "block";
  }
  

  for (let i = 0; i < charButtons.length; i++) {
    charButtons[i].style.display = "none";
  }
  //Estámos en la attack phase, se muestra la frase correspondiente con ShowPhaseSentence()
  gamePhase = "attackPhase";
  showPhaseSentence()
  //Si había personajes pendientes de cambiar, se cambian. Siempre que los personajes cambien, los valores de "villainChangesTo" y de "goodChangesTo" volverán a -1
  if (goodChangesTo != -1) {
    currGood = goodChangesTo;
  }
  if (villainChangesTo != -1) {
    currVillain = villainChangesTo;
  }
  goodChangesTo = -1;
  villainChangesTo = -1;
  //Se muestran las imágenes, nombres y HP de los pjs
  updateCharacters();
  //El villano elige su movimiento
  villainMovSelection();
  //Se calcula el orden en el que atacarán los personajes, según sus velocidades
  order =
    goods[currGood].vel >= villains[currVillain].vel
      ? "goodFirst"
      : "villainFirst";
}

//Se activa cuando se clickea para elegir un mov, se guarda la elección y se pasa a la mov Phase con movNumber = 1
function clickMov(index) {
  settedGoodMov = goods[currGood].movs[index];
  movNumber = 1;
  movPhase();
}

//Para activar la mov phase.
function movPhase() {
  gamePhase = "movPhase";
  //Se acomodan los elementos HTML.
  document.getElementById("attack_button").style.display = "none";
  document.getElementById("change_button").style.display = "none";
  document.getElementById("next_button").style.display = "block";
  for (i = 0; i < movButtons.length; i++) {
    movButtons[i].style.display = "none";
  }
  for (i = 0; i < charButtons.length; i++) {
    charButtons[i].style.display = "none";
  }
  //Le toca al que vaya primero segun "order"
  if (
    (order == "goodFirst" && movNumber == 1) ||
    (order == "villainFirst" && movNumber == 2)
  ) {//Si le toca al bueno
    if (goodChangesTo != -1) {//Si eligió cambiar de personaje. Se establece el nuevo personaje en currGood, aunque el cambio no se mostrará hasta la mov effect phase
      addSentence(charChangesSentence(goods, currGood, goodChangesTo));
      currGood = goodChangesTo;
      goodChangesTo = -1;
      next();//Se pasa a la mov effect phase sin esperar a que el jugador acepte, para acelerar
    } else {
      if (settedGoodMov != "none") {//Si hay un movimiento seteado, se activa su efecto y se muestra una frase
        showSentence(movStatement("good"));
        settedGoodMov.effect();
      }
      settedGoodMov = "none"; //El ataque ya se usó, asi que se resetea
    }
  } else {
    if (villainChangesTo != -1) {//Identico procedimiento para el villano
      addSentence(charChangesSentence(villains, currVillain, villainChangesTo));
      currVillain = villainChangesTo;
      villainChangesTo = -1;
      next();
    } else {
      if (settedVillainMov != "none") {
        showSentence(movStatement("villain"));
        settedVillainMov.effect();
      }
      settedVillainMov = "none";
    }
  }
}

//Para activar la mov phase.
function movEffectPhase() {
  gamePhase = "movEffectPhase";
  //Si el villano está quemado, se suma al daño.
  if (movNumber == 2 && villains[currVillain].state[0] == "burned") {
    damageToVillain += 7;
    addSentence(isBurned());
    if (villains[currVillain].state[1] < 4) {//Según hace cuantos turnos esté quemado, se aumenta el contador o se retira la quemadura.
      villains[currVillain].state[1]++;
    } else {
      addSentence(isNotBurned());
      villains[currVillain].state[0] = "none";
      villains[currVillain].state[1] = 0;
    }
  }
  //Similar procedimiento para el estado de tristeza.
  if (movNumber == 2 && goods[currGood].state[0] == "sad") {
    damageToGood += 5;
    addSentence(isSad());
    if (goods[currGood].state[1] < 3) {
      goods[currGood].state[1]++;
    } else {
      addSentence(isNotSad());
      goods[currGood].state[0] = "none";
      goods[currGood].state[1] = 0;
    }
  }
  //En caso de que el villano muriera con el siguiente ataque
  if (villains[currVillain].hp - damageToVillain <= 0) {
    villains[currVillain].hp = 0;//El HP baja a 0.
    if (isWon()) {//Se verifica si el jugador ganó
      end();//Caso afirmativo, termina el juego 
    } else {
      villainChanges();//Caso negativo, se cambia el villano
    }
  } else {//En caso de que el villano no muriera con el siguiente ataque
    villains[currVillain].hp -= damageToVillain;//Se efectua el daño
    damageToVillain = 0;//Se resetea el valor de daño
  }
  //Mismo procedimiento para los buenos
  if (goods[currGood].hp - damageToGood <= 0) {
    goods[currGood].hp = 0;
    if (isLost()) {
      end();
    } else {
      addSentence(cantFight(currGood));
      mustChange = true;
      charButtons[currGood].classList.add("button_active");
      changePhase();
    }
  } else {
    goods[currGood].hp -= damageToGood;
    damageToGood = 0;
  }

  if (movNumber == 2) {
    if (dragonHaku == 1) {
      dragonHaku++;
      goods[0].image = "images/haku-dragon.png";
    } else if (dragonHaku > 1) {
      dragonHaku = 0;
      goods[0].image = "images/haku.png";
      addSentence(sentences[16]);
    }
  }
  //Se actualizan los HPs
  updateCharacters();
  //Se muestra la frase que explica todo lo que pasó
  showSentence(nextSentence);
}
//Para que el villano elija su movimiento
function villainMovSelection() {
  //Se sortea el número de índice del próximo movimiento
  if(Math.random() < 0.5) {//El primer ataque tiene un 50% de probabilidades
    selection = 0
  } else if (Math.random() < 0.5) {//Los otros tienen un 25%
    selection = 1
  } else {
    selection = 2
  }//Se guarda el siguiente movimiento
  settedVillainMov = villains[currVillain].movs[selection]
}

//Cuando el jugador clickea "siguiente"
function next() {
  if (gamePhase == "movPhase") {//En caso de estar en la mov phase
    movEffectPhase();//Se pasa a la mov effect phase
  } else if (gamePhase == "movEffectPhase") {//En caso de estar en la mov effect phase
    if (movNumber == 1) {//Si iba por el primer movimiento
      movNumber = 2;//Se sigue con el segundo, volviendo a la mov phase
      movPhase();
    } else {//Si ya se iba por el segundo movimiento, se pasa a la attack phase
      attackPhase();
    }
  }
}

//Para activar la change phase
function changePhase() {
  if (mustChange) {//Si se está obligado a cambiar de personaje, se ocultan el resto de los botones, la variable gamePhase no cambia, para no perder el punto de la ronda por la que se iba
    document.getElementById("attack_button").style.display = "none";
    document.getElementById("next_button").style.display = "none";
  } else {
    gamePhase = "changePhase";
  }
  addSentence(sentences[5]);//Se añade la frase para que el jugador seleccione un personaje
  //Acomoda los botones
  for (let i = 0; i < charButtons.length; i++) {
    charButtons[i].style.display = "block";
  }
  for (let i = 0; i < movButtons.length; i++) {
    movButtons[i].style.display = "none";
  }
  document.getElementById("attack_button").classList.remove("button_active");
  document.getElementById("change_button").classList.add("button_active");
}

//Para seleccionar a qué personaje cambiar. Recive el número de índice del personaje
function changeTo(index) {
  if (goods[index].hp <= 0) {//Si el pj ya está muerto
    showSentence(cantFight(index));//No permite elegirlo
  } else if (index == currGood) {//Si el pj ya está en combate
    showSentence(isInCombat());//Tampoco permite elegirlo
  } else {//Otro caso
    goodChangesTo = index;//Se guarda la elección en goodChangesTo
    if (!mustChange) {//Si el cambio no era obligatorio (se realizó durante el turno)
      movNumber = 1;//se sigue por el primer mov de la mov phase.
      movPhase();
    } else {//si SÍ era obligatorio, se establece que ya se realizó y se sigue por la fase del combate que corresponda
      mustChange = false;
      next();
    }
  }
}
//Si el villano muere y debe ser reemplazado
function villainChanges() {
  do {//Se sortea el número de índice del nuevo villano
    villainChangesTo = Math.floor(Math.random() * villains.length);
  } while (//Hasta que salga un número válido
    villainChangesTo == currVillain ||
    villains[villainChangesTo].hp <= 0
  );
}
//Para calcular el daño recibido por un movimiento del pj contrario. Los parámetros son el daño base del movimiento, y los personajes atacante y receptor 
function calcDamage(damage, attacker, target) {
  let extraPower = 1;//Si el pj es Haku y es un dragón, se establece un multiplicador X2.2
  if (dragonHaku != 0) {
    extraPower = 2.2;
  }
  //Se calcula el daño
  let calc =
    (damage + attacker.extraAttack) * extraPower * (1 / (1 + 0.1 * target.def));
  //Un golpe no puede sumar salud
  if (calc < 0) {
    calc = 0;
  }
  return calc; //retorna el resultado
}
//Para evaluar si perdiste
function isLost() {
  let lost = true;//Se fija pj por pj si están todos muertos
  for (let i = 0; i < goods.length; i++) {
    if (goods[i].hp > 0) {
      lost = false;
    }
  }
  return lost;
}
//Para evaluar si ganaste
function isWon() {
  let won = true;//Se fija pj por pj si están todos muertos
  for (let i = 0; i < villains.length; i++) {
    if (villains[i].hp > 0) {
      won = false;
    }
  }
  return won;
}
//Para terminar el juego
function end() {
  //Se acomodan los elementosHTML
  document.getElementById("start_button").style.display = "block";
  document.getElementById("game_over").style.display = "block";
  document.getElementById("cover").style.display = "block";
  document.getElementById("game_container").style.display = "none";
  //Para decidir que frase mostrar según si ganaste, perdiste, o empataste
  if (isWon() && isLost()) {
    document.getElementById("game_over").innerHTML = sentences[2];
  } else if (isWon()) {
    document.getElementById("game_over").innerHTML = sentences[3];
  } else if (isLost()) {
    document.getElementById("game_over").innerHTML = sentences[4];
  }
}
//Para actualizar las vidas, imágenes los nombres y los nombres de los movimientos de los pjs en combate
function updateCharacters() {
  document.getElementById("good_hp").style.width = goods[currGood].hp + "%";
  document.getElementById("villain_hp").style.width =
    villains[currVillain].hp + "%";
  document.getElementById("good_name").innerHTML = goods[currGood].name;
  document.getElementById("villain_name").innerHTML =
    villains[currVillain].name;
  document.getElementById("good_image").src = goods[currGood].image;
  document.getElementById("villain_image").src = villains[currVillain].image;
  for (let i = 0; i < movButtons.length; i++) {
    movButtons[i].innerHTML = goods[currGood].movs[i].name;
  }
}
//Se activa cuando el jugador pasa el cursor sobre los botones
function descrive(index) {
  if (index == 3) {//Index es 3 si el botón era el de atacar
    showSentence(sentences[1]);
  } else if (index == 4) {//Index es 4 si el boton era el de cambiar 
    showSentence(sentences[5]);
  } else {//Es 0, 1, o 2 si el botón es el de algúno de los ataques (coincide con su número de índice)
    showSentence(goods[currGood].movs[index].description);
  }
}
//Para mostrar la frase por defecto de la attack phase o l achange phase, según en cual se encuentre
function showPhaseSentence() {
  if (gamePhase == "attackPhase") {
    showSentence(sentences[1]);
  }
  if (gamePhase == "changePhase") {
    showSentence(sentences[5]);
  }
}
