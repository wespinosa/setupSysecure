/*El sistema determina una inactividad de 5 minutos y Bloquea el Sistema */
window.onclick=r;
window.onmousemove=r;
window.onkeypress=r;
document.onkeyup=r;

function r() {c=0;}
var i,c=0,t=300; //900/60 = 15 minutos
A();
function A()
{
	i=setInterval("B()",1000); //revisa cada segundo
}
function B()
{
	c++;	
	if(c>=t){
 		clearInterval(i);
 		var path = window.location.pathname.split('/');
 		var myurl = window.location.protocol + "//" + window.location.host + '/' + path[1] + '/bloquear.php';
        	window.top.document.location.href = myurl;
	}
}
   