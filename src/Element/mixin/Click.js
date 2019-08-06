import {lift} from '../../util/tool/color'
import Rect from '../graphic/shape/Rect'
function Click(){

    this._chooseObject = null;
    this._preSelectRect = null;
    this.on('click',this._choose,this)
    
}

Click.prototype = {

    constructor: Click,

   
    _choose: function(e){

        var clickingTarget = e.target;

      //  console.log("Click:"+clickingTarget.type)

        if(clickingTarget){
        //    console.log("进入流程:",clickingTarget.type)
            if(this._preSelect){
                
                //_down(this._preSelect)
            }
            this._select = clickingTarget;
            this.drawVisionRect(this._select);
            this._highlight(clickingTarget)
            this._preSelect = clickingTarget
            this._chooseObject = clickingTarget

        }

    },
    drawVisionRect: function(target){
        var param;
        param = target&&target.getVisionBoundingRect();
        target.__zr.showProperty&&(typeof target.__zr.showProperty === 'function')&&target.__zr.showProperty(target.type)
        this._preSelectRect && this.storage.delRoot(this._preSelectRect)
        this._preSelectRect = new Rect({shape:param, style: {
            stroke: '#ccc',
            fill: 'none',
            lineDash: [5, 5, 10, 10],
        },})
        this.storage.addRoot(this._preSelectRect)
        

    },
    clearVisonRect: function(e){

    },
    _highlight(el){
        if(el&&el.style&&el.style.fill==="transparent"){
           let color = lift(el.style.stroke,0.9)
            el.setStyle("opacity",0.9)
       //   el.setStyle("stroke",color)
        }
        else{
             let color = lift(el.style.fill,0.9)
        //     el.setStyle("stroke",color)
       //     el.setStyle("fill",color)
            el.setStyle("opacity",0.9)
        }
    },
    _down(el){

    }

}

export default Click;