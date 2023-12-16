import {
	// alias the core entity to not cause a naming conflict
	Product as MedusaProduct,
} from '@medusajs/medusa';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends MedusaProduct {
	@Column()
	color: string;
}
