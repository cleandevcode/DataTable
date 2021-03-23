import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import "./App.css";

const sortIcon = <ArrowDownward />;
const columns = [
  {
    name: "Avatar",
    selector: "avatar_url",
    cell: row => <img alt="" src={row.avatar_url} />
  },
  {
    name: "Login",
    selector: "login",
    sortable: true
  },
  {
    name: "Type",
    selector: "type"
  }
];

function App() {
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = e => {
    setLogin(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    const url = `https://api.github.com/search/users?q=${login}%20in:login`;
    fetch(url)
      .then(result => result.json())
      .then(res => {
        setData(res);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <input
          value={login}
          placeholder="Enter the login..."
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <DataTable
        title=""
        data={data && data.items}
        columns={columns}
        selectableRows
        sortIcon={sortIcon}
        progressPending={loading}
        pagination
      />
    </div>
  );
}

export default App;
