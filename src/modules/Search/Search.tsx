import { ChangeEvent, useCallback, useEffect, useState, useTransition } from 'react'
import { Input } from '../../UI/Input'
import { TaskData } from '../../types/task'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { onDragStart } from '../../utils/dragNdrop'
import { Button } from '../../UI/Button'
import { getSearchItems } from '../../utils/getSearchItems'
import { useActions } from '../../hooks/useActions'
import './Search.scss'

export const Search = () => {
    const {tasks, loading, error} = useTypedSelector(state => state.tasks)
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResults] = useState<Array<TaskData>>([])
    const [taskList, setTask] = useState<Array<TaskData>>([{} as TaskData])
    const [isPanding, startTransition] = useTransition()
    
    const { fetchCurrentTask, 
            fetchSubtask, 
            fetchComment,
            fetchSubcomment, 
            fetchTasks
                        } = useActions()

    useEffect(() => {
        setTask(tasks)
    }, [tasks])


    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        startTransition(() => {
            getSearchItems(e.target.value, setSearchResults, taskList)
        })
    }, [])

    return (
        <div className='search'>
            <Input 
                type={'text'} 
                className='inputSearch' 
                onChange={handleSearch} 
                value={searchValue}
                placeholder={'Search tasks...'}
            />
            <ul>
                {isPanding && <h3>Поиск...</h3>}
                    { 
                        searchResult.map((item, index) => {
                                const addCurrentTask = () => {
                                    fetchCurrentTask('add', item)
                                    fetchSubtask('get', item)
                                    fetchComment('get', item)
                                    fetchSubcomment('get')
                                }
                                const deleteTask = () => {
                                    fetchTasks('delete', item)
                                    fetchCurrentTask('delete', item)

                                    for(let i=0; i < searchResult.length; i++) {
                                        if(searchResult[i].title === item.title) {
                                            searchResult.splice(i,1)
                                        }
                                    }
                                }
                                return <li  
                                            id={`${index}`}
                                            className='task'
                                            key={index}
                                            draggable={true}
                                            onDragStart={onDragStart}
                                        >
                                            <span 
                                                onClick={addCurrentTask}
                                            >
                                                {item.title}
                                            </span>
                                            <Button 
                                                type={'button'} 
                                                classname='btn-delete' 
                                                onClick={deleteTask}
                                            >
                                                X
                                            </Button>
                                        </li>
                            }
                        )
                    }
                </ul>
        </div>
    )
}
