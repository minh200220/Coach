import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";

import { getCoachTrips } from "../../actions/coachTrips";

import Table from "./Table";

const CoachTrip = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoachTrips());
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

export default CoachTrip;
