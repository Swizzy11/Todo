import { createBrowserRouter } from "react-router-dom"
import { Main } from "../pages/Main"
import { Project } from "../pages/Project"
import { NotFound } from "../pages/NotFound"

  export const routes = createBrowserRouter([
    {
      id: 'main',
      path: '/',
      element: <Main />,
    },
    {
      id: 'project',
      path: '/project',
      element: <Project />,
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
