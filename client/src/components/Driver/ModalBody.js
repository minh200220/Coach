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

import { createDriver, updateDriver } from "../../actions/drivers";

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
    minWidth: 320,
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
  name: "",
  dob: "",
  licenseNo: "",
  licenseClass: "",
  seatMax: 0,
  familiarRoutes: [],
};

const ModalBody = ({ handleClose, driver, setDriver }) => {
  const [modalStyle] = useState(getModalStyle);
  const [formData, setFormData] = useState(driver ? driver : initialState);
  const [route, setRoute] = useState("");
  const [routes, setRoutes] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const getRoutes = async () => {
      const routesFromServer = await fetchRoutes();
      setRoutes(routesFromServer);
    };

    getRoutes();
  }, []);

  const fetchRoutes = async () => {
    const res = await fetch("http://localhost:5000/routes");
    const data = await res.json();

    return data;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);
    if (driver) {
      dispatch(updateDriver(driver._id, formData));
      setDriver(null);
      handleClose();
    } else {
      dispatch(createDriver(formData));
      handleClose();
    }
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
          Th??ng tin t??i x???
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                value={formData.name}
                label="T??n"
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dob"
                value={formData.dob.slice(0, 10)}
                label="Ng??y sinh"
                name="dob"
                type="date"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="licenseNo"
                value={formData.licenseNo}
                label="S??? hi???u b???ng l??i"
                name="licenseNo"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="licenseClass"
                value={formData.licenseClass}
                label="H???ng b???ng l??i"
                name="licenseClass"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="seatMax"
                value={formData.seatMax}
                label="S??? ch??? c???a xe c?? th??? l??i"
                name="seatMax"
                type="number"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-lable">
                  Th??m tuy???n ???????ng quen thu???c
                </InputLabel>
                <Select
                  labelId="select-lable"
                  label="Th??m tuy???n ???????ng quen thu???c"
                  onChange={(e) => setRoute(e.target.value)}
                  required
                >
                  {routes.map((r) => (
                    <MenuItem key={r._id} value={r.fromto}>
                      {r.fromto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleAddChip(route)}
              >
                Th??m
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                name="familiarRoutes"
                variant="outlined"
                label="Tuy???n ???????ng quen thu???c"
                fullWidth
                value={formData.familiarRoutes}
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
                L??u
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
                H???y
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ModalBody;
