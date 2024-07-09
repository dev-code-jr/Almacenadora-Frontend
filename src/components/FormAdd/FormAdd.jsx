import { useState } from "react"
import { Input } from "../Input"
import { useTarea } from "../../shared/hooks"
import './FormEdit.css'
export const FormAdd = () => {
    const { agregarTarea, isLoading } = useTarea();
  
    const [formState, setFormState] = useState({
      nombreTarea: {
        value: "",
        isValid: false,
        showError: false,
      },
      descripcionTarea: {
        value: "",
        isValid: false,
        showError: false,
      },
      fechaCreacion: {
        value: "",
        isValid: false,
        showError: false,
      },
      fechaFinalizacion: {
        value: "",
        isValid: false,
        showError: false,
      },
      empleadoAsignado: {
        value: "",
        isValid: false,
        showError: false,
      },
    });
  
    const handleInputValueChange = (value, field) => {
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
        case "nombreTarea":
          break;
        case "descripcionTarea":
          break;
        case "fechaCreacion":
          break;
        case "fechaFinalizacion":
          break;
        case "empleadoAsignado":
          break;
        default:
          break;
      }
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid,
          showError: !isValid,
        },
      }));
    };
  
    const handleAddTask = async (event) => {
      event.preventDefault();
      const response = await agregarTarea(
        formState.nombreTarea.value,
        formState.descripcionTarea.value,
        formState.fechaCreacion.value,
        formState.fechaFinalizacion.value,
        formState.empleadoAsignado.value
      );
  
      setFormState({
        nombreTarea: { value: "" },
        descripcionTarea: { value: "" },
        fechaCreacion: { value: "" },
        fechaFinalizacion: { value: "" },
        empleadoAsignado: { value: "" },
      });
    };
  
    const isSubmitButtonDisabled =
      isLoading ||
      !formState.nombreTarea.isValid ||
      !formState.descripcionTarea.isValid ||
      !formState.fechaCreacion.isValid ||
      !formState.fechaFinalizacion.isValid ||
      !formState.empleadoAsignado.isValid;
  
    return (
      <div className="formulario-container">
        <div className="formulario-cotainer-items">
          <form className="form-formulario-titles">
            <Input
              field="nombreTarea"
              label="Nombre tarea"
              value={formState.nombreTarea.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <Input
              field="descripcionTarea"
              label="Descripcion tarea"
              value={formState.descripcionTarea.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <Input
              field="fechaCreacion"
              label="Fecha de inicio"
              value={formState.fechaCreacion.value}
              onChangeHandler={handleInputValueChange}
              type="date"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <Input
              field="fechaFinalizacion"
              label="Fecha de cierre"
              value={formState.fechaFinalizacion.value}
              onChangeHandler={handleInputValueChange}
              type="date"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <Input
              field="empleadoAsignado"
              label="Nombre del creador"
              value={formState.empleadoAsignado.value}
              onChangeHandler={handleInputValueChange}
              type="text"
              onBlurHandler={handleInputValidationOnBlur}
            />
            <br />
            <br />
            <div>
              <button className="form-button-Agregar"  onClick={handleAddTask}>Agregar Tarea</button>
              <button className="form-button-cancelar" onClick={() => (window.location.href = "/dashboard")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  