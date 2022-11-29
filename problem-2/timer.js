const Observable = rxjs;
var active = false;

function displayTime(timeLeft){

    document.getElementById("time-left").innerHTML = timeLeft

    if (timeLeft == 0){
        myObs.unsubscribe();
        document.getElementById("time-input-button").innerHTML = "Start Countdown";
        document.getElementById("time-input-button").style.backgroundColor = "green"
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
        total_time = document.getElementById("hours-input").value * 360 + document.getElementById("minutes-input").value * 60 + 
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