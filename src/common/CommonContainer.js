import { Container } from "@mui/material";
import React from "react";

const CommonContainer = ({ maxWidth = "lg", ...others }) => {
  return <Container maxWidth={maxWidth} {...others}></Container>;
};

export default CommonContainer;
