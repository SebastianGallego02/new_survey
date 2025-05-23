import { useState, useCallback, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { events } from './events';
import ErrorBoundary from '../../../hooks/ErrorBoundery';

const localizer = dateFnsLocalizer({
  format: (date, formatString) => format(date, formatString, { locale: es }),
  parse,
  startOfWeek,
  getDay,
  locales: { es },
});

const lang = {
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    agenda: 'El Diario',
    showMore: (total) => `+${total} más`,
  },
};

export default function BasicCalendar() {
  const { messages } = useMemo(() => ({ messages: lang.es }), []);

  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const handleViewChange = useCallback((view) => {
    setView(view);
  }, []);

  const handleNavigate = useCallback((date) => {
    setDate(date);
  }, []);

  return (
    <div className="px-6 lg:px-8" style={{ height: '85vh' }}>
      <ErrorBoundary>
        <BigCalendar
          culture="es"
          localizer={localizer}
          events={events}
          messages={messages}
          views={{ month: true, week: true }}
          step={30}
          min={new Date(0, 0, 0, 6, 0, 0)}
          max={new Date(0, 0, 0, 20, 0, 0)}
          date={date}
          view={view}
          onView={handleViewChange}
          onNavigate={handleNavigate}
        />
      </ErrorBoundary>
    </div>
  );
}
