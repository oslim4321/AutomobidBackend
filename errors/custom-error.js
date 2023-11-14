let errors = { userName: "", email: "", password: "" };

module.exports.handleErr = (err) => {
  console.log(err);
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  } else {
    errors.userName = "";
    errors.email = "";
    errors.password = "";
  }
  if (err.code === 11000) {
    errors.email = "This Email Already Existed";
    return errors;
  } else {
    errors.email = "";
  }
};

module.exports.handleLoginErr = (err) => {
  if (err.message === "Incorrect Email") {
    errors.email = "Incorrect Email";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }
  /* Login err End*/

  return errors;
};

let subErr = { email: "" };
module.exports.handleSubscriberErr = (err) => {
  if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
    subErr.email = "This email has already been subscribed.";
  }

  return subErr;
};
