function topTenMostUsedVenue(matches)
{
    let result={};
    for(let match of matches)
    {
        if(result[match.venue])
        {
            result[match.venue]+=1;
        }
        else
        {
            result[match.venue]={};
            result[match.venue]=1;
            
        }
    }
    let arr=[];
    for(let player in result)
    {
        arr.push([player,result[player]]);
    }
    
    let finalResult={};
    arr.sort(function(a,b){
        return b[1]-a[1];
    } )
    
    for (let index = 0; index < 10; index++) {
        finalResult[arr[index][0]]=arr[index][1];
        }
        return finalResult;
}
module.exports=topTenMostUsedVenue;