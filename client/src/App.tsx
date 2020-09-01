import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FencerPart from './FencerPart'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Comparison from './Comparison'
import { Button, Toolbar, TextField, CircularProgress } from '@material-ui/core';
import { Fencer } from './types';

const styles = {
  root: {
    margin: "5%",
    maxWidth: "90%"
  },
  title: {
    flexGrow: 1,
  },
};

class App extends React.Component<any> {
  state = {
    fighter1Id: 10,
    fighter2Id: 5,
    fighter1: {},
    fighter2: {},
    fighter1Name: "Dennis Ljungqvist",
    fighter2Name: "Kristian Ruokonen",
    fighter1Error: "",
    fighter2Error: "",
    fighter1Loading: false,
    fighter2Loading: false
  }

  componentDidMount() {
    this.refreshNames()
  }

  refreshFighterName = async (fighterId: number, isFighter1: boolean) => {
    if (isFighter1) {
      this.setState({
        fighter1Loading: true
      })
    } else {
      this.setState({
        fighter2Loading: true
      })
    }

    const response = await fetch('/fightername/' + fighterId);
    const body = await response.json();
    if (response.status !== 200) {
      const errorMessage: string = "Couldn't find fencer with id ";
      if (isFighter1) {
        this.setState({
          fighter1Error: errorMessage + fighterId,
          fighter1: {},
          fighter1Name: "",
          fighter1Loading: false
        })
      } else {
        this.setState({
          fighter2Error: errorMessage + fighterId,
          fighter2: {},
          fighter1Name: "",
          fighter2Loading: false
        })
      }
      return;
    }

    if (isFighter1) {
      this.setState({
        fighter1Name: body,
        fighter1: {},
        fighter1Error: ""
      })
      this.loadFighter1(this.state.fighter1Id, this.state.fighter2Name)
    } else {
      this.setState({
        fighter2Name: body,
        fighter2: {},
        fighter2Error: ""
      })
      this.loadFighter2(this.state.fighter2Id, this.state.fighter1Name)
    }
  }

  fetchUsers = async (fighterId: number, opponentName: string) => {
    const response = await fetch('/fighter/' + fighterId + "/opponentname/" + opponentName);
    const body = await response.json();
    if (response.status !== 200) {
      console.log("throw error")
      throw Error(body.message);
    }

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

  loadFighter1(fighterId: number, opponentName: string): void {
    this.fetchUsers(fighterId, opponentName)
      .then(res => {
        this.setState({
          fighter1: this.convertResultToFencer(res),
          fighter1Loading: false
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          fighter1: {},
          fighter1Loading: false
        })
      });
  }
  loadFighter2(fighterId: number, opponentName: string): void {
    this.fetchUsers(fighterId, opponentName)
      .then(res => {
        this.setState({
          fighter2: this.convertResultToFencer(res),
          fighter2Loading: false
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          fighter2: {},
          fighter2Loading: false
        })
      });
  }
  refreshNames() {
    this.loadFighter1(this.state.fighter1Id, this.state.fighter2Name)
    this.loadFighter2(this.state.fighter2Id, this.state.fighter1Name)
  }

  render() {
    const { classes } = this.props;

    let fighter1Busy: any;
    if (this.state.fighter1Loading) {
      fighter1Busy = <CircularProgress />
    }

    let fighter2Busy: any;
    if (this.state.fighter2Loading) {
      fighter2Busy = <CircularProgress />
    }

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title} align="left">
              HEMA Tournament Dashboard
            </Typography>
            <Button color="inherit">About</Button>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={false} md={2}>
            {fighter1Busy}
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            ID belongs to {this.state.fighter1Name}
            <TextField
              label="Fencer HEMA Ratings ID" variant="filled" type="number" placeholder="e.g. 10 for Dennis Ljungqvist" defaultValue="10"
              required autoFocus fullWidth
              onChange={(event: any) => {
                this.setState({
                  fighter1Id: event.target.value
                });
                this.refreshFighterName(event.target.value, true)
              }}
              error={this.state.fighter1Error !== ""}
              helperText={this.state.fighter1Error}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            ID belongs to {this.state.fighter2Name}
            <TextField
              label="Fencer HEMA Ratings ID" variant="filled" type="number" placeholder="e.g. 1314 for Martin Fabian" defaultValue="1314"
              required fullWidth
              onChange={(event: any) => {
                this.setState({
                  fighter2Id: event.target.value
                });
                this.refreshFighterName(event.target.value, false)
              }}
              error={this.state.fighter2Error !== ""}
              helperText={this.state.fighter2Error}
            />
          </Grid>
          <Grid item xs={false} md={2}>
            {fighter2Busy}
          </Grid>
        </Grid>

        <Comparison fencer={this.state.fighter1} otherFencer={this.state.fighter2} />

        <Grid container spacing={1} style={{
          margin: 0,
          width: '100%',
        }}>
          <Grid item xs={12} sm={6}>
            <FencerPart fencer={this.state.fighter1} otherFencer={this.state.fighter2} isLeft />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FencerPart fencer={this.state.fighter2} otherFencer={this.state.fighter1} isRight />
          </Grid>
        </Grid>
      </div >
    );
  }
}

export default withStyles(styles)(App);
