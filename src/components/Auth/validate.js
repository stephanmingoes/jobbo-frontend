export const validateEmail = (email) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateUsername = (username) => {
  return (
    String(username).match(/^[0-9a-zA-Z]+$/) &&
    String(username).length >= 5 &&
    String(username).length <= 15
  );
};

export const validatePassword = (password) => {
  return String(password).length >= 5 && String(password).length <= 15;
};

export const validateCredentials = (data) => {
  if (!validateEmail(data.email)) {
    alert("Enter a valid email address ");
    return false;
  } else if (!validateUsername(data.username)) {
    alert(
      "Username must only contain numbers or letters and the length must be greater than 4 and less than 16"
    );
    return false;
  } else if (!validatePassword(data.password)) {
    alert("Password must contain more than 5 characters and less than 16.");
  } else {
    return true;
  }
};
