# React + Electron + file2html

**An example of using create-react-app, electron, and file2html**.  
Made by [Kitze](https://twitter.com/thekitze) who works @ Medium. Read his article. ([article](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)). 
Adapted by Braden & Michael Preston.

**Dependancies**

- [`electron`]() v.2.0.2 
- [`electron-builder`]() v.20.15.1 
- [`electron-is-dev`]() v.0.3.0 
- [`electron-log`]() v.2.2.6 
- [`update-electron-app`]() v.1.2.0 
- [`react`]() v.16.4.0 
- [`react-dom`]() v.16.4.0 
- [`react-scripts`]() v.1.1.4 
- [`cross-env`]() v.5.1.6 
- [`concurrently`]() v.3.5.1 
- [`prettier`]() v.1.4.4 
- [`wait-on`]() v.2.1.0 
- [`jquery`]() v.3.3.1 
- [`jquery-ui`]() v.1.12.1 


## Getting Started

1.) Install yarn globally as a node module
```node
	npm i -g yarn
```
2.) Install app's dependancies. Creates /node-modules/ & package-lock.json
```node
	npm install
```
3.) Start a development environment for React for live code editing! 😍
```node
	yarn start
```

## Editing the Module `file2html`

Make sure that `npm-install` has been run first. After you have the directory /node-modules navigate to /file2html/. The default code does not work (may be user error). You must replace code in `npm-modules/file2html/index.js` to fix the issue. Here it is:

**index.js** (before)
```javascript
    var ReaderConstructor = readers.find(function (ReaderConstructor) {
        return ReaderConstructor.testFileMimeType(meta.mimeType);
    });
```

**index.js** (after)
```javascript
	var ReaderConstructor = readers[0].default
```
**Note:** The ReaderConstructor in the original code is supposed to be obtained by checking the file MimeType, however there are two cases in which it is not working:

1.) [Reader]**.testFileMimeType()** is a function. It calls **lookup()** from `mime.js` module, which I believe freaks out when the filebuffer passes a file that has a null value for mimeType. 

2.) Even if #1 checks out, **.testFileMimeType()** is still being called against a [Reader] class. The way it is currently set up, the class constructor is one level lower than it should be. That is why testing the mimeType does not work, because it is trying to access a constructors method, while it is searching one level too high in the object. By setting it to reader[i].default, you are going to be accessing the default constructor, which contains the **.testFileMimeType()** function.

## Example Setup

After fixing the module, make sure the rest of the code is as follows for the main process and render process.

**main.js** (Main Process )
```javascript
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	mainWindow.loadFile('index.html')
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})
```

**renderer.js** (Render Process)
```javascript
const fs = require('fs')
const file2html = require('file2html')
const OOXMLReader = require('file2html-ooxml')

file2html.config({
		readers: [OOXMLReader]
});

let docPath = 'assets/sample.docx'
fileBuffer = fs.readFileSync(docPath, null)

file2html.read({
		fileBuffer,
		meta: {
				mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}
}).then((file) => {
		const {styles, content} = file.getData()		
		const meta = file.getMeta()
		
		// Publish Results
		document.body.innerHTML = styles + content
		console.log("Result", styles + content)
		console.log("MetaInfo", meta)
});
```

## Development

Yarn starts up a dev environment that waits on the react and electron components to compile. After that is done, it pushes an injection routine that allows for hot-editing the code live. 

The main render process, browser window is being hosted on `http://localhost:3000`, which allows you to dynamically update the code. Any time, you save a file, it should update the app. If it doesn't, you can always `ctrl`+`c` out of the batch process and restart the dev environment with your most recent code using `yarn start`.

## Making a Build

```node
	yarn build
```
>  Note: Squirrel is NOT implemented yet; however, `electron-builder`  is, so it may be  easier to add later.

Executing this yarn script starts a build, which could take anywhere from 30 seconds to two minutes to build. It creates two directories **build** and **dist**. If you have already created a build before, it may be best to clear out these two directories if they already exist. This way you don't end up with duplicate installers in the **dist** directory. It should be smart enough to override existing builds

> Note: Make super-certain you are bumping up the version number in **pacakge.json**. I believe there are pacakges that do this that can be implemented later to this boilerplate.