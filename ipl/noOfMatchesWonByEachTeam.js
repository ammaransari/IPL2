let utilsfile = require("./functions");
let reduce = utilsfile.Reduce;
function noOfMatchesWonByEachTeam(matches) {
  let result = {};

  result = reduce(
    matches,
    (matchDetail, match) => {
      let season = match["season"];
      var winner = match["winner"];
      if (winner === "") {
        return matchDetail;
      }

      if (season in matchDetail) {
        if (winner in matchDetail[season]) {
          matchDetail[season][winner]++;
        } else {
          matchDetail[season][winner] = 1;
        }
      } else {
        matchDetail[season] = {};
        matchDetail[season][winner] = 1;
      }
      return matchDetail;
    },
    result
  );

  return result;
}
module.exports = noOfMatchesWonByEachTeam;
