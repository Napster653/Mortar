function changeMap(str)
{
	document.getElementById("currentMap").src = "images/maps/"+str+".png";
	document.getElementById("mortar").style.visibility = "hidden";
	document.getElementById("target").style.visibility = "hidden";
	document.getElementById("currentMap").style.filter = "brightness(100%)";
}
function changeMapB(str)
{
	document.getElementById("currentMap").src = "images/maps/"+str+".png";
	document.getElementById("mortar").style.visibility = "hidden";
	document.getElementById("target").style.visibility = "hidden";
	document.getElementById("currentMap").style.filter = "brightness(200%)";
}
/*function userClick(event)
{
	var abs_x = 0;
	var abs_y = 0;
	var rel_x = 0;
	var rel_y = 0;

	var rect = document.getElementById("currentMap").getBoundingClientRect();
	var mapWidth = rect.right - rect.left;
	var mapHeight = rect.bottom - rect.top;
	
	abs_x = event.clientX;
	abs_y = event.clientY;

	rel_x = event.clientX - document.getElementById("currentMap").getBoundingClientRect().left;
	rel_y = event.clientY - document.getElementById("currentMap").getBoundingClientRect().top;

	document.getElementById("form_x").value = rel_x;
	document.getElementById("form_y").value = rel_y;

	console.log(rect.top, rect.right, rect.bottom, rect.left, mapWidth, mapHeight);
}*/
window.onload = function(){
	document.getElementById("currentMap").addEventListener("contextmenu", function(event){
		event.preventDefault();
		document.getElementById("mortar").style.visibility = "visible";
		document.getElementById("mortar").style.left = event.clientX+"px"; 
		document.getElementById("mortar").style.top = event.clientY+"px"; 
	});
	document.getElementById("currentMap").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px"; 
		document.getElementById("target").style.top = event.clientY+"px"; 
	});
	document.getElementById("mortar").addEventListener("contextmenu", function(event){
		event.preventDefault();
		document.getElementById("mortar").style.visibility = "visible";
		document.getElementById("mortar").style.left = event.clientX+"px"; 
		document.getElementById("mortar").style.top = event.clientY+"px"; 
	});
	document.getElementById("mortar").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px"; 
		document.getElementById("target").style.top = event.clientY+"px"; 
	});
	document.getElementById("target").addEventListener("contextmenu", function(event){
		event.preventDefault();
		document.getElementById("mortar").style.visibility = "visible";
		document.getElementById("mortar").style.left = event.clientX+"px"; 
		document.getElementById("mortar").style.top = event.clientY+"px"; 
	});
	document.getElementById("target").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px"; 
		document.getElementById("target").style.top = event.clientY+"px"; 
	});
}