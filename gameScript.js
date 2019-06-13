var display = document.getElementById('display');
var click = document.getElementById('click');
var multiply = document.getElementById('multiply');
var autoclick = document.getElementById('autoclick');
var bonus = document.getElementById('bonus');
let healthBar = document.getElementById("health");

var multiplierCost = 20;
var autoclickCost = 50;
var bonusCost = 250;

var autoclickOn = false;
var bonusOn = false;

var score = 0;
var clickValue = 1;
var multiplier = 1;
var bonusTime = 20;
var level = 1;
var subLevel = 1;
var health = 8;
var counter = 0;

var imgArray = new Array();
imgArray[0] = "url('images/Background1.jpg')";
imgArray[1] = "url('images/Background2.jpg')";
imgArray[2] = "url('images/Background3.jpg')";
imgArray[3] = "url('images/Background4.jpg')";
imgArray[4] = "url('images/Background5.jpg')";

var nextLvlArray = new Array();
nextLvlArray[0] = "images/Background1.jpg";
nextLvlArray[1] = "images/Background2.jpg";
nextLvlArray[2] = "images/Background3.jpg";
nextLvlArray[3] = "images/Background4.jpg";
nextLvlArray[4] = "images/Background5.jpg";

var ghostArray = new Array();
ghostArray[0] = "images/Ghost1.gif";
ghostArray[1] = "images/Ghost2.gif";
ghostArray[2] = "images/Ghost3.gif";
ghostArray[3] = "images/Ghost4.gif";
ghostArray[4] = "images/Ghost5.gif";


function displayScore() {
  display1.innerHTML = 'Level ' + level;
}

function displayLevel() {
  display3.innerHTML = subLevel + '/8';
}

function displayHealth() {
  healthBar.value = health;
}

function displaySubLevel() {
  display5.innerHTML = score;
}

function displayMultiplier() {
  multiply.value = 'Multiplier x' + multiplier + ' (cost ' + multiplierCost + ')';
}

function displayAutoclick() {
  autoclick.value = 'Autoclick (cost ' + autoclickCost + ')';
}

function displayBonus() {
  bonus.value = 'Bonus (cost ' + bonusCost + ')';
}

function displayBonusTime() {
  bonus.value = 'Bonus (time: ' + bonusTime + ' sec)';
}

function multiplyEnabler() {
  if (score >= multiplierCost) {
    multiply.disabled = false;
  } else {
    multiply.disabled = true;
  }
}

function autoclickEnabler() {
  if (!autoclickOn && score >= autoclickCost) {
    autoclick.disabled = false;
  } else {
    autoclick.disabled = true;
  }
}

function bonusEnabler() {
  if (!bonusOn && score >= bonusCost) {
    bonus.disabled = false;
  } else {
    bonus.disabled = true;
  }
}

function buttonsEnabler() {
  multiplyEnabler();
  autoclickEnabler();
  bonusEnabler();
}

function increaseScore() {
  health -= clickValue;
  if (health <= 0) {
    var x = Math.floor(Math.random() * 1000) + 75;
    var y = Math.floor(Math.random() * 4);
    document.getElementById("click").src = ghostArray[y];
    if (level % 5 == 0 && subLevel == 1) {
      counter++;
      document.getElementById("bg1").style.backgroundImage = imgArray[counter];
      document.getElementById("lastLevel").src = nextLvlArray[counter - 1];
      document.getElementById("thisLevel").src = nextLvlArray[counter];
      document.getElementById("nextLevel").src = nextLvlArray[counter + 1];
      if (counter > 4) {
        counter = 0;
      }
    }
    subLevel += 1;
    score += x * level * subLevel;
    health = 8 * level * subLevel;
    document.getElementById("health").max = health;
    if (subLevel > 8) {
      level += 1;
      subLevel = 1;
    }
    if (subLevel == 8) {
      health = 8 * level * subLevel * 5;
      document.getElementById("health").max = health;
    }
  }

  buttonsEnabler();
  displayScore();
  displayHealth();
  displayLevel();
  displaySubLevel();
}

function increaseMultiplier() {
  score -= multiplierCost;
  multiplier += 1;
  clickValue = multiplier;
  if (bonusOn) {
    clickValue *= 2;
  }
  multiplierCost = Math.round(multiplierCost * 1.5);
  buttonsEnabler();
  displayScore();
  displayMultiplier();
}

function enableAutoclick() {
  score -= autoclickCost;
  autoclickOn = true;
  autoclick.disabled = true;
  displayScore();
}

function autoclickF() {
  if (autoclickOn) {
    increaseScore();
  }
}

function enableBonus() {
  score -= bonusCost;
  bonusOn = true;
  clickValue *= 2;
  bonus.disabled = true;
  displayScore();
  displayBonusTime();
}

function disableBonus() {
  bonusOn = false;
  bonusTime = 20;
  clickValue = multiplier;
  displayBonus();
  buttonsEnabler();
}

function bonusF() {
  if (bonusOn) {
    --bonusTime;
    displayBonusTime();
    if (bonusTime === 0) {
      disableBonus();
    }
  }
}

displayScore();
displayHealth();
displayLevel();
displaySubLevel();
displayMultiplier();
displayAutoclick();
displayBonus();
multiply.disabled = true;
autoclick.disabled = true;
bonus.disabled = true;

click.addEventListener('click', increaseScore);
multiply.addEventListener('click', increaseMultiplier);
autoclick.addEventListener('click', enableAutoclick);
bonus.addEventListener('click', enableBonus);
autoclickInterval = window.setInterval(autoclickF, 1000);
bonusInterval = window.setInterval(bonusF, 1000);