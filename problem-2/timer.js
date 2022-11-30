const Observable = rxjs;
var active = false;

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
    if(active){
        active = !active;
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green"
        myObs.unsubscribe();
        document.getElementById("time-left").innerHTML = "";
    }
    else{
        total_time = document.getElementById("hours-input").value * 3600 + document.getElementById("minutes-input").value * 60 + 
                     document.getElementById("seconds-input").value;
        
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