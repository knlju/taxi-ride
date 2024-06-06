import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideService } from '../../services/ride.service';
import { RideView, PaymentType } from '../../models/ride.model';

@Component({
  selector: 'app-ridesDetail',
  templateUrl: './ridesDetail.component.html',
  styleUrls: ['./ridesDetail.component.css'],
})
export class RidesDetailComponent implements OnInit {
  rides: RideView | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideservice: RideService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.getRide(id);
    } else {
      alert('Invalid ID');
      this.isLoading = false;
    }
  }

  getRide(id: number): void {
    this.rideservice.getById(id).subscribe({
      next: (response: RideView | null) => {
        if (response) {
          this.rides = response;
        } else {
          alert('Ride not found');
        }
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.isLoading = false;
      },
    });
  }

  getPaymentTypeLabel(type: PaymentType): string {
    switch (type) {
      case PaymentType.cash:
        return 'Cash';
      case PaymentType.creditCard:
        return 'Credit Card';
      default:
        return 'Unknown';
    }
  }

  onList(): void {
    this.router.navigateByUrl('/rides');
  }
}
