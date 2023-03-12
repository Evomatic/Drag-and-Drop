class ProjectBase {
  getElementValue(elementId: string, eventListener: string) {
    const elements = <HTMLInputElement>document.getElementById(elementId);
    elements.addEventListener(eventListener, (event) => {
      const result = <HTMLInputElement>event.target;
      console.log(result.value);
    });
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
    this.getElementValue('title', 'input');
  }
}
class ActiveProjectList extends ProjectBase {
  constructor() {
    super();
    this.render('project-list', 'beforeend');
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ActiveProjectList();
