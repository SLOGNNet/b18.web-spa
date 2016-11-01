// click on notification icon
document.getElementById("main-notify").onclick = function(){
	console.log(this.children[1]);
	if(this.children[1].style.display == "block")
		this.children[1].style.display = "none"; 
	else
		this.children[1].style.display = "block"; 
};


// click on pane switch
var ul = document.getElementById('pane-switch-group'),
	li = ul.getElementsByTagName("li");

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI' && e.target.className != "active"){
      for(var i = 0; i < li.length; i++) {
      	li[i].className = "";
      }  
      e.target.className = "active";
  } 
});

