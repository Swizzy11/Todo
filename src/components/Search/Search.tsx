import { ChangeEvent, Dispatch, useCallback, useEffect, useState } from 'react'
import { Input } from '../block/Input'
import { useDispatch } from 'react-redux'
import { TaskData } from '../../types/task'
import { createTask } from '../../utils/createTask'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { onDragStart } from '../../utils/dragNdrop'
import { Button } from '../block/Button'
import { getSearchItems } from '../../utils/getSearchItems'
import { useActions } from '../../utils/hooks/useActions'
import './Search.scss'
import { useDebounce } from '../../utils/hooks/useDebounce'


export const Search = () => {
    const {tasks, loading, error} = useTypedSelector(state => state.tasks)

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResults] = useState<Array<TaskData>>([])
    const [taskList, setTask] = useState<Array<TaskData>>([createTask('', '')])
    
    const { fetchCurrentTask, 
            fetchSubtask, 
            fetchComment,
            fetchSubcomment, 
            fetchTasks
                        } = useActions()

    useEffect(() => {
        setTask(tasks)
    }, [tasks])

    const searchItem = (value: string) => {
        getSearchItems(value, setSearchResults, taskList)
    }

    const debouncedSearch = useDebounce(searchItem, 500)

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        debouncedSearch(e.target.value)
    }, [])

    return (
        <div className='search'>
            <Input 
                type={'text'} 
                className='inputSearch' 
                onChange={handleSearch} 
                value={search}
                placeholder={'Search tasks...'}
            />
            <ul>
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
