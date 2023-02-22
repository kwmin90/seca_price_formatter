import { useState } from "react";
import "../App.scss";
import { internalEPP, externalEPP } from "@/utils/utils";
import { Checkbox } from "./Checkbox";
import { FileUpload } from "./Fileupload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ipcRenderer } from "electron";
import { ResponseData } from "../types/types";

function App() {
  const [sites, setSites] = useState<Array<String>>([]);
  const [path, setPath] = useState<String | null>(null);
  const [intEPP, setIntEPP] = useState<Array<String>>([]);
  const [exEPP, setExEPP] = useState<Array<String>>([]);

  const handleClick = () => {
    if (path) {
      setSites([...intEPP, ...exEPP]);
      ipcRenderer.send("send-data", {
        sites,
        path,
      });
      ipcRenderer.on("send-data-reply", (_event, ...args) => {
        const data: ResponseData[] = args;
        if (data[0].success) {
          toast(`Updated ${data[0].rows} rows`);
        } else {
          toast(`Update failed`);
        }
      });
    }
  };
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={100000}
        hideProgressBar
        limit={1}
      />
      <div>
        <button onClick={handleClick}>Format</button>
      </div>
      <div>
        <h3>Internal EPP</h3>
        <Checkbox epp={internalEPP} setSites={setIntEPP} />
      </div>
      <div>
        <h3>External EPP</h3>
        <Checkbox epp={externalEPP} setSites={setExEPP} />
      </div>
      <div>
        <FileUpload setPath={setPath} />
      </div>
    </div>
  );
}

export default App;
