function render(elementId: string, insertPosition: InsertPosition): void {
  const templateElement = document.getElementById(
    elementId
  ) as HTMLTemplateElement;
  const hostElement = document.getElementById('app') as HTMLDivElement;
  const importNode = document.importNode(templateElement.content, true);
  const element = importNode.firstElementChild as HTMLFormElement;
  hostElement.insertAdjacentElement(insertPosition, element);
}

function projectInput(): void {
  render('project-input', 'afterbegin');
}

function activeProjectList(): void {
  render('project-list', 'beforeend');
}

projectInput();
activeProjectList();
