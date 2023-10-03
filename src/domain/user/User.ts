import { JsonController, Get, Post, Body, Param } from 'routing-controllers';
import { models } from '../../models';
import { CreateUser } from 'models/user';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

@JsonController('/user')
export default class User {
  @Get()
  async getAll() {
    return 'Get all';
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return `Get by id ${id}`;
  }

  @Post()
  async setUser(@Body() body: CreateUser) {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new Error('Validation failed');
    }

    const { email, password } = body;
    const user = await models.User.findOne({ email });

    if (user) throw new Error('Email already in use');

    const hashPass = await bcrypt.hash(password, 10);

    let avatar = gravatar.url(email);
    avatar += '?d=identicon';

    const newUser = await models.User.create({ ...body, password: hashPass, avatar });

    return newUser;
  }
}
