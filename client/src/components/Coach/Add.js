import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
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
        <FormControl variant="outlined" style={{ width: 120 }}>
          <Select
            labelId="select-lable-1"
            label="Loại xe"
            name="coachType"
            onChange={(e) => setCoach({ ...coach, seatNumber: e.target.value })}
            required
          >
            <MenuItem key="1" value={16}>
              16 chỗ
            </MenuItem>
            <MenuItem key="2" value={30}>
              30 chỗ
            </MenuItem>
            <MenuItem key="3" value={35}>
              35 chỗ
            </MenuItem>
            <MenuItem key="4" value={45}>
              45 chỗ
            </MenuItem>
          </Select>
        </FormControl>
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
