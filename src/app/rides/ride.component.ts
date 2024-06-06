import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RideView, PaymentType } from './models/ride.model';
import { RideService } from './services/ride.service';
import { AddRideDialogComponent } from './components/addRidesDialog/addRidesDialog.component';

@Component({
  selector: 'app-rides',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent implements OnInit {
  dataSource = new MatTableDataSource<RideView>([]);
  displayedColumns = [
    'startAddress',
    'destinationAddress',
    'arrivalDateTime',
    'passengerPhone',
    'paymentType',
    'price',
    'actions',
  ];
  isLoading = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private rideservice: RideService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.rideservice.get().subscribe({
      next: (data: RideView[]) => (this.dataSource.data = data),
      error: (error: any) => console.error(error),
      complete: () => (this.isLoading = false),
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddRideDialogComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isSubmitted) {
        this.loadData();
      }
    });
  }

  onDetail(element: RideView): void {
    this.router.navigate(['/detail', element.id]);
  }

  protected readonly PaymentType = PaymentType;
}
