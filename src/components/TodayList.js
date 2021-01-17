import React from "react";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function TodayList() {
  return (
    <div>
      <ul>
        <li>Salah to madrid</li>
        <li>Salah to madrid</li>
        <li>Salah to madrid</li>
        <li>Salah to madrid</li>
      </ul>
      <Button
        style={{ textTransform: "none" }}
        variant="contained"
        startIcon={<RefreshIcon />}
      >
        Refresh
      </Button>
    </div>
  );
}
