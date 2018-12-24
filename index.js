const {app, BrowserWindow} = require('electron');
let win;

function createWindow(){
	win  = new BrowserWindow({width: 440, height: 420})
	win.loadFile('index.html');
	// win.webContents.openDevTools();
	win.on('closed', function(){ win = null});
}

app.on('ready', createWindow);
app.on('window-all-closed', function(){ 
	if (process.platform !== 'darwin') {
		app.quit();
	}
})
app.on('activate', function(){
	if(win === null) {
		createWindow();
	}
})