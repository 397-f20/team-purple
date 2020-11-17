const winner = (pollData) => {
  //creates an object that maps options to their scores along with a total value
  let sum = {};
  let lead = "";
  let max = 0;
  let data = Object.assign({}, pollData);
  let votes = Object.values(data.scores);
  let voteCounts = {}
  //for each choices of each user's vote (based on db scheme)
  for (let vote of votes) {
    for (const [choice, scores] of Object.entries(vote)) {
      //first time accessing option? set it to that vote and create a total value
      console.log("scores: ", scores)
      if (!sum[choice]) {
        sum[choice] = Object.assign({}, scores);
        const tally = Object.values(scores);
        console.log(tally)
        const cleanedTally = tally.filter(val =>
          val != 0)
        console.log("cleaned tally " + cleanedTally)
        voteCounts[choice] = cleanedTally.length
        sum[choice].Total = cleanedTally.reduce((a, b) => {
          return a + b;
        }, 0);

        //check if we have a new winner
        if (sum[choice].Total > max) {
          max = sum[choice].Total;
          lead = choice;
        }
      }
      //else aggregate
      else {
        for (let criteria of data.criteria) {
          if (!voteCounts[choice][criteria] && scores[criteria] != 0){
            voteCounts[choice][criteria] = 1
          }
          else if (scores[crtieria] != 0){
            voteCounts[choice][criteria] += 1
          }
          sum[choice][criteria] += scores[criteria];
          sum[choice].Total += scores[criteria];
        }

        //check if we have a new winner
        if (sum[choice].Total > max) {
          max = sum[choice].Total;
          lead = choice;
        }
      }
    }
  }
  console.log(sum)
  //calls getResult with each option, then sort the list
  let res = data.options.map((option) => {
    console.log("vote counts: ", voteCounts[option])
    return getResults(option, sum, data.criteria, voteCounts[option])
  });
  res.sort((a, b) => b.overall - a.overall);

  // account for if multiple winners / tie
  var winVoteCount = res[0].overall
  for (var i = 0; i < res.length; i++) {
    // mark it as a winner if it has the same score
    if (res[i].overall == winVoteCount) {
      res[i].win = true
    }
    // don't need to check the rest of the list if it doesnt match
    else {
      break
    }
  }
  return res;
};

// scale to 5 star rating and convert to UI format
const getResults = (option, sum, criteria, voteCount) => {
  // aggregate
  let scores = [];
  for (let crit of criteria) {
    scores.push(sum[option][crit]);
  }



  //might be a more efficient way to do this but this adds the total to the results graph
  scores.push(sum[option].Total);

  // const scaledOverallRating = scaleBetween(
  //   scores[scores.length - 1],
  //   1,
  //   5,
  //   1 * voteCount * criteria.length,
  //   5 * voteCount * criteria.length
  // );
  // console.log(scores[scores.length - 1], scaledOverallRating);

  const scaledCriteriaRating = scores
    .slice(0, -1)
    .map((item, index) => scaleBetween(item, 1, 5, 1 * voteCount[criteria[index]], 5 * voteCount[criteria[index]]));


  const scaledOverallRating = scaledCriteriaRating.reduce( (a, b) => a + b, 0) / scaledCriteriaRating.length



  return {
    title: option,
    overall: scaledOverallRating,
    labels: [...criteria],
    criteriaRatings: scaledCriteriaRating,
    win: false
  };
};





// scale to 5 star rating
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

export default winner;