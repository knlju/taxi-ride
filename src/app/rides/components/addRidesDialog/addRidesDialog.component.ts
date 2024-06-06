import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RideService } from '../../services/ride.service';
import { RideRequest, PaymentType } from '../../models/ride.model';
import {
  PAYMENT_TYPE_OPTIONS,
  SelectOption,
} from '../../../shared/models/options.model';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { creditCardValidator } from '../../validators/credit-card.validator';

@Component({
  selector: 'app-add-ride-dialog',
  templateUrl: './addRidesDialog.component.html',
  styleUrls: ['./addRidesDialog.component.css'],
})
export class AddRideDialogComponent {
  form: FormGroup;
  options: SelectOption[] = PAYMENT_TYPE_OPTIONS;
  isLoading = false;
  PaymentType = PaymentType;

  constructor(
    private dialogRef: MatDialogRef<AddRideDialogComponent>,
    private rideService: RideService,
    private ngZone: NgZone,
  ) {
    this.form = new FormGroup({
      startAddress: new FormControl('', [Validators.required]),
      destinationAddress: new FormControl('', [Validators.required]),
      arrivalDateTime: new FormControl('', [Validators.required]),
      passengerPhone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{10,15}$/),
      ]),
      price: new FormControl(0, [Validators.required]),
      paymentType: new FormControl(null, [Validators.required]),
      card: new FormGroup({
        number: new FormControl({ value: '', disabled: true }, [
          Validators.required,
          creditCardValidator,
        ]),
        expiresAt: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
      }),
    });

    this.form.get('paymentType')?.valueChanges.subscribe((value) => {
      const cardGroup = this.form.get('card');
      if (value === PaymentType.creditCard) {
        cardGroup?.get('number')?.enable();
        cardGroup?.get('expiresAt')?.enable();
      } else {
        cardGroup?.get('number')?.disable();
        cardGroup?.get('expiresAt')?.disable();
      }
    });

    this.form.get('startAddress')?.valueChanges.subscribe(() => {
      this.calculatePrice();
    });

    this.form.get('destinationAddress')?.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
  }

  calculatePrice(): void {
    const startAddress = this.form.get('startAddress')?.value;
    const destinationAddress = this.form.get('destinationAddress')?.value;
    if (startAddress && destinationAddress) {
      const distance = Math.random() * 10;
      const price = distance * 1.5 + Math.random() * 5;
      this.form.get('price')?.setValue(price.toFixed(2));
    }
  }

  submit(): void {
    if (this.form.invalid) {
      alert('Some fields are invalid');
      return;
    }
    this.isLoading = true;
    const request = new RideRequest(this.form.value);
    this.rideService.add(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close({ isSubmitted: true });
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
