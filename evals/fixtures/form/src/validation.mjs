export function validateEmail(value) {
  return value.trim() ? null : 'Email is required';
}
