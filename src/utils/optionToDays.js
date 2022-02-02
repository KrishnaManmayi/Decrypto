export const optionToDays = (option) => {
  switch (option) {
    case 0:
      return 1;
    case 1:
      return 7;
    case 2:
      return 30;
    case 3:
      return 365;
  }
};
