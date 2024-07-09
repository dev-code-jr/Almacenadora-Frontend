import React, { useState, useEffect } from 'react';
import './taskList.css';
import { Input } from '../Input';
import { actualizarEstadoTarea, buscarEmpleado } from '../../services/api';
import { FormAdd } from '../FormAdd/FormAdd.jsx'; 
import { FormEdit } from '../formEdit/FormEdit.jsx';

export const TaskList = ({ tareas, onDeleteTask, filtroActivo }) => {
  const [mostrarFormAdd, setMostrarFormAdd] = useState(false);
  const [mostrarFormEdit, setMostrarFormEdit] = useState(false);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [taskIdToEdit, setTaskIdToEdit] = useState('');
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [tareasOriginales, setTareasOriginales] = useState([]);
  const [mostrarTablaBusqueda, setMostrarTablaBusqueda] = useState(false);
  const [mostrarBotonRecargar, setMostrarBotonRecargar] = useState(false);
  const [mostrarMensajeNoElementos, setMostrarMensajeNoElementos] = useState(false);
  const [formEditData, setFormEditData] = useState(null);
  const [formState, setFormState] = useState({
    empleadoAsignado: {
      value: '',
      isValid: false,
      showError: false
    }
  }); 

  useEffect(() => {
    setTareasFiltradas(tareas);
    setTareasOriginales(tareas);
  }, [tareas]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { timeZone: "UTC" });
  };

  const handleDeleteClick = (taskId) => {
    setTaskIdToDelete(taskId);
  };

  const handleEditClick = (taskId) => {
    const tareaSeleccionada = tareasOriginales.find(tarea => tarea._id === taskId);
    if (tareaSeleccionada) {
      setFormEditData(tareaSeleccionada);
      setMostrarFormEdit(true);
      setMostrarTabla(false);
    } else {
      console.error('Error: No se pudo encontrar la tarea seleccionada.');
    }
  };

  const handleConfirmDelete = () => {
    onDeleteTask(taskIdToDelete);
    setTaskIdToDelete('');
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete('');
  };

  const handleRecargar = () => {
    window.location.reload();
  };

  const handleSubmit = (formData) => {
    console.log("Datos del formulario editado:", formData);
  };

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'empleadoAsignado':
        isValid = value.trim() !== '';
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
    }));
  };

  const handleAgregarTareaClick = () => {
    setMostrarFormAdd(true);
    setMostrarTabla(false);
    setMostrarTablaBusqueda(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('Buscando empleado:', formState.empleadoAsignado.value);
    try {
      const response = await buscarEmpleado(formState.empleadoAsignado.value);
      console.log('Respuesta de buscarEmpleado:', response);
      if (!response.error) {
        setTareasOriginales(response.data.tasks);
        setTareasFiltradas(response.data.tasks);
        setMostrarTabla(false);
        setMostrarTablaBusqueda(true);
        setMostrarBotonRecargar(true);
        setMostrarMensajeNoElementos(response.data.tasks.length === 0);
      } else {
        console.error('Error al buscar empleado:', response.error);
      }
    } catch (error) {
      console.error('Error al buscar empleado:', error);
    }
  };

  const handleEstadoTarea = async (taskId, estadoActual) => {
    try {
      if (!filtroActivo) {
        const nuevasTareas = tareasOriginales.map(tarea => {
          if (tarea._id === taskId) {
            return {
              ...tarea,
              estado: !estadoActual
            };
          }
          return tarea;
        });

        setTareasFiltradas(nuevasTareas);

        await actualizarEstadoTarea(taskId, !estadoActual);
      }
    } catch (error) {
      console.error('Error al cambiar estado de la tarea:', error);
    }
  };

  return (
    <div className="container">
      {mostrarFormAdd && <FormAdd />}
      {mostrarFormEdit && <FormEdit initialValues={formEditData} onSubmit={handleSubmit} />}
      {!mostrarFormAdd && (
        <div className="tableContainer">
          {mostrarTabla && (
            <h2 className="caption">Tareas</h2>
          )}
          <div className="searchForm" style={{ display: mostrarTabla || mostrarTablaBusqueda ? 'block' : 'none' }}>
            <form onSubmit={handleSearch}>
              <Input
                field="empleadoAsignado"
                label="Usuario encargado a buscar:"
                type="text"
                value={formState.empleadoAsignado.value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
              />
              <button type="submit" className='oa'>Buscar</button>
              {mostrarBotonRecargar && (
                <button onClick={handleRecargar}>Regresar</button>
              )}
              <button onClick={handleAgregarTareaClick}>Agregar tarea</button>
            </form>
          </div>
          {mostrarTabla && (
            <table className="crud-table">
              <thead>
                <tr className="crud-table__row">
                  <th className="crud-table__header-cell">Titulo Tarea</th>
                  <th className="crud-table__header-cell">Descripcion</th>
                  <th className="crud-table__header-cell">Fecha Inicio</th>
                  <th className="crud-table__header-cell">Fecha Final</th>
                  <th className="crud-table__header-cell">Estado</th>
                  <th className="crud-table__header-cell">Usuario Encargado</th>
                  <th className="crud-table__header-cell">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tareasFiltradas.map((tarea, index) => (
                  <tr key={index} className="crud-table__row">
                    <td className="crud-table__cell">{tarea.nombreTarea}</td>
                    <td className="crud-table__cell">{tarea.descripcionTarea}</td>
                    <td className="crud-table__cell">{formatDate(tarea.fechaCreacion)}</td>
                    <td className="crud-table__cell">{formatDate(tarea.fechaFinalizacion)}</td>
                    <td className="crud-table__cell">
                      <button disabled={filtroActivo} onClick={() => handleEstadoTarea(tarea._id, tarea.estado)}>
                        {tarea.estado ? 'Completada' : 'Incompleta'}
                      </button>
                    </td>
                    <td className="crud-table__cell">{tarea.empleadoAsignado}</td>
                    <td className="crud-table__cell">
                      <button className='oa' onClick={() => handleDeleteClick(tarea._id)}>Eliminar</button>
                      <button className='oa' onClick={() => handleEditClick(tarea._id)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {mostrarTablaBusqueda && (
            <div className="searchResultTable">
              <h3>Resultados de la búsqueda</h3>
              <table className="search-result-table">
                <thead>
                  <tr className="crud-table">
                    <th className="crud-table__header-cell">Título de la Tarea</th>
                    <th className="crud-table__header-cell">Descripción</th>
                    <th className="crud-table__header-cell">Fecha de Inicio</th>
                    <th className="crud-table__header-cell">Fecha de Finalización</th>
                    <th className="crud-table__header-cell">Estado</th>
                    <th className="crud-table__header-cell">Usuario Encargado</th>
                  </tr>
                </thead>
                <tbody>
                  {mostrarMensajeNoElementos ? (
                    <tr>
                      <td colSpan="6">No se encontraron elementos.</td>
                    </tr>
                  ) : (
                    tareasFiltradas.map((tarea, index) => (
                      <tr key={index} className="crud-table__row">
                        <td className="crud-table__cell">{tarea.nombreTarea}</td>
                        <td className="crud-table__cell">{tarea.descripcionTarea}</td>
                        <td className="crud-table__cell">{formatDate(tarea.fechaCreacion)}</td>
                        <td className="crud-table__cell">{formatDate(tarea.fechaFinalizacion)}</td>
                        <td className="crud-table__cell">
                          <button disabled={filtroActivo} onClick={() => handleEstadoTarea(tarea._id, tarea.estado)}>
                            {tarea.estado ? 'Completada' : 'Incompleta'}
                          </button>
                        </td>
                        <td className="crud-table__cell">{tarea.empleadoAsignado}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {taskIdToDelete && (
        <div className="floating-dialog">
          <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
          <button onClick={handleConfirmDelete}>Sí</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};
