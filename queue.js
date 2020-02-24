function Queue(size){
    this.line = []

    this.enqueue = function(elem){
        if(this.line.length>=size)
            this.line.dequeue()
        this.line.push(elem)
    }

    this.dequeue = function(){
        this.line = this.line.slice(1, )
    }

    this.getArray = function(){
        return this.line
    }

    this.front = function(){ 
        return this.line[0]
    }

    this.length = function(){
        return this.line.length
    }

    this.updateElem = function(index, elem){
        this.line[index] = elem
    }

    

}
