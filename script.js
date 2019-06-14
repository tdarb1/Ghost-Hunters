
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

var contBtn = document.getElementById("contBtn");


//Identifies the second modal
var modal2 = document.getElementById("modal2");

//Replaces the first modal with the second
 function conBtnOnClick () {
  button.style.visibility = "hidden";
  modal.syle,display = "none";
}

//Opens the second modal
contBtn.onclick = function() {
  modal2.style.display = "block";
  contBtn.style.display="none";
}


// Get the <span> element that closes the modal2
var span2 = document.getElementsByClassName("close2")[0];


// When the user clicks on <span> (x), close the modal2
span2.onclick = function() {
  modal2.style.display = "none";
  modal.style.display = "none";
}

var play = document.getElementById("play");

play.onClick = function() {
  window.open('game.html', "_self");
}





