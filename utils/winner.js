const winner = (pollData) => {
  //creates an object that maps options to their scores along with a total value
  let sum = {};
  let lead = "";
  let max = 0;
  let data = Object.assign({}, pollData);
  let votes = Object.values(data.scores);
  //for each choices of each user's vote (based on db scheme)
  for (let vote of votes) {
    for (const [choice, scores] of Object.entries(vote)) {
      //first time accessing option? set it to that vote and create a total value
      if (!sum[choice]) {
        sum[choice] = Object.assign({}, scores);
        const tally = Object.values(scores);
        sum[choice].Total = tally.reduce((a, b) => {
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

  //calls getResult with each option, then sort the list
  let res = data.options.map((option) =>
    getResults(option, sum, data.criteria, votes.length)
  );
  res.sort((a, b) => (a.overall > b.overall ? 1 : -1));

  
  return res;
};

const getResults = (option, sum, criteria, voteCount) => {
  let scores = [];
  for (let crit of criteria) {
    scores.push(sum[option][crit]);
  }

  //might be a more efficient way to do this but this adds the total to the results graph
  scores.push(sum[option].Total);


  
  const scaledOverallRating = scaleBetween(
    scores[scores.length - 1],
    1,
    5,
    1 * voteCount * criteria.length,
    5 * voteCount * criteria.length
  );
  console.log(scores[scores.length - 1], scaledOverallRating)

  const scaledCriteriaRating = scores.slice(0, -1).map((item) => 
    scaleBetween(item, 1, 5, 1 * voteCount, 5 * voteCount));

  return {
    title: option,
    overall: scaledOverallRating,
    labels: [...criteria],
    criteriaRatings: scaledCriteriaRating,
  };
};

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

export default winner;
