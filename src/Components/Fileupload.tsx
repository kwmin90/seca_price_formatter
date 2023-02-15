import React, { useState } from "react";
import Dropzone from "react-dropzone";

interface FileUpload {
  setExcel: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FileUpload: React.FC<any> = ({ ...props }) => {
  const { setExcel } = props;
  const [name, setName] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const submitFile = (file: File) => {
    setName(file.name);
    setUploaded(true);
    setExcel(file.path);
  };
  const handleCancel = () => {
    setName(null);
    setUploaded(false);
    setExcel(null);
  };
  return (
    <Dropzone
      {...props}
      onDrop={(acceptedFiles) => submitFile(acceptedFiles[0])}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="dropzone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {uploaded ? (
              <div>
                <p>Uploaded file name: {name}</p>
                <p onClick={() => handleCancel()}>Cancel</p>
              </div>
            ) : (
              <div>
                <p>Drag your file here</p>
                <p>or</p>
                <button type="button">Browse</button>
              </div>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};
