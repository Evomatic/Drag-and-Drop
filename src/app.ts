function render() {
  const templateElement = document.getElementById(
    'project-input'
  ) as HTMLTemplateElement;
  const hostElement = document.getElementById('app') as HTMLDivElement;
  const importNode = document.importNode(templateElement.content, true);
  const element = importNode.firstElementChild as HTMLFormElement;
  hostElement.insertAdjacentElement('afterbegin', element);
}

render();
