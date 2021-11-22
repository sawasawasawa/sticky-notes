# Sticky notes app

There are 2 versions of the application in this example repository:

## Front end app
React app built with vite:
 [UI demo (no server - no saving or collaboration)](https://s3.amazonaws.com/www.sawka.pro/sticky-notes/index.html)
To run this app locally `cd app && yarn && yarn dev`

--- 

## Full stack app

This app was bootstrapped with meteor framework. It offers reactivity by default, which I hoped to enable easy implementation of real-time collaboration for multiple users.

This meteor application creates new boards on entering the root route, saves the board automatically and enables real-time collaboration on the same boards. Currently there are issues with editing the notes, but drawing works fine ;)

[Meteor app demo](
 https://sticky-notes-koala.meteorapp.com/)

To run the this application locally, you will need to install metor globally first with the following command `npm i 
meteor -g`

Then run `cd meteor-app && npm install && meteor`. 


Sources used for building the UI:
- [konva](https://konvajs.org/docs/react/index.html)
- [editable text](https://codesandbox.io/s/react-konva-editable-resizable-text-55kyv?from-embed=&file=/src/ResizableText.jsx:0-1620)
- [images](https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/images?from-embed)
- [colorpicker](https://codesandbox.io/s/jq5hm)
