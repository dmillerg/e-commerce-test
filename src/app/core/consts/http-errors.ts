type ErrorKey = number | "default";

export const ERROR_MESSAGES: Record<ErrorKey, { title: string; message: string }> = {
  400: {
    title: 'Solicitud inválida',
    message: 'La información enviada no es correcta. Revisa los datos e inténtalo de nuevo.'
  },
  401: {
    title: 'No autorizado',
    message: 'Tu sesión ha expirado o no tienes permisos. Por favor inicia sesión nuevamente.'
  },
  403: {
    title: 'Acceso denegado',
    message: 'No tienes permisos para acceder a este recurso.'
  },
  404: {
    title: 'No encontrado',
    message: 'El recurso solicitado no existe o fue eliminado.'
  },
  500: {
    title: 'Error del servidor',
    message: 'Ha ocurrido un problema en el servidor. Intenta más tarde.'
  },
  0: {
    title: 'Sin conexión',
    message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
  },
  default: {
    title: 'Error inesperado',
    message: 'Ha ocurrido un error inesperado. Intenta nuevamente.'
  }
};
