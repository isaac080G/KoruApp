import * as Yup from 'yup';
export function initialValues() {
    return {    
        email: "",
        password: "",
        repeatPassword: ""
    }
};



export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("El correo no es valido").required("El correo es obligatorio"),
        password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
        repeatPassword: Yup.string().required("repetir la contaseña es obligatorio").oneOf([Yup.ref("password"),], "Las contraseñas no son iguales")
    })
}