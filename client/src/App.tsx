import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FencerPart from './FencerPart'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Comparison from './Comparison'
import { Button, Toolbar, TextField } from '@material-ui/core';
import { Fencer } from './types';

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
  fighter2?: Fencer,
  fighter1Name?: "",
  fighter2Name?: ""
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.startSearch = this.startSearch.bind(this);
  }
  state = {
    fighter1Id: 10,
    fighter2Id: 5,
    fighter1: {},
    fighter2: {},
    fighter1Name: "Dennis Ljungqvist",
    fighter2Name: "Kristian Ruokonen"
  }

  componentDidMount() {
    this.refreshNames()
  }

  refreshFighterName = async (fighterId: number, isFighter1: boolean) => {
    const response = await fetch('/fightername/' + fighterId);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    if (isFighter1) {
      this.setState({ fighter1Name: body })
    } else {
      this.setState({ fighter2Name: body })
    }
  }

  fetchUsers = async (fighterId: number, opponentName: string) => {
    console.log("fetchUsers", fighterId, opponentName)
    const response = await fetch('/fighter/' + fighterId + "/opponentname/" + opponentName);
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
      draws: res.draws,
      pastEvents: res.tournaments,
      userid: res.userid,
      opponentStatistic: res.opponentStatistic
    }
    return fighter;
  }
  refreshNames() {
    console.log("refreshNames", this.state.fighter1Id, this.state.fighter2Id)
    this.fetchUsers(this.state.fighter1Id, this.state.fighter2Name)
      .then(res => {
        this.setState({
          fighter1: this.convertResultToFencer(res)
        })
        console.log("finished setting fighter 1")
      })
      .catch(err => console.warn(err));

    this.fetchUsers(this.state.fighter2Id, this.state.fighter1Name)
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
          </Toolbar>
        </AppBar>
        <Grid container spacing="2">
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} align="right">
            ID belongs to {this.state.fighter1Name}
            <TextField
              label="First fencer ID" variant="filled" type="number" placeholder="e.g. 10 for Dennis Ljungqvist" defaultValue="10"
              required autoFocus fullWidth
              onChange={(event: object) => {
                this.setState({
                  fighter1Id: event.target.value
                })
                this.refreshFighterName(event.target.value, true)
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={this.startSearch}>Search</Button>
          </Grid>
          <Grid item xs={3} align="left">
            ID belongs to {this.state.fighter2Name}
            <TextField
              label="Second fencer ID" variant="filled" type="number" placeholder="e.g. 1314 for Martin Fabian" defaultValue="1314"
              required fullWidth
              onChange={(event: object) => {
                this.setState({ fighter2Id: event.target.value })
                this.refreshFighterName(event.target.value, false)
              }} />
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>

        <Comparison fencer={this.state.fighter1} otherFencer={this.state.fighter2} />

        <Grid container className={classes.root}>
          <Grid item xs={6}>
            <FencerPart fencer={this.state.fighter1} otherFencer={this.state.fighter2} isLeft />
          </Grid>
          <Grid item xs={6}>
            <FencerPart fencer={this.state.fighter2} otherFencer={this.state.fighter1} isRight />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
