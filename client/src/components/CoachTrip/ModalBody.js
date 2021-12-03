import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import axios from "axios";

import { createCoachTrip } from "../../actions/coachTrips";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    minWidth: 280,
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
  button: {
    maxWidth: 100,
    height: 55,
    marginLeft: 10,
  },
}));

const initialState = {
  fromto: "",
  coach: "",
  driver: "",
  date: "",
  time: "",
  seat: 0,
  seatMax: 0,
  passengerNames: [],
  passengerIds: [],
};

const ModalBody = ({ handleClose, coachTrip, setCoachTrip }) => {
  const [modalStyle] = useState(getModalStyle);
  const [formData, setFormData] = useState(
    coachTrip ? coachTrip : initialState
  );
  const [select, setSelect] = useState({
    coachs: [],
    drivers: [],
    routes: [],
    times: [],
    seatMax: 0,
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    let url1 = "http://localhost:5000/coachs";
    let url2 = "http://localhost:5000/drivers";
    let url3 = "http://localhost:5000/routes";

    const req1 = axios.get(url1);
    const req2 = axios.get(url2);
    const req3 = axios.get(url3);

    axios
      .all([req1, req2, req3])
      .then(
        axios.spread((...responses) => {
          const res1 = responses[0];
          const res2 = responses[1];
          const res3 = responses[2];
          setSelect({
            coachs: res1.data,
            drivers: res2.data,
            routes: res3.data,
          });
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeCoach = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.brand,
      seatMax: e.target.value.seatNumber,
    });
  };

  const handleChangeDriver = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.name });
    setSelect({ ...select, seatMax: e.target.value.seatMax });
  };

  const handleChangeRoute = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.fromto });
    setSelect({ ...select, times: e.target.value.departTime });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(createCoachTrip(formData));
    setCoachTrip(null);
    handleClose();
  };

  const handleAddChip = (familiarRoute) => {
    setFormData({
      ...formData,
      familiarRoutes: [...formData.familiarRoutes, familiarRoute],
    });
  };

  const handleDeleteChip = (chipToDelete) => {
    setFormData({
      ...formData,
      familiarRoutes: formData.familiarRoutes.filter(
        (familiarRoute) => familiarRoute !== chipToDelete
      ),
    });
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5">
          Thông tin chuyến xe
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-lable-1">Chuyến xe</InputLabel>
                <Select
                  labelId="select-lable-1"
                  label="Tuyến đường"
                  name="fromto"
                  onChange={handleChangeRoute}
                  required
                >
                  {select?.routes.map((r) => (
                    <MenuItem key={r._id} value={r}>
                      {r.fromto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-lable-3">Tài xế</InputLabel>
                <Select
                  labelId="select-lable-3"
                  label="Tài xế"
                  name="driver"
                  onChange={handleChangeDriver}
                  required
                >
                  {select?.drivers
                    .filter((i) => i.familiarRoutes.includes(formData.fromto))
                    .map((d) => (
                      <MenuItem key={d._id} value={d}>
                        {d.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-lable-2">Loại xe</InputLabel>
                <Select
                  labelId="select-lable-2"
                  label="Loại xe"
                  name="coach"
                  onChange={handleChangeCoach}
                  required
                >
                  {select?.coachs
                    .filter((i) => select.seatMax >= i.seatNumber)
                    .map((c) => (
                      <MenuItem key={c._id} value={c}>
                        {c.brand}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                disabled
                id="seatMax"
                value={formData.seatMax}
                label="Số chỗ"
                name="seatMax"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                value={formData.date.slice(0, 10)}
                label="Ngày đi"
                name="date"
                type="date"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-lable-4">Chuyến xe</InputLabel>
                <Select
                  labelId="select-lable-4"
                  label="Giờ đi"
                  name="time"
                  onChange={handleChange}
                  required
                >
                  {select?.times?.map((t) => (
                    <MenuItem key={t._id} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <ChipInput
                disabled
                name="passengerNames"
                variant="outlined"
                label="Hành khách"
                fullWidth
                value={formData.passengerNames}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Lưu
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ModalBody;
