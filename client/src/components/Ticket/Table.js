import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { deleteTicket } from "../../actions/tickets";

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

export default function MyTable() {
  const tickets = useSelector((state) => state.tickets);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const formatDate = (input) => {
    var datePart = input.slice(0, 10).match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tickets.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
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
        </CardContent>
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tuyến đường</TableCell>
                  <TableCell align="right">Thời gian xuất phát</TableCell>
                  <TableCell align="right">Loại xe</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? tickets.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : tickets
                ).map((t) => (
                  <TableRow key={t._id}>
                    <TableCell component="th" scope="row">
                      {t.fromto}
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="right">
                      {t.time + " " + formatDate(t.date)}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {t.coach}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 5 }}
                        onClick={() => dispatch(deleteTicket(t._id))}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
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
                    count={tickets.length}
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
    </>
  );
}
