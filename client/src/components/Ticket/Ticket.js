import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";

import { getTickets } from "../../actions/tickets";

import Table from "./Table";

const Ticket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
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

export default Ticket;
