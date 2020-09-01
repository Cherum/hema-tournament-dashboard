import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FencerPart from './FencerPart'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Comparison from './Comparison'
import { Button, Toolbar, TextField, Switch, FormControlLabel } from '@material-ui/core';
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
    highlightAdvantage: true,
    fighter1Error: "",
    fighter2Error: ""
  }

  componentDidMount() {
    this.refreshNames()
  }

  refreshFighterName = async (fighterId: number, isFighter1: boolean) => {
    const response = await fetch('/fightername/' + fighterId);
    const body = await response.json();
    if (response.status !== 200) {
      if (isFighter1) {
        this.setState({
          fighter1Error: "Couldn't find fencer with id " + fighterId
        })
      } else {
        this.setState({
          fighter2Error: "Couldn't find fencer with id " + fighterId
        })
      }
      return;
    }

    if (isFighter1) {
      this.setState({
        fighter1Name: body,
        fighter1Error: ""
      })
    } else {
      this.setState({
        fighter2Name: body,
        fighter2Error: ""
      })
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
  refreshNames() {
    console.log("load user")
    this.fetchUsers(this.state.fighter1Id, this.state.fighter2Name)
      .then(res => {
        this.setState({
          fighter1: this.convertResultToFencer(res)
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          fighter1: {}
        })
      });

    this.fetchUsers(this.state.fighter2Id, this.state.fighter1Name)
      .then(res => {
        this.setState({
          fighter2: this.convertResultToFencer(res)
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          fighter2: {}
        })
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title} align="left">
              HEMA Longsword Tournament Dashboard
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.highlightAdvantage}
                  onChange={(e: any) => this.setState({ highlightAdvantage: e.target ? e.target.checked : false })}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Highlight advantage"
            />
            <Button>About</Button>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid item xs={false} md={2}>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            ID belongs to {this.state.fighter1Name}
            <TextField
              label="First fencer ID" variant="filled" type="number" placeholder="e.g. 10 for Dennis Ljungqvist" defaultValue="10"
              required autoFocus fullWidth
              onChange={(event: any) => {
                this.setState({
                  fighter1Id: event.target.value
                });
                this.refreshFighterName(event.target.value, true)
                this.refreshNames();
              }}
              error={this.state.fighter1Error !== ""}
              helperText={this.state.fighter1Error}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            ID belongs to {this.state.fighter2Name} {this.state.fighter2Error}
            <TextField
              label="Second fencer ID" variant="filled" type="number" placeholder="e.g. 1314 for Martin Fabian" defaultValue="1314"
              required fullWidth
              onChange={(event: any) => {
                this.setState({
                  fighter2Id: event.target.value
                });
                this.refreshFighterName(event.target.value, false)
                this.refreshNames();
              }}
              error={this.state.fighter2Error !== ""}
              helperText={this.state.fighter2Error}
            />
          </Grid>
          <Grid item xs={false} md={2}>
          </Grid>
        </Grid>

        <Comparison fencer={this.state.fighter1} otherFencer={this.state.fighter2} showHighlight={this.state.highlightAdvantage} />

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
