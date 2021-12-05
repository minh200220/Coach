import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Button,
  Card,
  CardContent,
  // TextField,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import Add from "./Add";
import Row from "./Row";
import TablePaginationActions from "../TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  formControl: {
    marginLeft: 5,
    marginRight: 10,
    minWidth: 120,
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default function BasicTable() {
  const [add, setAdd] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const routes = useSelector((state) => state.routes);
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // search filler
  //   const [state, setState] = useState("Hãng xe");
  //   const [filter, setFilter] = useState("");
  //   const lowercasedFilter = filter.toLowerCase();
  //   const filteredData = routes.filter((item) => {
  //     if (state === "Hãng xe") {
  //       return item.brand.toLowerCase().includes(lowercasedFilter);
  //     } else if (state === "Số chỗ") {
  //       return item.seatNumber.toString().includes(lowercasedFilter);
  //     } else if (state === "Năm sản xuất") {
  //       return item.produceYear.toString().includes(lowercasedFilter);
  //     } else {
  //       return item.status.toLowerCase().includes(lowercasedFilter);
  //     }
  //   });

  // change filter type
  //   const handleStateChange = (e) => {
  //     setState(e.target.value);
  //   };

  //   const handleChange = (event) => {
  //     setFilter(event.target.value);
  //   };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, routes.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <CardContent>
        {/* <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          value={filter}
          onChange={handleChange}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Lọc theo
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Lọc theo"
            value={state}
            onChange={handleStateChange}
          >
            <MenuItem value="Hãng xe">Hãng xe</MenuItem>
            <MenuItem value="Số chỗ">Số chỗ</MenuItem>
            <MenuItem value="Năm sản xuất">Năm sản xuất</MenuItem>
            <MenuItem value="Tình trạng">Tình trạng</MenuItem>
          </Select>
        </FormControl> */}
        {user?.role === 1 && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setAdd(true)}
          >
            Thêm
          </Button>
        )}
      </CardContent>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tuyến đường</TableCell>
                <TableCell align="right">Khoảng cách (km)</TableCell>
                <TableCell align="right">Thời gian đi (giờ) </TableCell>
                <TableCell align="right">Giá tiền (VNĐ)</TableCell>
                <TableCell align="right">Loại xe</TableCell>
                <TableCell align="right">Giờ xuất phát</TableCell>
                {user?.role === 1 && (
                  <TableCell align="right">Thao tác</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {add && <Add setAdd={setAdd} />}
              {(rowsPerPage > 0
                ? routes.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : routes
              ).map((route) => (
                <Row key={route._id} route={route} user={user} />
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={routes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
