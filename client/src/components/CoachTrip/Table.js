import React, { useState } from "react";
import {
  Modal,
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
import axios from "axios";

import { updateCoachTrip, deleteCoachTrip } from "../../actions/coachTrips";

import ModalBody from "./ModalBody";
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
  const [coachTrip, setCoachTrip] = useState(null);

  const user = JSON.parse(localStorage.getItem("profile")).result;
  const coachTrips = useSelector((state) => state.coachTrips);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const formatDate = (input) => {
    var datePart = input.slice(0, 10).match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (c) => {
    setCoachTrip(c);
    handleOpen();
  };

  const handleBuyTicket = (c) => {
    if (c.seat < c.seatMax) {
      axios.post("http://localhost:5000/tickets", {
        fromto: c.fromto,
        date: c.date,
        time: c.time,
        coach: c.coach,
        userId: user._id,
      });
      c.passengerNames.push(user.name);
      dispatch(
        updateCoachTrip(c._id, {
          ...c,
          seat: c.seat + 1,
        })
      );
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, coachTrips.length - page * rowsPerPage);

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
          {user?.role === 1 && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleOpen}
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
                  <TableCell>Chuyến xe</TableCell>
                  <TableCell align="right">Loại xe</TableCell>
                  <TableCell align="right">Tài xế</TableCell>
                  <TableCell align="right">Thời gian xuất phát</TableCell>
                  <TableCell align="right">Chỗ ngồi</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? coachTrips.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : coachTrips
                ).map((coachTrip) => (
                  <TableRow key={coachTrip._id}>
                    <TableCell component="th" scope="row">
                      {coachTrip.fromto}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {coachTrip.coach}
                    </TableCell>
                    <TableCell style={{ width: 260 }} align="right">
                      {coachTrip.driver}
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="right">
                      {coachTrip.time + " " + formatDate(coachTrip.date)}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {coachTrip.seat + "/" + coachTrip.seatMax}
                    </TableCell>
                    <TableCell align="right">
                      {user?.role === 0 ? (
                        <>
                          {coachTrip.passengerNames.includes(user.name) ? (
                            <Button
                              variant="contained"
                              color="primary"
                              disabled
                            >
                              Đã mua
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleBuyTicket(coachTrip)}
                            >
                              Đặt vé
                            </Button>
                          )}
                        </>
                      ) : (
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: 5 }}
                            onClick={() => handleEdit(coachTrip)}
                          >
                            Chi tiết
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: 5 }}
                            onClick={() =>
                              dispatch(deleteCoachTrip(coachTrip._id))
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      )}
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
                    count={coachTrips.length}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <ModalBody
            handleClose={handleClose}
            coachTrip={coachTrip}
            setCoachTrip={setCoachTrip}
          />
        }
      </Modal>
    </>
  );
}
