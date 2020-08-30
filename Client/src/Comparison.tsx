import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'
import { fencer1Club, fencer2Club, fencerFightHistory } from './data';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link';

enum BetterSide {
    Left,
    Right,
    Equal
}

function Line(props: any) {
    const isLeftBetter: boolean = props.betterSide === BetterSide.Left;
    const isRightBetter: boolean = props.betterSide === BetterSide.Right;

    const doHighlight: boolean = !props.highlight || props.betterSide === BetterSide.Equal;
    const leftBgColor: string = doHighlight ? "inherit" : isLeftBetter ? "green" : "red";
    const rightBgColor: string = doHighlight ? "inherit" : isRightBetter ? "green" : "red";

    const textcolor: string = doHighlight ? "inherit" : "info.contrastText";

    return (
        <Grid container spacing="2">
            <Grid item xs={5} align="right">
                <Box bgcolor={leftBgColor} color={textcolor}>
                    <Typography variant="h5">
                        {props.left}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box bgcolor="info.main" color="info.contrastText">
                    <Typography variant="h5">
                        {props.label}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={5} align="left">
                <Box bgcolor={rightBgColor} color={textcolor}>
                    <Typography variant="h5">
                        {props.right}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
function HeaderLine(props: any) {
    const fencerUrl: string = "https://hemaratings.com/fighters/details/" + props.left.userid;
    const otherUrl: string = "https://hemaratings.com/fighters/details/" + props.right.userid;

    return (
        <Grid container spacing="2">
            <Grid item xs={5} align="right">
                <Typography variant="h3">
                    <Link href={fencerUrl} target="_blank" rel="noopener">{props.left.name}</Link>
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Box bgcolor="info.main" color="info.contrastText">
                    <Typography variant="h3">VS</Typography>
                </Box>
            </Grid>
            <Grid item xs={5} align="left">
                <Typography variant="h3">
                    <Link href={otherUrl} target="_blank" rel="noopener">{props.right.name}</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}
class Comparison extends React.Component<any> {
    constructor(props) {
        super(props);
        this.state = {
            showHighlight: true
        }
    }

    recordString(fencer: Fencer): string {
        return fencer.wins + "-" + fencer.losses + "-" + fencer.draws
    }
    winLossRatio(fencer: Fencer): string {
        return (fencer.wins / fencer.losses).toFixed(1)
    }

    isHigher(left: number, right: number): BetterSide {
        if (left > right) {
            return BetterSide.Left;
        } else if (left < right) {
            return BetterSide.Right;
        } else {
            return BetterSide.Equal;
        }
    }
    isLower(left: number, right: number): BetterSide {
        if (left < right) {
            return BetterSide.Left;
        } else if (left > right) {
            return BetterSide.Right;
        } else {
            return BetterSide.Equal;
        }
    }
    hasBetterWinRatio(left: number, right: number): BetterSide {
        return this.isHigher(left, right);
    }
    hasBetterRank(left: number, right: number) {
        return this.isLower(left, right);
    }
    hasBetterRating(left: number, right: number) {
        return this.isHigher(left, right);
    }
    fencerPastRecord(fencer: Fencer, other: Fecner, pastFights: Array<Fight>): string {
        let fencerWins: number = 0;
        let fencerLosses: number = 0;
        let draws: number = 0;
        pastFights.map((fight: Fight) => {
            if (fight.resultForFighter1 === FightResult.Win) {
                if (fight.fighter1 === fencer.name) {
                    fencerWins += 1;
                } else {
                    fencerLosses += 1;
                }
            } else if (fight.resultForFighter1 === FightResult.Loss) {
                if (fight.fighter1 === fencer.name) {
                    fencerLosses += 1;
                } else {
                    fencerWins += 1;
                }
            } else {
                draws += 1;
            }
            return 0;
        });
        return fencerWins + "-" + fencerLosses + "-" + draws;
    }
    render() {
        const fencer: Fencer = this.props.fencer;
        const other: Fencer = this.props.otherFencer;

        return (
            <div>
                <HeaderLine left={fencer} right={other} />
                <Line left={fencer.clubName} right={other.clubName} label="Club" />
                <Line left={fencer.nationality} right={other.nationality} label="Country" />
                <Line left={this.recordString(fencer)} right={this.recordString(other)} label="Record" />
                <Line
                    left={this.winLossRatio(fencer) + " : 1"} right={this.winLossRatio(other) + " : 1"} label="Win ratio"
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterWinRatio(this.winLossRatio(fencer), this.winLossRatio(other))}
                />
                <Line left={fencer.rank} right={other.rank} label="Rank"
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterRank(fencer.rank, other.rank)}
                />
                <Line left={fencer.rating} right={other.rating} label="Rating"
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterRating(fencer.rating, other.rating)}
                />
                <Line
                    left={this.fencerPastRecord(fencer, other, fencerFightHistory)} right={this.fencerPastRecord(other, fencer, fencerFightHistory)} label="Past fights"
                    highlight={this.state.showHighlight}
                    betterSide={BetterSide.Equal}
                />
            </div >
        );
    }
}
export default Comparison;