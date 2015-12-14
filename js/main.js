/*globals $, webkitSpeechRecognition() */
var answers = {
	'hello there': 'hi!',
	"what's your name": "My name is Vicki!",
	"what is your name": "My name is Vicki!",
	"i'm your father": "Are you Charles?",
	"i am your father": "Are you Charles?",
	"I am your father": "Are you Charles?",
	"I'm your father": "Are you Charles?",
	"how long does implementation take?": "1 year"
}


$(document).ready(function () {
	$('#speak').click(function () {
		$('#speak').css('background', 'crimson');
		$('#speak a').css('color', 'white');
		var recognizer = new webkitSpeechRecognition();
		recognizer.lang = "en";
		recognizer.onresult = function (event) {
			if (event.results.length > 0) {
				var result = event.results[event.results.length - 1];
				if (result.isFinal) {
					$('#asked').prepend('<div>' + result[0].transcript + '</div>');
					$('#speak').css('background', '');
					$('#speak a').css('color', '#9d9d9d');
					processResults(result[0].transcript);
				}
			}
		};
		recognizer.start();
	});

	function processResults(said) {
		var su = new SpeechSynthesisUtterance();
		su.lang = "en";
		if (said.toLowerCase() in answers) {
			su.text = answers[said];
		} else {
			said.indexOf('your name') > -1 ? su.text = 'My name is Vicki!' : su.text = 'Sorry, I did not understand what you meant.';
			said.indexOf('your father') > -1 ? su.text = 'Are you Charles!' : su.text = 'Sorry, I did not understand what you meant.';
			said.indexOf('hello') > -1 ? su.text = 'Hi there!' : su.text = 'Sorry, I did not understand what you meant.';
		}
		$('#answered').prepend('<div>' + su.text + '</div>');
		su.voice = 'vicki';
		su.rate = 1;
		speechSynthesis.speak(su);
	}
})


