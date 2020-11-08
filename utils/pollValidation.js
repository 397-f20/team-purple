const hasRepeats = (array) => {
  let seen = {};
  for (let item of array) {
    if (!seen[item]) seen[item] = true;
    else return true;
  }
};

const validatePollForm = (options, criteria) => {
  // check for empty options
  console.log(options);
  console.log(criteria);
  /*if (
    !options.every((item) => item != "") ||
    !criteria.every((item) => item != "")
  ) {
    return "There are empty options or criteria!";
  }*/

  const cleanedOptions = options.filter((item) => item != "");
  const cleanedCriteria = criteria.filter((item) => item != "");

  if (cleanedOptions.length < 2)
    return {
      message: "There must be at least 2 options for a poll",
      options: cleanedOptions,
      criteria: cleanedCriteria,
    };

  if (cleanedCriteria.length == 0)
    return {
      message: "There must be at least 1 criterion",
      options: cleanedOptions,
      criteria: cleanedCriteria,
    };

  if (hasRepeats(cleanedOptions)) {
    return {
      message: "There are multiple options with the same name",
      options: cleanedOptions,
      criteria: cleanedCriteria,
    };
  }

  if (hasRepeats(cleanedCriteria)) {
    return {
      message: "There are multiple criteria with the same name",
      options: cleanedOptions,
      criteria: cleanedCriteria,
    };
  }

  return { message: "", options: cleanedOptions, criteria: cleanedCriteria };
};

export default validatePollForm;
