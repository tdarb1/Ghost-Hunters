var display = document.getElementById('display');
var click = document.getElementById('click');
var multiply = document.getElementById('multiply');
var autoclick = document.getElementById('autoclick');
var bonus = document.getElementById('bonus');

var multiplierCost = 20;
var autoclickCost = 50;
var bonusCost = 250;

var autoclickOn = false;
var bonusOn = false;

var score = 0;
var clickValue = 1;
var multiplier = 1;
var bonusTime = 10;
var level = 1;
var subLevel = 1;
var health = 8;

function displayScore() {
  display.innerHTML = score;
}

function displayHealth() {
  display1.innerHTML = health;
}

function displayLevel() {
  display2.innerHTML = level;
}

function displaySubLevel() {
  display3.innerHTML = subLevel;
}

function displayMultiplier() {
  multiply.value = 'Multiplier x' + multiplier + ' (next: cost ' + multiplierCost + ')';
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
  if (subLevel > 8){
    level +=1;
    subLevel = 1;
  }
  if (health <= 0){
  score += 20 * level * subLevel;
  subLevel +=1;
  health = 8 * level * subLevel;
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
  multiplierCost *= multiplier;
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
