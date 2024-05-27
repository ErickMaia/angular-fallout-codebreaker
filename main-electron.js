const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function onReady() {
  const win = new BrowserWindow({ width: 400, height: 768 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/fallout-codebreaker/browser/index.html"),
      protocol: "file:",
      slashes: true,
    })
  ).catch((err) => {
    console.error("Failed to load URL:", err);
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });

  win.webContents.on('crashed', () => {
    console.error('Window crashed!');
  });

  // Optionally open DevTools for debugging
  // win.webContents.openDevTools();
}

app.on("ready", onReady);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
