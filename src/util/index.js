export function getCityFromAddress(address) {
  // Split the string by commas
  const parts = address.split(",");

  // Return the first part (trimmed to remove any extra spaces)
  return parts[0].trim();
}
