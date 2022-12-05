const Observable = rxjs;
const {Subject} = rxjs;

let unique_note = 0;

const notepad_template = document.createElement('template');
notepad_template.innerHTML = `
<style>
article{
  text-align: center;
  word-wrap: break-word;
  width: 20vw;
  margin: auto;
  margin-top: 1vh;
  font-size: 3vh;
  border: 1px solid black;
}
article p{
  margin: 0;
}
#buttons{
  text-align: center;
  width: 20vw;
  margin: auto;
  font-size: 3vh;
}</style>
<article>
  <p id="note-text"></p>
  <div>
    <button id="note-delete" type="button">Delete</button>
    <button id="child-create" type="button">Make Child Note</button>
  </div>
</article>`

Observable.fromEvent(document.getElementById("add"), 'click')
  .subscribe(() => Add(""));

class notepadNote extends HTMLElement{
  constructor(text, parent_status, subject_in){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(notepad_template.content.cloneNode(true));
    this.shadowRoot.getElementById("note-text").innerText = text;
    if(parent_status == ""){
      this.parent = "";
      this.identity = "note" + unique_note;
      this.subject = new Subject();
      Observable.fromEvent(this.shadowRoot.getElementById("child-create"), 'click')
      .subscribe(() => Add(this.identity, this.subject));
      Observable.fromEvent(this.shadowRoot.getElementById("note-delete"), 'click')
      .subscribe(() => {this.subject.next(); this.remove()});
    }
    else{
      this.parent = parent_status;
      subject_in.subscribe({next: () => this.remove()})
      this.shadowRoot.getElementById("child-create").style.display = "none";
      this.shadowRoot.getElementById("note-delete").style.display = "none";
    }
  }
}

function Add(parent, subject=null){
  const note_text = document.getElementById("entry").value;
  const note = new notepadNote(note_text, parent, subject);
  document.getElementById("list").appendChild(note);
}

customElements.define("notepad-note", notepadNote);

