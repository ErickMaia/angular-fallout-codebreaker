const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function onReady() {
  win = new BrowserWindow({ width: 400, height: 768 });
  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "dist/fallout-codebreaker/browser/index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );
}

app.on("ready", onReady);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
