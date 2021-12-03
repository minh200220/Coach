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

import { deleteDriver } from "../../actions/drivers";

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
  const [driver, setDriver] = useState(null);

  const drivers = useSelector((state) => state.drivers);
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

  const handleEdit = (d) => {
    setDriver(d);
    handleOpen();
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, drivers.length - page * rowsPerPage);

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
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Thêm
          </Button>
        </CardContent>
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell align="right">Ngày sinh</TableCell>
                  <TableCell align="right">Số hiệu bằng lái</TableCell>
                  <TableCell align="right">Hạng bằng lái</TableCell>
                  <TableCell align="right">Số chỗ tối đa</TableCell>
                  <TableCell align="right">Tuyến đường quen thuộc</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? drivers.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : drivers
                ).map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell component="th" scope="row">
                      {driver.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {formatDate(driver.dob)}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {driver.licenseNo}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {driver.licenseClass}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {driver.seatMax}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {driver.familiarRoutes.join(",")}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(driver)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 5 }}
                        onClick={() => dispatch(deleteDriver(driver._id))}
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
                    count={drivers.length}
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
            driver={driver}
            setDriver={setDriver}
          />
        }
      </Modal>
    </>
  );
}
