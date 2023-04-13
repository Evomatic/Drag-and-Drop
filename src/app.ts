/* eslint-disable @typescript-eslint/no-unused-vars */
type ProjectInputData = Record<string, unknown | string> & {
  title: string;
  description: string;
  people: number;
};

type ProjectFormData = ProjectInputData & FormData;

class ProjectBase {
  formData: ProjectInputData;

  constructor() {
    this.formData = {
      title: '',
      description: '',
      people: 0
    };
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
    const formValues = Object.values(this.formData);
    [...formValues].forEach((value, index) => {
      const newListItem = this.createNewElement('li');
      const newH2Element = this.createNewElement('h2');
      const newH3Element = this.createNewElement('h3');
      const newPElement = this.createNewElement('p');

      const listItemValue = this.createNewTextNode(value as string);
      const newH2Value = this.createNewTextNode(value as string);
      const newH3Value = this.createNewTextNode(value as string);
      const newPValue = this.createNewTextNode(value as string);

      newListItem.appendChild(listItemValue);
      const getActiveProjectById: HTMLElement = document.getElementById(
        'active projects'
      ) as HTMLElement;
      getActiveProjectById.appendChild(newListItem);
    });
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

const projectInput = new ProjectInput();
projectInput.formSubmit();
const activeProjectList = new ActiveProjectList();
