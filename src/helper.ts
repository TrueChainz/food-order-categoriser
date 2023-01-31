export const validateInputs = (
  files: HTMLInputElement["files"] | null | undefined,
  date: HTMLInputElement["value"] | null | undefined
) => {
  const validity = {
    isValid: true,
    errorMessage: "",
  };
  if (!date) {
    validity.isValid = false;
    validity.errorMessage = "Please select a date";
    return validity;
  }

  if (!files?.length) {
    validity.isValid = false;
    validity.errorMessage = "Please select a file";
    return validity;
  }
  const file = files[0];
  if (
    file.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    validity.isValid = false;
    validity.errorMessage =
      "Please select appropriate file type, should only be XLSX";
    return validity;
  }
  return validity;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: string) => {
  const dateSplit = date?.split("-");
  const newDate = new Date(
    parseInt(dateSplit[0]),
    parseInt(dateSplit[1]) - 1,
    parseInt(dateSplit[2])
  );

  const dayValue = days[newDate.getDay()];
  let dateValue;
  switch (newDate.getDate().toString().at(-1)) {
    case "1":
      dateValue = `${newDate.getDate()}st`;
      break;
    case "2":
      dateValue = `${newDate.getDate()}nd`;
      break;
    case "3":
      dateValue = `${newDate.getDate()}rd`;
      break;
    default:
      dateValue = `${newDate.getDate()}th`;
      break;
  }
  if (dateValue.at(0) === "1") {
    dateValue = `${newDate.getDate()}th`;
  }
  let monthValue = months[newDate.getMonth()];
  const formatDate = `${dayValue} ${dateValue} ${monthValue} ${newDate.getFullYear()}`;
  console.log(formatDate);
  return formatDate;
};
