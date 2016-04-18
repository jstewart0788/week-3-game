
var game= {
	words:["PARIS", "CROISSANT", "BERET", "SEINE", "NAPOLEON", "VOGUE", "PARKOUR", "NOUVEAU"],
	revealed: [],
	currentWordArray: [],
	currentWord: "",
	wins: 0,
	lettersGuessed: [],
	guessesLeft: 12,
	intialize: function()
	{
		this.currentWord =  this.words[Math.floor(Math.random()*this.words.length)];
		this.currentWordArray=[];
		this.revealed =[];
		for (var i =0; i<this.currentWord.length; i++)
		{
			this.currentWordArray.push(this.currentWord.charAt(i));
		}
		for (var i =0; i<this.currentWord.length; i++)
		{
			this.revealed.push("-");
		}
		document.getElementById("guessString").innerHTML = this.revealed.join(" ");
		this.guessesLeft = 12;
		document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
		this.lettersGuessed = [];
		document.getElementById("letGuessed").innerHTML = " ";
	},

	updateLettersGuessed: function(wrongGuess)
	{
		this.guessesLeft--;
		document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
		this.lettersGuessed.push(wrongGuess);
		document.getElementById("letGuessed").innerHTML = this.lettersGuessed.join(", ");
	},

	isGameOver: function()
	{
		if (this.revealed.indexOf("-") == -1)
		 {
		 	this.wins++;
		 	document.getElementById("numWins").innerHTML = this.wins;
		 	return true;
		 }
		 else if(this.guessesLeft >0)
		 {
		 	return false;
		 }
		 else
		 {
		 	return true;
		 }
	},

	revealAnswer: function(ind)
	{
		this.revealed[ind] = this.currentWordArray[ind];
		this.currentWordArray[ind] = "-";
		document.getElementById("guessString").innerHTML = game.revealed.join(" ");
	}

}

game.intialize();


document.onkeyup = function(event) {

	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
	var indexer = game.currentWordArray.indexOf(userGuess);

	console.log(userGuess);
	console.log(indexer);
	console.log(game.currentWordArray);


	if (indexer >= 0)
	{
		while(indexer >= 0)
		{
			game.revealAnswer(indexer);
			var indexer = game.currentWordArray.indexOf(userGuess);
		}
	}
	else
	{
		game.updateLettersGuessed(userGuess);
	}

	if(game.isGameOver()) // intialize variables for each round
	{
		game.intialize();
	}
}