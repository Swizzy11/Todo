
export const rules = {
    required: (message: string = 'Поле должно быть заполнено') => ({
        required: true,
        message
    })
}
