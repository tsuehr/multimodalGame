export default class ObjectHandler{

    constructor() {
        this.id = 0;
        this.registry = {}
        this.events = {}
    }

    register(object) {
        let id = ""+this.id;
        this.id++;
        object.name = id
        this.registry[id] = object
        return id
    }

    getId(object) {
        try{
            let id = this.registry(object)
        }catch (e) {
            console.log("Object not registered")
        }
    }



    updateObjects(time, scene){
        //console.log(time)
        //FOR TESTING

    }
}