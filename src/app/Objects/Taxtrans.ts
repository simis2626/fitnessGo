/**
 * Created by andromeda on 28/5/17.
 */


export class TaxTrans {

  constructor(public _id:string,
              public Date: Date,
              public Details:string,
              public Category:string,
              public Account:string,
              public YearMonth:string,
              public Day:string,
              public claim:boolean,
              public note:string) {
  }
}
