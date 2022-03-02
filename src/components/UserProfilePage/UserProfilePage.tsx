import React, { FC, useState } from "react";
import "./UserProfilePage.css";
import { useParams } from "react-router-dom";
import { User, Repo } from "../../types";
import {Card, CardContent, Grid, Typography, CardActionArea, Container, Link as LinkMui, Avatar} from "@mui/material";

export const UserProfilePage: FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [repos, setRepos] = useState<Repo[]>([]);
  const { login }: { login?: string } = useParams();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setUserInfo);
  }, []);
  React.useEffect(() => {
    if (userInfo) {
      fetch(userInfo.repos_url)
        .then((response) => response.json())
        .then(setRepos);
    }
  }, [userInfo,login]);


  return (
    <>
      <main>
        <Container maxWidth={false} >
            <Card sx={{
              maxWidth: "100%",
              width:"100%",
              borderRadius: 3,
              border: 1,
              borderColor: "#e64a19",
              boxShadow: 3,
              marginTop:5
            }}
                  style={{ backgroundColor: "#fbe9e7" }}>
              <CardContent>
                <Grid
                  container
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}

                >
                  <Grid item xs={1} md={2} lg={1}>
                    <Avatar sx={{ width: 120, height: 120 }}  src={userInfo?.avatar_url}/>
                  </Grid>

                  <Grid item xs={8} md={7} lg={8}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Grid item sx={{ display: "flex", alignItems: "baseline" }} >
                        <Typography
                          variant="h5"
                          color="#d84315"
                          style={{ flexDirection: "column" }}
                        >
                          {userInfo?.name? `${userInfo.name},`:"John Doe,"}
                        </Typography>
                        <Typography
                          color="#424242"
                          variant="h6"
                          style={{ marginLeft: 10  }}
                        >
                          {userInfo?.login? `${userInfo.login}`:"catman,"}
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
                          {userInfo?.followers? userInfo.followers :"14.5k"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          style={{ flexDirection: "column", marginLeft: 10 }}
                          fontStyle="italic"
                        >
                          followers,
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="#9f0000"
                          style={{ flexDirection: "column", marginLeft: 15 }}
                          fontStyle="italic"
                        >
                          {userInfo?.following? userInfo.following:"105 "}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          style={{ marginLeft: 10 }}
                          fontStyle="italic"
                        >
                          following
                        </Typography>
                        <LinkMui href={userInfo?.blog}
                              target="_blank"
                              underline="hover">
                          <Typography
                            variant="h6"
                            color="#9f0000"
                            style={{ flexDirection: "column", marginLeft:20 }}
                            fontStyle="italic"
                          >
                            blog
                          </Typography>
                        </LinkMui>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>

            </Card>



            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={4}
              marginTop={5}
            >
              <Typography
                variant="h5"
                color="#fafafa"
                style={{ flexDirection: "column" }}
              >
                Repositories:
              </Typography>
              <LinkMui href={`https://github.com/${userInfo?.login}?tab=repositories`}
                       target="_blank"
                       underline="hover">
                <Typography
                  variant="h6"
                  color="#fafafa"
                  style={{ flexDirection: "column" }}
                >
                  All repos
                </Typography>
              </LinkMui>

            </Grid>

            <Grid container spacing={2}>
              {repos.slice(0, 10).map((item) => (
                <Grid item xs={6} md={4} lg={3} key={item.id}>
                  <Card
                    sx={{
                      maxWidth: 500,
                      minHeight: 100,
                      borderRadius: 3,
                      border: 1,
                      borderColor: '#e64a19',
                      boxShadow: 3  }}
                    key={item.id}
                  >
                    <CardActionArea href={item.html_url} target="_blank">
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={3}

                          paddingLeft={0.5}
                          paddingRight={0.5}
                        >
                          <Grid item xs={12} >
                            <Grid
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="flex-start"
                              spacing={1}
                            >
                              <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
                                <Typography
                                  variant="h6"
                                  color="#d84315"
                                  style={{ flexDirection: "column" }}
                                >
                                  {item.name}
                                </Typography>
                              </Grid>
                              <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  style={{ flexDirection: "column"}}
                                  fontStyle= 'italic'
                                >
                                  {item.description}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

      </main>
    </>
  );
};
