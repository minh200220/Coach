import React, { useState } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { createCoach } from "../../actions/coachs";

const Add = ({ setAdd }) => {
  const [coach, setCoach] = useState({
    brand: "",
    seatNumber: "",
    produceYear: "",
    status: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (coach.brand && coach.seatNumber && coach.produceYear && coach.status) {
      dispatch(createCoach(coach));
    } else {
      console.log("Error! Lack of data!");
    }
    setAdd(false);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Input
          type="text"
          name="brand"
          onChange={(e) => setCoach({ ...coach, brand: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="text"
          name="seatNumber"
          onChange={(e) => setCoach({ ...coach, seatNumber: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="text"
          name="produceYear"
          onChange={(e) => setCoach({ ...coach, produceYear: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="text"
          name="status"
          onChange={(e) => setCoach({ ...coach, status: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Xong
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 5 }}
          onClick={() => setAdd(false)}
        >
          Hủy
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Add;
