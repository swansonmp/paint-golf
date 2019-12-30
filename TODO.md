# paint-golf TODO

## Changes

* Change wind indicator
* Increase putter power
* Set powerbar to fixed size
* Add simple menu touch support
* Overhaul menu contruction


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
* Overhaul powerbar
* Add remaining yards indicator
* Update stroke indicator


## Other Fixes

* Fix pan limits on bottom and right


## Far-Out Goals

* Support for heightmaps
