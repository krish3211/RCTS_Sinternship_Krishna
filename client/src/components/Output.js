import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useNavigate } from "react-router-dom";

function Output() {
  let Navigate = useNavigate();
  const [names, setNames] = useState(null);
  // console.log(items['Age'])
  const font = { fontFamily: ["Acme", "sans-serif"] };
  const [age, setAge] = useState({
    data: [],
    options: {
      // title: "Age",
      pieHole: 0.4,
      // is3D: true,
      pieSliceTextStyle: {
        color: "black",
      },
    },
  });
  const [gender, setGender] = useState({
    data: [],
    options: {
      // title: "Gender",
      pieHole: 0.4,
      // is3D: true,
      pieSliceTextStyle: {
        color: "black",
      },
    },
  });
  const [favanimalc, setFavanimalc] = useState({
    data: [],
    options: {
      title: "Favourite Animal by Gender",
      // is3D: true,
      hAxis: {
        title: "Animal",
      },
    },
  });
  const [favcolorc, setFavcolorc] = useState({
    data: [],
    options: {
      title: "Favourite Colour by Gender",
      // is3D: true,
      hAxis: {
        title: "Colour",
      },
    },
  });
  const [favanimal, setFavanimal] = useState({
    data: [],
    options: {
      // title: "Favourite animal",
      // hAxis: {
      //   title: 'Population',
      //   minValue: 0,
      // },
      // vAxis: {
      //   title: 'City',
      // },
      chartArea: { width: "50%" },
      // legend: { position: 'none' },
    },
  });
  const [favcolor, setFavcolor] = useState({
    data: [],
    options: {
      // title: "Favourite Colour",
      // hAxis: {
      //   title: 'Population',
      //   minValue: 0,
      // },
      // vAxis: {
      //   title: 'City',
      // },
      chartArea: { width: "50%" },
      // legend: { position: 'none' },
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/Graph", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // setItems(data);
        setNames(data["Name"]);
        setAge((prevAge) => {
          prevAge.data = data["Age"];
          console.log(data["Age"])
          return { ...prevAge };
        });
        setGender((prevGender) => {
          prevGender.data = data["Gender"];
          return { ...prevGender };
        });
        setFavanimal((prevFavanimal) => {
          prevFavanimal.data = data["Favourite animal"];
          return { ...prevFavanimal };
        });
        setFavcolor((prevFavcolor) => {
          prevFavcolor.data = data["Favourite Colour"];
          return { ...prevFavcolor };
        });
        setFavanimalc((prevFavanimalc) => {
          prevFavanimalc.data = data["Fav_AGC"];
          return { ...prevFavanimalc };
        });
        setFavcolorc((prevFavcolorc) => {
          prevFavcolorc.data = data["Fav_CGC"];
          return { ...prevFavcolorc };
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="m-3" style={font}>
        <button type="button" className="btn btn-success" onClick={() => {Navigate('/allData')}}>
          all data
        </button>
      </div>
      <div className="container" style={font}>
        <h1 className="mt-2 mb-4 text-center">Data Visualization</h1>
        <div className="row m-5">
          <div className="col">
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Names</th>
                  </tr>
                </thead>
                <tbody>
                  {names &&
                    names.map((name, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Age</div>
              <div className="card-body">
                <Chart chartType="PieChart" data={age.data} options={age.options} width="100%" height="500px" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Gender</div>
              <div className="card-body">
                <Chart chartType="PieChart" data={gender.data} options={gender.options} width="100%" height="500px" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Favourite Animal</div>
              <div className="card-body">
                <Chart chartType="BarChart" data={favanimal.data} options={favanimal.options} width="100%" height="500px" />
                <Chart chartType="ColumnChart" data={favanimalc.data} options={favanimalc.options} width="100%" height="500px" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">Favourite Colour</div>
              <div className="card-body">
                <Chart chartType="BarChart" data={favcolor.data} options={favcolor.options} width="100%" height="500px" />
                <Chart chartType="ColumnChart" data={favcolorc.data} options={favcolorc.options} width="100%" height="500px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Output;
