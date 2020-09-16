/**
 * Decorator function to bind this reference to a callback function
 */
export function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log('Auto binding for class  ' + target.constructor.name + ' for method  ' + methodName);

    const originalMethod = descriptor.value;
    const newMethod: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);

            return boundFunction;
        }
    };

    return newMethod;
}

export interface ValidationData {
    value: string | number;
    required?: boolean;
    minLen?: number;
    maxLen?: number;
    min?: number;
    max?: number;
}

/**
 * Validate function to validate form data
 */
export function validate(data: ValidationData) {
    let isValid = true;
    const value = data.value;
    if (data.required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }

    if (typeof value === 'string' && data.minLen != null) {
        isValid = isValid && value.length > data.minLen;
    }

    if (typeof value === 'number' && data.min != null) {
        isValid = isValid && value > data.min;
    }

    return isValid;
}