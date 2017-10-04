var distances = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250];
var milliradians = [1579, 1558, 1538, 1517, 1496, 1475, 1453, 1431, 1409, 1387, 1364, 1341, 1317, 1292, 1267, 1240, 1212, 1183, 1152, 1118, 1081, 1039, 988, 918, 800];

var size_x = 3200;/*Map width (m), default al-basrah*/
var size_y = 3200;/*Map height (m), default al-basrah*/

function updateMapSize(str)
{
	switch (str)
	{
		case "al-basrah":
			size_x = 3200;
			size_y = 3200;
			break;
		case "chora":
			size_x = 4066;
			size_y = 4066;
			break;
		case "fools-road":
			size_x = 1733;
			size_y = 1777;
			break;
		case "gorodok":
			size_x = 4333;
			size_y = 4333;
			break;
		case "kohat-toi":
			size_x = 4017;
			size_y = 4017;
			break;
		case "kokan":
			size_x = 2500;
			size_y = 2500;
			break;
		case "logar-valley":
			size_x = 1766;
			size_y = 1766;
			break;
		case "narva":
			size_x = 2200;
			size_y = 2200;
			break;
		case "op-first-light":
			size_x = 1200;
			size_y = 1200;
			break;
		case "sumari-bala":
			size_x = 1300;
			size_y = 1300;
			break;
		case "yehorivka":
			size_x = 4033;
			size_y = 4033;
			break;
		default:
			size_x = 3200;
			size_y = 3200;
	}
}

function artilleryCalc(mx, my, tx, ty)
{
	var dx = tx - mx;
	var dy = my - ty;
	var rad = Math.atan2(dx, dy);
	var deg = rad * (180 / Math.PI);
	if (deg < 0)
	{
		deg = 360 + deg;
	}
	document.getElementById("form_deg").value = deg;

	var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	if (dis < 50)
	{
		document.getElementById("form_mil").value = "MAX ELEV";
	}
	else if (dis > 1250)
	{
		document.getElementById("form_mil").value = "MIN ELEV";
	}
	else
	{
		for (var i = 0; i < distances.length; i++)
		{
			if(dis < distances[i])
			{
				var mil_y = (milliradians[i] - milliradians[i - 1]);
				var mil_x = (distances[i] - distances[i - 1]);
				var m = mil_y / mil_x;
				document.getElementById("form_mil").value = (m * (dis - distances[i-1]) + milliradians[i-1]);
				break;
			}
		}
	}
	return;
}

function omg()
{
	var mx, my, tx, ty;
	mx = xToMeters(document.getElementById("mortar").getBoundingClientRect().left);
	my = yToMeters(document.getElementById("mortar").getBoundingClientRect().top);
	tx = xToMeters(document.getElementById("target").getBoundingClientRect().left);
	ty = yToMeters(document.getElementById("target").getBoundingClientRect().top);
	console.log(mx, my, tx, ty);

	artilleryCalc(mx, my, tx, ty);
}

function xToMeters(a)
{
	var map = document.getElementById("currentMap").getBoundingClientRect();
	var rel_x = a - map.left;
	var per_x = rel_x / map.right;
	var res = per_x * size_x;
	return res;
}
function yToMeters(a)
{
	var map = document.getElementById("currentMap").getBoundingClientRect();
	var rel_y = a - map.top;
	var per_y = rel_y / map.bottom;
	var res = per_y * size_y;
	return res;
}

function changeMap(str)
{
	document.getElementById("currentMap").src = "images/maps/"+str+".png";
	document.getElementById("mortar").style.visibility = "hidden";
	document.getElementById("target").style.visibility = "hidden";
	document.getElementById("currentMap").style.filter = "brightness(100%)";
	updateMapSize(str);
}
function changeMapB(str)
{
	document.getElementById("currentMap").src = "images/maps/"+str+".png";
	document.getElementById("mortar").style.visibility = "hidden";
	document.getElementById("target").style.visibility = "hidden";
	document.getElementById("currentMap").style.filter = "brightness(200%)";
	updateMapSize(str);
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
		omg();
	});
	document.getElementById("currentMap").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px";
		document.getElementById("target").style.top = event.clientY+"px";
		omg();
	});
	document.getElementById("mortar").addEventListener("contextmenu", function(event){
		event.preventDefault();
		document.getElementById("mortar").style.visibility = "visible";
		document.getElementById("mortar").style.left = event.clientX+"px";
		document.getElementById("mortar").style.top = event.clientY+"px";
		omg();
	});
	document.getElementById("mortar").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px";
		document.getElementById("target").style.top = event.clientY+"px";
		omg();
	});
	document.getElementById("target").addEventListener("contextmenu", function(event){
		event.preventDefault();
		document.getElementById("mortar").style.visibility = "visible";
		document.getElementById("mortar").style.left = event.clientX+"px";
		document.getElementById("mortar").style.top = event.clientY+"px";
		omg();
	});
	document.getElementById("target").addEventListener("click", function(event){
		document.getElementById("target").style.visibility = "visible";
		document.getElementById("target").style.left = event.clientX+"px";
		document.getElementById("target").style.top = event.clientY+"px";
		omg();
	});
}