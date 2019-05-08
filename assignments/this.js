/* The for principles of "this";
* in your own words. explain the four principles for the "this" keyword below.
*
* 1. Window/Global binding:

When we use 'this' in the global scope, it gives us the value of the window itself. If we use Developer tools, we can see all of the bits of Javascript that our browser uses to run any code we give it.


* 2. Implicit Binding

We need: An object, and a function that has 'this' inside the function code.
The fucntion must be attached to the object as a prototype or property.
When we use the function like a method (ex: object.function() ), 'this' refers to whatever is in front of the dot (in this case, that would be 'object').


* 3. New binding

When we use constructor functions to create new objects, 'this' refers to ONLY the NEW object that's being created. Functions like these allow us to create objects with similar properties without overriding any values.


* 4. Explicit Binding

We need: An object, and a function that has 'this' inside the function code.
The function should not be attached to the object.
When we invoke the function, if we add the call or apply method (ex: function.call() ),
we need to add an object as an EXTRA argument (ex: function.call(object, arguments)).
When the function runs, 'this' refers to the object that we added as an extra argument.


*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this); // Logs empty braces in VSCode, outputs full window information in DevTools.
function john(name) {
    console.log(this);
    return name
}

john('Joe'); // NOW Logs full window in VSCode. DevTools in browser show window information twice.
console.log('\n');

// Principle 2

// code example for Implicit Binding
const testObj = {
    name: "Kairen",
    greeting: function(greeter) {
        console.log(`Good morning! I am ${greeter}, and today we have ${this.name} on our show. let's give ${this.name} a round of applause.`);
        console.log(this);
    }
}
testObj.greeting('Devin'); // Logs the greeting, and information on the object itself.
console.log('\n');

// Principle 3

// code example for New Binding

//Uses an ARRAY to assign values to a character. Array MUST be lined organized properly.
function Character(name, age, HP, MP) {
    this.name = name;
    this.age = age;
    this.HP = HP;
    this.MP = MP;
}

const xafInfo = ["Xaf", 567, 1200, 580];

const xaf = new Character(...xafInfo)

//We can do the same thing, but with an object. This means that we don't need strict organization like the array needs.
function CharacterObj(attr) {
    this.name = attr.name;
    this.age = attr.age;
    this.HP = attr.HP;
    this.MP = attr.MP;
}

const kaylee = new CharacterObj({
    name: 'Kaylee',
    HP: 2000,
    MP: 120,
    age: 120
})

console.log(xaf, kaylee);
console.log('\n');


// Principle 4

// code example for Explicit Binding
const talker = {
    name: "John",
    age: 5
}

johnLikes = ["toys", "trains", "the iPad"]

function liking(a, b, c) {
    console.log(`We talked with ${this.name}, age ${this.age}. We learned that he likes ${a}, ${b}, and ${c}. Neato!`)
}

liking.call(talker, ...johnLikes);