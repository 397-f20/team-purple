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
    getResults(option, sum, data.criteria)
  );
  res.sort((a, b) =>
    a.barData.datasets[0].data.Total > b.barData.datasets[0].data.Total ? 1 : -1
  );

  console.log(res);

  return res;
};

const getResults = (option, sum, criteria) => {
  let scores = [];
  for (let crit of criteria) {
    scores.push(sum[option][crit]);
  }

  //might be a more efficient way to do this but this adds the total to the results graph
  scores.push(sum[option].Total);

  /*{
    title: option,
    overall: Number,
    criteriaRatings: [{
      name: String,
      rating: Number
    }]
  }*/
  console.log(scores);

  return {
    title: option,
    barData: {
      labels: [...criteria, "Total"],
      datasets: [
        {
          data: scores,
        },
      ],
    },
  };
};

export default winner;
