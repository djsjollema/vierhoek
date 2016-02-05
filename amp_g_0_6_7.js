/** 
@file amp_g_0_6_7
@description verzameling classes van de lessen Applied Mathematics and Physics (amp) voor de opleiding Game Developer
Generatie 0, periode 6, les 7
*/

/**
 * @class produces a vector
 * @param {Number} dx - difference in x direction
 * @param {Number} dy - difference in y direction
 * @param {Number} r - magnitude of the Vector
 * @param {Number} hoek - angle of the Vector
 */
function Vector(dx,dy){
    var _dx = dx;
    var _dy = dy;
    var _r = Math.sqrt(_dx*_dx + _dy*_dy);
    var _hoek = Math.atan2(_dy,_dx);   
   
   this.__defineGetter__('dx',function(){
        return _dx;
    });
    
    this.__defineGetter__('dy',function(){
        return _dy;
    });
    
    this.__defineGetter__('r',function(){
        return _r;
    });
    
    this.__defineGetter__('hoek',function(){
        return _hoek;
    });
    
    this.__defineSetter__('dx',function(dx){
        _dx = dx;
        _r = Math.sqrt(_dx*_dx + _dy * _dy);
        _hoek = Math.atan2(_dy,_dx);
    });
    
    this.__defineSetter__('dy',function(dy){
        _dy = dy;
        _r = Math.sqrt(_dx*_dx + _dy * _dy);
        _hoek = Math.atan2(_dy,_dx);
    });

    this.__defineSetter__('r',function(r){
        _r = r;
        _dx = _r * Math.cos(_hoek);
        _dy = _r * Math.sin(_hoek);
    });
    
    this.__defineSetter__('hoek',function(hoek){
        _hoek = hoek;
        _dx = _r * Math.cos(_hoek);
        _dy = _r * Math.sin(_hoek);
    });       
};

/**
* static function library for Vector-operations
* @class
*/

var VectorOperaties ={
    /** summize 2 vectors 
    * @param {Vector} v - vector
    * @param {Vector} w - vector
    * @returns {Vector}
    * 
    */
    som: function(v,w){
        var ans = new Vector(v.dx+w.dx,v.dy+w.dy);
        return ans;
    },
    /** substract 2 vectors 
    * @param {Vector} v - vector
    * @param {Vector} w - vector
    * @returns {Vector}
    * 
    */    
    verschil: function(v,w){
        var ans = new Vector(v.dx-w.dx,v.dy-w.dy);
        return ans;       
    },
    /** multiply a Vector with a scalair 
    * @param {Vector} v - vector
    * @param {Number} getal - scalair
    * @returns {Vector}
    * 
    */       
    scalairVerm:function(v,getal){
        var ans = new Vector(v.dx * getal,v.dy*getal);
        return ans;
    }
}
/**
 * @class produces a dragable point
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} r - radius of the point
 * @param {Number} color - color of the point
 * @param {Number} mouse - mouse object from utils
 */
function Point(x, y, r, color, mouse) {
    var self = this;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    var drag = false;
    /** update the point 
    * @returns {void}
    */ 
    this.update = function () {
        if (drag) {
            this.x = mouse.x;
            this.y = mouse.y;
        };
    }

    addEventListener('mousedown', function () {
        var dx = mouse.x - self.x;
        var dy = mouse.y - self.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= self.r) {
            drag = true;
        } else {
            drag = false;
        }
    });

    addEventListener('mouseup', function () {
        drag = false;
    });
    /** draw the point 
    * @param {context} context - target context
    * @returns {void}
    */ 
    this.draw = function (context) {
        context.beginPath();
        context.lineWidth = 4;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.stroke();
        context.fill();
        context.closePath();
    }
}
/**
 * @class produces a non-dragable point
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Number} r - radius of the point
 * @param {Number} color - color of the point
 * @param {Number} mouse - mouse object from utils
 */
function Ball(x,y,r,color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    
    /** draw the point 
    * @param {context} context - target context
    * @returns {void}
    */   
    this.draw = function(context){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x,this.y,this.r,0,2*Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
}

/**
 * @class produces a grid
 * @param {Number} w - width of the grid
 * @param {Number} h - height of the grid
 * @param {Number} dx - distance betwee two vertical lines
 * @param {Number} dy - distance betwee two horizontal lines
 * @param {Number} modx - distance between vertical marker lines
 * @param {Number} mody - distance between horizontal marker lines
 */
function Grid(w,h,dx,dy,modx,mody){
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.modx = modx;
    this.mody = mody;
    
    
    /** draw the grid 
    * @param {context} context - target context
    * @returns {void}
    */   
    this.draw = function(context){
        for(i = 0; i< this.h; i+=this.dx){
            context.beginPath();
            context.strokeStyle = "#000000";
            if(i%this.mody == 0){
                context.lineWidth = 3;
            } else {
               context.lineWidth = 1;
            }
            context.moveTo(0,i);
            context.lineTo(this.w,i);
            context.stroke();
        }
        for(i= 0; i<this.w; i+= this.dy){
            context.beginPath();
            if(i%this.modx == 0){
                context.lineWidth = 3;
            } else {
               context.lineWidth = 1;
            }            context.moveTo(i,0);
            context.lineTo(i,this.h);
            context.stroke();
        }
    }
}