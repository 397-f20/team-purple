const hasRepeats = (array) => {
  let seen = {};
  for (let item of array) {
    if (!seen[item]) seen[item] = true;
    else return true;
  }
};

const containsAny = (str, substrings) => {
  for (var i = 0; i != substrings.length; i++) {
    var substring = substrings[i];
    if (str.indexOf(substring) != -1) {
      return true;
    }
  }
  return false;
};

const validatePollForm = (prompt, options, criteria) => {
  if (prompt.length < 5)
    return {
      message: "Prompt should be longer than 5 characters",
    };

  // check for empty options
  const cleanedOptions = options.filter((item) => item != "");
  const cleanedCriteria = criteria.filter((item) => item != "");

  const specialChars = [".", "#", "$", "/", "[", "]"];
  if (
    !options.every((item) => !containsAny(item, specialChars)) ||
    !criteria.every((item) => !containsAny(item, specialChars))
  ) {
    return {
      message:
        "Options and criteria cannot contain special characters: '.', '#', '$', '/', '[', ']'",
      options: cleanedOptions,
      criteria: cleanedCriteria,
    };
  }

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
