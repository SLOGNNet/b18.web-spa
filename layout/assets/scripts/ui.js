// click on notification icon
document.getElementById("main-notify").onclick = function(){
	if(this.children[1].style.display == "block")
		this.children[1].style.display = "none"; 
	else
		this.children[1].style.display = "block"; 
};


// click on pane switch
var ul = document.getElementById('pane-switch-group'),
	li = ul.getElementsByTagName("li");

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
      if(e.target.className != "active") {
      	e.target.className = "active";
      } else {
      	e.target.className = "";
      }     
  } 
});

function hideMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "-120px";
	document.getElementById("main-content").style.marginLeft = "0";
}
function showMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "0";
	document.getElementById("main-content").style.marginLeft = "120px";
}

/* click on switch pane */

var pane1 = document.getElementById("first-pane"),
	pane2 = document.getElementById("second-pane"),
	pane3 = document.getElementById("third-pane"),
	pane4 = document.getElementById("fourth-pane");


pane1.onclick = function(e){
	if(e.target.className != "active"){
		console.log("hide");
		hideMainMenu();
	} else {
		console.log("show");
		showMainMenu();
	}
}

document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
	if(pane1.className != "active"){
		return;
	}else if(pane1.className == "active"){
        if (event.clientX <= 50) {
        	showMainMenu();
        } else if(event.clientX >= 50){
        	hideMainMenu();
        }
	}
}

