const Observable = rxjs;

//Observable.fromEvent(document.getElementById("add"), 'click')
//  .subscribe(() => Add());

const notepad_template = document.createElement('template');
notepad_template.innerHTML = `
<style>
article{
  text-align: center;
  word-wrap: break-word;
  width: 20vw;
  margin: auto;
  margin-top: 1vh;
  color: white;
  font-size: 3vh;
}
article p{
  margin: 0;
  background-color: blue;
}
#buttons{
  text-align: center;
  width: 20vw;
  margin: auto;
  font-size: 3vh;
}</style>
<article>
  <p></p>
  <div>
    <button type="button">Delete</button>
    <button type="button">Make Child Note</button>
  </div>
</article>`


class notepadNote extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:open});
    this.shadowRoot.appendChild(notepad_template.content.cloneNode(true));
  }
}

customElements.define("notepad-note", notepadNote);

const test_note = new notepadNote;
document.getElementById("list").appendChild(test_note);