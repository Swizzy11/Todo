import { Dispatch } from "react"
import { TaskData } from "../../types/task"



export const getSearchItems = (
    search:string, 
    setSearchResults: Dispatch<React.SetStateAction<TaskData[]>>, 
    taskList:TaskData[]
) => {
    if(search === '') {
        setSearchResults([])
    }else {
        const condition = search.match(/[A-Za-z\u0400-\u04FF]+/)

        if(condition) {
            const result = taskList.filter(item => 
                item.title.toLowerCase().includes(search.toLowerCase())
                )
            setSearchResults(result)
        }
        else {
            const str = search.match(/[0-9]+/)?.join('')
            const result = taskList.filter(item => {
                    if(item.number) return item.number.includes(str!)
                    }
                )
            setSearchResults(result)
        }
    }
}
