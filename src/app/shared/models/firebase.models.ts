export interface FirebaseErrorModel {
    code: string;
    message: string
}

export const firebaseErrors = {
    "auth/user-not-found": "Aucun utilisateur ne correspond à cet e-mail" ,
    "auth/email-already-in-use":
      "Un compte est déjà existant avec cette adresse mail.",
    "auth/wrong-password": "Le mot de passe n'est pas valide.",
    "auth/network-request-failed":
      "Une erreur de réseau (telle qu'un dépassement de délai, une connexion interrompue ou un hôte injoignable) s'est produite.",
  };

  export function getFirebaseErrorFrench(error: FirebaseErrorModel): string {
    switch(error.code){
      case "auth/user-not-found":{
        return "Aucun utilisateur ne correspond à cet e-mail"
      }
      case "auth/email-already-in-use": {
        return "Un compte est déjà existant avec cette adresse mail."
      }
      case "auth/wrong-password": {
        return "Le mot de passe n'est pas valide."
      }
      case "auth/network-request-failed": {
        return "Une erreur de réseau (telle qu'un dépassement de délai, une connexion interrompue ou un hôte injoignable) s'est produite."
      }
      return error.message;
    }
  }