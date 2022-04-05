/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
    // ProjectInput Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement; // получаем доступ к элементам DOM
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler); // явно биндим наш контекст this класса в метод submitHandler, поскольку он теряется
        }

        renderContent() {
        }

        private gatherUserInput(): [string, string, number] | void { // Либо массив заданного типа, либо ничего не возвращаем, т.к. если поля пусты, просто выводим предупреждение о некорректном заполнении
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            };
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            };

            if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) { // проверка полей на пустоту, валидация
                alert('Invalid input, please try again');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]; // возвращаем наш tuple, enteredPeople преобразовываем в number, поскольку из инпута всегда приходит строка
            }
        }

        private clearInputs() { // очистка инпутов
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        @autoBind // декоратор, который биндит контекст автоматически
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) { // Проверка на то, является ли наш Tuple массивом
                const [title, desc, people] = userInput; // если true, то деструктуризируем, разбивая на несколько полей
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
}