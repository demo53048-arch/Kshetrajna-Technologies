export function isValidTenDigitPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
}
