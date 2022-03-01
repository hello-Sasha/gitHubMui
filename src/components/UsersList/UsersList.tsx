import React, { FC } from "react";
import "./UsersList.css";
import { User } from "../../types";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid} from "@mui/material";


interface Props {
  users: User[];
  setUsers: any;
}

export const UsersList: FC<Props> = ({ users, setUsers }: Props) => {
  const FavIcon =( user: User)=>{
    if (user.favIconfield===true) {
      return  <FavoriteIcon style={{color:"#ff3d00"}} />
    } else {
      return  <FavoriteIcon style={{color:"#ffab91"}} />
    }
  }
  const deleteUser=(id:number)=>{
   const res = users.filter((user)=> user.id!==id);
   setUsers(res);
  };
  const addtoFav=(id:number)=>{
    const res = users.map( (user)=>{ if(user.id===id) {return {...user, "favIconfield":true}} else {return user}});// add field fav to element and change heart class
    setUsers(res);
  }
  return (
    <>
      {users.map((item) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={item.id} >
          <Card sx={{
            maxWidth: "100%",
            width:"100%",
            borderRadius: 3,
            border: 1,
            borderColor: "#e64a19",
            boxShadow: 3,
            marginTop:5
          }}
                style={{ backgroundColor: "#fafafa" }}>
            <CardContent>
              <Grid
                container
                direction={{ xs: "column", sm: "row" }}
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}

              >
                <Grid item xs={1} md={2} lg={1}>
                  <Avatar sx={{ width: 70, height: 70 }}  src={item?.avatar_url}/>
                </Grid>

                <Grid item xs={8} md={8} lg={8}>

                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={1}
                      component={Link} to={`/users/${item.login}`}

                    >


                      <Grid item sx={{ display: "flex", alignItems: "baseline" }} >
                        <Typography
                          variant="h6"
                          color="#d84315"
                          style={{ flexDirection: "column" }}
                        >
                          {item?.name? `${item.name},`:"John Doe,"}
                        </Typography>
                        <Typography
                          color="#424242"
                          variant="subtitle1"
                          style={{ marginLeft: 10  }}
                        >
                          {item?.login? `${item.login}`:"catman"}
                        </Typography>
                      </Grid>

                      <Grid item sx={{ display: "flex", alignItems: "baseline" }}
                      >
                        <Typography
                          variant="subtitle1"
                          color="#9f0000"
                          style={{ flexDirection: "column" }}
                          fontStyle="italic"
                        >
                          {item?.followers? `${item.followers/1000}k` :"14.5k"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          style={{ flexDirection: "column", marginLeft: 5 }}
                          fontStyle="italic"
                        >
                         followers,
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="#9f0000"
                          style={{ flexDirection: "column", marginLeft: 10 }}
                          fontStyle="italic"
                        >
                          {item?.following? item.following:"105 "}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          style={{ marginLeft: 10 }}
                          fontStyle="italic"
                        >
                          following
                        </Typography>

                      </Grid>
                    </Grid>





                </Grid>

                <Grid item  >
                  <Grid
                    container
                    direction={{ xs: "row", sm: "row", md:"column", lg:"column" }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <IconButton aria-label="add to favorites" onClick={()=>{addtoFav(item.id)}}>
                      {FavIcon(item)}
                    </IconButton>
                    <IconButton aria-label="delete" onClick={()=>{deleteUser(item.id)}}>
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        {/*  <Card sx={{ maxWidth: 345 }} key={item.id}>*/}
        {/*  <CardActionArea  component={Link} to={`/users/${item.login}`}>*/}
        {/*    <CardHeader*/}
        {/*      avatar={*/}
        {/*        <Avatar sx={{ width:64, height:64  }} aria-label="recipe"*/}
        {/*                src={item.avatar_url} />*/}
        {/*      }*/}

        {/*      title={item.name}*/}
        {/*      subheader= {item.login}*/}
        {/*      content={item.followers}*/}

        {/*    />*/}

        {/*    <CardContent>*/}
        {/*      <Typography variant="body2" color="text.secondary">*/}
        {/*        {item.followers} followers*/}
        {/*      </Typography>*/}
        {/*      <Typography variant="body2" color="text.secondary">*/}
        {/*        {item.following} following*/}
        {/*      </Typography>*/}
        {/*    </CardContent>*/}
        {/*    <CardActions>*/}
        {/*      <IconButton aria-label="add to favorites" onClick={()=>{console.log("fav")}} >*/}
        {/*        <FavoriteIcon />*/}
        {/*      </IconButton>*/}
        {/*      <IconButton aria-label="delete" onClick={()=>{deleteUser(item.id)}}>*/}
        {/*        <ClearIcon  />*/}
        {/*      </IconButton>*/}
        {/*    </CardActions>*/}
        {/*  </CardActionArea>*/}

        {/*</Card>*/}

        </Grid>



        // <section className="users-list__item" key={item.id}>
        //   <div className="users-list__image-container">
        //     <img
        //       className="users-list__image"
        //       src={item.avatar_url}
        //       alt="profile photo"
        //     />
        //   </div>
        //   <div className="users-list__content">
        //     <h2 className="users-list__title">
        //       {/*<a href={`/users/${item.id}`} className="link">{item.name}</a>,*/}
        //       <a>
        //         <Link
        //           to={`/users/${item.login}`}
        //           // state = {
        //           //   preusers
        //           // }
        //           className="link"
        //         >
        //           {item.name},
        //         </Link>
        //       </a>
        //       {item.public_repos}repos
        //     </h2>
        //     <p className="users-list__text">{item.company}</p>
        //   </div>
        // </section>
      ))}

    </>
  );
};
