import AppError from '@shared/errors/AppError'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appoitment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567'
    })

    expect(appoitment).toHaveProperty('id')
    expect(appoitment.provider_id).toBe('1234567')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234567'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234567'
    })).rejects.toBeInstanceOf(AppError)
  })

})