const fs=require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const noOfMatchesWonByEachTeam = require("./ipl/noOfMatchesWonByEachTeam");
const maxRunConcededByEachTeam= require("./ipl/maxRunConcededByEachTeam");
const matchesPlayedByEachTeamPerVenue = require('./ipl/matchesPlayedByEachTeamPerVenue');
const eco = require("./ipl/eco");
const topTenEconomicalBowlers = require("./ipl/topTenEconomicalBowlers");


const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";

const express = require('express');
const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => res.send("Hello"));

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});



function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {

      let result = matchesPlayedPerYear(matches);
      let result2= noOfMatchesWonByEachTeam(matches);
      let result3=maxRunConcededByEachTeam(matches,deliveries);
      let result4=topTenEconomicalBowlers(matches,deliveries);
      let result6 = matchesPlayedByEachTeamPerVenue(matches);
      let result5=eco(matches,deliveries);
      

      saveMatchesPlayedPerYear(result,result2,result3,result4,result6,result5);


      });
    });
}


function saveMatchesPlayedPerYear(result,result2,result3,result4,result6,result5) {
  var jsonData ={
    matchesPlayedPerYear: result,noOfMatchesWonByEachTeam: result2,maxRunConcededByEachTeam:result3,matchesPlayedByEachTeamPerVenue:result6,topTenEconomicalBowlers:result4,dynamicDataOfEconomicalBowlers:result5
  };
  console.log("working");
  jsonData = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonData, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();