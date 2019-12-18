export interface Candidat {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  sexe: string;
  adresse: string;
  dateNaiss: string;
  tel: string;
  cin: string;
  // todo
  image: any;

  comm_enr: string; comm_resid: string;
  prenomP: string; nomM: string; prenomM: string;
  nation: string; sang_grp: string; sit_fam: string;

  examens: any;
}
