# paint-golf TODO

## Changes

* Fix viewport issues once and for all
* Update View to use vectors
* Remove getScaledX/Y, replacing with getScaledPosition
* Fix OoB bounce glitch


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
* Overhaul powerbar (again)
* Add remaining yards indicator
* Update stroke indicator


## Other Fixes

* Fix last position for respawning
* Re-add pan limits
* Derive club distances as opposed to listing them
* Create cursor images in javascript


## Far-Out Goals

* Support for heightmaps
