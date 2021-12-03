import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";

import { getCoachs } from "../../actions/coachs";

import Table from "./Table";

const Coach = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoachs());
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

export default Coach;
