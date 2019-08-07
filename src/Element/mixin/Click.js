import {lift} from '../../util/tool/color'
import Rect from '../graphic/shape/Rect'
function Click(){

    this._chooseObject = null;

    this.on('click',this._choose,this)
    
    this.__visionRect = null;
}

Click.prototype = {

    constructor: Click,

   
    _choose: function(e){

        var clickingTarget = e.target;

      //  console.log("Click:"+clickingTarget.type)

        if(clickingTarget){
            console.log("进入流程:",clickingTarget.type)
            if(this._preSelect){
                //_down(this._preSelect)
            }
            this._select = clickingTarget;
            this.drawVisionRect(this._select);
            this._highlight(clickingTarget)
            this._preSelect = clickingTarget
            this._chooseObject = clickingTarget

        }
        else{
            this.storage.delRoot(this.__visionRect);
        }
        console.log("点击目标",e.target.transform);

    },
    drawVisionRect: function(target){
        var param;
        param = target&&target.getVisionBoundingRect()
        target.__zr.showProperty&&(typeof target.__zr.showProperty === 'function')&&target.__zr.showProperty(target.type)
        console.log("bounding:",param)
        if(this.__visionRect) this.storage.delRoot(this.__visionRect)
        this.__visionRect = new Rect({shape:param, style: {
            stroke: '#ccc',
            fill: 'none',
            lineDash: [5, 5, 10, 10],
        },})
        this.storage.addRoot(this.__visionRect)
        

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