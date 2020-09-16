/**
 * Abstract Class that renders the template element to the Dom on instantiation
 */
export abstract class Component<T extends HTMLElement, S extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: S;

    constructor(
        templateELId: string,
        hostElId: string,
        insertAtStart: boolean,
        newElId?: string,
    ) {
        this.templateEl = <HTMLTemplateElement>document.getElementById(templateELId)!;
        this.hostEl = <T>document.getElementById(hostElId)!;

        // now render the Project element on instantiation

        // this will import all the nested nodes for the element,
        // content gives reference to the HTML code within the tag
        const importNode: DocumentFragment = document.importNode(this.templateEl.content, true);

        this.element = importNode.firstElementChild as S;
        if (newElId) {
            this.element.id = newElId;
        }

        this.attachDom(insertAtStart);
    }

    private attachDom(insertAtStart: boolean) {
        this.hostEl.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure?(): void;

    abstract renderContent(): void;
}