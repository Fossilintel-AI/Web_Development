// Select all elements with the class "drum"
const drums = document.querySelectorAll(".drum");

// Map key to their respective sound files and CSS classes
const soundMap = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3",
};

// Function to play sound and add animation
function playSound(key) {
    const audio = new Audio(soundMap[key]);
    audio.play();

    const button = document.querySelector(`.${key}`);
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 100);
    }
}

// Add event listeners to all drum buttons
for (let drum of drums) {
    drum.addEventListener("click", () => {
        const key = drum.textContent.trim(); // Assumes button text matches the key
        if (soundMap[key]) playSound(key);
    });
}

// Add event listener for keyboard presses
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (soundMap[key]) playSound(key);
});
