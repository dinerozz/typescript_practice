namespace App {
    // Component Base Class
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> { // generics
        templateElement: HTMLTemplateElement; // указываем тип объекта
        hostElement: T;
        element: U;

        constructor(
            templateId: string,
            hostElementId: string,
            insertAtStart: boolean,
            newElementId?: string
        ) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement; // используем type casting для преобразования типа
            this.hostElement = document.getElementById(hostElementId)! as T;

            const importedNode = document.importNode(this.templateElement.content, true); // Метод importNode()объекта Document создаёт копию Node или DocumentFragment из другого документа, для последующей вставки в текущий документ.
            this.element = importedNode.firstElementChild as U;
            if (newElementId) {
                this.element.id = newElementId;
            }

            this.attach(insertAtStart);
        }

        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }

        abstract configure(): void;

        abstract renderContent(): void;
    }
}