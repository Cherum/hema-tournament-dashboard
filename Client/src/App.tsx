import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FencerPart from './FencerPart'
import { Fencer, Club, HemaEvent } from './types'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { fencer1, fencer2, fencer1Club, fencer2Club, fencer1Events, fencer2Events, fencerFightHistory } from './data'
import Comparison from './Comparison'
import { Button, Toolbar } from '@material-ui/core';

const styles = {
  root: {
    margin: "5%",
    maxWidth: "90%"
  }
};

class App extends React.Component<any> {

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" gutterBottom>
              HEMA Tournament Dashboard
            </Typography>
            <Button>Highlight</Button>
          </Toolbar>
        </AppBar>
        <div>.</div>
        <Comparison fencer={fencer1} otherFencer={fencer2} />

        <Grid container className={classes.root}>
          <Grid item xs={6}>
            <FencerPart fencer={fencer1} otherFencer={fencer2} club={fencer1Club} events={fencer1Events} fightHistory={fencerFightHistory} isLeft />
          </Grid>
          <Grid item xs={6}>
            <FencerPart fencer={fencer2} otherFencer={fencer1} club={fencer2Club} events={fencer2Events} fightHistory={fencerFightHistory} isRight />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
