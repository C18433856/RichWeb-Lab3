const Observable = rxjs;

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
  .subscribe(() => Add());

class notepadNote extends HTMLElement{
  constructor(text, parent_status){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(notepad_template.content.cloneNode(true));
    this.shadowRoot.getElementById("note-text").innerText = text;
    if(parent_status == ""){
      this.parent = "";
    }
    else
      this.parent = parent_status;
      this.shadowRoot.getElementById("child-create").style.display = "none";
  }
}

function Add(){
  const note_text = document.getElementById("entry").value;
  const test_note = new notepadNote(note_text, "");
  document.getElementById("list").appendChild(test_note);
}
customElements.define("notepad-note", notepadNote);

