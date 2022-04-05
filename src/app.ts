/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

namespace App {
    new ProjectInput(); // создаем экземпляр класса ProjectInput
    new ProjectList('active');
    new ProjectList('finished');
}
