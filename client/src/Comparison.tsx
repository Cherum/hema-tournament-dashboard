import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Fencer } from './types'
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

    let leftLink
    if (props.leftLink) {
        leftLink = <Link href={props.leftLink} target="_blank" rel="noopener">{props.left}</Link>;
    } else {
        leftLink = props.left;
    }

    let rightLink
    if (props.rightLink) {
        rightLink = <Link href={props.rightLink} target="_blank" rel="noopener">{props.right}</Link>;
    } else {
        rightLink = props.right;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={5} container justify="flex-end">
                <Box bgcolor={leftBgColor} color={textcolor}>
                    <Typography variant="h5">
                        {leftLink}
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
            <Grid item xs={5} container justify="flex-start">
                <Box bgcolor={rightBgColor} color={textcolor}>
                    <Typography variant="h5">
                        {rightLink}
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
        <Grid container spacing={2}>
            <Grid item xs={5} container justify="flex-end">
                <Typography variant="h3">
                    <Link href={fencerUrl} target="_blank" rel="noopener">{props.left.name}</Link>
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Box bgcolor="info.main" color="info.contrastText">
                    <Typography variant="h3">VS</Typography>
                </Box>
            </Grid>
            <Grid item xs={5} container justify="flex-start">
                <Typography variant="h3">
                    <Link href={otherUrl} target="_blank" rel="noopener">{props.right.name}</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}
class Comparison extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    state = {
        showHighlight: true
    }

    recordString(fencer: Fencer): string {
        return fencer.wins + "-" + fencer.losses + "-" + fencer.draws
    }
    winLossRatio(fencer: Fencer): number {
        return parseFloat((fencer.wins / fencer.losses).toFixed(1))
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
    hasBetterOpponentStatistic(left: Fencer) {
        if (left.opponentStatistic) {
            return this.isHigher(left.opponentStatistic.wins, left.opponentStatistic.losses)
        }
        return BetterSide.Equal
    }
    fencerPastRecord(fencer: Fencer): string {
        if (fencer.opponentStatistic) {
            return fencer.opponentStatistic.wins + "-" + fencer.opponentStatistic.losses + "-" + fencer.opponentStatistic.draws;
        }
        return ""
    }
    render() {
        const fencer: Fencer = this.props.fencer;
        const other: Fencer = this.props.otherFencer;
        const fencerClubUrl: string = "https://hemaratings.com/clubs/details/" + fencer.clubId;
        const otherClubUrl: string = "https://hemaratings.com/clubs/details/" + other.clubId;

        return (
            <div>
                <HeaderLine left={fencer} right={other} />
                <Line label="Club"
                    left={fencer.clubName} right={other.clubName}
                    leftLink={fencerClubUrl} rightLink={otherClubUrl} />
                <Line label="Country"
                    left={fencer.nationality} right={other.nationality} />
                <Line label="Record" left={this.recordString(fencer)} right={this.recordString(other)} />
                <Line label="Win ratio"
                    left={this.winLossRatio(fencer) + " : 1"} right={this.winLossRatio(other) + " : 1"}
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterWinRatio(this.winLossRatio(fencer), this.winLossRatio(other))}
                />
                <Line label="Rank" left={fencer.rank} right={other.rank}
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterRank(fencer.rank, other.rank)}
                />
                <Line label="Rating" left={fencer.rating} right={other.rating}
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterRating(fencer.rating, other.rating)}
                />
                <Line label="Past fights"
                    left={this.fencerPastRecord(fencer)} right={this.fencerPastRecord(other)}
                    highlight={this.state.showHighlight}
                    betterSide={this.hasBetterOpponentStatistic(fencer)}
                />
            </div >
        );
    }
}
export default Comparison;