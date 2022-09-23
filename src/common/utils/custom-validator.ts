import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (
      text.charAt(0) === '6' ||
      text.charAt(0) === '7' ||
      text.charAt(0) === '8' ||
      text.charAt(0) === '9'
    ) {
      return /^[0-9]*$/.test(text);
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Phone number must start by 6 or 7 or 8 or 9';
  }
}
