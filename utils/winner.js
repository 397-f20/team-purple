function winner(pollData) {
  //pollData.votes[0].options[0].scores[criteria];

  let sum = {};
  let data = Object.assign({}, pollData);
  let votes = Object.values(data.scores)
  for (let vote of votes) {
    for (const [choice, scores] of Object.entries(vote)) {

      if (!sum[choice]) {
        sum[choice] = Object.assign({}, scores);
        const tally = Object.values(scores);
        sum[choice].total = tally.reduce((a, b) => {
          return a + b;
        }, 0);
      } else {
        for (let criteria of data.criteria) {
          sum[choice][criteria] += scores[criteria]
          sum[choice].total += scores[criteria]
        }
      }
    }
  }

  //**Does not account for ties**
  let lead = '';
  let max = 0;
  for (const [key, value] of Object.entries(sum)) {
    if (value.total > max) {
      max = value.total;
      lead = key;
    }
  };

  let scores = [];
  for (let criteria of data.criteria) {
    scores.push(sum[lead][criteria]);
  };
  return {
    title: lead,
    scores
  };


};


export default winner;