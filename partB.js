document.getElementById("playButton").addEventListener("click", displayRules);

//display rules when clicked on the start game button
function displayRules() {
  document.getElementById("gameRules").innerHTML =
    "Welcome to memory game \n you will have to choose and match the pictures accordingly to win the game \n click on the pictures to start the game.";
}

//logic for the timer
var timeleft = 180;
var downTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downTime);
    document.getElementById("timer").innerHTML = "Finished";
  } else {
    document.getElementById("timer").innerHTML = timeleft + " seconds";
  }
  timeleft -= 1;
}, 1000);

//what will be in the tiles( for now numbers )
var memory_array = [
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7",
  "8",
  "8",
  "9",
  "9",
  "10",
  "10",
  "11",
  "11",
  "12",
  "12",
];

//memory for the values of the tiles that have been fliped
var memory_values = [];
var memory_tiles_id = [];
var tiles_flipped = 0;

//shuffling the tiles
Array.prototype.memory_tile_shuffle = function () {
  var i = this.length,
    j,
    temp;
  while (i-- > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

//making a newboard when the game is complete
function newBoard() {
  tiles_flipped = 0;
  var output = "";

  //reshuffle the numbers
  memory_array.memory_tile_shuffle();
  for (var i = 0; i < memory_array.length; i++) {
    output +=
      '<div id="tile' +
      i +
      '" onclick="memoryFlipTile(this, \'' +
      memory_array[i] +
      "')\"></div>";
  }
  document.getElementById("memory_board").innerHTML = output;
}

//function for flipping the tiles
function memoryFlipeTile(tile, val) {
  //pushing the value out when there is a match
  if (tile.innerHTML == "" && memory_values.length < 2) {
    //when clicking on the tile
    tile.style.background = "#FFF";
    tile.innerHTML = val;
    //storing the value of the tile and the tile id
    if (memory_values.length == 0) {
      memory_values.push(val);
      memory_tiles_id.push(tile.id);
    }
    //holding 1 value of the tile and waiting for the next value
    else if (memory_values.length == 1) {
      memory_values.push(val);
      memory_tiles_id.push(tile.id);

      //checking to see if there is a match
      if (memory_values[0] == memory_values[1]) {
        //updating the match tiles
        tiles_flipped += 2;
        //clearing the values and id when matched
        memory_values = [];
        memory_tiles_id = [];

        //checking to see if the whole boarad is cleared
        if (tiles_flipped == memory_array.length) {
          alert("You have cleared the board... making a new board.");
          document.getElementById("memory_board").innerHTML = "";
          newBoard();
        }
      }
    }
  }
  //for when the tiles do not match
  else {
    function flipBack() {
      //flipping the tiles back
      var tile1 = document.getElementById(memory_tiles_id[0]);
      var tile2 = document.getElementById(memory_tiles_id[1]);

      //changing the style of the tile back to shown
      //need to add the images
      tile1.style.background = "url(tile_bg.jpg) no-repeat";
      tile1.innerHTML = "";

      //for tile2
      //need to add the images
      tile2.style.background = "url(tile_bg.jpg) no-repeat";
      tile2.innerHTML = "";

      //clear the held values so we can add other values
      memory_values = [];
      memory_tiles_id = [];
    }
    //set a wait timer to flip the tiles back
    setTimeout(flipBack, 700);
  }
}

newBoard();
