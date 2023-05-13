import React, { useEffect } from "react";
import airplaneData from './airDatajson.json';
import { useTable } from 'react-table';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";

function TableList() {
  const [open, setOpen] = React.useState(false);
  const [dbData, setDbData] = React.useState([]);
  const [currIdx, setCurrIdx] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const statusChange = (item) => {

    let strigifyData = JSON.stringify({
      id: item.id,
      status_type: localStorage.getItem('companyrole') == "Recycler" ? "Recycling" : "Removed",
    });
  
    const endpoint = localStorage.getItem('companyrole') == "Recycler" ? "/recylersData/" : "/updateStatus/";
  
    axios({
      url: "http://127.0.0.1:8000/api" + endpoint,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      data: strigifyData,
    })
      .then((res) => {
        let temp = res.data
        let result = temp.filter((item) => (item.manufacturer === localStorage.getItem('companyname') && item.remanufacturing_potential_percent > 49) || 
        (localStorage.getItem('companyrole') == "Airline") ||
        (localStorage.getItem('companyrole') == "Recycler")
      ).map((option) => 
          ({"Material Composition": option.material_composition,
            "Part Name": option.part_name,
            "Condition": option.condition,
            "Manufacturer": option.manufacturer,
            "Recycled Parts Carbon Footprint (kg CO2e)": option.recycled_parts_carbon_footprint,
            "Water Usage - Recycled Parts (liters)": option.water_usage_recycled_parts,
            "Landfill Waste - Recycled Parts (kg)": option.landfill_waste_recycled_parts,
            "Remanufacturing Potential (%)": option.remanufacturing_potential_percent,
            "id": option.id
          }));
          setDbData(result)
       })
      .catch((err) => { 
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const IncIdx = () => {
    if( (currIdx + 1) * 20 >= 10000) return;
    setCurrIdx(currIdx + 1);
    getData();
  }

  const DecIdx = () => {
    if( (currIdx - 1) * 20 < 0) return;
    setCurrIdx(currIdx - 1);
    getData();
  }

  const getData = () => {

    let strigifyData = JSON.stringify({
      row_number: currIdx
    });
  
    const endpoint = localStorage.getItem('companyname') == "Recycler" ? "/recylersData/" : "/updateStatus/";
  
    axios({
      url: "http://127.0.0.1:8000/api" + endpoint,
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      data: strigifyData
    })
      .then((res) => {
        let temp = res.data
        let result = temp.filter((item) => (item.manufacturer === localStorage.getItem('companyname') && item.remanufacturing_potential_percent > 49) || 
            (localStorage.getItem('companyrole') == "Airline") ||
            (localStorage.getItem('companyrole') == "Recycler")
          ).map((option) => 
          ({"Material Composition": option.material_composition,
            "Part Name": option.part_name,
            "Condition": option.condition,
            "Manufacturer": option.manufacturer,
            "Recycled Parts Carbon Footprint (kg CO2e)": option.recycled_parts_carbon_footprint,
            "Water Usage - Recycled Parts (liters)": option.water_usage_recycled_parts,
            "Landfill Waste - Recycled Parts (kg)": option.landfill_waste_recycled_parts,
            "Remanufacturing Potential (%)": option.remanufacturing_potential_percent,
            "id": option.id
          }));
          setDbData(result)
       })
      .catch((err) => { 
        console.log(err);
      });
  }

  const data = React.useMemo(
    () =>
    dbData.map((item) => ({
        ...item,
        button: (
          <Button onClick={(e) => statusChange(item)} variant="contained">
            {localStorage.getItem('companyname') == "Recycler" ? "RECYCLE" : "Add FOR RECYCLE"}
          </Button>
        ),
      })),
    [dbData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Part Name",
        accessor: "Part Name",
      },
      {
        Header: "Material",
        accessor: "Material Composition",
      },
      {
        Header: "Manufacturer",
        accessor: "Manufacturer",
      },
      {
        Header: "Remanufacturing Potential",
        accessor: "Remanufacturing Potential (%)",
      },
      {
        Header: "Send to recycle",
        accessor: "button",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SEND A PART</DialogTitle>
        <DialogContent>
          <form>
            <TextField label="Part Name" />
            <TextField label="Quantity" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>SEND</Button>
        </DialogActions>
      </Dialog>
      <div style={{width: "100%", height: "20%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button onClick={DecIdx}>Prev</Button>
        <Button onClick={IncIdx}>Next</Button>
      </div>
      <TableContainer component={Paper} style={{ maxHeight: 550 }}>
        <Table stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{ fontWeight: 'bold', border: '1px solid lightgrey' ,
                      
                      padding: '10px',
                      backgroundColor: column.id === 'Part Name' ? '#dddddd' : '#dddddd'
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()} style={{ border: '1px solid lightgrey' ,fontWeight: 500,fontSize: 18}}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableList;