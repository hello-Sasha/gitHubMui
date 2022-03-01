import React, { FC, FormEvent, useState } from "react";


import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { orange } from '@mui/material/colors';


import { preUser } from "../../types";
import {Grid, Typography,  Link as LinkMui, Box} from "@mui/material";
interface Props {
  users: preUser[];
}

export const Header: FC<Props> = ({ users }: Props) => {
  const orangeMui=orange[800]
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const res =users.filter(user=>user.login.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    const res = users.filter((user) =>
      user.login.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase())
    );

    if (res.length === 0) {
      navigate("/whatever");
    } else {
      //navigate(`/users/${res[0].login}`) //send users
      navigate(`/search/${searchValue}`, { state: res });
    }
    setSearchValue("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 150,
        backgroundColor: "#fafafa",
        border: 1,
        borderColor: "#ffffff"
      }}
    >
      <Grid
        container
        marginTop={4}
        marginBottom={2}
        spacing={4}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={4} md={6} lg={8} >
          <LinkMui  underline="hover" color="#bf360c" href="/">
            <Typography variant="h6" color="#bf360c">
              GITHUB USERS //
            </Typography>
          </LinkMui>

        </Grid>
        <Grid item>
          <Box component="form" onSubmit={onSubmit}>
            <Grid
              container
              spacing={1}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="flex-end"
              alignItems={{ xs: "center", sm: "flex-end" }}
            >
              <Grid item>
                <TextField
                  color="warning"
                  id="outlined-helperText"
                  variant="standard"
                  label="Search users"
                  defaultValue="John Doe"
                  focused
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle  style={{ color: orangeMui }}/>
                      </InputAdornment>
                    )
                  }}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.currentTarget.value)}
                />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="warning" size="large"
                       >
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
