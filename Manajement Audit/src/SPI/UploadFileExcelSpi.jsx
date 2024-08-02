import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const UploadFileExcelSpi = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const hasExtension = (fileName, exts) => {
    return new RegExp(`(${exts.join("|").replace(/\./g, "\\.")})$`).test(
      fileName
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !hasExtension(file.name, [".xls", ".xlsx"])) {
      alert("Hanya file XLS atau XLSX (Excel) yang diijinkan.");
      return;
    }

    const formData = new FormData();
    formData.append("filepelamar", file);

    try {
      const response = await axios.post(
        "exec-import-excel-stock.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setMessage(
        <span>
          <i className="fa fa-check"></i>{" "}
          <font color="green">{response.data}</font>
        </span>
      );
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      setMessage(<font color="red">ERROR: unable to upload files</font>);
      setShowMessage(true);
    }
  };

  return (
    <div>
      <header>
        <h3>Import Data Stock</h3>
      </header>
      <form
        id="FormExcelDoc"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-md-12" style={{ padding: "10px 30px" }}>
            {showMessage && (
              <div id="result" className="alert alert-success">
                {message}
              </div>
            )}
          </div>
        </div>
        <fieldset className="label_side" id="facnumber">
          <label>Template File Excel</label>
          <div className="clearfix">
            <a className="btn btn-success" href="template/templatestock.xls">
              Download Template
            </a>
          </div>
        </fieldset>
        <fieldset className="label_side" id="facnumber">
          <label>Upload File</label>
          <div className="clearfix">
            <div className="input-group margin" style={{ width: "50%" }}>
              <input
                type="file"
                name="filepelamar"
                id="filepelamar"
                className="form-control"
                onChange={handleFileChange}
              />
              <span className="input-group-btn">
                <input
                  type="submit"
                  className="btn btn-info"
                  value="Upload"
                  title="Upload File Excel Stock"
                />
              </span>
            </div>
            <i>Format .XLS atau .XLSX (Excel)</i>
          </div>
        </fieldset>
      </form>
      <fieldset className="label_side" id="facnumber">
        <label>Progress</label>
        <div className="clearfix">
          <div id="progress1">
            <div id="bar1" style={{ width: `${uploadProgress}%` }}></div>
            <div id="percent1">{uploadProgress}%</div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default UploadFileExcelSpi;
