import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TableBody,
  Radio,
  CircularProgress,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import { api } from "../../constants/index";
const useStyles = makeStyles({
  root: {
    width: "100%",
    alignSelf: "center",
  },
  head: {
    background: "black",
  },
  headCell: {
    color: "white",
  },
  table: {
    border: "1px solid lightgray",
  },
});
const Index = ({setErr}) => {
  const [data, setdata] = useState({customers:[],total:0});
  const classes = useStyles();
  const getData = async () => {
    try {
      const {data} = await axios.get(`${api}/pdfData`);
      setdata({total:data.total,customers:data.customers});
    } catch (error) {
      console.log(error);
      setErr(true)
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headCell} align="center">
                Name
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.customers.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{i.name}</TableCell>
                  <TableCell align="center">{i.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <h4  >Total = {data.total}</h4>
    </div>
  );
};

export default Index;
