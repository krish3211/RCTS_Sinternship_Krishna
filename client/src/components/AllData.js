import React, { useEffect, useState } from "react";

function AllData() {
  const [items, setItems] = useState(null);
  const font = { fontFamily: ["Acme", "sans-serif"] };
  useEffect(() => {
    fetch("http://127.0.0.1:5000/Output", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container" style={font}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Names</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Favourite Animal</th>
            <th>Favourite Colour</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["Name"]}</td>
                  <td>{item["Age"]}</td>
                  <td>{item["Gender"]}</td>
                  <td>{item["Favourite animal"]}</td>
                  <td>{item["Favourite Colour"]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AllData;
