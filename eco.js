let utilsfile = require("./ipl/functions");
let reduce = utilsfile.Reduce;
let map = utilsfile.Map;
let filter = utilsfile.Filter;
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
const csv = require("csvtojson");

csv()
.fromFile(MATCHES_FILE_PATH)
.then(matches => {
  csv()
  .fromFile(DELIVERIES_FILE_PATH)
  .then(deliveries => {
    tenEconomicalBowler2015(matches, deliveries);

  });
});


function tenEconomicalBowler2015(matches,deliveries)
{
    var result={};
    
    for(let match of matches)
    {
        
    for(let delivery of deliveries)
    {
        if(match.id==delivery.match_id)
        {
           
           if(result[match.season])
           {
            if(result[match.season][delivery.bowler])
            {
                if(delivery.wide_runs==0&&delivery.noball_runs==0)
                {
                    result[match.season][delivery.bowler]["balls"]++;   
                }
                result[match.season][delivery.bowler]["runs"]+=parseInt(delivery.wide_runs)+parseInt(delivery.noball_runs)+parseInt(delivery.batsman_runs);
            }
            else
            {
                result[match.season][delivery.bowler]={};
                result[match.season][delivery.bowler]["runs"]=parseInt(delivery.wide_runs)+parseInt(delivery.noball_runs)+parseInt(delivery.batsman_runs);
                if(delivery.wide_runs==0&&delivery.noball_runs==0)
                {
                    result[match.season][delivery.bowler]["balls"]=1;   
                }
                else
                {
                    result[match.season][delivery.bowler]["balls"]=0; 
                }
            }
        }
        else
        {
            result[match.season]={};
        }
        }
    }

}


var economyRate={};
var arr=[];
var newResult={};
for(let item in result)
{
  
for(let items in result[item])
{
    
    economyRate[items]=parseFloat(result[item][items]["runs"]/(result[item][items]["balls"]/6)).toFixed(2);
    arr.push([item,items,economyRate[items]]);
   
}

arr.sort(function(a, b) {
    return a[2] - b[2];
  });

for(let data of arr)
{
    if(newResult[data[0]])
    {
     if(Object.keys(newResult[data[0]]).length<10)   
        newResult[data[0]][data[1]]=parseFloat(data[2]);
    }

    else
    {
        newResult[data[0]]={};
        newResult[data[0]][data[1]]=parseFloat(data[2]);
    }
}

console.log(newResult);
}
}