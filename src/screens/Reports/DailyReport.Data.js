import * as Yup from 'yup';

export function initialValues(){
    return{
        horas:"",
        min:""
    }
        
}

export function validationSchema(){
    return Yup.object({
    horas: Yup.number()
      .transform((value, originalValue) => 
        originalValue === "" ? undefined : value
      )
      .typeError("Ingresa un número válido")
      .min(0, "Mínimo 0")
      .max(24, "Máximo 24")
      .required("Requerido"),
      
    min: Yup.number()
      .transform((value, originalValue) => 
        originalValue === "" ? undefined : value
      )
      .typeError("Ingresa un número válido")
      .min(0, "Mínimo 0")
      .max(59, "Máximo 59")
      .required("Requerido")
  });
}
