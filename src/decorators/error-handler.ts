import { logger } from '../utils/Logger';

export function ErrorHandler(value: string) {

  return (target: any, method: string, descriptor: PropertyDescriptor) => {
    function handler() {
      try {
        descriptor.value.call(this, ...arguments);
      }catch (error) {
        logger.log(value);
        // tslint:disable-next-line:no-console
        console.error(error);
      }
    }

    const newDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        return handler.bind(this);
      },
    };

    return newDescriptor;
  };
}
