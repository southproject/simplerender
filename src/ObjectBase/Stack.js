
var Stack = function(storage){

    this.storage = storage;

    this._memory = []

    this._undoList = [];

    this._redoList = [];

}

Stack.prototype = {

    constructor: Stack,

    exec:function(action){

        switch(action.type){
            
            case 'add':
            
              
               this.storage.delRoot(action.object)
               break;
                        
            case 'del':

              
               this.storage.addRoot(action.object)
               break;
            
            case 'transform':

            case 'style':
            
        }

    },

    redo:function(){
       

        let action = this._redoList.pop();

        if(action){

            this.exec(action)
            
            switch(action.type){
                case "add":
                   // action.type = "del";
                   action.setType("del")
                    break;
                case "del":
                    //action.type = "add";
                    action.setType("add")
                    break;
                        
            }
            
            this._undoList.push(action);

        }

    },

    undo:function(){

        let action = this._undoList.pop();

        if(action){
            this.exec(action)
            
            switch(action.type){
                case "add":
                  
                  action.setType("del")
                    break;
                case "del":
                 action.setType("add")
                    break;
            }
            
            this._redoList.push(action);
            
        } 
    },

    add:function(action){

        this._undoList.push(action)

        this._redoList = [] //意味着如果有操作，则无法向后

      //  action.object.pipe({})

        console.log(this._undoList)
    },

    del:function(el){

        

    },

}
export default Stack;