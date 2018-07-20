// Create the player for the game
const player = new Player();

// Create the enemies aka ladybugs
const allEnemies = [...Array(4)].map((_, i) => new Enemy(0, i + 1));

// Create the gem objects at the start of the game
const allGems = [...Array(3)].map(
  (_, i) =>
    i % 2 === 0
      ? new Gem(0, i + 1, "Gem Green.png")
      : new Gem(0, i + 1, "Gem Blue.png")
);

let gems = 0;

const gemCount = document.querySelector(".gems");
const modal = document.getElementById("simpleModal");
const modalMsg = document.querySelector(".close");
const playAgain = document.querySelector(".button");

// Eventhandler: Handles user key press
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//Eventhandler: Will reload the page
playAgain.addEventListener("click", function() {
  location.reload();
});

// Modal creating logic
function openModal() {
  modal.style.display = "block";
  modalMsg.innerHTML = `<div>
                          <h3 class="game_over_heading">Game Over</h3>
                          <p class="game_over_paragraph">You collected: ${gems} Gems!</p>
                        </div>`;
}

function closeModal() {
  modal.style.display = "none";
}

// Loop creating a new gem object when the function runs
function spawnGems() {
  for (i = 0; i < 1; i++) {
    allGems.push(new Gem(1, 1, "Gem Blue.png"));
  }
}

gemCount.textContent = gems;
