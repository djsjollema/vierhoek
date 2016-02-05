window.addEventListener("load",function(){ 
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var mouse = utils.captureMouse(canvas);
    var keus = document.getElementById("keus");
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    
   keus.addEventListener("change",function(e){
       console.log(e.target.value)
   })
    
    
    (function animate(){
        window.requestAnimationFrame(animate);
        context.clearRect(0,0,cWidth,cHeight);
    })();
    
});


