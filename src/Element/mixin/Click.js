import {lift} from '../../util/tool/color'

function Click(){

    this._chooseObject = null;

    this.on('click',this._choose,this)
    
    // this.__visionRect = null;
    // this.__visionCircle = null;
}

Click.prototype = {

    constructor: Click,

   
    _choose: function(e){

        var clickingTarget = e.target;

      //  console.log("Click:"+clickingTarget.type)

        if(clickingTarget&&clickingTarget.type!=='vision'&&clickingTarget.type!=='rotate'){
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
            if(this.__visionRect) this.storage.delRoot(this.__visionRect);
            if(this.__visionCircle) this.storage.delRoot(this.__visionCircle);
        }
        console.log("点击目标",e.target);
    },
    
    /* drawVisionRect: function(target){
        var param;
        param = target&&target.getVisionBoundingRect()
        target.__zr.showProperty&&(typeof target.__zr.showProperty === 'function')&&target.__zr.showProperty(target.type)
        console.log("bounding:",param)
        if(this.__visionRect) this.storage.delRoot(this.__visionRect)
        if(this.__visionCircle){
            this.__visionCircle.target=null;
            this.storage.delRoot(this.__visionCircle)
        }
        this.__visionRect = new Rect({shape: param, style: {stroke: '#ccc',fill: 'none', lineDash: [5, 5, 10, 10]}})
        this.__visionCircle = new Circle({shape: {cx: param.x+param.width, cy: param.y+param.height,r: 6},style: {fill:'#1DA57A',stroke:null}})
        this.__visionCircle.target = this.__visionRect.target = target
        this.__visionRect.type =this.__visionCircle.type =  'vision'

        //this.__visionCircle.on("mousemove",move.bind(this))

        this.storage.addRoot(this.__visionRect)
        //this.storage.addRoot(this.__visionCircle)
        console.log('circle',this.__visionCircle)
    }, */
    
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