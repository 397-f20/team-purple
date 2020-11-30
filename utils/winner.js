const winner = (pollData) => {
  //creates an object that each score for each criteria for each option
  let sum = {};
  let critVoteCount = {}
  let data = {
    ...pollData
  };
  let votes = Object.values(data.scores);

  //for each user's vote (based on db scheme)
  for (let vote of votes) {
    for (const [option, scores] of Object.entries(vote)) {
      //first time seeing option? set the sum of that option to this individual vote. keep a tally of nonzero votes. 
      if (!sum[option]) {
        sum[option] = {
          ...scores
        };
        critVoteCount[option] = {
          ...scores
        };

        for (const [criteria, score] of Object.entries(scores)) {
          critVoteCount[option][criteria] = (score == 0) ? 0 : 1
        }

      }
      //else its not your first time accessing so just add on (for each criteria). keep track of nonzero votes
      else {
        for (let criteria of data.criteria) {
          sum[option][criteria] += scores[criteria];
          sum[option].Total += scores[criteria];
          if (scores[criteria] != 0) critVoteCount[option][criteria] += 1
        }
      }
    }
  }

  //for each option call getResult, then sort the list by highest overall
  let res = data.options.map((option) =>
    getResults(option, sum, data.criteria, critVoteCount)
  );
  res.sort((a, b) => b.overall - a.overall);

  // account for if multiple winners / tie
  var winVoteCount = res[0].overall
  for (let option of res) {
    if (option.overall == winVoteCount) { // mark it as a winner if it has the same score as the wineer
      option.win = true
    } else { // don't need to check the rest of the list if it doesnt match
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

  //scale each Criteria overall to a 5 point scale - only accounting for nonZeroVotes
  const scaledCriteriaRating = scores.map((item, index) => 
    scaleBetween(item, 1, 5, 1 * voteCounts[option][criteria[index]], 5 * voteCounts[option][criteria[index]]));

  //Overall is an average of all criterias=
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
  //added because this returns NaN (dividing by 0) if max and min is 0 which occurs when there are no votes for a criteria
  let res = (max - min == 0) ? 0 : ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed;
  return res;
}

export default winner;