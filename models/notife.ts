export class Notife {



    constructor(
        fields: any,
        
        ) {
            for (const f in fields) {
                // @ts-ignore
                this[f] = fields[f];
     }
    }
  }

  export interface Notife {
    [prop: string]: any;
  }