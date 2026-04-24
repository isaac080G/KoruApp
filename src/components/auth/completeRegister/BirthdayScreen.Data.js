import * as Yup  from 'yup';

export function initialValues(){
    return {
        emergencyPhone: "",
    }
}

export function validationSchema(){
    return Yup.object({
        emergencyPhone: Yup.string()
        .matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos')
        .required('El número de teléfono es obligatorio'),
    })
}

