import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../modules/user/entity/user.entity';
import * as bcrypt from 'bcrypt';

export const UserFactory = setSeederFactory(User, async (faker) => {
    const user = new User();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.phone = faker.phone.number();
    user.password = await bcrypt.hash('password123', 10);
    user.role = faker.helpers.arrayElement(['admin', 'owner', 'customer']);
    user.avatar_url = faker.image.avatar();
    user.address = faker.location.streetAddress();
    user.token_version = null;
    return user;
});
