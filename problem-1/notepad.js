const Observable = rxjs;
counter = 0;  // Used to generate ID's

// Add a new entry to the list
function Add() {
  if(document.getElementById("entry").value == ""){
    alert("Please enter some text");
    return;
  }
  // Create container which will contain the new entry
  const new_entry = document.createElement("article");
  new_entry.id = String(counter);

  const element = document.getElementById("list");
  element.appendChild(new_entry);   // Add the container to the entry lists

  // Create container which will hold the text of the entry
  const new_text = document.createElement("p");
  new_text.id = String(counter).concat("text");
  new_entry.appendChild(new_text);
  new_text.innerHTML = document.getElementById("entry").value;

  document.getElementById("entry").value = "";   //empty the input

  // Create container which will hold the buttons of the entry
  const buttons = document.createElement("div");
  buttons.id = String(counter).concat("buttons");
  new_entry.appendChild(buttons);

  // Create the delete button
  const delete_button = document.createElement("button");
  delete_button.innerHTML = "Delete";
  delete_button.name = String(counter);
  buttons.appendChild(delete_button);

  // Delete button functionality
  // OLD
  // delete_button.onclick = function () {
  //   document.getElementById(this.name).remove();
  // };

  // Create observable that tracks when the delete button is clicked
  Observable.fromEvent(delete_button, 'click')
  .subscribe(() => document.getElementById(delete_button.name).remove());

  // Create the edit button
  const edit_button = document.createElement("button");
  edit_button.innerHTML = "Edit";
  edit_button.name = String(counter).concat("text");
  buttons.appendChild(edit_button);

  // Edit button functionality
  // OLD
  // edit_button.onclick = function () {
  //   const new_text = prompt("Please enter new entry");
  //   document.getElementById(this.name).innerHTML =  new_text;
  // }

  // Create observable that tracks when the edit button is clicked
  Observable.fromEvent(edit_button, 'click')
  .subscribe(() => {const new_text = prompt("Please enter new entry");
                    document.getElementById(edit_button.name).innerHTML =  new_text;});


  // button to change background to red
  const red = document.createElement("button");
  red.innerHTML = "red";
  red.name = String(counter).concat("text");
  buttons.appendChild(red);

  // Red button functionality
  // OLD
  // red.onclick = function(){
  //   change_color(red.innerHTML, red.name)
  // }

  // Create observable that tracks when the red button is clicked
  Observable.fromEvent(red, 'click')
  .subscribe(() => change_color(red.innerHTML, red.name));


  // button to change background to blue
  const blue = document.createElement("button");
  blue.innerHTML = "blue";
  blue.name = String(counter).concat("text");
  buttons.appendChild(blue);

  // Blue button functionality
  // OLD:
  // blue.onclick = function(){
  //   change_color(blue.innerHTML, blue.name)
  // }

  // Create observable that tracks when the blue button is clicked
  Observable.fromEvent(blue, 'click')
  .subscribe(() => change_color(blue.innerHTML, blue.name));

  // button to change background to green
  const green = document.createElement("button");
  green.innerHTML = "green";
  green.name = String(counter).concat("text");
  buttons.appendChild(green);

  // Green button functionality
  //OLD:
  // green.onclick = function(){
  //   change_color(green.innerHTML, green.name)
  // }

  // Create observable that tracks when the green button is clicked
  Observable.fromEvent(green, 'click')
  .subscribe(() => change_color(green.innerHTML, green.name));


  counter++;  // Increment the counter to generate a new ID for further contianers
}

// OLD: document.getElementById("add").addEventListener("click", Add);    // Make the add button call the above function

// Create observable that tracks when the add button is clicked
Observable.fromEvent(document.getElementById("add"), 'click')
  .subscribe(() => Add());


// Function to change the background color of the text container
function change_color(color, id){
  document.getElementById(id).style.backgroundColor = color;
};