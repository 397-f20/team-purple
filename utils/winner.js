function winner(pollData){
  //pollData.votes[0].options[0].scores[criteria];
  let sum = {};

  for (let vote of pollData.votes) {
    for (let choice of vote.options) {
      if (!sum[choice.name]) {
        sum[choice.name] = choice.scores;
        const scores = Object.values(choice.scores);
        sum[choice.name].total = scores.reduce((a, b) => {
          return a + b;
        }, 0);
      } else {
        for (let criteria of pollData.criteria) {
          console.log(criteria);
          sum[choice.name][criteria] += choice.scores[criteria]
          sum[choice.name].total += choice.scores[criteria]
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
  for (let criteria of pollData.criteria) {
    scores.push(sum[lead][criteria]);
  };

  return {title: lead, scores};

};


export default winner;