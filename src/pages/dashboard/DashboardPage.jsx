import React, { useState, useEffect } from 'react';
import './dashboardPage.css';
import { TaskList } from '../../components/taskList/TaskList.jsx';
import { Navbar } from '../../components/navbar/Navbar.jsx';
import { obtenerTareas, eliminarTarea } from '../../services/';

export const DashboardPage = () => {
    const [tareas, setTareas] = useState([]);
    const [filtroTareas, setFiltroTareas] = useState('');

    useEffect(() => {
        const listTasks = async () => {
            try {
                const response = await obtenerTareas();
                console.log('Respuesta de obtenerTareas:', response.data.tasks);
                if (!response.error) {
                    setTareas(response.data.tasks || []);
                } else {
                    console.log('Error', response.data);
                }
            } catch (error) {
                console.log('Error', error);
            }
        };
        listTasks();
    }, []);

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await eliminarTarea(taskId);
            if (!response.error) {
                const updatedTasks = tareas.filter(task => task._id !== taskId);
                setTareas(updatedTasks);
                console.log('Tarea eliminada correctamente');
            } else {
                console.log('Error', response.data);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleChangeFilter = (filterType) => {
        setFiltroTareas(filterType);
    };

    const filteredTasks = filtroTareas === 'complete' ? tareas.filter(task => task.estado) : // Filtrar tareas completadas
                          filtroTareas === 'incomplete' ? tareas.filter(task => !task.estado) : // Filtrar tareas incompletas
                          tareas; // Mostrar todas las tareas si no hay filtro

    return (
        <div>
            <Navbar onChangeFilter={handleChangeFilter} />
            <br />
            <br />
            <TaskList tareas={filteredTasks} onDeleteTask={handleDeleteTask} filtroActivo={filtroTareas !== ''} />

        </div>
    );
};
