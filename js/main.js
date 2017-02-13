function initChrono() {
	var final = Date.now() + time;

	chrono = setInterval(function(){
		chron(final);}, 
		500);

	chron(final);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", false);
	$('#stopButton').prop("disabled", false);
}

function pauseChrono() {
	clearInterval(chrono);

	$('#initButton').prop("disabled", false);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", false);
}

function stopChrono() {
	clearInterval(chrono);

	$('#initButton').prop("disabled", true);
	$('#pauseButton').prop("disabled", true);
	$('#stopButton').prop("disabled", true);
}

function resetChrono() {

}

function changeTime(t) {
	time = t * 1000;
	stopChrono();
	var final = Date.now() + time;
	chron(final);
}

// Private 

var chrono = {};

var time = 420000;

function chron(final) {
	var value = (final - Date.now()) / 1000; 

	var minutes = ('00' + Math.floor(value / 60)).slice(-2)
	var seconds = ('00' + Math.floor(value % 60)).slice(-2)

	var text = minutes + ':' + seconds;

	$('#chrono').text(text);
}