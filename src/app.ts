/* eslint-disable @typescript-eslint/no-unused-vars */
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

  getDragAfterElement(container: any, y: any) {
    const draggableElements = [
      ...container.querySelectorAll('.draggable:not(.dragging)')
    ];

    if (draggableElements.length > 0) {
      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;

          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return offset;
          }
        },
        { offest: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }

  // dragstart_handler(dragEvent?: DragEvent): void {
  //   // Add the target element's id to the data transfer object
  //   dragEvent?.dataTransfer?.setData(
  //     'text/plain',
  //     (dragEvent.target as HTMLElement).id
  //   );

  //   if (dragEvent && dragEvent.dataTransfer) {
  //     dragEvent.dataTransfer.effectAllowed = 'move';
  //   }
  //   console.log('start dragging...');
  // }

  // droptarget_handler(): void {
  //   const targetElements = document.getElementById(
  //     'finished-projects'
  //   ) as HTMLUListElement;

  //   targetElements.addEventListener('dragenter', this.dragEnter);
  //   targetElements.addEventListener('dragover', this.dragOver);
  //   targetElements.addEventListener('dragleave', this.dragLeave);
  //   targetElements.addEventListener('drop', this.drop);
  // }

  // dragEnter(e: Event) {
  //   e.preventDefault();
  //   if (e.target) {
  //     const target = e.target as Element;
  //     target.classList.add('drag-over');
  //   }
  // }

  // dragOver(e: Event) {
  //   e.preventDefault();
  //   if (e.target) {
  //     const target = e.target as Element;
  //     target.classList.add('drag-over');
  //   }
  // }

  // dragLeave(e: Event) {
  //   if (e.target) {
  //     const target = e.target as Element;
  //     target.classList.remove('drag-over');
  //   }
  // }

  // drop(e: any) {
  //   if (e.target) {
  //     const target = e.target as Element;
  //     target.classList.remove('drag-over');
  //   }

  //   // get the draggable element
  //   const id = e.dataTransfer.getData('text/plain');
  //   console.log('id', id);
  //   const draggable = document.getElementById(id);

  //   // add it to the drop target
  //   e.target.appendChild(draggable);

  //   // display the draggable element
  //   draggable?.classList.remove('hide');
  // }

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
    const { title, description, people } = this.formData;

    const newH2Element = this.createNewElement('h2');
    const newH3Element = this.createNewElement('h3');
    const newPElement = this.createNewElement('p');

    const newH2Value = this.createNewTextNode(title);
    const newH3Value = this.createNewTextNode(description);
    const newPValue = this.createNewTextNode(people);

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
    // newListItem.addEventListener('dragend', this.dragend_handler);

    const getActiveProjectById: HTMLElement = document.getElementById(
      'active projects'
    ) as HTMLElement;
    getActiveProjectById.appendChild(newListItem);
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
const activeProjectList = new ActiveProjectList();
const finishedProject = new FinishedProjectList();
