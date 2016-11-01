document.getElementById("main-notify").onclick = function(){
	console.log(this.children[1]);
	if(this.children[1].style.display == "block")
		this.children[1].style.display = "none"; 
	else
		this.children[1].style.display = "block"; 
};