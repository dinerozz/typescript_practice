    // validation
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number; // for strings
        min?: number; // for numbers
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }

        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') { // проверка на существование minLength и является ли ввод строкой
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }

        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') { // проверка на существование maxLength и является ли ввод строкой
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }

        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }

