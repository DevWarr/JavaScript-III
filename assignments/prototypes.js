/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(attr) {
  this.createdAt = attr.createdAt;
  this.name = attr.name;
  this.dimensions = attr.dimensions;
}
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attr) {
  GameObject.call(this, attr);
  this.healthPoints = attr.healthPoints;
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function(attack) {
  mesg = ""
  if(attack) {
    this.healthPoints = this.healthPoints - attack;
    // console.log(this.healthPoints); // Just checking the code.
    if (this.healthPoints > 0) {
      mesg = `${this.name} took damage. They now have ${this.healthPoints} HP.`;
    } else {  
      mesg = `${this.name} has died.`;
    }
  } else mesg = `${this.name} took damage.`;
  return mesg;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attr) {
  CharacterStats.call(this, attr);
  this.team = attr.team;
  this.weapons = attr.weapons;
  this.weapon = attr.weapons[0];
  this.language = attr.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`
}
Humanoid.prototype.changeWeapon = function(index) {
  if (index < this.weapons.length && index >= 0) {
    if (this.weapons.indexOf(this.weapon) === index) {
      return `${this.name} is already holding ${this.weapon}!`
    } else {
      this.weapon = this.weapons[index];
      return `${this.name} switched to the ${this.weapon}!`;
    }
  } else return `That's not a valid weapon!`
}
Humanoid.prototype.statsUpdate = function() {
  this.stats = {"Name": this.name, "HP": this.healthPoints, "Weapon": this.weapon}
}
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/


// Test your work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!


function Villain(attr) {
  Humanoid.call(this, attr);
  this.attack = attr.attack;
  this.stats = {"Name": this.name, "HP": this.healthPoints, "Weapon": this.weapon}
}
Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.attackGo = function(target) {
  attack = (this.weapons.indexOf(this.weapon) + 1) * this.weapon.length * 7;
  console.log(`${this.name} attacks ${target.name} with ${this.weapon} for ${attack} damage!!`);
  target.takeDamage(attack);
  return mesg;
}


function Hero(attr) {
  Humanoid.call(this, attr);
  this.attack = attr.attack;
  this.stats = {"Name": this.name, "HP": this.healthPoints, "Weapon": this.weapon}
}
Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.attackGo = function(target) {
  if (this.weapon === "THE VILLIAN SLAYER") {
    attack = 9999;
  }else {
    attack = (this.weapons.indexOf(this.weapon) + 1) * this.weapon.length * this.weapon.length;
  }
  console.log(`${this.name} attacks ${target.name} with ${this.weapon} for ${attack} damage!`);
  target.takeDamage(attack);
  return mesg;
}







//<======================THE VILLAIN=========================>//
const player = new Villain({
  createdAt: new Date(),
  name: "Zideth",
  dimensions: {length: 1, width: 3, height: 17},
  healthPoints: 2500,
  team: "The Clan",
  weapons: ["Grand Staff", "KILLER Sword"],
  language: "English"
})


//<======================THE HERO=========================>//
const hero = new Hero({
  createdAt: new Date(),
  name: "WarVDine",
  dimensions: {length: 1, width: 1, height: 8},
  healthPoints: 500,
  team: "TGG (The Good Guys)",
  weapons: ["a simple Sword", "a stronger sword", "THE VILLIAN SLAYER"],
  language: "English"
})
console.log('\n');
console.log(hero);
console.log('\n');
console.log(player);
console.log('\n');

function statUpdate(player, enemy) {
  enemy.statsUpdate();
  player.statsUpdate();
  console.table([player.stats, enemy.stats])
  console.log(`What do you do, ${player.name}?`)
}

function space() {
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
}


// //<==================INTRODUCTIONS===================>//
// console.log(`You are ${player.name}, the villain of this fight.\nYou plan to take over this realm and enslave all of its inhabitants.`);
// console.log('\n');
// console.log(`Suddenly... Who is that?!`);
// console.log(hero.greet());
// console.log('\n');
// console.log(`It's the hero of the story?! Fight him!!`);



//<======================THE FIGHT=========================>//

// statUpdate(player, hero);



// //<========================ROUND 1=========================>//

// // ATTACK WarVDine!! Un-comment all the code before Round 2:


// space();
// console.log(player.attackGo(hero));
// console.log('\n');


// console.log(hero.attackGo(player));
// statUpdate(player, hero);


// //<=======================ROUND 2===========================>//

// // ATTACK HIM AGAIN!!! Un-comment all the code before Round 3:


// space();
// console.log(player.attackGo(hero));
// console.log('\n');


// console.log(hero.attackGo(player));
// statUpdate(player, hero);



// //<=======================ROUND 3===========================>//

// // We need a different weapon... Change weapons!



// space();
// console.log(player.changeWeapon(1));
// console.log('\n');


// console.log(hero.attackGo(player));
// statUpdate(player, hero);


// //<=======================ROUND 4===========================>//

// // WHAT ARE YOU WAITING FOR?!?!?! ATTACK HIMMMMMMMMM

// space();
// console.log(player.attackGo(hero));
// console.log('\n');


// console.log(hero.changeWeapon(1));
// statUpdate(player, hero);



// //<=======================ROUND 5===========================>//

// // He's almost dea. Two more shots...

// space();
// console.log(player.attackGo(hero));
// console.log('\n');


// console.log(hero.attackGo(player));
// statUpdate(player, hero);


// //<=======================ROUND 6===========================>//

// // One last shot. That means it's time for the monologue!

// space();
// console.log(`${player.name} gives a speech. "You know, ${hero.name}, we're quite alike.\nWe both exist in games, we're both pieces of text...`);
// console.log('\n');


// console.log(hero.changeWeapon(2));
// statUpdate(player, hero);


// //<=======================ROUND 6===========================>//

// // Wait! Stop the monologue!!!! You fool!


// space();
// console.log(`I will destory you. Eliminate your code forever. And I will revel in the pleasure of doing so.\n...Get ready for my ULTIMATE MOVE`);
// console.log('\n');


// //<=======================THE FINAL===========================>//


// console.log(hero.attackGo(player));