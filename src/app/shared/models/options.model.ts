export interface SelectOption {
  value: number;
  label: string;
}

import { PaymentType } from '../../rides/models/ride.model';

export const PAYMENT_TYPE_OPTIONS: SelectOption[] = [
  {
    value: PaymentType.cash,
    label: 'cash',
  },
  {
    value: PaymentType.creditCard,
    label: 'card',
  },
];
