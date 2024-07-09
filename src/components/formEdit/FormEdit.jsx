import React, { useState } from "react";
import { Input } from "../Input";
import { useEditar } from "../../shared/hooks";

export const FormEdit = ({ initialValues, onSubmit }) => {
  const { actualizarTarea, isLoading } = useEditar();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const [formState, setFormState] = useState({
    _id: { value: initialValues._id || '' }, 
    nombreTarea: { value: initialValues.nombreTarea || '' },
    descripcionTarea: { value: initialValues.descripcionTarea || '' },
    fechaCreacion: {
      isValid: "",
      showError: false,
      value: initialValues.fechaCreacion ? formatDate(initialValues.fechaCreacion) : "",
    },
    fechaFinalizacion: {
      isValid: "",
      showError: false,
      value: initialValues.fechaFinalizacion ? formatDate(initialValues.fechaFinalizacion) : "",
    },
    empleadoAsignado: { value: initialValues.empleadoAsignado || '' }
});

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
        case 'nombreTarea':
            break;
        case 'descripcionTarea':
            break;
        case 'fechaCreacion':
            break;
        case 'fechaFinalizacion':
            break;
        case 'empleadoAsignado':
            break;
        default:
            break;
    }
    setFormState((prevState) => ({
        ...prevState,
        [field]: {
            ...prevState[field],
            isValid,
            showError: !isValid
        }
    }))
}

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      nombreTarea: formState.nombreTarea.value,
      descripcionTarea: formState.descripcionTarea.value,
      empleadoAsignado: formState.empleadoAsignado.value,
      fechaCreacion: formState.fechaCreacion.value,
      fechaFinalizacion: formState.fechaFinalizacion.value,
    });

    console.log(formState);
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    const taskId = formState._id.value;
    
    const { _id, ...data } = formState;

    const response = await actualizarTarea(
      taskId,
      formState.nombreTarea.value,
      formState.descripcionTarea.value,
      formState.fechaCreacion.value,
      formState.fechaFinalizacion.value,
      formState.empleadoAsignado.value
    );

    console.log(taskId)
    console.log('Respuesta de actualizarTarea:', response);
    setFormState({
      nombreTarea: { value: '' },
      descripcionTarea: { value: '' },
      fechaCreacion: { value: '' },
      fechaFinalizacion: { value: '' },
      empleadoAsignado: { value: '' }
    });
}


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Input
          field="nombreTarea"
          label="Nombre tarea"
          type="text"
          value={formState.nombreTarea.value}
          onChangeHandler={(value) => handleInputChange("nombreTarea", value)}
          onBlurHandler={(value) => handleInputValidationOnBlur("nombreTarea", value)}
        />
        <Input
          field="descripcionTarea"
          label="Descripcion tarea"
          type="text"
          value={formState.descripcionTarea.value}
          onChangeHandler={(value) => handleInputChange("descripcionTarea", value)}
          onBlurHandler={(value) => handleInputValidationOnBlur("descripcionTarea", value)}
        />
        <Input
          field="fechaCreacion"
          label="Fecha de inicio"
          type="date"
          value={formState.fechaCreacion.value}
          onChangeHandler={(value) => handleInputChange("fechaCreacion", value)}
          onBlurHandler={(value) => handleInputValidationOnBlur("fechaCreacion", value)}
        />
        <Input
          field="fechaFinalizacion"
          label="Fecha de cierre"
          type="date"
          value={formState.fechaFinalizacion.value}
          onChangeHandler={(value) => handleInputChange("fechaFinalizacion", value)}
          onBlurHandler={(value) => handleInputValidationOnBlur("fechaFinalizacion", value)}
        />
        <Input
          field="empleadoAsignado"
          label="Nombre del creador"
          type="text"
          value={formState.empleadoAsignado.value}
          onChangeHandler={(value) => handleInputChange("empleadoAsignado", value)}
          onBlurHandler={(value) => handleInputValidationOnBlur("empleadoAsignado", value)}
          readOnly={true}
        />
        <div>
          <button type="submit" onClick={handleUpdateTask} >Actualizar Tarea</button>
          <button onClick={() => (window.location.href = "/")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};
