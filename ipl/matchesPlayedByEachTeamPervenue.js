let utilsfile = require("./functions");
let reduce = utilsfile.Reduce;
function matchesPlayedByEachTeamPerVenue(matches) {
  let result = {};

  result = reduce(
    matches,
    (matchDetail, match) => {
      let vanue = match["venue"];
      var team1 = match["team1"];
      var team2 = match['team2'];
      if (team1 === "" && team2=== "" ) {
        return matchDetail;
      }

      if (vanue in matchDetail) {
        if (team1 in matchDetail[vanue]) {
          matchDetail[vanue][team1]++;
          matchDetail[vanue][team2]++;
        } else {
          matchDetail[vanue][team1] = 1;
          matchDetail[vanue][team2] = 1;
        }
      } else {
        matchDetail[vanue] = {};
        matchDetail[vanue][team1] = 1;
        matchDetail[vanue][team2] = 1;
      }
      return matchDetail;
    },
    result
  );

  return result;
}
module.exports = matchesPlayedByEachTeamPerVenue;
