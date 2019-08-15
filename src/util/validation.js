const validate = (val, rules, connectedValue) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
    }
  }

  return isValid;
};

const emailValidator = val => {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const maxLengthValidator = (val, maxLength) => {
  return val.length <= maxLength;
};

const equalToValidator = (val, checkVal) => {
  return val === checkVal;
};

export default validate;
