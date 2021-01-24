import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import createFavorites from "../hooks/favorites/createFavorites";
import updateFavorites from "../hooks/favorites/updateFavorites";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height: 420,
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
    backgroundColor: '#3f51b5',
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  return (
    <>
      {listBuildings &&
        listFavorites.length &&
        listBuildings.map((value, index) => {
          return (
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {value.name[0]}
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
                <Typography variant="h6" color="textSecondary" component="p">
                  {value.name}
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
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
    </>
  );
}
export default BuildingsList;
