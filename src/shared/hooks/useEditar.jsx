import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualizarTarea as actualizarTareaRequest } from "../../services";
import toast from "react-hot-toast";

const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
};

export const useEditar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const actualizarTarea = async (taskId, nombreTarea, descripcionTarea, fechaCreacion, fechaFinalizacion) => {
        setIsLoading(true);

        const response = await actualizarTareaRequest(taskId, {
            nombreTarea,
            descripcionTarea,
            fechaCreacion,
            fechaFinalizacion,
        });

        setIsLoading(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al actualizar la tarea'
            );
        }

        toast.success('Tarea actualizada correctamente');
        reloadPage();
        navigate('/');
    };

    return {
        actualizarTarea,
        isLoading
    };
};
