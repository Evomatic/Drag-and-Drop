type ProjectInputData = {
  title: string;
  description: string;
  people: number;
};

type ProjectFormData = ProjectInputData & FormData;

class ProjectBase {
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

  addProject() {
    const newElement = document.createElement('li');
    const newContent = document.createTextNode('Hi there and greetings!');
    newElement.appendChild(newContent);
    const currentDiv = document.getElementById('#ul');
    document.body.insertBefore(newElement, currentDiv);
  }

  getFormData() {
    const form = document.querySelector('#project-form') as HTMLFormElement;
    const formData: ProjectFormData = new FormData(form) as ProjectFormData;
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  }

  formSubmit() {
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
