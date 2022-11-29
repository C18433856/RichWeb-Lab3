const Observable = rxjs;
var active = false;
const start = 5;

function displayTime(timeLeft){
    
    document.getElementById("lower").innerHTML = timeLeft

    if (timeLeft == 0){
        myObs.unsubscribe();
    }
}

function switchTimer(){
    if(active){
        active = !active;
    }
    else{
        myObs = Observable
        .timer(0, 1000)
        .subscribe(i => displayTime(start - i));
        active = !active;
    }
}

Observable.fromEvent(document.getElementById("time-input-button"), 'click')
  .subscribe(() => switchTimer());