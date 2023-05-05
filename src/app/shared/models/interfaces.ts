export interface IAirResponse {
  from: string,
  to: string,
  way: string,
  thereWay: {
    startTime: string,
    timeWay: number,
    flightNumber: string,
    price: number,
    available: number,
    getDay: Array<number>,
    direct: boolean,
    airportRedirect: string[],
  },
  backWay?: {
    startTimeBack: string,
    timeWayBack: number,
    flightNumberBack: string,
    priceBack: number,
    availableBack: number,
    getDayBack: number[],
    directBack: boolean,
    airportRedirectBack: string[],
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
