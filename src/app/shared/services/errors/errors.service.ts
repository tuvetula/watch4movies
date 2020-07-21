export const defaultErrors = {
  required: () => `Ce champ est requis.`,
  email: () => `Veuillez entrer une adresse mail valide`,
  minlength: ({ requiredLength, actualLength }) => `Ce champ doit comporter au moins ${requiredLength} caractères.`,
}
