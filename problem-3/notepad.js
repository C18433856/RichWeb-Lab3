const Observable = rxjs;

//Observable.fromEvent(document.getElementById("add"), 'click')
//  .subscribe(() => Add());

class notepadNote extends HTMLElement{
  constructor(){
    super();
    this.innerHTML = "This is a note"; 
  }
}

customElements.define("notepad-note", notepadNote);

const test_note = new notepadNote;
document.getElementById("list").appendChild(test_note);