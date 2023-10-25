import { Link } from 'react-router-dom'
import { ButtonHost } from '../../UI/ButtonHost'
import { FC } from 'react'
import './NotFound.scss'

export const NotFound:FC = () => {
    return (
        <div className='notFound'>
            <h1>Not found</h1>
            <ButtonHost type='button' classname={'btn-menu'}>
                <Link to={'/'}>
                    Go home
                </Link>
            </ButtonHost>
        </div>
    )
}
