document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    
    const hoursDisplay = document.getElementById('hours-display');
    const minutesDisplay = document.getElementById('minutes-display');
    const secondsDisplay = document.getElementById('seconds-display');
    
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Variables for timer
    let countdownInterval;
    let totalSeconds = 0;
    let isRunning = false;
    let isPaused = false;
    
    // Format time to display with leading zeros
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };
    
    // Update the timer display
    const updateDisplay = (hours, minutes, seconds) => {
        hoursDisplay.textContent = formatTime(hours);
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
    };
    
    // Calculate total seconds from inputs
    const calculateTotalSeconds = () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        return hours * 3600 + minutes * 60 + seconds;
    };
    
    // Convert total seconds to hours, minutes, seconds
    const convertSecondsToTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return { hours, minutes, seconds };
    };
    
    // Start the countdown
    const startCountdown = () => {
        if (!isRunning) {
            totalSeconds = calculateTotalSeconds();
            
            // Check if time is valid
            if (totalSeconds <= 0) {
                alert('Please enter a valid time for the countdown.');
                return;
            }
            
            isRunning = true;
            
            // Update button states
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            
            // Disable inputs
            hoursInput.disabled = true;
            minutesInput.disabled = true;
            secondsInput.disabled = true;
            
            // Start the interval
            countdownInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    const time = convertSecondsToTime(totalSeconds);
                    updateDisplay(time.hours, time.minutes, time.seconds);
                } else {
                    // Time's up
                    clearInterval(countdownInterval);
                    isRunning = false;
                    
                    // Play notification sound or alert
                    alert('Time\'s up!');
                    
                    // Reset button states
                    startBtn.disabled = false;
                    pauseBtn.disabled = true;
                    
                    // Enable inputs
                    hoursInput.disabled = false;
                    minutesInput.disabled = false;
                    secondsInput.disabled = false;
                }
            }, 1000);
        } else if (isPaused) {
            // Resume countdown
            isPaused = false;
            pauseBtn.textContent = 'Pause';
            
            countdownInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    const time = convertSecondsToTime(totalSeconds);
                    updateDisplay(time.hours, time.minutes, time.seconds);
                } else {
                    // Time's up
                    clearInterval(countdownInterval);
                    isRunning = false;
                    
                    // Play notification sound or alert
                    alert('Time\'s up!');
                    
                    // Reset button states
                    startBtn.disabled = false;
                    pauseBtn.disabled = true;
                    
                    // Enable inputs
                    hoursInput.disabled = false;
                    minutesInput.disabled = false;
                    secondsInput.disabled = false;
                }
            }, 1000);
        }
    };
    
    // Pause the countdown
    const pauseCountdown = () => {
        if (isRunning && !isPaused) {
            clearInterval(countdownInterval);
            isPaused = true;
            pauseBtn.textContent = 'Resume';
        } else if (isRunning && isPaused) {
            startCountdown();
        }
    };
    
    // Reset the countdown
    const resetCountdown = () => {
        clearInterval(countdownInterval);
        isRunning = false;
        isPaused = false;
        
        // Reset button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
        
        // Enable inputs
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        
        // Reset display
        updateDisplay(0, 0, 0);
        
        // Reset input values
        hoursInput.value = 0;
        minutesInput.value = 0;
        secondsInput.value = 0;
    };
    
    // Event listeners
    startBtn.addEventListener('click', startCountdown);
    pauseBtn.addEventListener('click', pauseCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    
    // Input validation
    hoursInput.addEventListener('input', () => {
        if (hoursInput.value > 99) hoursInput.value = 99;
        if (hoursInput.value < 0) hoursInput.value = 0;
    });
    
    minutesInput.addEventListener('input', () => {
        if (minutesInput.value > 59) minutesInput.value = 59;
        if (minutesInput.value < 0) minutesInput.value = 0;
    });
    
    secondsInput.addEventListener('input', () => {
        if (secondsInput.value > 59) secondsInput.value = 59;
        if (secondsInput.value < 0) secondsInput.value = 0;
    });
}); 