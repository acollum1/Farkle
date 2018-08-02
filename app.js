let totalScore = 0;
let userScore = 0;
let playerCount = 0;
let dice = [null, null, null, null, null, null];
let choices = [false, false, false, false, false, false];
const allDiceDiv = document.querySelector('.all-dice');
const rollAllDiv = document.querySelector('.roll-all');
const totalScoreSpan = document.getElementById('total-score');
const userScoreSpan = document.getElementById('user-score');
const msgSpan = document.getElementById('message');
const buttonText = document.getElementById('button');
const die1Span = document.getElementById('die1');
const die2Span = document.getElementById('die2');
const die3Span = document.getElementById('die3');
const die4Span = document.getElementById('die4');
const die5Span = document.getElementById('die5');
const die6Span = document.getElementById('die6');
const die1Img = document.getElementById('die1-img');
const die2Img = document.getElementById('die2-img');
const die3Img = document.getElementById('die3-img');
const die4Img = document.getElementById('die4-img');
const die5Img = document.getElementById('die5-img');
const die6Img = document.getElementById('die6-img');

// class Player {
// 	constructor(name, score) {
// 	this._name = name;
// 	this._score = score;
// 	this._wins = 0;
// 	this._highestScore = 0;
// 	this._bestRoll = []
// 	}
// }

// function addPlayer () {
// 	playerCount++;
// 	const plP = document.createElement("SPAN");
// 	const plN = document.createTextNode(`Player ${playerCount}`);
// 	const scN = document.createTextNode(0);
// 	const playerElement = document.getElementById("player");
// 	plP.setAttribute("id", "SPAN");
// 	plP.id = `player${playerCount}`;
// 	plP.appendChild(plN);
// 	playerElement.appendChild(plP);

// 	const scP = document.createElement("SPAN");
	
// 	const scoreElement = document.getElementById("total-score");
// 	scP.setAttribute("id", "SPAN");
// 	scP.id = `player${playerCount}-score`;
// 	scP.appendChild(scN);
// 	scoreElement.appendChild(scP);

// 	const player = new Player(`Player${playerCount}`, 0);
// }

// Assigns a random number if dice is selected to roll.
function roll () {
	for (i=0; i<6; i++) {
	let newNumber = 1 + Math.floor(Math.random()*6);
	if (choices[i]) {
		dice[i] = newNumber;
		choices[i] = true;
	} else {
		dice[i] = dice[i];
		choices[i] = false;
	}
}
	return dice[i];
}

// Calculates points and displays images for rolled dice.
function rollDice() {
	msgSpan.innerHTML = '...';
	if (choices.some(x => x === false) || dice.every(x => x === null) || dice.every(x => typeof x === 'number')) {
	buttonText.innerHTML = 'Roll Again';
	roll();//dice = [3,3,3,4,5,2];
	for (i=0; i<=dice.length; i++) {
		if(Number.isInteger(dice[i])) turn(i, dice);
	}
	console.log(dice);
	points();
}
else {
	msgSpan.innerHTML = 'Select at least 1 dice...';
	}
}

// Determines which dice image to display.
function turn(diePos, num) {
		switch(diePos) {
		case 0:
		die1Img.src = `die${num[diePos]}.svg`;
		break;
		case 1:
		die2Img.src = `die${num[diePos]}.svg`;
		break;
		case 2:
		die3Img.src = `die${num[diePos]}.svg`;
		break;
		case 3:
		die4Img.src = `die${num[diePos]}.svg`;
		break;
		case 4:
		die5Img.src = `die${num[diePos]}.svg`;
		break;
		case 5:
		die6Img.src = `die${num[diePos]}.svg`;
		break;
	}
}

// Ends turn and adds Current Score to Total Score, if eligible.
function bankPoints() {
	msgSpan.innerHTML = "...";
	if (totalScore === 0 && userScore < 500) {
	msgSpan.innerHTML = 'Roll at least 500 points to get on the board';
	}
	else {
	totalScore += userScore;
	totalScoreSpan.innerHTML = totalScore;
	msgSpan.innerHTML = `You banked ${userScore} points! Next turn...`
	userScore = 0;
	userScoreSpan.innerHTML = userScore;
	firstLoad();
	}
	if (totalScore >= 10000) {
		msgSpan.innerHTML = 'CONGRATS!!! YOU WIN';
	}
}

// Decides which dice to select after each roll based on original position.
function selector (value, idx) {
		console.log(idx);
		if (dice[idx]){
		switch(idx) {
		case 0:
		selectDie1();
		adjustPoints(value, idx);
		break;
		case 1:
		selectDie2();
		adjustPoints(value, idx);
		break;
		case 2:
		selectDie3();
		adjustPoints(value, idx);
		break;
		case 3:
		selectDie4();
		adjustPoints(value, idx);
		break;
		case 4:
		selectDie5();
		adjustPoints(value, idx);
		break;
		case 5:
		selectDie6();
		adjustPoints(value, idx);
		break;
		}
	}
}

// Sorted array for point calculations without changing original array.
function sort(arr) {
  return arr.concat().sort();
}

// Checks sorted dice array for points and loops through original positions to run Selector.
function points() {
	console.log(choices);
	let score = false;
	console.log(dice);
	const sorted_arr = sort(dice);

	for (i = 0; i < sorted_arr.length; i++) {
	let pos = sorted_arr[i];
	let pos2 = sorted_arr[i+1];
	let pos3 = sorted_arr[i+2];
	let pos4 = sorted_arr[i+3];
	let pos5 = sorted_arr[i+4];
	let pos6 = sorted_arr[i+5];

	//straight 1-6
	if (pos2 === pos+1 && pos3 === pos+2 && pos4 === pos+3 && pos5 === pos+4 && pos6 === pos+5) {
    	userScore += 1500;
    	score = true;
    	msgSpan.innerHTML = "Straight! HOT DICE!!!";
    	firstLoad();
    	console.log(userScore);
    	break;
    }
    //6 of a kind
	else if (Number.isInteger(pos) && sorted_arr.every(x => x === pos)) {
    	userScore += 3000;
    	score = true;
    	msgSpan.innerHTML = "6 of a kind! HOT DICE!!!";
 		firstLoad();
    	console.log(userScore);
    	break;
	}
	//Two Triplets
	else if (Number.isInteger(pos) && i===0 && pos3 === pos && pos2 === pos && pos6 === pos4 && pos5 === pos4) {
    	userScore += 2500;
    	score = true;
		msgSpan.innerHTML = "Two Triplets! HOT DICE!!!";
 		firstLoad();
    	console.log(userScore);
    	break;
	}
	//Three Pairs
	else if (Number.isInteger(pos) && i===0 && pos === pos2 && pos3 === pos4 && pos5 === pos6) {
    	userScore += 1500;
    	score = true;
		msgSpan.innerHTML = "Three Pairs! HOT DICE!!!";
 		firstLoad();
    	console.log(userScore);
    	break;
	}
	//5 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos && pos4 === pos && pos5 === pos) {
    	userScore += 1000;
    	score = true;
    	rule = 2000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === pos) {
  			dice[t] = '2000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
    }
	//4 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos && pos4 === pos) {
    	userScore += 1000 - (pos*100);
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === pos) {
  			dice[t] = '1000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
	}
	//3 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos) {
    	userScore += pos*100;
    	score = true;
    	rule = 3;
		for (t=0;t<dice.length;t++) {
  		if (choices[t] && dice[t] === pos) {
    		selector(pos, t);
    		dice[t] = pos.toString();
    	}
  	}
    	console.log(userScore);
	}
	//5 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5 && pos4 === 5 && pos5 === 5) {
    	userScore += 1000;
    	score = true;
    	rule = 2000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === 5) {
  			dice[t] = '2000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
    }
	//4 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5 && pos4 === 5) {
    	userScore += 500;
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === 5) {
  			dice[t] = '1000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
	}
   	//3 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5) {
    	userScore += 400;
    	score = true;
    	rule = 3;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === 5) {
  			dice[t] = '500';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
    }
   	//5 x 1s
	else if (Number.isInteger(pos) && pos === 1 && pos2 === 1 && pos3 === 1 && pos4 === 1 && pos5 === 1) {
    	userScore += 1000;
    	score = true;
  		rule = 2000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === 1) {
  			dice[t] = '2000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
    }
	//4 x 1s
	else if (Number.isInteger(pos) && pos === 1 && pos2 === 1 && pos3 === 1 && pos4 === 1) {
    	userScore += 700;
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.length;t++) {
  		if (dice[t] === 1) {
  			dice[t] = '1000';
    		selector(pos, t);
			}
  		}
    	console.log(userScore);
	}
	//1s
    else if (Number.isInteger(pos) && pos === 1) {
    	userScore += 100;
    	score = true;
    	rule = 1;
    	for (t=0;t<dice.length;t++) {
				if (dice[t] === 1) {
				selector(pos, t);
				dice[t] = pos.toString();
			}
  		}
    	console.log(userScore);
    	console.log(pos);
    }
    //5s
    else if (Number.isInteger(pos) && pos === 5) {
    	userScore += 50;
    	score = true;
    	rule = 5;
    	for (t=0;t<dice.length;t++) {
				if (dice[t] === 5) {
				selector(pos, t);
				dice[t] = pos.toString();
			}
  		}
    	console.log(userScore);
    	console.log(pos);
    }
	// Eligible for new roll
	if (dice.every(x => typeof x === 'string')) {
		msgSpan.innerHTML = "HOT DICE!!! Roll again?";
		selectAllDice();
	}
}
	// Losing function
	if (!score) {
	   	farkle();
}
	// Displays points
	else {
		console.log(sorted_arr);
		console.log(dice);
		userScoreSpan.innerHTML = userScore;		
	}
}

// Adjusts Current Score when user selects/deselects dice.
function adjustPoints (val, num) {
	console.log(val);
	if (choices[num] && val==='2000') {
		userScore -= 2000;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '2000') {
    		multiDice(t);
			}
  		}
  		choices[num] = false;
		}
		else if (!choices[num] && val==='2000') {
		userScore += 2000;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '2000') {
    		multiDice(t);
			}
  		}
  		choices[num] = true;
		}
		else if (choices[num] && val==='1000') {
		userScore -= 1000;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '1000') {
    		multiDice(t);
			}
  		}
  		choices[num] = false;
		}
		else if (!choices[num] && val==='1000') {
		userScore += 1000;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '1000') {
    		multiDice(t);
			}
  		}
  		choices[num] = true;
		}
		else if (choices[num] && val==='500') {
		userScore -= 500;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '500') {
    		multiDice(t);
			}
  		}
  		choices[num] = false;
		}
		else if (!choices[num] && val==='500') {
		userScore += 500;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === '500') {
    		multiDice(t);
			}
  		}
  		choices[num] = true;
		}
		else if (choices[num] && val==='1') {
		userScore -= 100;
		userScoreSpan.innerHTML = userScore;
		choices[num] = false;
		}
		else if (!choices[num] && val==='1') {
		userScore += 100;
		userScoreSpan.innerHTML = userScore;
		choices[num] = true;
		}
		else if (choices[num] && val==='5') {
		userScore -= 50;
		userScoreSpan.innerHTML = userScore;
		choices[num] = false;
		}
		else if (!choices[num] && val==='5') {
		userScore += 50;
		userScoreSpan.innerHTML = userScore;
		choices[num] = true;
		}
		else if (choices[num] && typeof val!='number') {
		userScore -= parseFloat(val)*100;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === val) {
    		multiDice(t);
			}
			console.log(val);
			console.log(dice[t]);
  		}
  		choices[num] = false;
		}
		else if (!choices[num] && typeof val!='number') {
		userScore += parseFloat(val)*100;
		userScoreSpan.innerHTML = userScore;
		for (t=0;t<dice.length;t++) {
  		if (dice[t] === val) {
    		multiDice(t);
			}
			console.log(val);
			console.log(dice[t]);
  		}
  		choices[num] = true;
		}
		console.log(val);
	}

// Duplicated Selector function to avoid infinite loop.
	function multiDice (idx) {
		console.log(idx);
		switch(idx) {
		case 0:
		selectDie1();
		break;
		case 1:
		selectDie2();
		break;
		case 2:
		selectDie3();
		break;
		case 3:
		selectDie4();
		break;
		case 4:
		selectDie5();
		break;
		case 5:
		selectDie6();
		break;
	}
}
// Ends turn and resets score to 0.
function farkle () {
	   	msgSpan.innerHTML = 'You Farkled...';
		userScore = 0;
		userScoreSpan.innerHTML = userScore;
		firstLoad();
}

// Allows selection of specific dice and adds CSS effects.
function selectDie1() {
	let userChoice_div = document.getElementById('die1-img');

	if (!choices[0] || !dice[0]) {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[0] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[0] = false;
		return false;
	}
}		

function selectDie2() {
	let userChoice_div = document.getElementById('die2-img');

	if (!choices[1] || !dice[1]) {
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[1] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[1] = false;
		return false;
	}
}	

function selectDie3() {
	let userChoice_div = document.getElementById('die3-img');

	if (!choices[2] || !dice[2]) {
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[2] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[2] = false;
		return false;
	}
}				

function selectDie4() {
	let userChoice_div = document.getElementById('die4-img');

	if (!choices[3] || !dice[3]) {
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[3] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[3] = false;
		return false;
	}
}	

function selectDie5() {
	let userChoice_div = document.getElementById('die5-img');

	if (!choices[4] || !dice[4]) {
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[4] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[4] = false;
		return false;
	}
}		
	
function selectDie6() {
	let userChoice_div = document.getElementById('die6-img');

	if (!choices[5] || !dice[5]) {
		userChoice_div.classList.remove('red-glow');
		userChoice_div.classList.add('green-glow');
		choices[5] = true;
		return true;
	}
	else {
		userChoice_div.classList.remove('green-glow');
		userChoice_div.classList.add('red-glow');
		choices[5] = false;
		return false;
	}
}

// Changes all variables back to default and runs animation.
function firstLoad() {
buttonText.innerHTML = 'Roll Dice';
dice = [null, null, null, null, null, null];
choices[0]=false;
selectDie1();
document.getElementById('die1-img').classList.remove('red-glow')
choices[1]=false;
selectDie2();
document.getElementById('die2-img').classList.remove('red-glow')
choices[2]=false;
selectDie3();
document.getElementById('die3-img').classList.remove('red-glow')
choices[3]=false;
selectDie4();
document.getElementById('die4-img').classList.remove('red-glow')
choices[4]=false;
selectDie5();
document.getElementById('die5-img').classList.remove('red-glow')
choices[5]=false;
selectDie6();
document.getElementById('die6-img').classList.remove('red-glow')
}

function selectAllDice () {
	dice = [null, null, null, null, null, null];
	selectDie1();
	selectDie2();
	selectDie3();
	selectDie4();
	selectDie5();
	selectDie6();
}

// Toggle Rules
function showRules () {
	const rulesDiv = document.getElementById("rules");
	if (rulesDiv.style.display === "block") {
		rulesDiv.style.display = "none";
	} else {
		rulesDiv.style.display = "block";
	}
}

// Event Handlers for user interaction.
die1Span.addEventListener('click', function() {
	selector(dice[0], 0);
	selectDie1();
})

die2Span.addEventListener('click', function() {
	selector(dice[1], 1);
	selectDie2();
})

die3Span.addEventListener('click', function() {
	selector(dice[2], 2);
	selectDie3();
})

die4Span.addEventListener('click', function() {
	selector(dice[3], 3);
	selectDie4();
})

die5Span.addEventListener('click', function() {
	selector(dice[4], 4);
	selectDie5();
})

die6Span.addEventListener('click', function() {
	selector(dice[5], 5);
	selectDie6();
})
