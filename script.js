const mazeData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  
];


const playerEmoji = "🐱"; // Player character emoji
let playerPosition = { row: 1, col: 29 }; // Starting position at the "In" point

function createMaze(mazeData) {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.innerHTML = ""; // Clear previous maze

    // Loop through the maze data to generate cells
    for (let row = 0; row < mazeData.length; row++) {
        for (let col = 0; col < mazeData[row].length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (mazeData[row][col] === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');
            }

            // Set player position
            if (row === playerPosition.row && col === playerPosition.col) {
                cell.innerHTML = playerEmoji;
                cell.style.color = "red"; // Make the player stand out
                cell.style.textAlign = "center"; // Center the emoji
                cell.style.verticalAlign = "middle";
                cell.style.lineHeight = "30px"; // Match the cell size for alignment
            }

            cell.dataset.row = row;
            cell.dataset.col = col;
            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(direction) {
    const newPosition = { ...playerPosition };

    // Determine the new position based on direction
    if (direction === "up") newPosition.row -= 1;
    if (direction === "down") newPosition.row += 1;
    if (direction === "left") newPosition.col -= 1;
    if (direction === "right") newPosition.col += 1;

    // Check if the new position is valid
    if (
        newPosition.row >= 0 &&
        newPosition.row < mazeData.length &&
        newPosition.col >= 0 &&
        newPosition.col < mazeData[0].length &&
        mazeData[newPosition.row][newPosition.col] === 0
    ) {
        // Update the previous cell (set to green)
        const prevCell = document.querySelector(
            `.cell[data-row='${playerPosition.row}'][data-col='${playerPosition.col}']`
        );
        prevCell.classList.add("green"); // Add the green class
        prevCell.innerHTML = ""; // Remove the player emoji

        // Update the player position
        playerPosition = newPosition;

        // Render the player at the new position
        const currentCell = document.querySelector(
            `.cell[data-row='${playerPosition.row}'][data-col='${playerPosition.col}']`
        );
        currentCell.innerHTML = playerEmoji;
        currentCell.style.color = "red"; 
        currentCell.style.textAlign = "center"; 
        currentCell.style.verticalAlign = "middle";
        currentCell.style.lineHeight = "30px"; 

        // Check for victory
        if (
            playerPosition.row === 16 &&
            playerPosition.col === 11 // Corrected exit point
        ) {
            alert("Winner! You've completed the maze!");
        }
    }
}

// Event listener for keyboard controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") movePlayer("up");
    if (e.key === "ArrowDown") movePlayer("down");
    if (e.key === "ArrowLeft") movePlayer("left");
    if (e.key === "ArrowRight") movePlayer("right");
});

function restartGame() {
    playerPosition = { row: 1, col: 29 }; // Reset player to starting position
    document.querySelectorAll(".cell.green").forEach((cell) => {
        cell.classList.remove("green"); // Clear the green trail
    });
    createMaze(mazeData); // Re-render the maze
}

// Touch controls for on-screen buttons
function addTouchControls() {
    const controls = document.getElementById('controls');
    controls.innerHTML = `
        <button class="control-btn" id="up-btn" onclick="movePlayer('up')">🡱</button>
        <div class="horizontal-controls">
            <button class="control-btn" id="left-btn" onclick="movePlayer('left')">🡰</button>
            <button class="control-btn" id="down-btn" onclick="movePlayer('down')">🡳</button>
            <button class="control-btn" id="right-btn" onclick="movePlayer('right')">🡲</button>
        </div>
    `;
}

function handleKeyPress(e) {
    const keyMapping = {
        ArrowUp: "up-btn",
        ArrowLeft: "left-btn",
        ArrowDown: "down-btn",
        ArrowRight: "right-btn",
    };

    const buttonId = keyMapping[e.key];
    if (buttonId) {
        const button = document.getElementById(buttonId);
        button.classList.add("active");
    }
}

function handleKeyRelease(e) {
    const keyMapping = {
        ArrowUp: "up-btn",
        ArrowLeft: "left-btn",
        ArrowDown: "down-btn",
        ArrowRight: "right-btn",
    };

    const buttonId = keyMapping[e.key];
    if (buttonId) {
        const button = document.getElementById(buttonId);
        button.classList.remove("active");
    }
}

document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyRelease);

// Initialize the maze and add controls
createMaze(mazeData);
addTouchControls();