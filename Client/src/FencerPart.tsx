import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { fileURLToPath } from 'url';

const styles = {
    root: {
        minWidth: 275,
        maxWidth: 500
    }
};

class FencerPart extends React.Component<any> {

    isRankHigher(fencer: Fencer, other: Fencer): boolean {
        return fencer.rank > other.rank;
    }
    hasBetterWinLossRatio(fencer: Fencer, other: Fencer): boolean {
        const winRatio: number = (fencer.wins / fencer.losses).toFixed(1)
        const winRatioOther: number = (other.wins / other.losses).toFixed(1)
        return winRatio > winRatioOther;
    }

    render() {
        const { classes } = this.props;
        const fencer: Fencer = this.props.fencer;
        const otherFencer: Fencer = this.props.otherFencer;
        const club: Club = this.props.club;
        const events: Array<HemaEvent> = this.props.events;
        const fightHistory: Array<Fight> = this.props.fightHistory;
        const clubUrl: string = "https://hemaratings.com/clubs/details/" + club.clubid;

        return (
            <div>
                <Card className={classes.root} raised>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            <a href={clubUrl}>{club.name}</a>
                        </Typography>
                        <List>
                            <ListItem>
                                City: {club.city}
                            </ListItem>
                            <ListItem>
                                Fighters: {club.fighterCount}
                            </ListItem>
                            <ListItem>
                                Website: <a href={club.website}>{club.website}</a>
                            </ListItem>
                            <ListItem>
                                Facebook: <a href={club.facebook}>{club.facebook}</a>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Previous fights
                        </Typography>
                        <List>
                            {fightHistory.map((fight: Fight) => {
                                const fightResult = fight.fighter1 == fencer.name ? fight.resultForFighter1 : fight.resultForFighter2;
                                return (
                                    <ListItem>
                                        <Typography color={fightResult == FightResult.Win ? "primary" : "error"}>
                                            {fight.eventName} {fightResult}
                                        </Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Last 10 tournaments
                        </Typography>
                        <List>
                            {events.map((event: HemaEvent) => (
                                <ListItem>{event.name} {event.fightCount} {event.winToLossRatio.toFixed(1)}</ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(FencerPart);