import { ipcRenderer } from "electron";

ipcRenderer.on("send-data-reply", (_event, ...args) => {
  console.log("error:", ...args);
});
export const sendData = (arr: String[], path: String | undefined) => {
  ipcRenderer.send("send-data", {
    sites: arr,
    path: path,
  });
};
