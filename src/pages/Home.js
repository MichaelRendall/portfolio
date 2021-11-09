import React from "react";
import Card from "../components/UI/Card";
import classes from "./Home.module.scss";

const Home = () => {
  return (
    <section className={classes.cardSection}>
      <Card header="Charades" url="/charades" />
      <Card header="Paper Game" url="/paper-game" />
    </section>
  );
};

export default Home;