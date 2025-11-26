
export function extractErrorMessages(errorResponse: any): string {
  let errorsMessages = 'Une erreur inconnue est survenue.';

  if(errorResponse.error.message){
    return errorResponse.error.message;
  }

  if (errorResponse && errorResponse.error && errorResponse.error.errors) {
    errorsMessages = '';
    Object.values(errorResponse.error.errors).forEach((element: any) => {
      if (Array.isArray(element)) {
        errorsMessages += element.map(msg => `<p>${msg}</p>`).join('');
      } else {
        errorsMessages += `<p>${element}</p>`;
      }
    });
  } else if (errorResponse.message) {
      errorsMessages = errorResponse.message;
  }

  return errorsMessages ;
}
