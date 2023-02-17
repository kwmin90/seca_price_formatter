import { useState } from "react";
import "../App.scss";
import { internalEPP, externalEPP } from "@/utils/utils";
import { Checkbox } from "./Checkbox";
import { FileUpload } from "./Fileupload";
import { sendData } from "@/services/node-api";

function App() {
  const [sites, setSites] = useState<Array<String>>([]);
  const [path, setPath] = useState<String | null>(null);

  const handleClick = () => {
    if (path) {
      sendData(sites, path);
    }
  };
  return (
    <div className="App">
      <div>
        <button onClick={handleClick}>Format</button>
      </div>
      <div>
        <h3>Internal EPP</h3>
        <Checkbox epp={internalEPP} setSites={setSites} />
      </div>
      <div>
        <h3>External EPP</h3>
        <Checkbox epp={externalEPP} setSites={setSites} />
      </div>
      <div>
        <FileUpload setPath={setPath} />
      </div>
    </div>
  );
}

export default App;
