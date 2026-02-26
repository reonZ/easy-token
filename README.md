# FoundryVTT Easy Token

[![Patreon](./images/patreon.webp)](https://patreon.com/IdleAtre?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K6M2V13)
or [Stripe](https://buy.stripe.com/cN23dy0hd0gW5nq3cc) directly

Adds a fast and easy way to create, save and update a token image using the foundry's renderer engine.

![](./images/editor-2.webp)

A new option will appear in the header of an actor sheet (if the user has the required permissions) which will open a token editor.

## Load Image

To load an image in the editor you can:

- Drag & drop the image from your computer.

- Drag & drop an image from a website. If nothing appears, it means that the server hosting the image does not allow CORS, simply save the image on your computer to use it.

- `Open Local Image` which is the same as the drag & drop from your computer.

- `Open Server Image` which allows loading images from the server (requires permission).

- `Load Avatar Image` will simply load the current actor's avatar in the editor.

## Create Token Image

Once an image is loaded, you can move it, zoom in & out, adjust an eventual popout section and change the token's border and background colors with the color pickers.
The result is shown live in the preview square bottom right of the editor.

> [!NOTE]
> If you use any the popout masks, the module will automatically change the scale of the token to fit nicely inside a grid cell.

### Pathfinder Second Edition

The module has special exceptions for the pf2e system that both unlock the token scale and make sure to respect the ratio of `small` actors.

## Saving Images

Once done, you can use any of the following options:

- `Save Avatar Image` will encode and upload the current image used in the editor to the server, it will also automatically set the actor's avatar.

- `Save Token Image` will encode and upload the previewed token image to the server, it will also update the token image of the prototype and all the tokens already present in the world **IF** they are linked to the actor.

- `Save All & Close` will do both and close the editor.

_The images are encoded in `webp` which is an [extremely light format](https://en.wikipedia.org/wiki/WebP) supported by all browsers._

> [!NOTE]
> When a change is made for a token that is not linked to any actor (such as an NPC token in a scene), the changes will only be made to this token.

> [!NOTE]
> When a change is made to an actor in the actors tab or a token that is linked to an actor, then the token prototype and all the tokens in all the scenes that are also linked to that actor will be updated.

> [!NOTE]
> Therefore, if changes are made to an actor in the actors tab that has no linked token (such as an NPC), the changes will not be reflected to the tokens already in place in the world.

## Settings

![](./images/directories.webp)

Files are uploaded to the server according to the settings in the `Directories` menu of the module, each actor type has an avatar and token path that is editable.

A default path is provided for each one in the form of:

- for `data` "worlds/[world-id]/images/[avatar or token]s/[actor-type]s".

- for `s3` "images/[avatar or token]s/[actor-type]s"

## CHANGELOG

You can see the changelog [HERE](https://github.com/reonZ/easy-token/blob/master/CHANGELOG.md)
