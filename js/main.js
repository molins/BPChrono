function initChrono(chrono) {
		var final = Date.now() + times[chrono];

		chrons[chrono] = setInterval(function(){
			chron(chrono, final);}, 
			500);

		chron(chrono, final);

		$('.' + chrono + '.initButton').prop("disabled", true);
		$('.' + chrono + '.pauseButton').prop("disabled", false);
		$('.' + chrono + '.stopButton').prop("disabled", false);
	}

	function pauseChrono(chrono) {
		clearInterval(chrons[chrono]);

		$('.' + chrono + '.initButton').prop("disabled", false);
		$('.' + chrono + '.pauseButton').prop("disabled", true);
		$('.' + chrono + '.stopButton').prop("disabled", false);
	}

	function stopChrono(chrono) {
		clearInterval(chrons[chrono]);

		$('.' + chrono + '.initButton').prop("disabled", false);
		$('.' + chrono + '.pauseButton').prop("disabled", false);
		$('.' + chrono + '.stopButton').prop("disabled", false);
	}

	function resetChrono(chrono) {

	}

	// Private 

	var chrons = {prep: null, 
		og1: null, oo1: null,
		og2: null, oo2: null,
		cg1: null, co1: null,
		cg2: null, co2: null
	}

	var times = {prep: 900000,
		og1: 420000, oo1: 420000,
		og2: 420000, oo2: 420000,
		cg1: 420000, co1: 420000,
		cg2: 420000, co2: 420000
	}

	function chron(chrono, final) {
		var value = (final - Date.now()) / 1000; 

		var minutes = ('00' + Math.floor(value / 60)).slice(-2)
		var seconds = ('00' + Math.floor(value % 60)).slice(-2)

		var text = minutes + ':' + seconds;

		$("#" + chrono).text(text);
	}