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

app.get('/fightername/:fighter', (req, res) => {
  const fighterId = req.params.fighter
  console.log("get fighter name", fighterId)
  const url = 'https://hemaratings.com/fighters/details/' + fighterId + '/';

  rp(url)
    .then(function (html) {
      const fighterName = $('article > h2', html).text();
      res.send(JSON.stringify(fighterName, null, 2))
    })
    .catch(function (err) {
      //handle error
      console.error(err)
    });
});

app.get('/fighter/:fighter/opponentname/:opponent', (req, res) => {
  const opponentName = req.params.opponentname
  const fighterId = req.params.fighter
  console.log("get fighter", fighterId, opponentName)
  const url = 'https://hemaratings.com/fighters/details/' + fighterId + '/';

  rp(url)
    .then(function (html) {
      //success!
      const fighterName = $('article > h2', html).text();
      const clubName = $('dd > a', html).text();
      const clubUrl = $('dd > a', html)[0].attribs.href;
      const country = $('dd > .flag-icon', html)[0].attribs.title;
      const clubUrlArray = clubUrl.substr(1, clubUrl.length - 2).split("/");
      const clubId = clubUrlArray[clubUrlArray.length - 1]

      let totalFights = 0;
      let wins = 0;
      let losses = 0;
      let draws = 0;
      {
        const recordsTable = $('h3:contains("Record")', html).parent().find('td:contains("Mixed Steel Longsword")');
        if (recordsTable && recordsTable.siblings().length > 0) {
          totalFights += parseInt(recordsTable.siblings()[0].children[0].data);
          wins += parseInt(recordsTable.siblings()[1].children[0].data);
          losses += parseInt(recordsTable.siblings()[2].children[0].data);
          draws += parseInt(recordsTable.siblings()[3].children[0].data);
        }
      }

      {
        const recordsTable = $('h3:contains("Record")', html).parent().find('td:contains("Men\'s Steel Longsword")');
        if (recordsTable && recordsTable.siblings().length > 0) {
          totalFights += parseInt(recordsTable.siblings()[0].children[0].data);
          wins += parseInt(recordsTable.siblings()[1].children[0].data);
          losses += parseInt(recordsTable.siblings()[2].children[0].data);
          draws += parseInt(recordsTable.siblings()[3].children[0].data);
        }
      }

      const ratingsTable = $('h3:contains("Current ratings")', html).parent().find('td:contains("Longsword")');
      const rank = parseInt(ratingsTable.siblings()[0].children[0].data);
      const rating = parseFloat(ratingsTable.siblings()[1].children[0].data);

      let lastTournaments = new Map()
      let currentTournament = "";
      let tournamentCounter = 0;
      const steelLongswordTds = $('h4:contains("Longsword (Mixed/Men, Steel)")', html)
        .parent().find('td:contains("Steel Longsword")', html)
        .siblings()
        .each(function (i, elm) {
          const text = $(elm).text().trim();
          if (text) {
            if (text.substr(text.length - 1, text.length - 1) === ")" && text !== currentTournament) {
              tournamentCounter++;
              if (tournamentCounter >= 11) {
                return false; // break .each loop
              }
              currentTournament = text;
              lastTournaments[currentTournament] = { name: currentTournament, wins: 0, losses: 0, draws: 0 }
            } else if (text === "WIN") {
              lastTournaments[currentTournament].wins += 1;
            } else if (text === "LOSS") {
              lastTournaments[currentTournament].losses += 1;
            } else if (text === "DRAW") {
              lastTournaments[currentTournament].draws += 1;
            }
          }
        });

      const fencer = {
        name: fighterName,
        userid: fighterId,
        nationality: country,
        clubName: clubName,
        clubId: clubId,
        rank: rank,
        rating: rating,
        wins: wins,
        losses: losses,
        draws: draws,
        tournaments: Object.values(lastTournaments)
      }
      // console.log("fencer", fencer)

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

