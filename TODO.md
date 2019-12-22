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

* Overhaul file uploading menu
* Add support for user-uploaded vanity images
* Add inaccuracy adjustment to settings menu
* Add palette customization to main menu
* Add bag customization
* Refactor pan feature to a View class
  * Move methods and change references in Course, Ball, and PanState
* Add prompt to reset pan camera
* Uploadable tee and pin locations


## UI

* Add current distance counter during runningState
* Fix powerbar sizing and resizing
* Add remaining yards indicator
* Add stroke indicator
* Add wind indicator


## Other Fixes

* Fix last position mechanic
* Fix pan limits on bottom and right
* Refactor menuState code to change handleIncrement and handle arrows


## Far-Out Goals

* Support for heightmaps
