import {Draggable} from "./drag-drop.js";
import {AutoBind} from "./util.js";
import { Component } from './render-content.js';
import { Project } from './project-state.js';

/**
 * Represents an Individual Project Item in the Project List and is draggable
 */
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        return this.project.people > 1 ? `${this.project.people} people assigned` : `${this.project.people} person assigned`;
    }

    constructor(hostELId: string, project: Project) {
        super('single-project', hostELId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move'; // changes the cursor
    }

    @AutoBind
    dragEndHandler(_: DragEvent) {
    }
}