export interface RideView {
  id: number;
  startAddress: string;
  destinationAddress: string;
  arrivalDateTime: Date | string;
  passengerPhone: string;
  paymentType: PaymentType;
  price: number;
}

export class RideRequest {
  startAddress: string = '';
  destinationAddress: string = '';
  arrivalDateTime: Date | null = null;
  passengerPhone: string = '';
  paymentType: PaymentType = PaymentType.cash;
  price: number = 0;

  constructor(formValues: Partial<RideRequest> = {}) {
    Object.assign(this, formValues);
  }
}

export enum PaymentType {
  cash = 1,
  creditCard = 2,
}
