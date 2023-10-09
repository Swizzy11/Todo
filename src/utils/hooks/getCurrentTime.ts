export const getCurrentTime = () => {
    const date = new Date()
    return `
    ${(date.getHours() < 10) 
        ? '0' + date.getHours() 
        : date.getHours()}
    :
    ${(date.getMinutes() < 10 ) 
        ?'0' + date.getMinutes() 
        : date.getMinutes()}
    `
}
