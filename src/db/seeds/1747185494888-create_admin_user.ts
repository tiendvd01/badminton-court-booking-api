import { User } from '@modules/user/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class CreateAdminUser1747185494888 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const userRepository = dataSource.getRepository('users');
        
        const user = new User();
        user.name = 'Admin User';
        user.email = 'admin@gmail.com';
        user.password = 'admin123';
        user.role = 'admin';

        await userRepository.save(user);
    }
}
