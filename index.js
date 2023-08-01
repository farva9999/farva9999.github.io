//declare global countdown variable to control interval and clear it when counter is below 0
let countdown;
const timerDisplay = document.querySelector('.timer');
let startButton = document.querySelector('.start');
let resetButton = document.querySelector('.reset');

function timer(seconds){
    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        //check if we should stop
        if (secondsLeft <0){
            clearInterval(countdown);
            return;
        }

        //display
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    timerDisplay.textContent = display;
    console.log({minutes, remainderSeconds} );
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
}


startButton.addEventListener('click', () => {
    clearInterval(countdown);
    startButton.disabled = true;
    timer(20*60);
});

resetButton.addEventListener('click', () => {
    startButton.disabled = false;
    clearInterval(countdown);
    timerDisplay.textContent = "20:00";
})