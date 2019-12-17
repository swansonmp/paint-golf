# paint-golf TODO


## Logic

* Update evaluateState logic to utilize holes array
* Update inHole() to use distance and not pixel map


## Physics

* Add wind
* Fix partial-power shots
    * Tie spin value to clubs not power
* Seperate lie power and lie friction
* Add trees
    * Leaves vs. trunk
* Add variation in lie rate

    
## Features

* Add support for user vanity images
* Add inaccuracy adjustment to settings menu
* Add palette customization to main menu
* Refactor pan feature to a View class
  * Move methods and change references in Course, Ball, and PanState
* Add prompt to reset pan camera
* Fix alt course loading
    * Tees/holes are -1

    
## UI

* Add current distance counter during runningState
* Fix powerbar sizing and resizing
* Add remaining yards indicator
* Add stroke indicator
* Add wind indicator


## Other Fixes

* Fix pan limits on bottom and right
* Lie oddities on far right and far bottom of course
* Refactor menuState code to change handleIncrement and handle arrows