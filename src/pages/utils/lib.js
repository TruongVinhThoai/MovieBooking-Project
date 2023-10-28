import moment from "moment";

export const validatePhoneNumber = (_, value) => {
  // Phone number pattern (adjust as needed)
  const phonePattern = /^[0-9]{10}$/;

  if (!value) {
    return Promise.reject("Please input your phone number!");
  }

  if (!phonePattern.test(value)) {
    return Promise.reject("Please enter a valid phone number!");
  }

  return Promise.resolve();
};

export const capitalizeLetter = (mySentence) =>
  mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export const formattedDate = (date) => {
  if (typeof date === "string") {
    const milliseconds = moment(date).valueOf(); // Get the milliseconds
    const seconds = Math.floor(milliseconds / 1000);
    const formattedDate = moment.unix(seconds).format("DD-MM-YYYY");
    return formattedDate;
  }

  // Assuming the date is already in seconds
  const formattedDate = moment.unix(date).format("DD-MM-YYYY");
  return formattedDate;
};

export const formattedTime = (time) => {
  return moment(time).format("HH:mm");
};
