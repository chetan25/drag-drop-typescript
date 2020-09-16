import {AutoBind, validate, ValidationData} from "./util.js";
import { Component } from './render-content.js';
import { ProjectState } from './project-state.js';

// project state instance
const projectState: ProjectState = ProjectState.getInstance();

/**
 * Class to hold the Project info
 */
export class ProjectForm extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        // access different input
        this.titleInputEl = <HTMLInputElement>this.element.querySelector('#title')! ;
        this.descriptionInputEl = <HTMLInputElement>this.element.querySelector('#description')!;
        this.peopleInputEl = <HTMLInputElement>this.element.querySelector('#people')!;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitForm);
    }

    renderContent() {}

    private getUserInput(): [string, string, number] | void {
        const title = this.titleInputEl.value;
        const people = +this.peopleInputEl.value;
        const description = this.descriptionInputEl.value;

        const titleValidation: ValidationData = {
            value: title,
            required: true,
            minLen: 3
        }

        const descriptionValidation: ValidationData = {
            value: description,
            required: true,
            minLen: 5
        }

        const peopleValidation: ValidationData = {
            value: people,
            required: true,
            min: 0
        }
        if (!validate(titleValidation)) {
            alert('Title must be minimum 3 characters long');

            return;
        }

        if (!validate(descriptionValidation)) {
            alert('Description must be minimum 5 characters long');

            return;
        }

        if (!validate(peopleValidation)) {
            alert('People must be minimum 1');

            return;
        }

        return [title, description, people];
    }

    private clearForm() {
        this.titleInputEl.value = '';
        this.descriptionInputEl.value = '';
        this.peopleInputEl.value = '';
    }

    @AutoBind
    private submitForm(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject({
                title, description, people
            });
            this.clearForm();
        }
    }
}