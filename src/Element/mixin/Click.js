import {lift} from "../../util/tool/color"
function Click(){

    this._chooseObject = null;

    this.on('click',this._choose,this)
    
}

Click.prototype = {

    constructor: Click,

    _choose: function(e){

        var clickingTarget = e.target;

        console.log("Click:"+clickingTarget)

        if(clickingTarget){
            console.log("进入流程")
            if(this._preSelect){
              
                //shadow(this._preSelect)
            }
            this._select = clickingTarget

            this._hover(clickingTarget)
            this._preSelect = clickingTarget
            this._chooseObject = clickingTarget

        }

    },
    _hover(el){
        if(el&&el.style&&el.style.fill==="transparent"){
            let color = lift(el.style.stroke,0.5)
            el.setStyle("stroke",color)
        }
        else{
            let color = lift(el.style.fill,0.5)
            el.setStyle("stroke",color)
        }
    },
    _shadow(el){

    }

}

export default Click;