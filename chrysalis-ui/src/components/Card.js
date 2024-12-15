import React from "react";
import { Button as MuiButton } from "@mui/material";
import "../scss/Card.scss";

const Card = ({ title, description, onClick }) => (
  <div class="card">
    <h3>{title}</h3>
    <MuiButton
      variant="contained"
      size="large"
      onClick={onClick}
      color="primary"
    >
      {description}
    </MuiButton>
  </div>
);

export default Card;