import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerNewsletterUpdate1701636741644
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE "customer"' + ' ADD COLUMN "accepts_newsletter" boolean'
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'ALTER TABLE "customer" DROP COLUMN "accepts_newsletter"'
		);
	}
}
