
import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import MailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'


interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: MailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}