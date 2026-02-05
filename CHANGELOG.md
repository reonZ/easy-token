# 2.0.0

- this release is a complet rewrite of the module
- the module is now compatible with `ApplicationV2` actor sheets
- made the mouse wheel zoom smoother, trying to prevent big jumps at smaller zoom and really small increments at higher zoom
- add new `Popout` feature
  - just like the rest of the module, it is a simplistic but convenient feature
  - when you use any of the popout options, the module will automatically scale the token so the ring fits nicely inside grid cells
  - add special exceptions for the `Pathfinder Second Edition` system:
    - unlock the token scaling
    - make sure to handle `small` tokens
