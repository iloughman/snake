class Snake {
    
    constructor (dimensions) {
        this.snakeList = new SnakeArray(dimensions);
    }

    go (directionObject, resolve) {
        this.snakeList.advanceSnakeList(directionObject, resolve);
    }
}

class SnakeArray {

    constructor (dimensions) {
        this.snake = [new SnakeNode(dimensions, {x:12,y:12})];
        this.snake[0].turnOn();
        this.snake.push(new SnakeNode(dimensions, {x:12,y:13}));
        this.snake[1].turnOn();
        this.foodNode = new SnakeNode(dimensions);
        this.foodNode.turnOn("red");
        this.dimensions = dimensions;
    }
    
    advanceSnakeList (directionObject, resolve) {

        var nextLocation = this.snake[0].nextLocation(directionObject.direction, resolve);
        if (!nextLocation) {
            resolve("GAVE OVER");
            return;
        }

        var newNode = new SnakeNode(this.dimensions, nextLocation);
        newNode.turnOn();
        this.snake.unshift(newNode);

        if (newNode.collidesWithList(this.snake)) {
            resolve("GAME OVER");
            return;
        }

        if (newNode.willHitNode(this.foodNode)) {
            this.foodNode = new SnakeNode(this.dimensions);

            while (this.foodNode.collidesWithList(this.snake)) {
                this.foodNode = new SnakeNode(this.dimensions);
            }
            
            this.foodNode.turnOn("red");
            return;
        }

        this.snake.pop().turnOff();
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
        var index = 1;
        var collision = false;
        while (list[index]) {
            if (this.willHitNode(list[index])) {
                collision = true;
                break;
            }
            index++;
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