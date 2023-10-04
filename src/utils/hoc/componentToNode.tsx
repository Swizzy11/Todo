import React from "react"
import { ComponentType } from "react"


type ComponentToNodeProps = {
    Component: ComponentType
}

export const ComponentToNode = <T extends ComponentToNodeProps>({
    Component,
    ...props
}: ComponentToNodeProps & T) => {
    return <Component {...props} />
}
