import React, { useState } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { updateCoach, deleteCoach } from "../../actions/coachs";

const Row = ({ coach }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(coach);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (edit) {
      dispatch(updateCoach(data._id, data));
    }

    // console.log(group);
    setEdit(!edit);
  };
  return (
    <TableRow key={coach._id}>
      <TableCell component="th" scope="row">
        {edit ? (
          <Input
            type="text"
            value={data.brand}
            onChange={(e) => setData({ ...data, brand: e.target.value })}
          />
        ) : (
          data.brand
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.seatNumber}
            onChange={(e) => setData({ ...data, seatNumber: e.target.value })}
          />
        ) : (
          data.seatNumber
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.produceYear}
            onChange={(e) => setData({ ...data, produceYear: e.target.value })}
          />
        ) : (
          data.produceYear
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          />
        ) : (
          data.status
        )}
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {edit ? "Xong" : "Sửa"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 5 }}
          onClick={() => dispatch(deleteCoach(data._id))}
        >
          Xóa
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
