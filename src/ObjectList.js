
import * as Cst from './export'; //constructor of shape
import Element from './Element'
import * as util from './core/util'
/**
 * 接受外部对队列的直接改变 (M)
 * @alias module:srender/ObjectList
 * @constructor
 */
var ObjectList = function (storage) { 

    this.storage = storage;

    this._objectListLen = 0;

    this._objectList=[];
};

ObjectList.prototype={

    constructor:ObjectList,


    traverse: function (cb, context) {
        for (var i = 0; i < this._objectList.length; i++) {
            this._objectList[i].traverse(cb, context);
        }
    },

    add: function(el) {
        if(el instanceof Element){
           // console.log("实例")
            this._objectList.push({id:el.id,type:el.type,shape:el.shape,style:el.style,position:el.position,scale:el.scale,rotation:el.rotation})
            this.storage.addRoot(el);
        }
        else{
             // console.log("键值对")
             
             //el为7个键值对 {id:el.id,type:el.type,shape:el.shape,style:el.style,position:el.position,scale:el.scale,rotation:el.rotation}
            let type = el.type.charAt(0).toUpperCase()+el.type.slice(1) 
            console.log(el.type)
            console.log(el.position)
            let obj = new Cst[type]({
                id:el.id,
                style:el.style,
                position:el.position,
                shape:el.shape,
                
                scale:el.scale,
               rotation:el.rotation,
         //   origin:data.origin
            })
            this._objectList.push(el)
            this.storage.addRoot(obj);
        }
        
    
    },

    del: function(el) {
        if (el == null) {
            // 不指定el清空 删除前应该添加占用判断 Group待完成
           /* for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj instanceof Group) {
                    root.delChildrenFromStorage(this);
                }
            }*/
            this._objectList = [];
            this._objectListLen = 0;
            this.storage.delRoot()

            return;
        }

        if (el instanceof Array) {
            for (var i = 0, l = el.length; i < l; i++) {
                this.del(el[i]);
            }
            return;
        }
        if (el instanceof Element){
            var idx = util.indexOf(this._objectList, el.id);
            this._objectList.splice(idx, 1);
            this.storage.delRoot(el)
        }
        else{
            var idx = util.indexOf(this._objectList, el);//键值对的删除需要注意下是否正确，待调试
            if (idx >= 0) {
                this.storage._roots.splice(idx, 1);     //如果objectList和displayList顺序保持完全一致
                this._objectList.splice(idx, 1);
            }
        }
        
    },

    attr: function(el) {
        var array = this.storage._roots;
        var obj;
        for (var i = 0, len = array.length; i < len; i++) {  //方案2
            if(el.id == array[i].id){                          //如果objectList一直为引用
                obj = array[i];
                break
            }
        }
        obj.attr({                                //此处协同编辑时改为分情况调用较好，传过来的值包含操作类型tag
            style:el.style,
            rotation:el.rotation,
            scale:el.scale,
            position:el.position,
        })
      //  this._needsRefresh = true;
    },

    init: function(array,override = true) {
        if(override){
            this.del()
          //  this.add(array)
            array.forEach(function(el){this.add(el)},this);
        }
        else{

        }
    },




}

export default ObjectList;