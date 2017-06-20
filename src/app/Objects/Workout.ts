import {ActivityWO} from "./ActivityWO";
/**
 * Created by andromeda on 28/5/17.
 */


export class Workout {

  constructor(
    public _userid?: string,
    public duration?:number,
    public date?:Date,
    public stretchesDone?:boolean,
    public activities?:ActivityWO[]
  )
  {}

}
