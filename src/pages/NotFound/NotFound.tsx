import { Link } from 'react-router-dom'
import { Button } from '../../components/block/Button'
import { FC } from 'react'
import './NotFound.scss'

export const NotFound:FC = () => {
    return (
        <div className='notFound'>
            <h1>Not found</h1>
            <Button type='button' classname={'btn-menu'}>
                <Link to={'/'}>
                    Go home
                </Link>
            </Button>
        </div>
    )
}
