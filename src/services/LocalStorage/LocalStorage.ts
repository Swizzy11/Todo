interface LocalStorageMethods {
    get: (key: string) => void;
    getAll: () => void;
    getAllByKey: (key:string) => void;
    set: (key:string, value:string) => void;
    remove: (key:string) => void;
    clear: () => void;
}


class LocalStorage implements LocalStorageMethods {
    get(key: string) {
        return JSON.parse(localStorage.getItem(`${key}`)!)
    }

    getAll() {
        let items = []

        for(let item in localStorage) {
            const data = JSON.parse(localStorage.getItem(`${item}`)!)
            if(data === null) continue
            items.push(data)
        }
        return items.map((item) => JSON.parse(item))
    }

    getAllByKey(key:string) {
        let items = [];
        let i = 0;
        let obj;

        for(let item in localStorage) {
            const project = JSON.parse(localStorage.getItem(`${item}`)!);

            if(key === 'Tasks') {
                obj = `${item.match(/Tasks_/g)}`
            }else if(key === 'Project') {
                obj = `${item.match(/Project_/g)}`
            }

            if(project !== null && obj !== undefined) {
                if(obj === `${key}_`) {
                    items.push(project);
                    i++;
                }
            }
        }

        return items.map((item) => item)
    }

    set(key:string, value:any) {
        localStorage.setItem(`${key}`, JSON.stringify(value))
    }

    remove(key:string) {
        localStorage.removeItem(`${key}`)
    }

    clear() {
        localStorage.clear()
    }
}

export const storage = new LocalStorage()
