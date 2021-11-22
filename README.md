# Sticky notes app

There are 2 versions of the application in this example repository:

## Front end app
React app built with vite:
 [UI demo (no server - no saving or collaboration)](https://s3.amazonaws.com/www.sawka.pro/sticky-notes/index.html)
To run this app locally `cd app && yarn && yarn dev`

--- 

## Full stack app

This app was bootstrapped with meteor framework which I have not used for a long time and wanted to give it a try 
again. Unfortunately the deployed version performs really bad making it not really usable at this point - there are 
issues with all the edit features. These could be solved, at least partially, by utilizing better infrastructure 
than the freely available solutions.  
Nevertheless,
it saves the board automatically and enables 
real-time 
collaborattion and this could be improved to deliver these features in with acceptable performance. 
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
