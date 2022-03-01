import React, { FC } from "react";

import { useParams, useLocation } from "react-router-dom";
import { preUser } from "../../types";
import { UsersPage } from "../UsersPage/UsersPage";
import {Typography} from "@mui/material";

export const UsersSearchPage: FC = () => {
  const location = useLocation();
  const users: preUser[] = location.state as preUser[];

  const { login }: { login?: string } = useParams();
  return (
    <main>
      <div className="container">
        <Typography variant="h4" color="#fafafa">
          Search result for "{login}":
        </Typography>
        <UsersPage preusers={users} />
      </div>
    </main>
  );
};
