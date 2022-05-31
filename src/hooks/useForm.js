import { useState } from 'react'


export const useForm = intialValues => {

    const [values, setValues] = useState(intialValues)

    return [values, e => {
        const { name, type } = e.target
        const value = type === 'file' ? e.target.files[0] : e.target.value
        if (name.includes('-')) {
            const key1 = name.split('-')[0]
            const key2 = name.split('-')[1]
            setValues({
                ...values,
                [key1]: {
                    ...values[key1],
                    [key2]: value
                }
            })
        }
        else {
            setValues({
                ...values,
                [name]: value
            }
            )
        }
    }, (name, data) => {
        setValues({
            ...values,
            [name]: data
        })
    }]
}