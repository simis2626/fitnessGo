import {Activity} from './Activity';
/**
 * Created by andromeda on 28/5/17.
 */


export class ActivityWO {

  constructor(
    public _id?:number,
    public activity?:Activity,
    public date?:Date,
    public duration?:number,
    public intensity?: number,
    public weight?: number,
    public reps?:number,
    public distance?:number

  )  {}

}
