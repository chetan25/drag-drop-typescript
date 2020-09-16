import {Droppable} from "./drag-drop.js";
import {AutoBind} from "./util.js";
import { Component } from './render-content.js';
import {Project, ProjectState, ProjectStatus} from './project-state.js';
import {ProjectItem} from './project-item.js';

// project state instance
const projectState: ProjectState = ProjectState.getInstance();

/**
 * Represents a Project List section, that contains multiple project Item, and is droppable
 */
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Droppable{
    assignProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignProjects = [];

        this.configure();
        this.renderContent();
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Project';
    }

    configure() {
        // attach listener
        projectState.addListeners((projects: Project[]) => {
            const filteredProject = projects.filter((project: Project) => {
                if (this.type === 'active') {
                    return  project.status === ProjectStatus.Active;
                }
                return  project.status === ProjectStatus.Finished;
            });
            this.assignProjects = filteredProject;
            this.renderProjects();
        });

        // attach droppable
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // this will allow drop event to fire, since default behaviour is not allow drop
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @AutoBind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projectId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)!;
        listEl.innerHTML = '';
        for(const item of this.assignProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, item);
        }
    }
}