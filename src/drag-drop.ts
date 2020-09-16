export interface Draggable {
    dragStartHandler: (event: DragEvent) => void;
    dragEndHandler: (event: DragEvent) => void;
}

export interface Droppable {
    dragOverHandler: (event: DragEvent) => void; // use to permit the drop by making sure it's a proper drop target
    dropHandler: (event: DragEvent) => void; // will handle the drop
    dragLeaveHandler: (event: DragEvent) => void; // will use to give user visual feedback
}