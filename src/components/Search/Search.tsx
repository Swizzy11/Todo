import { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { Input } from '../block/Input'
import { fetchTasks } from '../../store/action-creator/task'
import { useDispatch } from 'react-redux'
import { TaskData } from '../../types/task'
import { createTask } from '../../utils/hooks/createTask'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { fetchComment } from '../../store/action-creator/comment'
import { fetchCurrentTask } from '../../store/action-creator/currentTask'
import { fetchSubcomment } from '../../store/action-creator/subcomments'
import { fetchSubtask } from '../../store/action-creator/subtask'
import { onDragStart } from '../../utils/hooks/dragNdrop'
import { Button } from '../block/Button'
import { getSearchItems } from '../../utils/hooks/getSearchItems'
import './Search.scss'


export const Search = () => {
    const {tasks, loading, error} = useTypedSelector(state => state.tasks)

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResults] = useState<Array<TaskData>>([])
    const [taskList, setTask] = useState<Array<TaskData>>([createTask('', '')])

    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks('get'))
    }, [])

    useEffect(() => {
        setTask(tasks)
    }, [tasks])

    useEffect(() => {
        getSearchItems(search, setSearchResults, taskList)
    }, [search])
    
    const handleSearch = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.currentTarget.value)
    }

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
                                    dispatch(fetchCurrentTask('add', item))
                                    dispatch(fetchSubtask('get', item))
                                    dispatch(fetchComment('get', item))
                                    dispatch(fetchSubcomment('get'))
                                }
                                const deleteTask = () => {
                                    dispatch(fetchTasks('delete', item))
                                    dispatch(fetchCurrentTask('delete', item))

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
