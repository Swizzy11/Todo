import { ReactNode } from "react"
import { Main } from "../pages/Main"
import { Project } from "../pages/Project"


interface IRoute {
    /**
     * Идентификатор роута
     */
    id: string | number
    /**
     * Адрес страницы
     */
    path: string
    /**
     * Компонент страницы
     */
    component: ReactNode
  }


  export const routes: IRoute[] = [
    {
      id: 'main',
      path: '/',
      component: <Main />,
    },
    {
      id: 'project',
      path: '/project',
      component: <Project />,
    }
  ]
