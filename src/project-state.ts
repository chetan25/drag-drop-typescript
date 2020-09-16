export interface ProjectData {
    title: string;
    description: string;
    people: number;
}

export type Listener<T> = (items: T[]) => void;

export enum ProjectStatus { Active, Finished}

export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

/**
 * Abstract State management class, that contains core functionality
 */
export abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

/**
 * Manages Project state
 */
export class ProjectState extends State<Project> {
    private projects: Project[]  = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(data: ProjectData) {
        const  {title, description, people} = data;
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.Active
        );

        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    updateListeners() {
        for(const listenerFn of this.listeners) {
            // pass as a new copy
            listenerFn(this.projects.slice());
        }
    }
}