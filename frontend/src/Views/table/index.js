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
    width: "70%",
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
  spinner:{
     marginLeft:"45%",
     marginBottom:"5%"
    // justifyContent:"center"
  }
});
const Index = ({setErr}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const classes = useStyles();
  const getData = async () => {
    try {
      setloading(true);
      const res = await axios.get(`${api}/customers`);
      setdata(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setErr(true)
    }
  };
  useEffect(() => {
    getData();
  }, [trigger]);

  const handleSelected = async (customer) => {
    try {
      await axios.put(`${api}/customers/${customer._id}`, customer);
    } catch (error) {
      console.log(error);
      setErr(true)

    }
  };
  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress color="primary" size={100}  className={classes.spinner}/>
      ) : (
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headCell}>Selected</TableCell>
              <TableCell className={classes.headCell} align="center">
                Name
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                    inputProps={{ 'data-testid': `checkbox` }}
                      checked={i.selected}
                      onClick={(e) => {
                        handleSelected(i);
                        setTrigger(!trigger);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{i.name}</TableCell>
                  <TableCell align="center">{i.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Index;
