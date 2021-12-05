import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { createRoute } from "../../actions/routes";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160,
  },
}));

const Add = ({ setAdd }) => {
  const [route, setRoute] = useState({
    fromto: "",
    distance: "",
    time: "",
    price: "",
    coachType: 0,
    departTime: [],
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = () => {
    if (
      route.fromto &&
      route.distance &&
      route.time &&
      route.price &&
      route.coachType &&
      route.departTime
    ) {
      dispatch(createRoute(route));
    } else {
      alert("Error! Lack of data!");
    }
    setAdd(false);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Input
          type="text"
          name="fromto"
          onChange={(e) => setRoute({ ...route, fromto: e.target.value })}
        />
      </TableCell>
      <TableCell align="right" style={{ width: 160 }}>
        <Input
          type="text"
          name="distance"
          onChange={(e) => setRoute({ ...route, distance: e.target.value })}
        />
      </TableCell>
      <TableCell align="right" style={{ width: 160 }}>
        <Input
          type="text"
          name="time"
          onChange={(e) => setRoute({ ...route, time: e.target.value })}
        />
      </TableCell>
      <TableCell align="right" style={{ width: 160 }}>
        <Input
          type="number"
          name="price"
          onChange={(e) => setRoute({ ...route, price: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="select-lable-1"
            label="Loại xe"
            name="coachType"
            onChange={(e) => setRoute({ ...route, coachType: e.target.value })}
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
      <TableCell align="right" style={{ width: 160 }}>
        <Input
          type="text"
          name="departTime"
          placeholder="VD: 6h,12h,15h"
          onChange={(e) =>
            setRoute({ ...route, departTime: e.target.value.split(",") })
          }
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
