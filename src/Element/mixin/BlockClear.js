function BlockClear(){ //Interactive Text
    
    this.on('dblclick',this.clear,this)
    
}

BlockClear.prototype = {
    
    constructor: BlockClear,

   
    clear: function(e){  //display textarea to get keyboard input

        if(e.target&&e.target.type === 'rect'){

        var rectTarget = this.textTarget = e.target;
           
         //   console.log("dom:",textTarget.__zr.painter)
       //  console.log("bounding:",rectTarget&&rectTarget.getVisionBoundingRect())
         
      console.log(rectTarget.__zr.painter.layer)  
           

        }
        
    },


}

export default BlockClear;