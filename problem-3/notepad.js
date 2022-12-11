const Observable = rxjs;
const {Subject} = rxjs;

// Identify separate parent notes
let unique_note = 1;

// Template for notepadNote class
const notepad_template = document.createElement('template');
notepad_template.innerHTML = `
<style>
article{
  text-align: center;
  word-wrap: break-word;
  width: 20vw;
  margin: auto;
  margin-top: 2vh;
  font-size: 3vh;
  border: 1px solid black;
}
article p{
  margin: 0;
}
#note-name{
  border-bottom: 1px solid black;
  background-color: lightgray;
}
</style>
<article id="note-body">
  <p id="note-name"></p>
  <p id="note-text"></p>
  <div>
    <button id="note-delete" type="button">Delete</button>
    <button id="child-create" type="button">Make Child Note</button>
  </div>
</article>`

// Create an observable that tracks the add button being clicked
Observable.fromEvent(document.getElementById("add"), 'click')
  .subscribe(() => Add(document.getElementById("entry").value));

// Class - create either parent or children notes based on inputs received in the constructor
class notepadNote extends HTMLElement{
  constructor(text, parent_in, subject_in){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(notepad_template.content.cloneNode(true));
    this.shadowRoot.getElementById("note-text").innerText = text;

    // Make a child node
    if(parent_in){
      this.parent = parent_in;
      subject_in.subscribe({next: () => this.remove()})
      this.shadowRoot.getElementById("note-name").style.backgroundColor = "#7393B3"
      this.shadowRoot.getElementById("note-name").innerText = "Child of " + this.parent.identity;
      this.shadowRoot.getElementById("child-create").style.display = "none";
      this.shadowRoot.getElementById("note-body").style.marginTop = "0.1px";
      this.shadowRoot.getElementById("note-body").style.borderTop = 0;

      // Allow note to delete itself using the delete button
      Observable.fromEvent(this.shadowRoot.getElementById("note-delete"), 'click')
      .subscribe(() => {this.remove()});

    }
    // Make a parent note
    else{
      this.parent = null;
      this.identity = "Note " + unique_note;
      unique_note++;
      this.shadowRoot.getElementById("note-name").innerText = this.identity;
      this.subject = new Subject(); // Child notes will subscribe to this

      // Create child note
      Observable.fromEvent(this.shadowRoot.getElementById("child-create"), 'click')
      .subscribe(() => Add(prompt("Enter input for child node"),this, this.subject));

      // When the delete button is clicked, delete all children than delete itself
      Observable.fromEvent(this.shadowRoot.getElementById("note-delete"), 'click')
      .subscribe(() => {this.subject.next(); this.remove()});
    }
  }
}

// Runs when the Add button is clicked
function Add(input, parent=null, subject=null){
  if(input == "" || input == null){
    alert("Please enter some text");
    return;
  }
  const note = new notepadNote(input, parent, subject);
  if(!parent)
    document.getElementById("list").appendChild(note);
  else
    parent.insertAdjacentElement("afterend", note);
  
}

// Define custom html element using the notepadNote class
customElements.define("notepad-note", notepadNote);

