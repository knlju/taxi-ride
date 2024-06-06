import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  RideView,
  RideRequest,
  PaymentType,
} from '../models/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private rides: RideView[] = [
    {
      id: 1,
      startAddress: '123 Main St',
      destinationAddress: '456 Elm St',
      arrivalDateTime: new Date(),
      passengerPhone: '+1234567890',
      paymentType: PaymentType.cash,
      price: 25,
    },
    {
      id: 2,
      startAddress: '1233 Main St',
      destinationAddress: '4565 Elm St',
      arrivalDateTime: new Date(),
      passengerPhone: '+12345678900',
      paymentType: PaymentType.cash,
      price: 25.8,
    },
  ];
  private nextId = 3;

  constructor() {}

  get(): Observable<RideView[]> {
    return of(this.rides);
  }

  add(request: RideRequest): Observable<RideView> {
    const newRide: RideView = {
      id: this.nextId++,
      startAddress: request.startAddress,
      destinationAddress: request.destinationAddress,
      arrivalDateTime: request.arrivalDateTime || new Date().toISOString(),
      passengerPhone: request.passengerPhone,
      paymentType: request.paymentType,
      price: request.price,
    };
    this.rides.push(newRide);
    return of(newRide);
  }

  getById(id: number): Observable<RideView | null> {
    const rides = this.rides.find((b) => b.id === id) || null;
    return of(rides);
  }
}
