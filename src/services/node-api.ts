import { ipcRenderer } from "electron";

ipcRenderer.on("send-site-value-reply", (_event, ...args) => {
  console.log("Sending site", ...args);
});
export const sendData = (arr: String[], path: String | undefined) => {
  ipcRenderer.send("send-data", {
    sites: JSON.stringify(arr),
    path: path,
  });
};
