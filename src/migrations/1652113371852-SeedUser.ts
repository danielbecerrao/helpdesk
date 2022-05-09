import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedUser1652113371852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('123456', salt);
    const users = [];
    for (let index = 1; index <= 10; index++) {
      const user = {
        name: `tecnico${index}`,
        username: `tecnico${index}`,
        salt: salt,
        password: password,
      };
      users.push(user);
    }
    await getRepository('users').save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
