import { useEffect, useState } from "react";
import "../App.scss";
import { internalEPP, externalEPP } from "@/utils/utils";
import { Checkbox } from "./Checkbox";
import { FileUpload } from "./Fileupload";
import { sendData, sendFile } from "@/services/node-api";

function App() {
  const [value, setValue] = useState<Array<string>>([]);
  const [excel, setExcel] = useState<File | null>(null);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  const handleClick = () => {
    // sendData(value);
    sendFile(excel);
    console.log(excel);
  };
  return (
    <div className="App">
      <div>
        <button onClick={handleClick}>Format</button>
      </div>
      <div>
        <h3>Internal EPP</h3>
        <Checkbox epp={internalEPP} setValue={setValue} />
      </div>
      <div>
        <h3>External EPP</h3>
        <Checkbox epp={externalEPP} setValue={setValue} />
      </div>
      <div>
        <FileUpload file={excel} setExcel={setExcel} />
      </div>
    </div>
  );
}

export default App;
