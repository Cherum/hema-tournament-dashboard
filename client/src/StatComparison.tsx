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

    const noHighlight: boolean = !props.highlight || props.betterSide === BetterSide.Equal;
    const leftBgColor: string = noHighlight ? "inherit" : isLeftBetter ? "green" : "red";
    const rightBgColor: string = noHighlight ? "inherit" : isRightBetter ? "green" : "red";

    const textcolor: string = noHighlight ? "inherit" : "info.contrastText";

    let leftLink
    if (props.leftLink) {
        leftLink = <Link href={props.leftLink} target="_blank" rel="noopener">
            <Typography variant="h6" component="div">
                {props.left}
            </Typography>
        </Link>;
    } else {
        leftLink = <Typography variant="h6" component="div">
            {props.left}
        </Typography>;
    }

    let rightLink
    if (props.rightLink) {
        rightLink = <Link href={props.rightLink} target="_blank" rel="noopener">
            <Typography variant="h6" component="div">
                {props.right}
            </Typography>
        </Link>;
    } else {
        rightLink = <Typography variant="h6" component="div">
            {props.right}
        </Typography>;
    }

    return (
        <Grid container spacing={2} style={{
            margin: 0,
            width: '100%',
        }}>
            <Grid item xs={4} md={5} container justify="flex-end">
                <Box bgcolor={leftBgColor} color={textcolor} padding={1}>
                    {leftLink}
                </Box>
            </Grid>
            <Grid item xs={4} md={2}>
                <Box bgcolor="info.main" color="info.contrastText" padding={1}>
                    <Typography variant="h6" component="div">
                        {props.label}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4} md={5} container justify="flex-start">
                <Box bgcolor={rightBgColor} color={textcolor} padding={1}>
                    {rightLink}
                </Box>
            </Grid>
        </Grid >
    )
}
function HeaderLine(props: any) {
    const fencerUrl: string = "https://hemaratings.com/fighters/details/" + props.left.userid;
    const otherUrl: string = "https://hemaratings.com/fighters/details/" + props.right.userid;

    return (
        <Grid container spacing={2} style={{
            margin: 0,
            width: '100%',
        }}>
            <Grid item xs={4} md={5} container justify="flex-end">
                <Link href={fencerUrl} target="_blank" rel="noopener">
                    <Typography variant="h4" component="h2">
                        {props.left.name}
                    </Typography>
                </Link>
            </Grid>
            <Grid item xs={4} md={2}>
                <Box bgcolor="info.main" color="info.contrastText">
                    <Typography variant="h4" component="div">VS</Typography>
                </Box>
            </Grid>
            <Grid item xs={4} md={5} container justify="flex-start">
                <Link href={otherUrl} target="_blank" rel="noopener">
                    <Typography variant="h4" component="h2">
                        {props.right.name}
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    )
}
class Comparison extends React.Component<any> {
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
    hasBetterWinRatio(fencer: Fencer, other: Fencer): BetterSide {
        const left: number = this.winLossRatio(fencer);
        const right: number = this.winLossRatio(other);
        return this.isHigher(left, right);
    }
    hasBetterRank(fencer: Fencer, other: Fencer) {
        const left: number = fencer.rank;
        const right: number = other.rank;
        return this.isLower(left, right);
    }
    hasBetterRating(fencer: Fencer, other: Fencer) {
        const left: number = fencer.rating;
        const right: number = other.rating;
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
                <HeaderLine
                    left={fencer}
                    right={other}
                />
                <Line label="Club"
                    left={fencer.clubName}
                    right={other.clubName}
                    leftLink={fencerClubUrl}
                    rightLink={otherClubUrl}
                />

                <Line label="Country"
                    left={fencer.nationality}
                    right={other.nationality}
                />

                <Line label="Record"
                    left={this.recordString(fencer)}
                    right={this.recordString(other)}
                />

                <Line label="Win ratio"
                    left={this.winLossRatio(fencer) + " : 1"}
                    right={this.winLossRatio(other) + " : 1"}
                    highlight
                    betterSide={this.hasBetterWinRatio(fencer, other)}
                />

                <Line label="Rank"
                    left={fencer.rank}
                    right={other.rank}
                    highlight
                    betterSide={this.hasBetterRank(fencer, other)}
                />

                <Line label="Rating"
                    left={fencer.rating}
                    right={other.rating}
                    highlight
                    betterSide={this.hasBetterRating(fencer, other)}
                />

                <Line label="Past fights"
                    left={this.fencerPastRecord(fencer)}
                    right={this.fencerPastRecord(other)}
                    highlight
                    betterSide={this.hasBetterOpponentStatistic(fencer)}
                />
            </div >
        );
    }
}
export default Comparison;