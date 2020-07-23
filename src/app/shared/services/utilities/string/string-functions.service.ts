import { Injectable } from "@angular/core";

@Injectable()
export class StringFunctionsService {
  constructor() {}

  public capitalizeFirstLetter(data: string): string {
    if (typeof data !== "string") return "";
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  }

  public removeAccents(strAccents: string): string {
    let accents: string = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    let accentsOut: string[] = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    return strAccents.split('').map(
      (letter) => accents.indexOf(letter) != -1 ? accentsOut[accents.indexOf(letter)] : letter
    ).join(''); 
  }
}



