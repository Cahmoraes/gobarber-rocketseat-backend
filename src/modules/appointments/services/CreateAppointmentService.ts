import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  date: Date,
  user_id: string
  provider_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {
    const appoitmentDate = startOfHour(date)

    if (isBefore(appoitmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    if (getHours(appoitmentDate) < 8 || getHours(appoitmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm.')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appoitmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appoitmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService