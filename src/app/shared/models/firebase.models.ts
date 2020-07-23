export interface FirebaseErrorModel {
    code: string;
    message: string
}

export const firebaseErrors = {
    "auth/user-not-found": "Aucun utilisateur ne correspond à cet e-mail",
    "auth/email-already-in-use":
      "Un compte est déjà existant avec cette adresse mail.",
    "auth/wrong-password": "Le mot de passe n'est pas valide.",
    "auth/network-request-failed":
      "Une erreur de réseau (telle qu'un dépassement de délai, une connexion interrompue ou un hôte injoignable) s'est produite.",
  };