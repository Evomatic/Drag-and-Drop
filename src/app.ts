/* eslint-disable @typescript-eslint/no-unused-vars */

import './app.less';

type ProjectInputData = Record<string, unknown | string> & {
  title: string;
  description: string;
  people: string;
};

type ProjectFormData = ProjectInputData & FormData;

class ProjectBase {
  formData: ProjectInputData;

  constructor() {
    this.formData = {
      title: '',
      description: '',
      people: ''
    };
  }

  generateRandomId(): string {
    const generateId = Math.random();
    return generateId.toString();
  }

  handleDragStart(event: Event): void {
    const dragElement = event.target as Element;
    dragElement.classList.add('dragging');
    console.log('start dragging...');
  }

  handleDragEnd(event: Event): void {
    const dragElement = event.target as Element;
    dragElement.classList.remove('dragging');
    console.log('end dragging...');
  }

  handleDragOver() {
    const dragOverContainer = document.querySelectorAll(
      '.drop-target'
    ) as NodeListOf<Element>;
    dragOverContainer.forEach((container) => {
      container.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = this.getDragAfterElement(
          container,
          (event as MouseEvent).clientY
        );
        const draggable = document.querySelector('.dragging') as Element;
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });
  }

  getDragAfterElement(container: any, y: number): HTMLLIElement {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)')
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  createNewElement(element: string) {
    return document.createElement(element) as HTMLElement;
  }

  createNewTextNode(value: string) {
    return document.createTextNode(value);
  }

  render(getElementById: string, elementPosition: InsertPosition): void {
    const templateElement = document.getElementById(
      getElementById
    ) as HTMLTemplateElement;
    const hostElement = document.getElementById('app') as HTMLDivElement;
    const importNode = document.importNode(templateElement.content, true);
    const element = importNode.firstElementChild as HTMLFormElement;
    hostElement.insertAdjacentElement(elementPosition, element);
  }
}

class ProjectInput extends ProjectBase {
  constructor() {
    super();
    this.render('project-input', 'afterbegin');
  }

  addProject(): void {
    const newListItem = this.createNewElement('li');
    if (!this.isProjectInputValid(this.formData)) {
      return;
    } else {
      const { title, description, people } = this.formData;

      const newH2Element = this.createNewElement('h2');
      const newH3Element = this.createNewElement('h3');
      const newPElement = this.createNewElement('p');

      const newH2Value = this.createNewTextNode(title);
      const newH3Value = this.createNewTextNode(`${people} persons assigned`);
      const newPValue = this.createNewTextNode(description);

      newH2Element.appendChild(newH2Value);
      newH3Element.appendChild(newH3Value);
      newPElement.appendChild(newPValue);

      newListItem.appendChild(newH2Element);
      newListItem.appendChild(newH3Element);
      newListItem.appendChild(newPElement);
      newListItem.setAttribute('draggable', 'true');
      newListItem.setAttribute('id', this.generateRandomId());
      newListItem.setAttribute('class', 'draggable');
      newListItem.addEventListener('dragstart', this.handleDragStart);
      newListItem.addEventListener('dragend', this.handleDragEnd);

      const getActiveProjectById: HTMLElement = document.getElementById(
        'active projects'
      ) as HTMLElement;
      getActiveProjectById.appendChild(newListItem);
    }
    this.clearProjectInput();
  }

  isProjectInputValid(formData: ProjectInputData): boolean {
    const { title, description, people } = formData;

    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      Number(people) === 0 ||
      Number(people) > 5
    ) {
      alert('All fields must be valid');
      return false;
    } else {
      return true;
    }
  }

  clearProjectInput(): void {
    (document.getElementById('project-form') as HTMLFormElement).reset();
  }

  getFormData(): void {
    const form = document.querySelector('#project-form') as HTMLFormElement;
    const formData: ProjectFormData = new FormData(form) as ProjectFormData;
    for (const [property, value] of formData.entries()) {
      this.formData[property] = value;
    }
  }

  formSubmit(): void {
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      this.getFormData();
      this.addProject();
    });
  }
}
class ActiveProjectList extends ProjectBase {
  constructor() {
    super();
    this.render('project-list', 'beforeend');
  }
}

class FinishedProjectList extends ProjectBase {
  constructor() {
    super();
    this.render('finished-projects', 'beforeend');
    this.handleDragOver();
  }
}

const projectInput = new ProjectInput();
projectInput.formSubmit();
new ActiveProjectList();
new FinishedProjectList();
