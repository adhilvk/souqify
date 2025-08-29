export function generateCouponCode(title='', expiryDate='') {
  if (!title || !expiryDate) return "";

  // Remove spaces from title and make uppercase
  const formattedTitle = title.replace(/\s+/g, "").toUpperCase();

  // Convert expiry date to DDMMYYYY
  const dateObj = new Date(expiryDate);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const formattedDate = `${day}${month}${year}`;

  return `${formattedTitle}-${formattedDate}`;
}

// Example usage:
console.log(generateCouponCode("black friday", "2023-11-24"));
// Output: BLACKFRIDAY-24112023
