import { registerDecorator, ValidationOptions } from 'class-validator';

export function StringOrObj(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'StringOrObj',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only object or string',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (typeof value === 'string') return true;
          if (typeof value === 'undefined') return true;
        },
      },
    });
  };
}

export function NotEmpty(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'StringOrObj',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide an object or string',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (typeof value === 'string' && value.length > 0) return true;
          if (typeof value === 'undefined') return true;
        },
      },
    });
  };
}
