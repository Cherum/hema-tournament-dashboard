const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rp = require('request-promise');
const $ = require('cheerio');
const { count } = require('console');

app.get('/fighter/:fighter', (req, res) => {
  const fighterId = req.params.fighter
  console.log("get fighter", fighterId)
  const url = 'https://hemaratings.com/fighters/details/' + fighterId + '/';

  rp(url)
    .then(function (html) {
      //success!    
      console.log("~~~~~~~~~~~~~~~~~~~~~~")
      const fighterName = $('article > h2', html).text();
      const clubName = $('dd > a', html).text();
      const clubUrl = $('dd > a', html)[0].attribs.href;
      const country = $('dd > .flag-icon', html)[0].attribs.title;
      console.log("fighter/club info", fighterName, clubName, clubUrl, country)

      let totalFights = 0;
      let wins = 0;
      let losses = 0;
      let draws = 0;
      {
        const recordsTable = $('h3:contains("Record")', html).parent().find('td:contains("Mixed Steel Longsword")');
        totalFights += parseInt(recordsTable.siblings()[0].children[0].data);
        wins += parseInt(recordsTable.siblings()[1].children[0].data);
        losses += parseInt(recordsTable.siblings()[2].children[0].data);
        draws += parseInt(recordsTable.siblings()[3].children[0].data);
      }

      {
        const recordsTable = $('h3:contains("Record")', html).parent().find('td:contains("Men\'s Steel Longsword")');
        totalFights += parseInt(recordsTable.siblings()[0].children[0].data);
        wins += parseInt(recordsTable.siblings()[1].children[0].data);
        losses += parseInt(recordsTable.siblings()[2].children[0].data);
        draws += parseInt(recordsTable.siblings()[3].children[0].data);
      }
      console.log("fights", totalFights, wins, losses, draws)

      const ratingsTable = $('h3:contains("Current ratings")', html).parent().find('td:contains("Longsword")');
      const rank = parseInt(ratingsTable.siblings()[0].children[0].data);
      const rating = parseFloat(ratingsTable.siblings()[1].children[0].data);
      console.log("ranking/rating", rank, rating)

      const fencer = {
        name: fighterName,
        nationality: country,
        clubName: clubName,
        rank: rank,
        rating: rating,
        wins: wins,
        losses: losses,
        draws: draws,
      }
      console.log("fencer", fencer)

      res.send(JSON.stringify(fencer, null, 2))
    })
    .catch(function (err) {
      //handle error
      console.error(err)
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

