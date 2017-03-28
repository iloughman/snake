class Snake {
    
    constructor (dimensions) {
        this.snakeList = new LinkedSnakeList(dimensions);
    }

    go (directionObject, resolve) {
        this.snakeList.advanceSnakeList(directionObject, resolve);
    }
}

class LinkedSnakeList {

    constructor (dimensions) {
        this.tail = new SnakeNode(dimensions, {x:12,y:12});
        this.tail.turnOn();
        this.head = new SnakeNode(dimensions, {x:12,y:13});
        this.head.turnOn();
        this.foodNode = new SnakeNode(dimensions);
        this.foodNode.turnOn("red");
        this.head.next = this.tail;
        this.tail.previous = this.head;
        this.dimensions = dimensions;
    }
    
    advanceSnakeList (directionObject, resolve) {
        var nextLocation = this.head.nextLocation(directionObject.direction, resolve);

        if (nextLocation === false) {
            resolve("GAME OVER");
            return;
        }

        var newNode = new SnakeNode(this.dimensions, nextLocation);
        newNode.turnOn();
        this.head.previous = newNode;
        newNode.next = this.head;
        this.head = newNode;

        if (newNode.collidesWithList(this)) {
            resolve("GAME OVER");
            return;
        }

        if (newNode.willHitNode(this.foodNode)) {
            this.foodNode = new SnakeNode(this.dimensions);

            while (this.foodNode.collidesWithList(this)) {
                this.foodNode = new SnakeNode(this.dimensions);
            }
            
            this.foodNode.turnOn("red");
            return;
        }

        this.tail.turnOff();
        this.tail.previous.next = null;
        this.tail = this.tail.previous;
    }
}

class SnakeNode {

    constructor (dimensions, location) {    
        this.location = location || {x: Math.floor(Math.random()*dimensions), y: Math.floor(Math.random()*dimensions)};
        this.next = null;
        this.previous = null;
        this.dimensions = dimensions;
        this.elem = document.getElementById(this.location.x + "," + this.location.y);
    }

    turnOff () {
        this.elem.style.setProperty("fill", "white");
    }

    turnOn (color) {
        color = color || "blue";
        this.elem.style.setProperty("fill", color);
    }

    willHitNode (node) {
        return this.location.x === node.location.x && this.location.y === node.location.y;
    }

    collidesWithList (list) {
        var currentNode = list.head;
        var collision = false;
        while (currentNode.next) {
            if (this.willHitNode(currentNode.next)) {
                collision = true;
                break;
            }
            currentNode = currentNode.next;
        }
        return collision;
    }

    nextLocation (direction, resolve) {
        var result;
        switch (direction) {
            case "ArrowLeft":
                result = {x: this.location.x-1, y: this.location.y};
                break;
            case "ArrowRight":
                result = {x: this.location.x+1, y: this.location.y};
                break;
            case "ArrowDown":
                result = {x: this.location.x, y: this.location.y+1};
                break;
            case "ArrowUp":
                result = {x: this.location.x, y: this.location.y-1};
                break;
            default:
                break;
        }
        if (result.x >= 0 && result.x <= this.dimensions-1 && result.y >= 0 && result.y <= this.dimensions-1) {
            return result;
        } else {
            return false;
        }
    }
}