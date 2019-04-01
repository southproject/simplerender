function IText(){ //Interactive Text
    
    this.on('dblclick',this.displayInput,this)
    this.on('mousedown',this.delayWrap,this)//setTimeout(this.noFocus,300)
  //  this.on('mouseup',this.free,this)
    this._Itexting = false;//means there is going a itext
    this._itext = null;
    this._itextId = null;
    this.textTarget = null; //where choosed textNode  store
}

IText.prototype = {

    

    constructor: IText,

    upText: function(e,target){
        this.textTarget.attr("style",{text:this._itext.value})
    },
    displayInput: function(e){  //定位可编辑文本框

        if(this._Itexting&&this.textTarget===e.target) return 

        if(e.target&&e.target.type === 'text'){

        var textTarget = this.textTarget = e.target;
           
         //   console.log("dom:",textTarget.__zr.painter)
         console.log("bounding:",textTarget&&textTarget.getVisionBoundingRect())
         
          //  var location = textTarget.getBoundingRect()
            var parent = textTarget.__zr.painter.root
            var itext = this._itext;
             if(itext) {//just addEventListener again
                this._itext.value = textTarget.style.text
                this._itext.focus();
                this._itext.addEventListener("keyup",()=>this.upText())
             }

             else{
                this._itext=document.createElement("textarea");
                this._itext.defaultValue = textTarget.style.text
              //  itext.appendChild(defaultText);
                this._itext.style.position = "absolute"
              //  this._itext.style.display = "none"
                parent.appendChild(this._itext)
                this._itext.focus();
                this._itext.addEventListener("keyup",()=>this.upText())
             }
            
           
            this._Itexting = true;

        }
        
    },

    occupy: function(e){
        var draggingTarget = e.target;

        if (draggingTarget) { 
            if(!draggingTarget._occupied){
                draggingTarget._occupied = true;
                var username = draggingTarget.__zr.objectList.user;
                draggingTarget.attr("style",{  text:username,
                textPosition:[200,140],
                textFill: '#0ff',
                fontSize: 30,
                fontFamily: 'Lato',
                fontWeight: 'bolder',})  
            }//don't need stack
          //  draggingTarget.__zr.objectList.addBoundingRect(draggingTarget.getVisionBoundingRect())
        }
    },
    free: function(e){
        var draggingTarget = e.target;
        if (draggingTarget){
            draggingTarget._occupied = false;
            var username = draggingTarget.__zr.objectList.user;
            draggingTarget.attr("style",{text:null})
        }
    },
    delayWrap: function(e){
      //  setTimeout(this.noFocus.bind(this,e),300)
      setTimeout(()=>this.noFocus(e),300)
    },
    noFocus: function(e){
        console.log(e)
        if(this._Itexting){
            var downTarget = e.target;
            if(downTarget!==this.textTarget){
                this._itext.removeEventListener("keyup",()=>this.upText())
                this._Itexting = false;
            }
            else  this._itext.focus();
        }
    }


}

export default IText;