const Observable = rxjs;

Observable.fromEvent(document.getElementById("add"), 'click')
  .subscribe(() => Add());

class notepadNote extends HTMLElement{
  connectedCallback(){
    this.innerHTML = "<h1>This is a note</h1>";
  }
}

customElements.define("notepad-note", notepadNote);