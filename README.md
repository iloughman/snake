### Instructions
Open `index.html` in a browser. You should be good to go. Make sure that `snake.js` and `index.html` are on the same directory level.

###Mistakes
The `dimensions` variable is passed around in too many functions. It should be handled better.

The `advanceSnakeList` method in the `LinkedSnakeList` class is a bit hard to follow. Probably needs a refactor.

Might not need the `Snake` class at all.

`SnakeNode` class doesn't always need `willHitNode`, `collidesWithList`, and `nextLocation`. These are specific to the head node. Perhaps the food node should be simpler class that the head node extends.

All classes are global.

The `setBoard` and `clearBoard` functions are a bit clunky. This logic is probably better handled through hardcoded HTML and CSS. 


### Next Steps
Fix mistakes.

It would be nice to customize board layout. The opportunity to do that is in place with specified values of `height`, `width`, and `dimensions`. 

It would be nice to keep score. Size of the snake is an obvious way to capture this.

It would be nice to increase the speed of the snake as it grows. Providing a mutable paramter that updates with size to the `snake` instance is a possible (albeit slightly confusing) way to approach this.

Eliminate the perimeter and allow the snake to wrap from left to right and top to bottom. 

Improve general design.