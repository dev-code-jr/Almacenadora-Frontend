import { useState } from "react";
import toast from "react-hot-toast";
import { obtenerTareas as obtenerTareasService } from "../../services";

export const useTareas = () => {
    const [tareas, setTareas] = useState([]);

    const obtenerTareas = async () => {
        const tareaData = await obtenerTareasService();
        if (tareaData.error) {
            return toast.error(
                tareaData.e.response?.data || "Error al listar las tareas"
            )
        } 
        setTareas(tareaData.data);

        return tareaData.data;
    };
}