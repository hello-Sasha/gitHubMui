import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UsersList } from "../UsersList/UsersList";
import { preUser, User } from "../../types";
import {Grid, Box} from "@mui/material";


interface Props {
  preusers: preUser[];
}



export const UsersPage: FC<Props> = ({ preusers }: Props) => {
  const [users, setUsers] = React.useState<User[]>([]);
  

  React.useEffect(() => {
    Promise.all(
      preusers.map(async (x) => { //preusers
        const data = await fetch(
          `https://api.github.com/users/${x.login}`
        ).then((response) => response.json());
        return data;
      })
    ).then((data) => setUsers(data)); // add new cat fav
  }, [preusers]);

  return (
    <Link to="/">
      <main>

        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={3} columnSpacing={2}>
              <UsersList users={users} setUsers={setUsers} /> 
            </Grid>
        </Box>

      </main>
    </Link>
  );
};
