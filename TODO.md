# paint-golf TODO

## Changes

* Add wind and wind indicator
* Fix bug where cursor wouldn't set after new hole
* Refactor states and menu states to 'states' and 'menus' folders, respectively
* Change ball striking
* Refactor debug information to Debug class
* Fix lastPosition logic
* Refactor panning view offsets to View class
* Refactor Status UI elements to 'ui' folder
* Move stroke increment to StrikingState


## Logic

* Update evaluateState logic to utilize holes array
* Update inHole() to use distance to hole, not pixel map


## Physics

* Investigate whether fnet should be reset
* Investigate partial-power shots
* Fix spin
* Seperate lie power and lie friction
* Add trees
    * Leaves vs. trunk
* Add variation in lie rate


## Features

* Implement greens
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

* Implement smooth panning
* Add current distance counter during runningState
* Fix powerbar sizing and resizing
* Add remaining yards indicator
* Update stroke indicator


## Other Fixes

* Fix pan limits on bottom and right
* Refactor menuState code to change handleIncrement and handle arrows


## Far-Out Goals

* Support for heightmaps
