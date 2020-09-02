import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Fencer } from './types'
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

class FencerPart extends React.Component<any> {

    isRankHigher(fencer: Fencer, other: Fencer): boolean {
        return fencer.rank > other.rank;
    }
    hasBetterWinLossRatio(fencer: Fencer, other: Fencer): boolean {
        const winRatio: number = parseFloat((fencer.wins / fencer.losses).toFixed(1))
        const winRatioOther: number = parseFloat((other.wins / other.losses).toFixed(1))
        return winRatio > winRatioOther;
    }

    render() {
        const events: any = this.props.fencer.pastEvents ? this.props.fencer.pastEvents : [];
        const winBgColor: string = "green";
        const lossBgColor: string = "red";

        return (
            <div>
                <Typography variant="h5" component="h3" gutterBottom>
                    {this.props.fencer.name} longsword history
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event name</TableCell>
                                <TableCell align="right">Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event: any) => (
                                <TableRow key={event.name} hover>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell align="right">
                                        <Box bgcolor={event.wins > event.losses ? winBgColor : lossBgColor} color="info.contrastText" padding={1}>
                                            <Typography noWrap>
                                                {event.wins}-{event.losses}-{event.draws}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
export default FencerPart;