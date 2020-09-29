import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../infra/typeorm/entities/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '@shared/errors/AppError'

interface Request {
  date: Date
  provider_id: string
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appoitmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appoitmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appoitmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService