import { AbstractControl, ValidationErrors } from '@angular/forms';

export function creditCardValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (!/^\d+$/.test(value)) {
    return { creditCard: true };
  }

  let sum = 0;
  let shouldDouble = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  if (sum % 10 === 0) {
    return null;
  } else {
    return { creditCard: true };
  }
}
