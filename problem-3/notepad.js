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
}
#note-name{
  border-bottom: 1px solid black;
  background-color: lightgray;
}</style>
<article>
  <p id="note-name"></p>
  <p id="note-text"></p>
  <div>
    <button id="note-delete" type="button">Delete</button>
    <button id="child-create" type="button">Make Child Note</button>
  </div>
</article>`

Observable.fromEvent(document.getElementById("add"), 'click')
  .subscribe(() => Add(document.getElementById("entry").value));

class notepadNote extends HTMLElement{
  constructor(text, parent_in, subject_in){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(notepad_template.content.cloneNode(true));
    this.shadowRoot.getElementById("note-text").innerText = text;
    console.log(parent_in);
    // Make a child node
    if(parent_in){
      this.parent = parent_in;
      subject_in.subscribe({next: () => this.remove()})
      this.shadowRoot.getElementById("note-name").innerText = "Child of " + this.parent.identity;
      this.shadowRoot.getElementById("child-create").style.display = "none";
      this.shadowRoot.getElementById("note-delete").style.display = "none";
      console.log(this.parent);
    }
    // Make a parent note
    else{
      this.parent = null;
      this.identity = "Note " + unique_note;
      unique_note++;
      this.shadowRoot.getElementById("note-name").innerText = this.identity;
      this.subject = new Subject();
      Observable.fromEvent(this.shadowRoot.getElementById("child-create"), 'click')
      .subscribe(() => Add(prompt("Enter input for child node"),this, this.subject));
      Observable.fromEvent(this.shadowRoot.getElementById("note-delete"), 'click')
      .subscribe(() => {this.subject.next(); this.remove()});
    }
  }
}

function Add(input, parent=null, subject=null){
  if(input == ""){
    alert("Please enter some text");
    return;
  }
  const note = new notepadNote(input, parent, subject);
  document.getElementById("list").appendChild(note);
}

customElements.define("notepad-note", notepadNote);

