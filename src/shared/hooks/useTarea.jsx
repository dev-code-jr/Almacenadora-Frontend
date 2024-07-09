import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarTarea as agregarTareaService } from "../../services";
import toast from "react-hot-toast";

const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
};

export const useTarea = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const agregarTarea = async (nombreTarea, descripcionTarea, fechaCreacion, fechaFinalizacion, empleadoAsignado) => {
        setIsLoading(true);

        const response = await agregarTareaService({
            nombreTarea,
            descripcionTarea,
            fechaCreacion,
            fechaFinalizacion,
            empleadoAsignado
        });
        
        setIsLoading(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al agregar la tarea'
            )
        }

        toast.success('Tarea agregada correctamente');
        reloadPage();
        navigate('/');
    }

    return {
        agregarTarea,
        isLoading
    }
}