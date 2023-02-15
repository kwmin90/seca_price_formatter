import { lstat, readFile } from "node:fs/promises";
import { cwd } from "node:process";
import { ipcRenderer } from "electron";

ipcRenderer.on("send-site-value-reply", (_event, ...args) => {
  console.log("Sending site", ...args);
});
export const sendData = (arr: String[]) => {
  ipcRenderer.send("send-site-value", JSON.stringify(arr));
};
export const sendFile = (file: File | null) => {
  if (file) {
    // console.log(file);
    // ipcRenderer.send("send-file", file);
    readFile(file.path, "utf8").then((data) => {
      console.log(data);
      ipcRenderer.send("send-file", data);
    });
  }
};
lstat(cwd())
  .then((stats) => {
    console.log("[fs.lstat]", stats);
  })
  .catch((err) => {
    console.error(err);
  });
