
var game= {
	words:["PARIS", "CROISSANT", "BERET", "SEINE", "NAPOLEON", "VOGUE", "PARKOUR", "NOUVEAU", "BOURGEOIS","CHAMPAGNE", "CAFE", "RAPIER", "AMOUR", "BISOU"],
	imageArray: ["paris.jpg", "croissant.jpg", "beret.jpg", "seine.jpg", "napoleon.jpg", "vogue.jpg", "parkour.jpeg", "nouveau.jpeg", "bourgeois.jpg", "champagne.jpg", "cafe.jpeg","rapier.jpg","amour.jpeg","bisou.jpg"],
	imageIndex: 0,
	revealed: [],
	currentWordArray: [],
	currentWord: "",
	wins: 0,
	lettersGuessed: [],
	guessesLeft: 12,
	intialize: function() //initialize each new game, resets variables
	{
		this.currentWord =  this.words[Math.floor(Math.random()*this.words.length)];
		this.imageIndex = this.words.indexOf(this.currentWord);
		console.log(this.imageIndex);
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

	updateLettersGuessed: function(wrongGuess)//updates game on an incorrect guess
	{	//checks to see if letter already guessed
		if ((this.lettersGuessed.indexOf(wrongGuess) == -1) && (this.revealed.indexOf(wrongGuess) == -1))  
		{
			this.guessesLeft--;
			document.getElementById("guessesLeft").innerHTML = this.guessesLeft;
			this.lettersGuessed.push(wrongGuess);
			document.getElementById("letGuessed").innerHTML = this.lettersGuessed.join(", ");
		}
	},

	isGameOver: function() //checks to see if game is over. If game is won or lossed.
	{
		if (this.revealed.indexOf("-") == -1)
		 {
		 	this.wins++;
		 	document.getElementById("numWins").innerHTML = this.wins;
		 	document.getElementById("imageChange").src = ("assets/images/" + this.imageArray[this.imageIndex]);
		 	document.getElementById("headerChange").innerHTML = this.words[this.imageIndex];
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

	revealAnswer: function(ind)	//reaveals letter on correct guess
	{
		this.revealed[ind] = this.currentWordArray[ind];
		this.currentWordArray[ind] = "-";
		document.getElementById("guessString").innerHTML = game.revealed.join(" ");
	}

}
//initialize game for first time
game.intialize();


document.onkeyup = function(event) {

	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
	var indexer = game.currentWordArray.indexOf(userGuess);


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