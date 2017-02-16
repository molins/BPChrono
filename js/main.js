// To be called just once, on load. Sets everything to be consistent
function init() {
	changeText(time);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);
}

// Starts or reasumes the chron
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

function pauseChrono() {
	cancelAnimationFrame(animationFrame);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", false);

	paused = true;
}

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

// Private 
var time = 420;
var final = null;
var animationFrame = null;
var paused = false;

function chron(t) {
	var value = (final - t) / 1000;

	changeText(value);

	animationFrame = requestAnimationFrame(chron);
}

function changeText(value) {
	var text;
	var min = ~~(value / 60);
	var sec = ~~(value % 60);

	console.log('changeText: ' + value + ' -- ' + min + ':' + sec);

	if (min > 10) {
		text = min + ':' + ('0' + sec).slice(-2);
	} else if (min >= 0 && sec >= 0) {
		text = ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2);
	} else if (min > -10) {
		text = '-' + ('0' + Math.abs(min)).slice(-2) + ':' + ('0' + Math.abs(sec)).slice(-2);
	} else {
		text = min + ':' + ('0' + Math.abs(sec)).slice(-1);
	}

	$('#chrono').text(text);	
}

function getTimeOnInput() {
	var min = $('#minutesInput').val();
	var sec = $('#secondsInput').val();

	console.log('getTimeOnInput: ' + min + ':' + sec + '= ' + (min * 60 + sec));

	return (min * 60 + sec * 1);
}

function getTimeOnScreen() {
	var text = $('#chrono').text().split(':');
	var min = text[0];
	var sec = text[1];

	console.log('getTimeOnScreen: ' + min + ':' + sec + '= ' + (min * 60 + sec));

	return (min * 60 + sec * 1);
}