import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductUpdate1701635543480 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "product"' + ' ADD COLUMN "color" text');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "product" DROP COLUMN "color"');
	}
}
