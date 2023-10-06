import { storage } from "../../LocalStorage/LocalStorage";


export const deleteCurrentTask = () => {
    const clearTask = ''
    storage.set(`currentTask`, clearTask)

    return clearTask
}
