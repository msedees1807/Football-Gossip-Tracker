import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: "30px",
  },
});

export default function InfoBox({ title, cases, total }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2>{cases}</h2>
        <Typography>{total}</Typography>
      </CardContent>
    </Card>
  );
}
