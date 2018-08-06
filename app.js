const alldiceDiv = document.querySelector('.all-dice');
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

// Object to store score info and avoid global variable.
let total = {
	totalScore: 0,
	userScore: 0
}

// Object to store dice info and avoid global variable.
let dice = {
	value: [null, null, null, null, null],
    choices: [false, false, false, false, false],
	rollNum: 0
}

// Assigns a random number if dice is selected to roll.
function roll () {
	for (i=0; i<6; i++) {
	let newNumber = 1 + Math.floor(Math.random()*6);
	if (dice.choices[i]) {
		dice.value[i] = newNumber;
		dice.choices[i] = true;
	} else {
		dice.value[i] = dice.value[i];
		dice.choices[i] = false;
	}
}
	return dice.value[i];
}

// Calculates points and displays images for rolled dice.value.
function rollDice() {
	msgSpan.innerHTML = 'Green dice are selected to keep...';
	if (dice.choices.some(x => x === false) || dice.value.every(x => x === null) || dice.value.every(x => typeof x === 'number')) {
	buttonText.innerHTML = 'Roll Again';
	roll();//dice.value = [3,3,3,3,3,3];//
	for (i=0; i<=dice.value.length; i++) {
		if(Number.isInteger(dice.value[i])) turn(i, dice.value);
	}
	points();
}
else {
	msgSpan.innerHTML = 'You must keep at least 1 dice to roll again';
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
	if (total.totalScore === 0 && total.userScore < 500) {
	msgSpan.innerHTML = 'Roll at least 500 points to get on the board';
	}
	else {
	total.totalScore += total.userScore;
	totalScoreSpan.innerHTML = total.totalScore;
	msgSpan.innerHTML = `You banked ${total.userScore} points! Next turn...`
	total.userScore = 0;
	userScoreSpan.innerHTML = total.userScore;
	firstLoad();
	}
	if (total.totalScore >= 10000) {
		msgSpan.innerHTML = 'CONGRATS!!! YOU WIN';
		buttonText.innerHTML = 'New Game';
		buttonText.addEventListener('click', newGame);
	}
}

let newGame = function () {
	firstLoad();
	total.totalScore = 0;
	total.userScore = 0;
	totalScoreSpan.innerHTML = total.totalScore;
	userScoreSpan.innerHTML = total.userScore;
	buttonText.removeEventListener('click', newGame);
}

// Decides which dice to select after each roll based on original position.
function selector (value, idx) {
		console.log(idx);
		if (dice.value[idx]){
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
	let score = false;
	const sorted_arr = sort(dice.value);

	for (i = 0; i < sorted_arr.length; i++) {
	let pos = sorted_arr[i];
	let pos2 = sorted_arr[i+1];
	let pos3 = sorted_arr[i+2];
	let pos4 = sorted_arr[i+3];
	let pos5 = sorted_arr[i+4];
	let pos6 = sorted_arr[i+5];

	//straight 1-6
	if (pos2 === pos+1 && pos3 === pos+2 && pos4 === pos+3 && pos5 === pos+4 && pos6 === pos+5) {
    	total.userScore += 1500;
    	score = true;
    	msgSpan.innerHTML = "Straight! HOT dice!!!";
    	selectAllDice();
    	setTimeout(firstLoad, 500);
    	break;
    }
    //6 of a kind
	else if (Number.isInteger(pos) && sorted_arr.every(x => x === pos)) {
    	total.userScore += 3000;
    	score = true;
    	msgSpan.innerHTML = "6 of a kind! HOT dice!!!";
    	selectAllDice();
 		setTimeout(firstLoad, 500);
    	break;
	}
	//Two Triplets
	else if (Number.isInteger(pos) && i===0 && pos3 === pos && pos2 === pos && pos6 === pos4 && pos5 === pos4) {
    	total.userScore += 2500;
    	score = true;
		msgSpan.innerHTML = "Two Triplets! HOT dice!!!";
		selectAllDice();
 		setTimeout(firstLoad, 500);
    	break;
	}
	//Three Pairs
	else if (Number.isInteger(pos) && i===0 && pos === pos2 && pos3 === pos4 && pos5 === pos6) {
    	total.userScore += 1500;
    	score = true;
		msgSpan.innerHTML = "Three Pairs! HOT dice!!!";
		selectAllDice();
 		setTimeout(firstLoad, 500);
    	break;
	}
	//5 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos && pos4 === pos && pos5 === pos) {
    	total.userScore += 1000;
    	score = true;
    	rule = 2000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === pos) {
  			dice.value[t] = '2000';
    		selector(pos, t);
			}
  		}
    }
	//4 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos && pos4 === pos) {
    	total.userScore += 1000 - (pos*100);
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === pos) {
  			dice.value[t] = '1000';
    		selector(pos, t);
			}
  		}
	}
	//3 of a kind
	else if (Number.isInteger(pos) && pos!=1 && pos!=5 && pos2 === pos && pos3 === pos) {
    	total.userScore += pos*100;
    	score = true;
    	rule = 3;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.choices[t] && dice.value[t] === pos) {
    		selector(pos, t);
    		dice.value[t] = pos.toString();
    	}
  	}
	}
	//5 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5 && pos4 === 5 && pos5 === 5) {
    	total.userScore += 1000;
    	score = true;
    	rule = 2000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === 5) {
  			dice.value[t] = '2000';
    		selector(pos, t);
			}
  		}
    }
	//4 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5 && pos4 === 5) {
    	total.userScore += 500;
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === 5) {
  			dice.value[t] = '1000';
    		selector(pos, t);
			}
  		}
	}
   	//3 x 5s
	else if (Number.isInteger(pos) && pos === 5 && pos2 === 5 && pos3 === 5) {
    	total.userScore += 400;
    	score = true;
    	rule = 3;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === 5) {
  			dice.value[t] = '500';
    		selector(pos, t);
			}
  		}
    }
   	//5 x 1s
	else if (Number.isInteger(pos) && pos === 1 && pos2 === 1 && pos3 === 1 && pos4 === 1 && pos5 === 1) {
    	total.userScore += 1000;
    	score = true;
  		rule = 2000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === 1) {
  			dice.value[t] = '2000';
    		selector(pos, t);
			}
  		}
    }
	//4 x 1s
	else if (Number.isInteger(pos) && pos === 1 && pos2 === 1 && pos3 === 1 && pos4 === 1) {
    	total.userScore += 700;
    	score = true;
    	rule = 1000;
    	for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === 1) {
  			dice.value[t] = '1000';
    		selector(pos, t);
			}
  		}
	}
	//1s
    else if (Number.isInteger(pos) && pos === 1) {
    	total.userScore += 100;
    	score = true;
    	rule = 1;
    	for (t=0;t<dice.value.length;t++) {
				if (dice.value[t] === 1) {
				selector(pos, t);
				dice.value[t] = pos.toString();
			}
  		}
    }
    //5s
    else if (Number.isInteger(pos) && pos === 5) {
    	total.userScore += 50;
    	score = true;
    	rule = 5;
    	for (t=0;t<dice.value.length;t++) {
				if (dice.value[t] === 5) {
				selector(pos, t);
				dice.value[t] = pos.toString();
			}
  		}
    }
	// Eligible for new roll
	if (dice.value.every(x => typeof x === 'string')) {
		msgSpan.innerHTML = "HOT dice!!! Roll again?";
		setTimeout(firstLoad, 500);
	}
}
	// Losing function
	if (!score) {
	   	farkle();
}
	// Displays points
	else {
		userScoreSpan.innerHTML = total.userScore;		
	}
}

// Adjusts Current Score when user selects/deselects dice.
function adjustPoints (val, num) {

	if (dice.choices[num] && val==='2000') {
		total.userScore -= 2000;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '2000') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && val==='2000') {
		total.userScore += 2000;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '2000') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = true;
		}
		else if (dice.choices[num] && val==='1000') {
		total.userScore -= 1000;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '1000') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && val==='1000') {
		total.userScore += 1000;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '1000') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = true;
		}
		else if (dice.choices[num] && val==='500') {
		total.userScore -= 500;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '500') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && val==='500') {
		total.userScore += 500;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === '500') {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = true;
		}
		else if (dice.choices[num] && val==='1') {
		total.userScore -= 100;
		userScoreSpan.innerHTML = total.userScore;
		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && val==='1') {
		total.userScore += 100;
		userScoreSpan.innerHTML = total.userScore;
		dice.choices[num] = true;
		}
		else if (dice.choices[num] && val==='5') {
		total.userScore -= 50;
		userScoreSpan.innerHTML = total.userScore;
		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && val==='5') {
		total.userScore += 50;
		userScoreSpan.innerHTML = total.userScore;
		dice.choices[num] = true;
		}
		else if (dice.choices[num] && typeof val!='number') {
		total.userScore -= parseFloat(val)*100;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === val) {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = false;
		}
		else if (!dice.choices[num] && typeof val!='number') {
		total.userScore += parseFloat(val)*100;
		userScoreSpan.innerHTML = total.userScore;
		for (t=0;t<dice.value.length;t++) {
  		if (dice.value[t] === val) {
    		multiDice(t);
			}
  		}
  		dice.choices[num] = true;
		}
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
		total.userScore = 0;
		userScoreSpan.innerHTML = total.userScore;
		firstLoad();
}

// Allows selection of specific dice and adds CSS effects.
function selectDie1() {
	let userChoice_div = document.getElementById('die1-img');

	if (!dice.choices[0] || !dice.value[0]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[0] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[0] = false;
		return false;
	}
}		

function selectDie2() {
	let userChoice_div = document.getElementById('die2-img');

	if (!dice.choices[1] || !dice.value[1]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[1] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[1] = false;
		return false;
	}
}	

function selectDie3() {
	let userChoice_div = document.getElementById('die3-img');

	if (!dice.choices[2] || !dice.value[2]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[2] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[2] = false;
		return false;
	}
}				

function selectDie4() {
	let userChoice_div = document.getElementById('die4-img');

	if (!dice.choices[3] || !dice.value[3]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[3] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[3] = false;
		return false;
	}
}	

function selectDie5() {
	let userChoice_div = document.getElementById('die5-img');

	if (!dice.choices[4] || !dice.value[4]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[4] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[4] = false;
		return false;
	}
}		
	
function selectDie6() {
	let userChoice_div = document.getElementById('die6-img');

	if (!dice.choices[5] || !dice.value[5]) {
		userChoice_div.classList.remove('green-glow');
		dice.choices[5] = true;
		return true;
	}
	else {
		userChoice_div.classList.add('green-glow');
		dice.choices[5] = false;
		return false;
	}
}

// Changes all variables back to default and runs animation.
function firstLoad() {
buttonText.innerHTML = 'Roll dice';
dice.value = [null, null, null, null, null, null];
dice.choices[0]=false;
selectDie1();
dice.choices[1]=false;
selectDie2();
dice.choices[2]=false;
selectDie3();
dice.choices[3]=false;
selectDie4();
dice.choices[4]=false;
selectDie5();
dice.choices[5]=false;
selectDie6();
}

function selectAllDice () {
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
	selector(dice.value[0], 0);
	selectDie1();
})

die2Span.addEventListener('click', function() {
	selector(dice.value[1], 1);
	selectDie2();
})

die3Span.addEventListener('click', function() {
	selector(dice.value[2], 2);
	selectDie3();
})

die4Span.addEventListener('click', function() {
	selector(dice.value[3], 3);
	selectDie4();
})

die5Span.addEventListener('click', function() {
	selector(dice.value[4], 4);
	selectDie5();
})

die6Span.addEventListener('click', function() {
	selector(dice.value[5], 5);
	selectDie6();
})