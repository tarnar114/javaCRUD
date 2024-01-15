import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DataGrid } from "@mui/x-data-grid";
export default function Grid({ DialogOpen,list }) {
  const [clickedRow, setClickedRow] = React.useState();
  const [id, setID] = useState(0);
  useEffect(() => {
    console.log(list);
  }, []);
  const updateRow=(e,row)=>{
    e.stopPropagation()
    setClickedRow(row) 
    DialogOpen(row)
  }
  const deleteRow = async(e, row) => {
    e.stopPropagation();
    setClickedRow(row);
    console.log(row)
    const res=await fetch('/users/'+row.id.toString(),{
      method:'DELETE',

    }).then(window.location.reload())
  };
  const col = [
    {
      field: "user",
      headerName: "username",
      width: 130,
    },
    {
      field: "pass",
      headerName: "password",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 260,
      renderCell: (params) => {
        return (
          <ButtonGroup variant="outlined">
            <Button onClick={(e) => updateRow(e, params.row)}>
              Update
            </Button>
            <Button onClick={(e) => deleteRow(e, params.row)}>
              Delete
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid rows={list} columns={col} getRowId={(row) => row.id} />
    </div>
  );
}
