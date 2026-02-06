# 2.1.0

- add 2 more token rings
  - you can cycle through them using the small arrows at the bottom of the preview panel
  - the module will remember the last ring you used
- the module now supports dynamic tokens
  - to create a dynamic subject texture, select the 4th ring (invisible ring) using the newly added arrows in the preview panel
  - the background and ring will be removed from the preview panel
  - the preview panel will switch to a 2:3 ratio to fit inside dynamic token rings
  - the generated token image will be added to the `Subject Texture` instead of the `Image Path`
  - the dynamic ring option will be enabled
- add a way to download the token image you are currently working on
  - you can find the download button in the preview panel
- add a "warning" message for unlinked world actors
- fix notification message prefix being inverted
- fix notification message containing the cache buster

# 2.0.0

- this release is a complete rewrite of the module
- the module is now compatible with `ApplicationV2` actor sheets
- made the mouse wheel zoom smoother, trying to prevent big jumps at smaller zoom and really small increments at higher zoom
- add new `Popout` feature
  - just like the rest of the module, it is a simplistic but convenient feature
  - when you use any of the popout options, the module will automatically scale the token so the ring fits nicely inside grid cells
  - add special exceptions for the `Pathfinder Second Edition` system:
    - unlock the token scaling
    - make sure to handle `small` tokens
