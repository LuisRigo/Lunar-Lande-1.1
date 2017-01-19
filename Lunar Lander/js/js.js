var y = 90; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;
var jugando=true;

//al cargar por completo la página...
window.onload = function(){
	//al hacer click en la imagen del menú se abre el menu de opciones.
	document.getElementsByClassName("menu")[0].onclick = function () {
		document.getElementById("barra").style.display = "block";	
		document.getElementById("pausado").style.display = "block";
		document.getElementById("instruccionestexto").style.display = "none";
		document.getElementById("acercade").style.display = "none";
		document.getElementById("perdido").style.display="none";
		document.getElementById("felicidades").style.display="none";
		motorOff();
		jugando=false;
		stop();
	}
	// click en el play para reanudar
	document.getElementById("reanudar").onclick = function() {
		document.getElementById("barra").style.display = "none";
		document.getElementById("pausado").style.display = "none";	
		document.getElementById("acercade").style.display = "none";
		document.getElementById("instruccionestexto").style.display = "none";
		document.getElementById("perdido").style.display = "none";
		document.getElementById("felicidades").style.display = "none";
		motorOff();
		jugando=true;
		start();
	}
	//click en restart
	document.getElementById("restart").onclick = function() {
		document.getElementById("barra").style.display = "none";
		fuel=100;
		location.reload();				
	}		
	// click en about
	document.getElementById("about").onclick = function() {
		document.getElementById("barra").style.display = "none";
		document.getElementById("acercade").style.display="block";
		document.getElementById("pausado").style.display = "none";
		document.getElementById("instruccionestexto").style.display="none";
		document.getElementById("perdido").style.display = "none";
		document.getElementById("felicidades").style.display = "none";
	} 
	// ocultar about
	document.getElementById("ocultar").onclick=function(){
		document.getElementById("acercade").style.display="none";
		document.getElementById("barra").style.display = "block";
	}
	//click en instrucciones
	document.getElementById("instrucciones").onclick = function() {
		document.getElementById("barra").style.display = "none";
		document.getElementById("instruccionestexto").style.display="block";
		document.getElementById("pausado").style.display = "none";
		document.getElementById("acercade").style.display="none";
		document.getElementById("perdido").style.display = "none";
		document.getElementById("felicidades").style.display = "none";
	}
	//ocultar instrucciones
	document.getElementById("ocultarinstrucciones").onclick=function(){
		document.getElementById("instruccionestexto").style.display="none";
		document.getElementById("barra").style.display = "block";
	}
	//ocultar victoria
	document.getElementById("ocultarvictoria").onclick=function(){
		document.getElementById("felicidades").style.display="none";
		document.getElementById("barra").style.display = "block";
	}
	//ocultar derrota
	document.getElementById("ocultarderrota").onclick=function(){
		document.getElementById("perdido").style.display="none";
		document.getElementById("barra").style.display = "block";
	}
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementsByClassName("velocidad1")[0].innerHTML=v.toFixed(2);
	y -=v*dt;
	document.getElementsByClassName("altura1")[0].innerHTML=(y-24).toFixed(2);
	
	if (y>25){ 
		document.getElementById("divnave").style.top =(100-y)+"%"; 
	}
	else { 
	//explota si v>5 
		if (v >5) {
			stop();
			motorOff();
			document.getElementById("naveApagada").style.display = "none";
			document.getElementById("naveEncendida").style.display = "none";
			document.getElementById("explosion").style.display = "block";
			document.getElementById("perdido").style.display="block";
			
			jugando=false;
		
	}
	//no explota
	else {
		stop();
		clearInterval(timerFuel);
		document.getElementById("naveEncendida").style.display = "none";
		document.getElementById("naveApagada").style.display = "block";
		document.getElementById("explosion").style.display = "none";
		document.getElementById("felicidades").style.display="block";
		jugando=false;  
		motorOff();
	}
		
	}
		
}
// funciones del motor encendido o apagado
function motorOn(){
	if(jugando){
		a=-g;
		if (timerFuel==null)
			timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
			document.getElementById("naveApagada").style.display ="none";
			document.getElementById("naveEncendida").style.display = "block";
	}
}
function motorOff(){
	if(jugando){
		a=g;
		clearInterval(timerFuel);
		timerFuel=null;
		document.getElementById("naveApagada").style.display = "block";
		document.getElementById("naveEncendida").style.display = "none";
					}
}
function actualizarFuel(){
	if(fuel>0){
		fuel-=0.1;
		document.getElementsByClassName("fuel1")[0].innerHTML=fuel.toFixed(2);
	}
	else{
		fuel=0;
		document.getElementsByClassName("fuel1")[0].innerHTML=fuel.toFixed(2);
		motorOff();
	}
}
//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	document.onclick = function(){
		if (a==g){
			motorOn();
		}else {
			motorOff();
		}
	}
	


