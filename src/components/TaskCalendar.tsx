import React from 'react';
import { X } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskCalendarProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({
  task,
  isOpen,
  onClose,
  onDateSelect,
}) => {
  const { state, getCategoryById } = useTaskContext();

  if (!isOpen) return null;

  const events = state.tasks.map((t) => {
    const category = getCategoryById(t.categoryId);
    return {
      id: t.id,
      title: t.title,
      start: t.startDate,
      end: t.dueDate || undefined,
      backgroundColor: category?.color || '#3B82F6',
      borderColor: category?.color || '#3B82F6',
      textColor: '#ffffff',
      className: t.completed ? 'opacity-50' : '',
    };
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Calendario de tareas</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            height="auto"
            selectable={!!onDateSelect}
            select={(info) => onDateSelect?.(info.start)}
            locale="es"
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;