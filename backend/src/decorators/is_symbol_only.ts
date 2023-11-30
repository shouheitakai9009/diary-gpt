import { registerDecorator, ValidationOptions } from 'class-validator';

export const IsSymbolOnly = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSymbolOnly',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)
          );
        },
      },
    });
  };
};
