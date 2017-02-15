function init() {
	var minutes = ('00' + time / 60).slice(-2)
	var seconds = ('00' + time % 60).slice(-2)

	var text = minutes + ':' + seconds;

	$('#chrono').text(text);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);
}


function initChrono() {
	final = performance.now() + time * 1000;

	animationFrame = requestAnimationFrame(chron);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", false);
	$('#stopButton').prop("disabled", false);
}

function pauseChrono() {
	cancelAnimationFrame(animationFrame);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", false);
}

function stopChrono() {
	cancelAnimationFrame(animationFrame);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);
}

function resetChrono() {
	stopChrono();

	var min = $('#minutesInput').value();
	var sec = $('#secondsInput').value();

	time = (min * 60 + sec);
}

function changeTime(t) {
	time = t;
	stopChrono();
	final = performance.now() + time;
	chron(final);
}

// Private 
var time = 420;
var final = null;
var animationFrame = null;

function chron(t) {
	var value = (final - t) / 1000;
	console.log(t);

	var minutes = ('00' + Math.floor(value / 60)).slice(-2)
	var seconds = ('00' + Math.floor(value % 60)).slice(-2)

	var text = minutes + ':' + seconds;

	$('#chrono').text(text);

	animationFrame = requestAnimationFrame(chron);
}