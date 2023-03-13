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

  formSubmit() {
    document
      .getElementById('submit-btn')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        (document.getElementById('myForm') as HTMLFormElement)?.onSubmit();
        alert('New project submitted!');
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
