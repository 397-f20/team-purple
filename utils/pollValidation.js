const validatePollForm = (options, criteria) => {
  // check for empty options
  console.log(options);
  console.log(criteria);
  if (
    !options.every((item) => item != "") ||
    !criteria.every((item) => item != "")
  ) {
    console.log("Here!");
    return "There are empty options or criteria!";
  }

  return "";
};

export default validatePollForm;
