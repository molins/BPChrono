// To be called just once, on load. Sets everything to be consistent
function init() {
	changeText(time);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);

	if (ding) {
		$('#dingGlyphicon').addClass('fa-bell');
	} else {
		$('#dingGlyphicon').addClass('fa-bell-slash'); 
	}
}

// Starts or resumes the chron
function initChrono() {
	if (!paused) {
		final = performance.now() + time * 1000;
	} else {
		final = performance.now() + getTimeOnScreen() * 1000;
	}

	animationFrame = requestAnimationFrame(chron);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", false);
	$('#stopButton').prop("disabled", false);

	paused = false;
}

// Pauses the chrono
function pauseChrono() {
	cancelAnimationFrame(animationFrame);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", false);

	paused = true;
}

// Stops the chrono
function stopChrono() {
	cancelAnimationFrame(animationFrame);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);

	paused = false;
}

function resetChrono() {
	stopChrono();

	time = getTimeOnInput();

	$('#initButton').prop("disabled", false);

	changeText(time);

	paused = false;
}

function changeTime(t) {
	time = t;
	stopChrono();
	var minutes = time / 60;
	var seconds = time % 60;
	changeText(t);
	$('#initButton').prop("disabled", false);

	paused = false;
}


function toggleConfiguration() {
	$('#config').toggleClass('hidden');
}

function toggleDing() {
	$('#dingGlyphicon').toggleClass('fa-bell-slash fa-bell');
	ding = !ding;
}

function togglePresets() {
	$('.timePresets').toggleClass('hidden');
	
}

// Private 
var time = 420;
var final = null;
var animationFrame = null;
var paused = false;
var ding = false;
var dinging = false;
var shouldDing = false;

function chron(t) {
	var value = (final - t) / 1000;

	changeText(value);

	animationFrame = requestAnimationFrame(chron);
}

function changeText(value) {
	var text;
	var min = ~~(value / 60);
	var sec = ~~(value % 60);
	//min = Math.floor(value / 60);
	min = ~~(Math.floor(value) / 60);
	sec = Math.floor(value) % 60;

	//console.log('changeText: ' + value + ' _ ' + min + ':' + sec);

	// Text formating
	if (min > 10) {
		text = min + ':' + ('0' + sec).slice(-2);
	} else if (min >= 0 && sec >= 0) {
		text = ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
	} else if (min > -10) {
		text = '-' + ('0' + Math.abs(min)).slice(-2) + ':' + ('0' + Math.abs(sec)).slice(-2);
	} else {
		text = min + ':' + ('0' + Math.abs(sec)).slice(-1);
	}

	// State machine for dinging
	if (sec == 0 && min == 6) {
		if (!dinging) {
			dinging = true;
			playDing();
		}
	} else if (sec == 0 && min == 1) {
		if (!dinging) {
			dinging = true;
			playDing();
		}
	} else if (sec == 0 && min == 0) {
		if (!dinging) {
			dinging = true;
			playDing(false);
		}
	} else {
		dinging = false;
	}

	$('#chrono').children().text(text);	
}

function getTimeOnInput() {
	var min = $('#minutesInput').val();
	var sec = $('#secondsInput').val();

	return (min * 60 + sec * 1);
}

function getTimeOnScreen() {
	var text = $('#chrono').text().split(':');
	var min = text[0];
	var sec = text[1];

	//console.log('getTimeOnScreen: ' + min + ':' + sec + '= ' + (min * 60 + sec));

	if (min[0] == '-') {
		return -(min * 60 + sec * 1);
	} else {
		return (min * 60 + sec * 1);
	}	
}

function playDing(single = true) {
	if (ding) {
		if (single) {
			$('#dingx1').trigger('play');
			console.log('Ding!');
		} else {
			$('#dingx2').trigger('play');
			console.log('Ding! Ding!');
		}
	}
}