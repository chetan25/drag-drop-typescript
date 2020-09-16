import { ProjectForm } from './project-form.js';
import { ProjectList } from './project-list.js';
// importing as '.js' this will be converted to vanilla JS
// and at runtime '.js' will be there in dist

// this renders the Template with id 'project-input'
new ProjectForm();
// this renders the Template with id 'project-list' with tile of Active
new ProjectList('active');
// this renders the Template with id 'project-list' with tile of Finished
new ProjectList('finished');

