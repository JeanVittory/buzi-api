import { Users } from 'src/shared/types';

export default class UserDTO {
  id: string;
  name: string;
  lastname: string;
  email: string;
  constructor(user: Users) {
    this.id = user._id;
    this.name = user.name;
    this.lastname = user.lastname;
    this.email = user.email;
  }
}
const usersDTO = (users: Users) => {
  if (Array.isArray(users)) {
    return users.map((user) => {
      return { ...new UserDTO(user) };
    });
  } else {
    return { ...new UserDTO(users) };
  }
};

export { usersDTO };
