import React, { useEffect, useState } from "react";
import BuildingsList from "./components/buildingsList";
import PaginationControlled from "./components/pagination";
import { makeStyles } from "@material-ui/core/styles";
import callBuildings from "./hooks/getBuildings";
import getFavorites from "./hooks/favorites/getFavorites";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();

  const [listBuildings, setListBuildings] = useState(null);
  const [totalBuildings, setTotalBuildings] = useState(null);

  const [listFavorites, setListFavorites] = useState(null);
  const [loading, setLoading] = useState(false);

  var pageSession = sessionStorage.getItem("page");
  const [page, setPage] = useState(pageSession || 1);

  const handleUpdateFavourites = () => {
    setTimeout(async () => {
      const responseFavorites = await getFavorites();
      if (responseFavorites) {
        setListFavorites(responseFavorites);
      }
    }, 200);
  };

  const getBuildings = async (params = "") => {
    setLoading(true);
    const responseBuildings = await callBuildings(params);

    if (responseBuildings && responseBuildings.buildings) {
      setListBuildings(responseBuildings.buildings);
      setTotalBuildings(responseBuildings.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    sessionStorage.setItem("page", page);
    getBuildings(page);
    handleUpdateFavourites();
  }, [page]);

  return (
    <div className="app">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>Lista de Empreendimentos</div>
          <div className={classes.container}>
            <PaginationControlled pageSession={parseInt(pageSession) || 1} onChange={setPage} total={totalBuildings} />
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <BuildingsList
          listBuildings={listBuildings || []}
          listFavorites={listFavorites || []}
          handleUpdateFavourites={handleUpdateFavourites}
        />
      </div>
    </div>
  );
}

export default App;
