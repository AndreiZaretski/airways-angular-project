export interface IAirResponse {
  from: string,
  to: string,
  way: string,
  endDate: string,
  startDate: string,
  thereWay: IFlightInfo[],
  backWay?: IFlightInfo[],
}

export interface IFlightInfo {
  startTime: string,
  timeWay: number,
  flightNumber: string,
  price: number,
  available: number,
  isFlight: boolean,
  direct: {
    isDirect: boolean,
    airportRedirect: string[]
  }
}

export interface IAirRequest {
  from: string,
  to: string,
  way: string,
  endDate: string,
  startDate: string,
  passengersCount: number
}

export interface ISearchForm {
  startDate: string,
  endDate: string,
  passengers: [] | unknown,
  route: {
    fromLocation: string,
    toLocation: string,
  }
  way: string,
}
