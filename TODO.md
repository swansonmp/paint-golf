# paint-golf TODO

## Changes

* Update these to utilize Vector:
  * More of ball.js
  * Course tees and holes
  * CurrentYards
* Changes to Vector:
  * Combine scalar and non-scalar methods
  * Add rotate, distance2D, equals, and toString methods
* Changed wind height rate from 1/64 to 1/128, making wind less powerful
* Add SPIN_DECAY constant
* Lower OoB bounce rate from 1 to 0.2
* Change CurrentYards to display 1 decimal place instead of 2


## Logic

* Update evaluateState logic to utilize holes array
* Update inHole() to use distance to hole, not pixel map


## Physics

* Investigate partial-power shots
* Fix spin
* Seperate lie power and lie friction
* Add trees
    * Leaves vs. trunk
* Add variation in lie rate
* Untie friction from framerate


## Features

* Add zoom
* Implement greens
* Overhaul file uploading menu
* Add support for user-uploaded vanity images
* Add palette customization to main menu
* Add bag customization
* Add prompt to reset pan camera
* Uploadable tee and pin locations


## UI

* Implement smooth panning
* Overhaul powerbar
* Add remaining yards indicator
* Update stroke indicator


## Other Fixes

* Fix pan limits on bottom and right
* Derive club distances as opposed to listing them


## Far-Out Goals

* Support for heightmaps
