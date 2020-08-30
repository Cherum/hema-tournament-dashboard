import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

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
        const club: Club = this.props.club;
        const events: Any = this.props.fencer.pastEvents ? this.props.fencer.pastEvents : [];
        const fightHistory: Array<Fight> = this.props.fightHistory;

        return (
            <div>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Previous fights
                        </Typography>
                        <List>
                            {/* {fightHistory.map((fight: Fight) => {
                                const fightResult = fight.fighter1 === fencer.name ? fight.resultForFighter1 : fight.resultForFighter2;
                                return (
                                    <ListItem>
                                        <Typography color={fightResult === FightResult.Win ? "primary" : "error"}>
                                            {fight.eventName} {fightResult}
                                        </Typography>
                                    </ListItem>
                                )
                            })} */}
                        </List>
                    </CardContent>
                </Card>
                <Card raised>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Last 10 tournaments
                        </Typography>
                        <List>
                            {events.map((event: Any) => (
                                <ListItem>{event.name} | Record: {event.wins}-{event.losses}-{event.draws}</ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(FencerPart);