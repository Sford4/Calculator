//Make the string placed in the text box become an equation to be evaluated
//user must make a valid equation, otherwise spits out "check syntax"
//all buttons on the board just add to the textbox one button to delete
//"answer" button runs function that eval() everything in the text box
//"save" button adds the previous textbox stuff to the end of an array, they click back arrow to see past saves
//addCharacter function, takes the value of the textbox, adds the value of the text of the button pressed


//make the enter space a div, that will only work by clicking buttons, THEN link
//those buttons up with the numpad buttons (use innerText)
//prevent them from doing equations that are impossible
//write out the things that can't happen, alert when the things that can't happen are put

$(document).ready(function(){

	var savedEquations = [
	];

	var theBadKeys = [
		'-',
		'*',
		'/',
		'+',
		'^',
		'^(1/2)'
	];

	var nums = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0'
	];

	var canDec = true;
	var canExp = false;
	var canOper = false;
	var canNum = true;
	var canCloseParen = false;
	var canSquareRoot = false;
	var canNeg = true;
	var canOpenParen = true;


	function numPad(key) {
	    var x = event.keyCode;
	    if (x == key) {  //run addCharacter for that button
	    	addCharacter(key);
	    }
	}

	$(document).keypress(function(e) {
		var tag = e.target.tagName.toLowerCase();
    	if (tag != 'input') {
			var keyPress = event.keyCode || e.which;
			var keyChange = String.fromCharCode(keyPress);
			addCharacter(keyChange);
			console.log(event.keyCode);
		}
	});


	function addCharacter(character) {
			var equation = $("#user-equation").text();
		for (var i =  0; i <= theBadKeys.length; i++) {
			if (equation.charAt(equation.length-1) == theBadKeys[i] && character == theBadKeys[i]) {
				return;
			}

		var newEquation = equation + character;
		$("#user-equation").text(newEquation);
		}
	}


	$("#answer-btn").click( function() {
		var equation = $("#user-equation").text();	
		var decNum = $("#decimal-choice").text() || 2;
		if (equation === "") {
			return;
		}
		else {
			var answer = math.eval(equation).toFixed(decNum);
			console.log(answer);
			$("#answer-row").text("");
			$("#answer-row").append("Answer: " + answer);
		}
	});

	$(".num").click( function() {
		addCharacter($(this).text());
		canOper = true;
		canExp = true;
		canOpenParen = true;
		canSquareRoot = true;
		canNeg = true;

	});

	$("#clear-btn").click( function() {
		$("#user-equation").text("");
		canDec = true;
		canExp = false;
		canOper = false;
		canNum = true;
		canCloseParen = false;
		canSquareRoot = false;
		canNeg = true;
		canOpenParen = true;
	});


	$("#save-btn").click( function() {
		if ($("#user-equation").text() === "") {
			return;
		}
		var equation = $("#user-equation").text();
		savedEquations.push(equation);
		console.log(savedEquations);
		$("#display-saved-div").text("");
		$.each(savedEquations, function(i) {
			var savedDiv = $("#display-saved-div");
	   		var li = $('<li/>').appendTo(savedDiv);
			$('<a/>').text(savedEquations[i])
			.appendTo(li);
		});
	});

	$("#btn-open-paren").click( function() {
		if (canOpenParen === true) {
			addCharacter($(this).text());
			canExp = false;
			canNeg = true;
			canSquareRoot = false;
			canOpenParen = true;
			canOper = false;
			canCloseParen = true;
		}
		else {
			return;
		}
	})

	$("#btn-neg").click( function() {
		if (canNeg === true) {
			addCharacter('-');
			canOper = false;
			canDec = true;
			canNeg = false;
			canExp = false;
			canCloseParen = false;
			canSquareRoot = false;
			canOpenParen = true;
		}
		else {
			return;
		}
	})


	$("#btn-dec").click( function() {
		if(canDec === true) {
			addCharacter($(this).text());
			canDec = false;
			canOper = false;
			canNeg = false;
			canOpenParen = false;
		}
		else {
			return;
		}
	});

	$("#btn-raised").click( function() {
		if(canExp === true) {
			addCharacter($(this).text());
			canNeg = true;
			canExp = false;
			canOper = false;
			canNum = true;
			canCloseParen = false;
			canOpenParen = true;
			canSquareRoot = false;
		}
		else {
			return;
		}
	});

	$(".oper").click( function() {
		if(canOper === true) {
			addCharacter($(this).text());
			canOper = false;
			canCloseParen = false;
			canSquareRoot = true;
			canNeg = true;
			canOpenParen = true;
		}
		else {
			return;
		}
	});

	$("#btn-close-paren").click( function() {
		if(canCloseParen === true) {
			addCharacter($(this).text());
			canOper = true;
			canExp = true;
			canCloseParen = false;
			canNeg = true;
			canSquareRoot = true;
		}
		else {
			return;
		}
	});


	$(".oper").click( function() {
			canNeg = true;
			canExp = false;
			canOper = false;
			canNum = true;
			canSquareRoot = false;
			canDec = true;
	});

	// $("#btn-dec").click( function() {
	//     if (canDec === false) {
	//     	return;
	//     }
	//     else {
	//     var equation = $("#user-equation").text();
	// 	var lastDec = equation.lastIndexOf(".");
	// 	var afterLastDec = equation.substring(lastDec + 1);
	// 	for (var j = 0; j >= afterLastDec.length; j++) {
	// 	    afterLastDec[j];
	// 	    for (var i = 0; i <= nums.length; i++) {
	// 	        afterLastNum = afterLastDec.lastIndexOf(nums[i] + 1);
	// 	        if (afterLastDec[1] === nums[i] && afterLastNum === theBadKeys[i]) {
	// 	            canDec = true;
	// 	        }
	// 	        else {
	// 	        	return;
	// 	        }
	// 	    }
	// 	}
	// }
	// });

	$("#btn-close-paren").click( function() {
		var equation = $("#user-equation").text();
		for (var i = theBadKeys.length - 1; i >= 0; i--) {
				theBadKeys[i];
			if (canCloseParen === false) {
				return;
			}
			else if (equation.charAt(equation.length-1) === theBadKeys[i]) {
						return;
			}
			else {
				addCharacter($(this).text());
			}
		}
		canExp = true;
		canOper = true;
		canNum = true;
		canSquareRoot = true;
		canCloseParen = true;
		canDec = true;
	});



	$("#btn-square").click( function() {
		for (var i = nums.length - 1; i >= 0; i--) {
				nums[i];
			if (canSquareRoot === false) {
				return;
			}
			else if (equation.charAt(equation.length-1) === nums[i] || ')') {
				addCharacter($(this).text());
				canExp = true;
				canOper = true;
				canNum = true;
				canSquareRoot = true;
				canCloseParen = true;
				canDec = true;
				canNeg = true;
			}
			else {
				return;
			}
		}
	});

//can come after -, but only 2, can come after any oper, 
});
