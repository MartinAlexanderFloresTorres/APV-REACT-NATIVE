export const formatearFecha = fecha => {
  const nuevaFecha = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
