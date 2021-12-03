import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";

import { getDrivers } from "../../actions/drivers";

import Table from "./Table";

const Driver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Table />
      </Container>
    </div>
  );
};

export default Driver;
