import React, {FC} from "react";
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {Header} from "../Header/Header";
import {preUser} from "../../types";

interface Props {
  preusers: preUser[];
}

const useStyles =makeStyles({
  root:{
    background:"#ff5722",
    height: 'max-content',
    minHeight:"100%",
    //overflow: 'auto',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,

  },
  container:{
    margin: "20px"

  }
})

export const Layout: FC<Props> = ({ preusers }: Props) =>{
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Header users={preusers}/>
        <div className={classes.container}>
          <Outlet/>
        </div>

      </div>

  )
}