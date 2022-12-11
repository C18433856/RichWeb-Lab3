const Observable = rxjs;
var active = false; // Keep track of the state of the timer (stopped or counting)
const hours_input = document.getElementById("hours-input");
const minutes_input = document.getElementById("minutes-input");
const seconds_input = document.getElementById("seconds-input");

// Called every second to update time
function displayTime(timeLeft){

    // When time is up, stop the timer
    if (timeLeft == 0){
        myObs.unsubscribe();    // Cancel subscription
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green";
        document.getElementById("time-left").innerHTML = "Time's Up!";
        active = !active;
    }
    // Update the time displayed
    else{
        let hours, minutes, seconds;
        hours = (timeLeft - timeLeft % 3600) / 3600;
        timeLeft = timeLeft - hours * 3600;
        minutes = (timeLeft - timeLeft % 60) / 60;
        seconds = timeLeft - minutes * 60;
        if(hours < 10) hours = "0" + hours;
        if(minutes < 10) minutes = "0" + minutes;
        if(seconds < 10) seconds = "0" + seconds;
        document.getElementById("time-left").innerHTML = hours + ":" + minutes + ":" + seconds;
    }
}

function switchTimer(){
    // If the timer is currently run it stop it and reset it
    if(active){
        active = !active;
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green";
        myObs.unsubscribe();    // Cancel subscription
        document.getElementById("time-left").innerHTML = "";
    }
    // If the timer is not running, validate the input and if valid, start the timer
    else{

        return_msg = validate_input(hours_input.value, minutes_input.value, seconds_input.value);
        if(return_msg != ""){
            empty_input();
            alert(return_msg)
            return;
        }

        total_time = hours_input.value * 3600 + minutes_input.value * 60 + parseInt(seconds_input.value);
        
        empty_input()

        // Create an observable on a timer which emits a number every second
        myObs = Observable
        .timer(0, 1000)
        .subscribe(i => displayTime(total_time - i));
        active = !active;
        document.getElementById("time-input-button").innerHTML = "Stop Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "red"
    }
}

// Create an observable that tracks the main button being clicked
Observable.fromEvent(document.getElementById("time-input-button"), 'click')
  .subscribe(() => switchTimer());

function empty_input(){
    document.getElementById("hours-input").value = "";
    document.getElementById("minutes-input").value = "";
    document.getElementById("seconds-input").value = "";
}

// If the error message is anything other than an empty string on return that means the input was invalid
function validate_input(hours, minutes, seconds){
    let error_msg = "";
    if(hours < 0 || hours > 99)
        error_msg = error_msg + "Invalid hours input - please enter value between 0 and 99\n"
    if(minutes < 0 || minutes > 59)
        error_msg = error_msg + "Invalid minutes input - please enter value between 0 and 59\n"
    if(seconds < 0 || seconds > 59)
        error_msg = error_msg + "Invalid seconds input - please enter value between 0 and 59\n"
    if(hours + minutes + seconds == 0){
        error_msg = error_msg + "Please fill at least one of the input boxes\n"
    }
    
    return error_msg
}