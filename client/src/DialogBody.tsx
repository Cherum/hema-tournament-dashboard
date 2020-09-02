import React from 'react';
import { Button, DialogTitle, Link, DialogContent, DialogActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class DialogBody extends React.Component<any> {
    render() {
        return (
            <div>
                <DialogTitle id="simple-dialog-title">About HEMA Tournament Dashboard</DialogTitle>
                <DialogContent>
                    <Typography paragraph>
                        This Dashboard displays fight statistics for two HEMA longsword fencers based on HEMA Ratings.
                        </Typography>
                    <Typography paragraph>
                        I made it since I felt that the existing <Link href="https://hemaratings.com/organizertools/titanclasher/">Titan Clasher</Link> lacked some essential features
                            like the information if both fencers have faced each other and how that went. Also because it was fun.
                        </Typography>
                    <Typography paragraph>
                        To use it set the fencer IDs on the left and right,
                            e.g. if the URL to the HEMA Ratings profile is <Link href="https://hemaratings.com/fighters/details/10/">https://hemaratings.com/fighters/details/10/</Link> the id to use is 10.
                        </Typography>
                    <Typography paragraph>
                        Currently this only works for comparing open longsword.
                        </Typography>
                    <Typography paragraph>
                        This dashboard was made by Alexander Fürgut. The code is open source and can be accessed via <Link href="https://github.com/Cherum/hema-tournament-dashboard">https://github.com/Cherum/hema-tournament-dashboard</Link>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={(e: any) => this.setState({ aboutOpen: false })} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </div>
        )
    }
}

export default DialogBody;