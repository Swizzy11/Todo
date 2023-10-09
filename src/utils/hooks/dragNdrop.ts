import { Dispatch } from "react";
import { storage } from "../../services/LocalStorage/LocalStorage";
import { statusController } from "../../services/Status/statusController";

export const onDragOver = (
    event: React.DragEvent<HTMLUListElement>, 
    dispatch:Dispatch<any>
) => {
    event.preventDefault()
    onUpdateTaskStatus(event, dispatch)
  }

export const onDrop =(event: React.DragEvent<HTMLUListElement>) => {
    const id = event
      .dataTransfer
      .getData('text')

      const draggableElement = document.getElementById(id)
      const dropzone = event.currentTarget

      if(draggableElement) {
            dropzone.appendChild(draggableElement)

            event
            .dataTransfer
            .clearData();
        }
}
export const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event
        .dataTransfer
        .setData('text/plain', event.currentTarget.id)
}

const onUpdateTaskStatus = (
    event: React.DragEvent<HTMLUListElement>, 
    dispatch:Dispatch<any>
) => {
    const currentTask = storage.get('currentTask')

    if(event.currentTarget.classList[1] === 'content_queue') {
        statusController(
                        'update', 
                        currentTask!, 
                        'queue', 
                        dispatch
                    )
    }

    if(event.currentTarget.classList[1] === 'content_development') {
        statusController(
                        'update', 
                        currentTask!, 
                        'development', 
                        dispatch
                    )
    }

    if(event.currentTarget.classList[1] === 'content_doneTasks') {
        statusController(
                        'update', 
                        currentTask!, 
                        'doneTasks', 
                        dispatch
                    )
    }
}
