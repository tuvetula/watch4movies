export interface UserSignup {
  name: string;
  firstName: string;
  email: string;
  password: string;
}

export interface CredentialModel {
  email: string;
  password: string;
}
export interface UserFireAuth {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface UserFirestoreModel {
  uid: string;
  name: string;
  firstName: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean,
  isAdmin: boolean;
  createdAt: number;
  updatedAt: number;
}
