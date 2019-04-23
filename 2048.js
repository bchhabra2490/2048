class Game{
	
	constructor(size = 4, maxValue=2048){
		this.size = size;
		this.maxValue = maxValue;
		this.currentMaxValue = 0;

		this.matrix = [];
		for(var i=0;i<this.size; i++){
			this.matrix[i] = [];
			for(var j=0;j<this.size; j++){
				this.matrix[i][j] = 0;
			}
		}
		
		this.generateNewNumber(); // Generate Two numbers
		this.generateNewNumber();
		this.getMatrix(); // Show Starting Matrix
		this.generateNew = false; // Generate New Number or not
		document.getElementById("maxValue").innerHTML = this.maxValue;
	}

	getMatrix(){
		// Print Matrix in console
		var out = '';
		for(var i=0; i<this.size; i++){
			var row = ''
			for(var j=0; j<this.size; j++){
				row += this.matrix[i][j];
				out += '<div class="block">'+this.matrix[i][j]+'</div>';
				if(j!= this.size-1){
					row += '    ';
				}
			}
			out += '<br>';
			console.log(row, "\n");	
		}
		document.getElementById("output").innerHTML = out;
		return this.matrix;
	}

	updateMaxValue(newValue){
		// Update the Max Value
		if(this.currentMaxValue<newValue){
			this.currentMaxValue = newValue;
		}
	}

	generateNewNumber(){
		// Generate a new square.
		const min = 1;
		const max = this.size;
		let availableIndices = [];
		for (var i = 0; i <this.size; i++) {
			for (var j = 0; j <this.size; j++) {
				if(this.matrix[i][j] === 0){
					availableIndices.push([i,j]);
				}
			}
		}
		const index = availableIndices[Math.floor(Math.random() * availableIndices.length)]

		const newValue = Math.random()<0.5 ? 2:4;
		this.matrix[index[0]][index[1]] = newValue;
		this.updateMaxValue(newValue);
	}


	merge(direction){
		// direction = 1->left, 2->right, 3->up, 4->down
		switch(direction){
			case 1:
				for (var j = 0; j < this.size-1; j++) {
					for(var i=0; i < this.size; i++) {
						if(this.matrix[i][j]===this.matrix[i][j+1] && this.matrix[i][j+1] != 0){
							this.matrix[i][j] += this.matrix[i][j+1];
							this.matrix[i][j+1] = 0;
							this.generateNew = true;
							this.updateMaxValue(this.matrix[i][j]);
						}
					}
				}
				break;
			case 2:
				for (var j = this.size-1; j >0; j--) {
					for(var i=0; i < this.size; i++) {
						if(this.matrix[i][j]===this.matrix[i][j-1] && this.matrix[i][j-1] != 0){
							this.matrix[i][j] += this.matrix[i][j-1];
							this.matrix[i][j-1] = 0;
							this.generateNew = true;
							this.updateMaxValue(this.matrix[i][j]);
						}
					}
				}
				break;
			case 3:
				for (var i = 0; i < this.size-1; i++) {
					for(var j=0; j < this.size; j++) {
						if(this.matrix[i][j]===this.matrix[i+1][j] && this.matrix[i+1][j] != 0){
							this.matrix[i][j] += this.matrix[i+1][j];
							this.matrix[i+1][j] = 0;
							this.generateNew = true;
							this.updateMaxValue(this.matrix[i][j]);
						}
					}
				}
				break;
			case 4:
				for (var i = this.size-1; i >0; i--) {
					for(var j=0; j < this.size; j++) {
						if(this.matrix[i][j]===this.matrix[i-1][j] && this.matrix[i-1][j] != 0){
							this.matrix[i][j] += this.matrix[i-1][j];
							this.matrix[i-1][j] = 0;
							this.generateNew = true;
							this.updateMaxValue(this.matrix[i][j]);
						}
					}
				}
				break;
			default:
				break;	
		}
	}

	move(direction){
		// direction = 1->left, 2->right, 3->up, 4->down
		switch(direction){
			case 1:
				// Move Left
				var canMove = true;
				while(canMove){
					canMove = false;
					for (var i = 0; i < this.size; i++) {
						for (var j = 1; j<this.size; j++) {
							if(this.matrix[i][j-1]===0 && this.matrix[i][j]!=0){
								this.matrix[i][j-1] = this.matrix[i][j];
								this.matrix[i][j] = 0;
								this.generateNew = true;
								canMove = true;
							}
						}
					}
				}
				break;
			case 2:
				// Move right
				var canMove = true;
				while(canMove){
					canMove = false;
					for (var i = 0; i < this.size; i++) {
						for (var j = this.size - 2; j >= 0; j--) {
							if(this.matrix[i][j+1]===0 && this.matrix[i][j]!=0){
								this.matrix[i][j+1] = this.matrix[i][j];
								this.matrix[i][j] = 0;
								this.generateNew = true;
								canMove = true;
							}
						}
					}
				}
				break;
			case 3:
				// Move Up
				var canMove = true;
				while(canMove){
					canMove = false;
					for (var i = 1; i < this.size; i++) {
						for (var j = 0; j < this.size; j++) {
							if(this.matrix[i-1][j]===0 && this.matrix[i][j]!=0){
								this.matrix[i-1][j] = this.matrix[i][j];
								this.matrix[i][j] = 0;
								this.generateNew = true;
								canMove = true;
							}
						}
					}
				}
				break;
			case 4:
				// Move Down
				var canMove = true;
				while(canMove){
					canMove = false;
					for (var i = this.size - 2; i >=0; i--) {
						for (var j = 0; j<this.size; j++) {
							if(this.matrix[i+1][j]===0 && this.matrix[i][j]!=0){
								this.matrix[i+1][j] = this.matrix[i][j];
								this.matrix[i][j] = 0;
								this.generateNew = true;
								canMove = true;
							}
						}
					}
				}
				break;
			default:
				break;	
		}
	}

	check(){
		if(this.currentMaxValue >= this.maxValue){
			return true;
		}else{
			for (var i = 0; i <this.size; i++) {
				for (var j = 0; j <this.size-1; j++) {
					if(this.matrix[i][j] === this.matrix[i][j+1]){
						return false;
					}
				}
			}
			for (var i = 0; i <this.size-1; i++) {
				for (var j = 0; j <this.size; j++) {
					if(this.matrix[i][j] === this.matrix[i+1][j]){
						return false;
					}
				}
			}
			for (var i = 0; i <this.size; i++) {
				for (var j = 0; j <this.size; j++) {
					if(this.matrix[i][j] === 0){
						return false;
					}
				}
			}
			return true;
		}
	}

	next(direction){
		// direction = 1->left, 2->right, 3->up, 4->down
		this.move(direction); // First Move the blocks
		this.merge(direction); // Then Merge them
		this.move(direction); // Then move again to fill the left out spaces
		if(this.generateNew){ // Check if the blocks were merged then generate a new block
			this.generateNewNumber();
			this.generateNew = false;
		}
		this.getMatrix(); // Print out the Matrix
		if(this.check()){ // Check if Game is over or not
			console.log("Game Over - ", this.currentMaxValue);
		}
		console.log("\n");

	}
}


var newGame = new Game(4, 2048);


function nextMove(direction){
  	newGame.next(direction);
  	if(newGame.check()){ // Check if Game is over or not
		document.getElementById('result').innerHTML = '<p id="result">Game Over - '+newGame.currentMaxValue+'</p>';
	}
}
