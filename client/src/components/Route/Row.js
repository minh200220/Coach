import React, { useState } from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";

import { updateRoute, deleteRoute } from "../../actions/routes";

const Row = ({ route, user }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(route);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (edit) {
      dispatch(updateRoute(data._id, data));
    }

    setEdit(!edit);
  };
  return (
    <TableRow key={data._id}>
      <TableCell component="th" scope="row">
        {edit ? (
          <Input
            type="text"
            value={data.fromto}
            onChange={(e) => setData({ ...data, fromto: e.target.value })}
          />
        ) : (
          data.fromto
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.distance}
            onChange={(e) => setData({ ...data, distance: e.target.value })}
          />
        ) : (
          data.distance + " km"
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
        ) : (
          data.time + " tiếng"
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
        ) : (
          data.price + " VNĐ"
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="number"
            value={data.coachType}
            onChange={(e) => setData({ ...data, coachType: e.target.value })}
          />
        ) : (
          data.coachType + " chỗ"
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {edit ? (
          <Input
            type="text"
            value={data.departTime}
            onChange={(e) =>
              setData({ ...data, departTime: e.target.value.split(",") })
            }
          />
        ) : (
          data.departTime.join(",")
        )}
      </TableCell>
      {user?.role === 1 && (
        <TableCell align="right">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {edit ? "Xong" : "Sửa"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 5 }}
            onClick={() => dispatch(deleteRoute(data._id))}
          >
            Xóa
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Row;
