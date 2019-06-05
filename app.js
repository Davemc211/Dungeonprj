let playerOne, enemy, ui, game, enemyDB;

const UIplayerHealth = document.getElementById('player-health-bar');
const UIenemyHealth = document.getElementById('enemy-health-bar');
let attribPoints = parseInt(document.getElementById('attrib-points').textContent)
let strValue = parseInt(document.getElementById('quantityStr').textContent);
let agiValue = parseInt(document.getElementById('quantityAgil').textContent);
let luckValue = parseInt(document.getElementById('quantityLuck').textContent);

class Player {
  constructor(name, strength, agility, luck, hp, level) {
    this.name = name;
    this.strength = strength;
    this.agility = agility;
    this.luck = luck;
    this.hp = this.strength + 50;
    this.attack = this.agility + 0.5 * this.luck;
    this.attackPower = this.strength + 0.5 * this.luck;
    this.dodge = this.agility + this.luck;
    this.level = level;
  }
}

//Handles all dicechecks and player/enemy health changes

class Game {
  attackCheck(e) {
    //check attack to enemy dodge
    ui.enemyMessage('The enemy tries to defend itself!');

    const playerAttack = Math.floor(Math.random() * playerOne.attack + 1),
      enemyDodge = Math.floor(Math.random() * enemy.dodge + 1);

    if (playerAttack > enemyDodge) {
      //hit - check hp loss
      const damageAmt = Math.floor(Math.random() * playerOne.attackPower + 1);
      if (enemy.hp < damageAmt) {
        ui.updateEnemyHealthBar();
        ui.displayMessage(`You hit for ${damageAmt} damage! You are victorious!`, 'green');
      } else {
        enemy.hp -= damageAmt;
        ui.updateEnemyHealthBar();
        ui.displayMessage(`You hit for ${damageAmt} damage!`, 'green');
      }
    } else if (playerAttack === 1) {
      ui.displayMessage('CRITICAL miss!', 'red');
      ui.enemyMessage('The enemy sees you falter and takes advantage!');
      game.dodgeCheck();
    } else {
      ui.displayMessage('You miss!', 'red');
    }
  }
  dodgeCheck(e) {
    ui.enemyMessage('The enemy warily strikes out at you!');

    const playerDodge = Math.floor(Math.random() * playerOne.dodge + 1),
      enemyAttack = Math.floor(Math.random() * enemy.attack + 1);

    if (enemyAttack > playerDodge) {
      //hit - check hp loss
      const damageAmt = Math.floor(Math.random() * enemy.attackPower + 1);
      if (playerOne.hp < damageAmt) {
        ui.displayMessage(`You are hit for ${damageAmt} damage! You have died.`, 'red');
      } else {
        playerOne.hp -= damageAmt - 1;
        ui.updatePlayerHealthBar();
        ui.displayMessage(`You are hit for ${damageAmt} damage!`, 'red');
        return false;
      }
    } else if (enemyAttack === 1) {
      ui.displayMessage('enemy CRITICALLy misses!', 'green');
      ui.displayMessage('You see a weakness and attack!');
      game.attackCheck();
      return true;
    } else {
      ui.displayMessage('The enemy misses!', 'green');
      return true;
    }
  }
  flee(e) {
    if (game.dodgeCheck() === false) {
      ui.displayMessage(`You try to flee, but fail! You take ${enemy.attackPower} damage!`);
      playerOne.hp -= enemy.attackPower + 1;
      ui.updatePlayerHealthBar();
    } else {
      ui.enemyMessage('The enemy cackles as you run, but does not pursue.');
    }
  }
  rollEnemy() {
    ui = new UI();
    let x = Math.floor(Math.random() * enemyDB.length + 1);
    enemy = new Player(enemyDB[x].name, 4, 4, 4, enemyDB[x].class + 50, enemyDB[x].class);
    console.log(enemy);
    ui.updateEnemyHealthBar();
    ui.updatePlayerHealthBar();
  }
  enemyDB() {
    fetch('mobs.json').then(async (res) => {
      const data = await res.json();
      enemyDB = data;
      console.log(enemyDB);
      this.rollEnemy();
    });
  }
}

//handles DOM manipulation

class UI {
  displayMessage(msg, color) {
    document.querySelector('.message').textContent = msg;
    document.querySelector('.message').color = color;
  }

  enemyMessage(msg) {
    document.getElementById('enemy-action').value = msg;
    setTimeout(function() {
      document.getElementById('enemy-action').value = '';
    }, 2000);
  }

  updatePlayerHealthBar() {
    UIplayerHealth.innerText = `${playerOne.name}'s Health - ${playerOne.hp} - Level ${playerOne.level}`;
  }

  updateEnemyHealthBar() {
    UIenemyHealth.innerText = `${enemy.name} - ${enemy.hp} Level ${enemy.level}`;
  }

  updateAttribPoints() {
    document.getElementById('attrib-points').textContent = attribPoints;
  }

  updateStrength() {
    document.getElementById('quantityStr').textContent = strValue;
  }

  updateAgi() {
    document.getElementById('quantityAgil').textContent = agiValue;
  }

  updateLuck() {
    document.getElementById('quantityLuck').textContent = luckValue;
  }
}

// event listeners

document.getElementById('setAttrib').addEventListener('click', function(e) {
  const inputName = document.getElementById('inputName').value;

  playerOne = new Player(inputName, strValue, agiValue, luckValue, strValue, 1);

  // enemy = new Player('enemy', inputStrength, inputAgility, inputLuck, inputStrength);

  game = new Game();
  ui = new UI();

  game.enemyDB();

  document.getElementById('introPopup').style.display ='none'
  
  e.preventDefault();
});

//event listeners

window.addEventListener('DOMContentLoaded',() =>{
  document.getElementById('introPopup').style.display ='block';
})




document.querySelector('.popup-content').addEventListener('click', (e) =>{
ui = new UI;
  if(e.target.className === 'input-Down'){
    if(e.target.id === 'str-down') {
      if(strValue > 1){
        strValue -= 1;
        attribPoints +=1;
        ui.updateAttribPoints();
        ui.updateStrength();
      }
    } else if (e.target.id === 'agi-down') {
        if(agiValue > 1){
          agiValue -= 1;
          attribPoints +=1
          ui.updateAttribPoints();
          ui.updateAgi();
      }
    } else {
        if(luckValue > 1){
          luckValue -= 1;
          attribPoints +=1
          ui.updateAttribPoints();
          ui.updateLuck();
      }
    }
  }
  if(e.target.className === 'input-Up'){
    if(e.target.id === 'str-up') {
      if(attribPoints > 0){
        strValue += 1;
        attribPoints -=1;
        ui.updateAttribPoints();
        ui.updateStrength();
      }
    } else if (e.target.id === 'agi-up') {
        if(attribPoints > 0){
          agiValue += 1;
          attribPoints -=1
          ui.updateAttribPoints();
          ui.updateAgi();
      }
    } else {
        if(attribPoints > 0){
          luckValue += 1;
          attribPoints -=1
          ui.updateAttribPoints();
          ui.updateLuck();
      }
    }
  }
});


// document.querySelector('.btn-attack').addEventListener('click', function(e) {
//   game.attackCheck(e);
// });

// document.querySelector('.btn-defend').addEventListener('click', function(e) {
//   game.dodgeCheck(e);

//   e.preventDefault();
// });

// document.querySelector('.btn-run').addEventListener('click', function(e) {
//   game.flee(e);

//   e.preventDefault();
// });
