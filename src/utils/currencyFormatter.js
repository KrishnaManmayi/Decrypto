const UsCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const IndiaCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
});

export const currencyFormatter = (currency, dataToFormat) => {
  return currency === "USD"
    ? UsCurrencyFormatter.format(dataToFormat)
    : IndiaCurrencyFormatter.format(dataToFormat);
};
