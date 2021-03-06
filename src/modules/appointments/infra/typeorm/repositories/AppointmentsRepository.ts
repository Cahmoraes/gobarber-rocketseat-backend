import { getRepository, Repository, Raw } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '../entities/Appointment'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/findAllInMonthFromProviderDTO'
import IFindAllInDayFromProvider from '@modules/appointments/dtos/findAllInDayFromProviderDTO'


class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>
  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    })
    return appointments
  }

  public async findAllInDayProvider({ provider_id, month, year, day }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0')
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      }
    })
    return appointments
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date }
    })
    return findAppointment
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, user_id, date })
    await this.ormRepository.save(appointment)
    return appointment
  }
}

export default AppointmentsRepository