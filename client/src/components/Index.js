import React, { useState } from "react";

function Index() {
  const [File, setFile] = useState();
  const [Data, setData] = useState(null);
  const [note, setNote] = useState({});
  const [error, setError] = useState(true);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlecsv = async () => {
    const formData = new FormData();
    formData.append("csv_file", File);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        showalert(data);
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onchange_age = (e) => {
    if (e.target.value > 13 && e.target.value < 70) {
      setNote({ ...note, [e.target.name]: e.target.value });
      setError(false);
    } else {
      setError(true);
    }
  };

  const handlesubmit = async () => {
    await fetch("http://127.0.0.1:5000/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        showalert(data);
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  };

  const showalert = (data) => {
    setData(data);
    setTimeout(() => {
      setData(null);
    }, 2500);
  };

  return (
    <div className="login">
      {Data && (
        <div className={`alert alert-${Data.status}`} role="alert">
          {Data.msg}
        </div>
      )}
      <div>
        <div className="mb-3">
          <input type="text" className="form-control" id="inputText" placeholder="Name" name="Name" onChange={onchange} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" id="inputInt" placeholder="Age" min={0} max={85} name="Age" onChange={onchange_age} required />
        </div>
        <div className="mb-3">
          <select className="form-select" aria-label="Default select example" name="Gender" onChange={onchange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select" aria-label="Default select example" name="Favourite animal" onChange={onchange}>
            <option value="">Favourite animal</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Cow">Cow</option>
            <option value="Monkey">Monkey</option>
            <option value="Pig">Pig</option>
            <option value="Horse">Horse</option>
            <option value="Pandas">Pandas</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select" aria-label="Default select example" name="Favourite Colour" onChange={onchange}>
            <option value="">Favourite Colour</option>
            <option value="Green">Green</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Light Blue">Light Blue</option>
            <option value="Violet">Violet</option>
            <option value="Yellow">Yellow</option>
            <option value="Pink">Pink</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" onClick={handlesubmit} disabled={error}>
          Add
        </button>
      </div>
      <hr />
      <h6 className="text-center">OR</h6>
      <hr />
      <div className="needs-validation">
        <div className="m-2">
          <input type="file" className="form-control" id="csv_file" name="csv_file" onChange={handleFileUpload} />
        </div>
        <div className="m-2">
          <button type="button" className="btn btn-success" onClick={handlecsv}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
