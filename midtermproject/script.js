const story = {
    start: {
        text: "You wake up in a dusty library. The doors are locked and whispers fill the air... 👀",
        image: "library.jpg",
        choices: [
            { text: "Explore the shelves 📚", next: "shelves" },
            { text: "Look under the table 🪑", next: "table" }
        ]
    },
    shelves: {
        text: "You find an old book titled 'Secrets of the Dead'. It glows faintly in your hands... ✨",
        image: "book.jpg",
        choices: [
            { text: "Open the book 📖", next: "ghost" },
            { text: "Put it back quietly 😶", next: "shadow" }
        ]
    },
    table: {
        text: "You find a rusty key under the table. It feels strangely warm... 🗝️",
        image: "key.jpg",
        choices: [
            { text: "Try the key on the door 🚪", next: "freedom" },
            { text: "Keep exploring 👣", next: "basement" }
        ]
    },
    ghost: {
        text: "A ghost appears and whispers: 'Read the book aloud... or stay forever.' 👻",
        image: "ghost.jpg",
        choices: [
            { text: "Read it aloud 🗣️", next: "curse" },
            { text: "Refuse and run away 🏃‍♀️", next: "escape_window" }
        ]
    },
    shadow: {
        text: "A dark shadow swirls around you. You vanish into the shelves forever... 💀",
        image: "shadow.jpg",
        choices: []
    },
    freedom: {
        text: "The door creaks open! You escape into the night — free at last! 🌙✨",
        image: "exit.jpg",
        choices: []
    },
    basement: {
        text: "You descend the creaky stairs. The air turns cold... something moves in the dark. 😨",
        image: "basement.jpg",
        choices: [
            { text: "Turn back upstairs 🔙", next: "shadow" },
            { text: "Light a candle 🕯️", next: "secret_room" }
        ]
    },
    secret_room: {
        text: "You discover a secret room filled with glowing gold and treasures! 💰 You’re rich!",
        image: "treasure.jpg",
        choices: []
    },
    curse: {
        text: "The book curses you... you are bound to haunt this library forever... 📖💀",
        image: "curse.jpg",
        choices: []
    },
    escape_window: {
        text: "You smash a window and leap out! You barely make it alive. 🪟💨",
        image: "window.jpg",
        choices: []
    }
};

// Current story stage
let currentStage = 'start';

// HTML elements
const storyDiv = document.getElementById('story');
const choicesDiv = document.getElementById('choices');
const imageDiv = document.getElementById('image');
const restartBtn = document.getElementById('restartBtn');

// Start the game
function startGame() {
    currentStage = 'start';
    restartBtn.style.display = 'none';
    updatePage();
}

function updatePage() {
    const stage = story[currentStage];
    storyDiv.textContent = stage.text;
    imageDiv.innerHTML = `<img src="${stage.image}" alt="story image">`;
    choicesDiv.innerHTML = '';

    if (stage.choices.length === 0) {
        restartBtn.style.display = 'inline-block';
    } else {
        stage.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                currentStage = choice.next;
                updatePage();
            });
            choicesDiv.appendChild(button);
        });
    }
}

restartBtn.addEventListener('click', startGame);
startGame();
