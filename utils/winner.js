const winner = (pollData) => {
  //creates an object that maps each option to an object that maps each criteria to a total score
  let sum = {};
  let critVoteCount = {}
  let data = {...pollData};
  let votes = Object.values(data.scores);

  //for each user's vote (based on db scheme)
  for (let vote of votes) {
    for (const [option, scores] of Object.entries(vote)) {
      //first time accessing option? set the sum of that optiion to this individual vote and create a total value
      if (!sum[option]) {
        sum[option] = Object.assign({}, scores);
        critVoteCount[option] = Object.assign({}, scores);
        const tally = Object.values(scores);
        sum[option].Total = tally.reduce((a, b) => {
          return a + b;
        }, 0);

        for (const [criteria, score] of Object.entries(scores)) {
          if (score == 0){
            critVoteCount[option][criteria] = 0
          }
          else {
            critVoteCount[option][criteria] = 1
          }
        }
       
      }
      //else its not your first time accessing so just add on
      else {
        for (let criteria of data.criteria) {
          sum[option][criteria] += scores[criteria];
          sum[option].Total += scores[criteria];
          if (scores[criteria] != 0) critVoteCount[option][criteria] += 1
        }
      }
    }
  }

  console.log(critVoteCount)

  //calls getResult with each option, then sort the list
  let res = data.options.map((option) =>
    getResults(option, sum, data.criteria, critVoteCount)
  );
  res.sort((a, b) => b.overall - a.overall);

  // account for if multiple winners / tie
  var winVoteCount = res[0].overall
  for (var i=0; i<res.length; i++){
    // mark it as a winner if it has the same score
    if (res[i].overall == winVoteCount){
      res[i].win = true
    }
    // don't need to check the rest of the list if it doesnt match
    else{
      break
    }
  }
  return res;
};

// scale to 5 star rating and return in a format to be used by UI
const getResults = (option, sum, criteria, voteCounts) => {
  // puts scores total in the order of the criteria array
  let scores = [];
  for (let crit of criteria) {
    scores.push(sum[option][crit]);
  }

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
    .map((item, index) => scaleBetween(item, 1, 5, 1 * voteCounts[option][criteria[index]], 5 * voteCounts[option][criteria[index]]));

    const scaledOverallRating = scaledCriteriaRating.reduce((a, b) => a + b, 0) / scaledCriteriaRating.length


  return {
    title: option,
    overall: scaledOverallRating,
    labels: [...criteria],
    criteriaRatings: scaledCriteriaRating,
    win: false
  };
};


// scale to 5 star rating
const scaleBetween = (unscaledNum, minAllowed, maxAllowed, min, max) => {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

export default winner;
