import { registerDecorator, ValidationOptions } from 'class-validator';

export const IsHalfAlhanumeric = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHalfAlphanumeric',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^[A-Za-z0-9]+$/.test(value);
        },
      },
    });
  };
};
