import {
	// alias the core entity to not cause a naming conflict
	Customer as MedusaCustomer,
} from '@medusajs/medusa';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends MedusaCustomer {
	@Column()
	accepts_newsletter: boolean;
}
