let utilsfile = require("./functions");
let reduce = utilsfile.Reduce;
let map = utilsfile.Map;
let filter = utilsfile.Filter;
function maxRunConcededByEachTeam(matches, deliveries) {
  let extraRunsObject = {};
  let matches2016 = filter(matches, match => match["season"] == 2016);
  let matchId2016 = map(matches2016, match => match["id"]);

  extraRunsObject = reduce(
    deliveries,
    (matchdetail, delivery) => {
      if (matchId2016.includes(delivery["match_id"])) {
        if (delivery["bowling_team"] in matchdetail) {
          matchdetail[delivery["bowling_team"]] =
            parseInt(matchdetail[delivery["bowling_team"]]) +
            parseInt(delivery["extra_runs"]);
        } else {
          matchdetail[delivery["bowling_team"]] = delivery["extra_runs"];
        }
      }
      return matchdetail;
    },
    extraRunsObject
  );

  return extraRunsObject;
}
module.exports = maxRunConcededByEachTeam;
