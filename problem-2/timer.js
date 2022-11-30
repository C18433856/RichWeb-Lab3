const Observable = rxjs;
var active = false;
const hours_input = document.getElementById("hours-input");
const minutes_input = document.getElementById("minutes-input");
const seconds_input = document.getElementById("seconds-input");

function displayTime(timeLeft){

    document.getElementById("time-left").innerHTML = timeLeft

    if (timeLeft == 0){
        myObs.unsubscribe();
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green"
    }
    else{
        let hours, minutes, seconds
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

    return_msg = validate_input(hours_input.value, minutes_input.value, seconds_input.value);
    if(return_msg != ""){
        empty_input();
        alert(return_msg)
        return;
    }

    if(active){
        active = !active;
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green"
        myObs.unsubscribe();
        document.getElementById("time-left").innerHTML = "";
    }
    else{
        total_time = hours_input.value * 3600 + minutes_input.value * 60 + 
                     seconds_input.value;
        
        empty_input()
        myObs = Observable
        .timer(0, 1000)
        .subscribe(i => displayTime(total_time - i));
        active = !active;
        document.getElementById("time-input-button").innerHTML = "Stop Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "red"
    }
}

Observable.fromEvent(document.getElementById("time-input-button"), 'click')
  .subscribe(() => switchTimer());

function empty_input(){
    document.getElementById("hours-input").value = "";
    document.getElementById("minutes-input").value = "";
    document.getElementById("seconds-input").value = "";
}

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