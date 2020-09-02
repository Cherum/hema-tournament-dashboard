# HEMA Tournament Dashboard
This Dashboard displays fight statistics for two HEMA longsword fencers based on [HEMA Ratings](https://hemaratings.com/).

I made it since I felt that the existing [Titan Clasher](https://hemaratings.com/organizertools/titanclasher/) lacked some essential features like the information if both fencers have already faced each other and how that went. Also because it was fun.

To use it set the fencer IDs on the left and right, e.g. if the URL to the HEMA Ratings profile is [https://hemaratings.com/fighters/details/10/](https://hemaratings.com/fighters/details/10/) the id to use is 10.

Currently this only works for comparing open longsword.

## Run it
After executing npm install in the main and client folder run the project locally via `yarn dev` in the main server. This starts both the Node.js server and the React client.

## See it live
The current master branch is deployd via Heroku and can be found here [https://hema-tournament-dashboard.herokuapp.com/](https://hema-tournament-dashboard.herokuapp.com/)