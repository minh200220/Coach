import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";

import { getRoutes } from "../../actions/routes";

import Table from "./Table";

const Route = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoutes());
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

export default Route;
