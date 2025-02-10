
document.addEventListener('DOMContentLoaded', function () {
    const calendarioEl = document.getElementById('calendario');
    const listaHorarios = document.getElementById('lista-horarios');
    const horarioSeleccionadoInput = document.getElementById('horario-seleccionado');
    const selectPeluquero = document.getElementById('peluquero');
    const fechaSeleccionadaInput = document.createElement('input'); // Campo oculto para la fecha
    fechaSeleccionadaInput.type = 'hidden';
    fechaSeleccionadaInput.id = 'fecha-seleccionada-input';
    document.getElementById('form-reserva').appendChild(fechaSeleccionadaInput);
  
    // Función para formatear la fecha en DD-MM-AAAA
    function formatearFecha(fecha) {
      const [anio, mes, dia] = fecha.split('-');
      return `${dia}-${mes}-${anio}`;
    }
  
    // Inicializa el calendario
    const calendario = new FullCalendar.Calendar(calendarioEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      dateClick: function (info) {
        const fechaSeleccionada = info.dateStr;
        const peluqueroSeleccionado = selectPeluquero.value;
  
        if (!peluqueroSeleccionado) {
          alert('Por favor, selecciona un peluquero.');
          return;
        }
  
        // Resalta el día seleccionado
        document.querySelectorAll('.fc-day').forEach(day => {
          day.classList.remove('dia-seleccionado');
        });
        info.dayEl.classList.add('dia-seleccionado');
  
        // Almacena la fecha seleccionada en el campo oculto
        fechaSeleccionadaInput.value = formatearFecha(fechaSeleccionada);
  
        // Muestra la fecha seleccionada
        mostrarFechaSeleccionada(formatearFecha(fechaSeleccionada));
  
        // Muestra los horarios disponibles
        mostrarHorariosDisponibles(fechaSeleccionada, peluqueroSeleccionado);
      },
    });
  
    calendario.render();
  
    // Función para mostrar la fecha seleccionada
    function mostrarFechaSeleccionada(fecha) {
      const fechaSeleccionadaEl = document.getElementById('fecha-seleccionada');
      if (!fechaSeleccionadaEl) {
        const fechaSeleccionadaDiv = document.createElement('div');
        fechaSeleccionadaDiv.id = 'fecha-seleccionada';
        fechaSeleccionadaDiv.innerHTML = `<h3>Fecha seleccionada: ${fecha}</h3>`;
        document.querySelector('#reservas').insertBefore(fechaSeleccionadaDiv, calendarioEl);
      } else {
        fechaSeleccionadaEl.innerHTML = `<h3>Fecha seleccionada: ${fecha}</h3>`;
      }
    }
  
    // Función para mostrar horarios disponibles
    function mostrarHorariosDisponibles(fecha, peluquero) {
      // Limpia la lista de horarios
      listaHorarios.innerHTML = '';
  
      // Simula horarios disponibles y ocupados según el peluquero
      const horarios = obtenerHorariosPeluquero(peluquero, fecha);
  
      // Muestra los horarios disponibles
      horarios.forEach(({ hora, ocupado }) => {
        const li = document.createElement('li');
        li.textContent = hora;
        if (ocupado) {
          li.classList.add('ocupado'); // Añade la clase "ocupado"
        } else {
          li.addEventListener('click', () => {
            // Almacena el horario seleccionado en el campo oculto
            horarioSeleccionadoInput.value = hora;
            // Resalta el horario seleccionado
            document.querySelectorAll('#lista-horarios li').forEach(item => {
              item.classList.remove('seleccionado');
            });
            li.classList.add('seleccionado');
          });
        }
        listaHorarios.appendChild(li);
      });
    }
  
    // Función para obtener los horarios de un peluquero (simulación)
    function obtenerHorariosPeluquero(peluquero, fecha) {
      // Simula horarios ocupados y disponibles
      const horariosBase = [
        { hora: '12:00', ocupado: false },
        { hora: '12:40', ocupado: true },
        { hora: '13:20', ocupado: false },
        { hora: '14:00', ocupado: false },
        { hora: '14:40', ocupado: true },
        { hora: '15:20', ocupado: false },
        { hora: '16:00', ocupado: false },
        { hora: '16:40', ocupado: true },
        { hora: '17:20', ocupado: false },
        { hora: '18:00', ocupado: false },
        { hora: '18:40', ocupado: true },
        { hora: '19:20', ocupado: false },
      ];
  
      // Simula que algunos horarios están ocupados para un peluquero específico
      if (peluquero === "Tomas Caballero") {
        return horariosBase.map((horario) => {
          if (horario.hora === '13:20' || horario.hora === '15:20') {
            return { ...horario, ocupado: true };
          }
          return horario;
        });
      } else if (peluquero === "Juan Pérez") {
        return horariosBase.map((horario) => {
          if (horario.hora === '14:00' || horario.hora === '16:00') {
            return { ...horario, ocupado: true };
          }
          return horario;
        });
      }
  
      return horariosBase;
    }
  
    // Maneja el formulario de reserva
    document.getElementById('form-reserva').addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const peluquero = selectPeluquero.value;
      const horarioSeleccionado = horarioSeleccionadoInput.value;
      const fechaSeleccionada = fechaSeleccionadaInput.value;
  
      if (!horarioSeleccionado) {
        alert('Por favor, selecciona un horario.');
        return;
      }
  
      alert(`Gracias, ${nombre}. Tu reserva con ${peluquero} para el ${fechaSeleccionada} a las ${horarioSeleccionado} ha sido recibida.`);
      // Aquí podrías enviar los datos a un servidor
    });
  });

