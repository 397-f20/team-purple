const winner = (pollData) => {
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
  };

  //**Does not account for ties**
  let lead = '';
  let max = 0;
  for (const [key, value] of Object.entries(sum)) {
    if (value.total > max) {
      max = value.total;
      lead = key;
    }
  };

  let res = [getResults(lead, sum, data.criteria)]

  for (let option of data.options) {
    if (option != lead) {
      res.push(getResults(option, sum, data.criteria))
    }
  }

  return res;



};



const getResults = (option, sum, criteria) => {
  let scores = [];
  for (let crit of criteria) {
    scores.push(sum[option][crit]);
  };


  return {
    title: option,
    barData: {
      labels: criteria,
      datasets: [{
        data: scores,
      }, ],
    }
  };
}



export default winner;