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

var pane1 = document.getElementById("toggle-first"),
	pane2 = document.getElementById("toggle-second"),
	pane3 = document.getElementById("toggle-third"),
	pane4 = document.getElementById("toggle-fourth"),
	block1 = document.getElementById("pane-1"),
	block2 = document.getElementById("pane-2"),
	block3 = document.getElementById("pane-3");


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




function removeElement(element){
	element.style.display = "none";
};

function addFlexElement(element){
	element.style.display = "flex";
};

// click on pane switch 2
pane2.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block1);
	} else{
		addFlexElement(block1);
	}
});

// click on pane switch 3
pane3.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block2);
	} else{
		addFlexElement(block2);
	}
});

// click on pane switch 4
pane4.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block3);
	} else{
		addFlexElement(block3);
	}
});

/* mobile version */

document.getElementById("mobile-switch").onclick = function(e){
	if(block1.style.display != "none"){
		block1.style.display = "none";
		block2.style.display = "flex";
	} else{
		block2.style.display = "none";
		block1.style.display = "flex";
	}
};

document.getElementById("mobile-menu-btn").onclick = function(e){
	if(e.target.className == "glyphicon glyphicon-align-justify"){
		document.getElementById("sidebar-menu").style.marginLeft = "0";
		e.target.className = "glyphicon glyphicon-chevron-left";
} else{
		document.getElementById("sidebar-menu").style.marginLeft = "-100vw";
		e.target.className = "glyphicon glyphicon-align-justify";
}

};


$(document).ready(function () {

  /*****button events*****/

  $("#left-load-button").click(function () {
    $(this).addClass("active-button");
    $("#right-load-button").removeClass("active-button");
  });

  $("#right-load-button").click(function () {
    $(this).addClass("active-button");
    $("#left-load-button").removeClass("active-button");
  });

  $("#left-freight-button").click(function () {
    $(this).addClass("active-button");
    $("#right-freight-button").removeClass("active-button");
  });

  $("#right-freight-button").click(function () {
    $(this).addClass("active-button");
    $("#left-freight-button").removeClass("active-button");
  });

  $("#left-driver-button").click(function () {
    $(this).addClass("active-button");
    $("#right-driver-button").removeClass("active-button");
  });

  $("#right-driver-button").click(function () {
    $(this).addClass("active-button");
    $("#left-driver-button").removeClass("active-button");
  });

  $("#company-loading-button-id").click(function () {
    $(this).addClass("active-button");
    $("#customer-loading-button-id").removeClass("active-button");
    $("#none-loading-button-id").removeClass("active-button");
  });

  $("#customer-loading-button-id").click(function () {
    $(this).addClass("active-button");
    $("#company-loading-button-id").removeClass("active-button");
    $("#none-loading-button-id").removeClass("active-button");
  });

  $("#none-loading-button-id").click(function () {
    $(this).addClass("active-button");
    $("#company-loading-button-id").removeClass("active-button");
    $("#customer-loading-button-id").removeClass("active-button");
  });

  $("#company-palletExch-button-id").click(function () {
    $(this).addClass("active-button");
    $("#customer-palletExch-button-id").removeClass("active-button");
    $("#none-palletExch-button-id").removeClass("active-button");
  });

  $("#customer-palletExch-button-id").click(function () {
    $(this).addClass("active-button");
    $("#company-palletExch-button-id").removeClass("active-button");
    $("#none-palletExch-button-id").removeClass("active-button");
  });

  $("#none-palletExch-button-id").click(function () {
    $(this).addClass("active-button");
    $("#company-palletExch-button-id").removeClass("active-button");
    $("#customer-palletExch-button-id").removeClass("active-button");
  });

});
