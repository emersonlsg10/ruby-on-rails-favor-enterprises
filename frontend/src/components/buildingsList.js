import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import createFavorites from "../hooks/favorites/createFavorites";
import updateFavorites from "../hooks/favorites/updateFavorites";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    minHeight: 420,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#3f51b5",
  },
  selected: {
    fontSize: 30,
    color: "red",
  },
  noSelected: {
    fontSize: 30,
    color: "gray",
  },
}));

function BuildingsList({
  listBuildings,
  listFavorites,
  handleUpdateFavourites,
}) {
  const classes = useStyles();

  const isFavourite = (id) => {
    return listFavorites.find(
      (item) => item.id_enterprise === parseInt(id) && item.is_like
    );
  };

  const wasCreated = (id) => {
    return listFavorites.find((item) => item.id_enterprise === parseInt(id));
  };

  const handleFavourite = (value, isLike) => {
    const data = {
      name: value.name,
      is_like: isLike,
      id_enterprise: value.id,
    };
    const alreadyExists = wasCreated(value.id);
    if (alreadyExists) {
      updateFavorites({ ...data, id: alreadyExists.id });
    } else {
      createFavorites(data);
    }
    handleUpdateFavourites();
  };

  const formatPrice = (value) =>
    parseFloat(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });

  return (
    <>
      {listBuildings &&
        listFavorites.length > 0 &&
        listBuildings.map((value, index) => {
          return (
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {value.publisher.name[0]}
                  </Avatar>
                }
                title={value.publisher.name}
                subheader={value.finality}
              />
              <CardMedia
                className={classes.media}
                image={Object.values(value.default_image)[2]}
                title="Paella dish"
              />
              <CardContent style={{ height: 60 }}>
                <Typography variant="h6" color="primary" component="p">
                  {value.name} - Preço mínimo:{" "}
                  {`${formatPrice(value.min_price)}`}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handleFavourite(value, !isFavourite(value.id))}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon
                    className={
                      isFavourite(value.id)
                        ? classes.selected
                        : classes.noSelected
                    }
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
    </>
  );
}
export default BuildingsList;
