import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '../dtos/findAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/findAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(data: IFindAllInMonthFromProvider): Promise<Appointment[]>
  findAllInDayProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}