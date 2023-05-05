export interface IUserBooking {

  userFlights: {
    from: string,
    to: string,
    way: string,
    fromFlight:{
      date: string,
      time: string,
      timeWay: string,
      flightNumber: string,
      price: number,
      available: number,
      direct: boolean,
      airportRedirect: string,
      checked: boolean,
    },
    toFlight?:{ date: string,
      time: string,
      timeWay: string,
      flightNumber: string,
      price: number,
      available: number,
      direct: boolean,
      airportRedirect: string,
      checked: boolean, },
  },

  passengersCount: {
    adult: number,
    child: number,
    infant: number,
  }

  userPassengers:{
    adult: Array<IPassengersData>,
    child: Array<IPassengersData>,
    infant: Array<IPassengersData>,
    contactsDetail: {
      countriCode: string,
      phoneNumber: string,
      email: string,
    }
  }
}

export interface ICartsData {
  cartShoppings: Array<IUserBooking>
}

interface IPassengersData {
  firstName: string,
  lastName: string,
  gender: string,
  dateBirth: string,
  bagage?: string,
  specialAssistance?: boolean,
}
