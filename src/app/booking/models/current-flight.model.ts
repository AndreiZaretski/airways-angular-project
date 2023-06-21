import { IFlightInfo } from 'src/app/shared/models/interfaces';

export interface ICurrentFlightSummary {
  from: string;
  to: string;
  startDate: string;
  index: number;
  flightData?: IFlightInfo;
}
