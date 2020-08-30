import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FencerPart from './FencerPart'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { fencer1, fencer2, fencer1Club, fencer2Club, fencer1Events, fencer2Events, fencerFightHistory } from './data'
import Comparison from './Comparison'
import { Button, Toolbar, TextField } from '@material-ui/core';
import { Fencer } from './types';
import { timingSafeEqual } from 'crypto';

const styles = {
  root: {
    margin: "5%",
    maxWidth: "90%"
  }
};

interface IProps {
}

interface IState {
  fighter1Id: number,
  fighter2Id: number,
  fighter1?: Fencer,
  fighter2?: Fencer
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
  }
  state = {
    fighter1Id: 10,
    fighter2Id: 1314,
    fighter1: {},
    fighter2: {}
  }

  componentDidMount() {
    this.refreshNames()
  }

  fetchUsers = async (fighterId: number) => {
    const response = await fetch('/fighter/' + fighterId);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  convertResultToFencer(res: any): Fencer {
    const fighter: Fencer = {
      name: res.name,
      nationality: res.nationality,
      clubName: res.clubName,
      clubId: res.clubId,
      rank: res.rank,
      rating: res.rating,
      wins: res.wins,
      losses: res.losses,
      draws: res.draws
    }
    return fighter;
  }
  refreshNames() {
    console.log("refreshNames", this.state.fighter1Id, this.state.fighter2Id)
    this.fetchUsers(this.state.fighter1Id)
      .then(res => {
        this.setState({
          fighter1: this.convertResultToFencer(res)
        })
        console.log("finished setting fighter 1")
      })
      .catch(err => console.warn(err));

    this.fetchUsers(this.state.fighter2Id)
      .then(res => {
        this.setState({
          fighter2: this.convertResultToFencer(res)
        })
        console.log("finished setting fighter 2")
      })
      .catch(err => console.warn(err));
  }
  startSearch(e): void {
    e.preventDefault();
    console.log("start search")
    this.refreshNames();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" gutterBottom>
              HEMA Longsword Tournament Dashboard
            </Typography>
            <Button>Highlight</Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing="2">
          <Grid item xs={2}>

          </Grid>
          <Grid item xs={3} align="right">
            <TextField
              label="First fencer ID" variant="filled" type="number" placeholder="e.g. 10 for Dennis Ljungqvist" defaultValue="10"
              required autoFocus fullWidth
              onChange={(event: object) => this.setState({ fighter1Id: event.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={this.startSearch}>Search</Button>
          </Grid>
          <Grid item xs={3} align="left">
            <TextField
              label="Second fencer ID" variant="filled" type="number" placeholder="e.g. 1314 for Martin Fabian" defaultValue="1314"
              required fullWidth
              onChange={(event: object) => this.setState({ fighter2Id: event.target.value })} />
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>

        <Comparison fencer={this.state.fighter1} otherFencer={this.state.fighter2} />

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
