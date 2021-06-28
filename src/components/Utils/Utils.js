export const captalizeFirstWord = (sentence) => {
  const words = sentence.split(" ");

  for (let index = 0; index < words.length; index++) {
    words[index] = words[index][0].toUpperCase() + words[index].substr(1);
  }

  return words.join(" ");
};

export const formatedTimestamp = (unixtimestamp, weatherType) => {
  var months_arr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var date = new Date(unixtimestamp * 1000);

  var year = date.getFullYear();

  var month = months_arr[date.getMonth()];

  var day = String(date.getDate()).padStart(2, 0);

  var hours = String(date.getHours()).padStart(2, 0);

  var minutes = String(date.getMinutes()).padStart(2, 0);

  if (weatherType === "current") {
    return `${hours}:${minutes} Hrs, ${month} ${day} ${year}`;
  } else {
    return `${month} ${day}`;
  }
};
