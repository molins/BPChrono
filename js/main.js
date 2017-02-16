function init() {
	var minutes = time / 60;
	var seconds = time % 60;

	changeText(minutes, seconds);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);
}


function initChrono() {
	if (!paused) {
		final = performance.now() + time * 1000;
	} else {
		final = 0; //TODO
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

	var min = $('#minutesInput').val();
	var sec = $('#secondsInput').val();

	time = (min * 60 + sec);

	$('#initButton').prop("disabled", false);

	changeText(min, sec);

	paused = false;
}

function changeTime(t) {
	time = t;
	stopChrono();
	var minutes = time / 60;
	var seconds = time % 60;
	changeText(minutes, seconds);
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

	var minutes = ~~(value / 60);
	var seconds = ~~(value % 60);

	changeText(minutes, seconds);

	animationFrame = requestAnimationFrame(chron);
}

function changeText(min, sec) {
	var text;

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