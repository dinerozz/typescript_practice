// autobind decorator
export function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) { // надо почитать подробнее про декораторы и дескрипторы
    const originalMethod = descriptor.value; // получаем оригинальный метод, таким образом храним оригинальный метод тут
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this); // биндим наш контекст в метод
            return boundFn;
        }
    };
    return adjDescriptor;
}
