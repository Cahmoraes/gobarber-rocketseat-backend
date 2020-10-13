export default interface IHashProvider {
  generateHash(playload: string): Promise<string>
  compareHash(playload: string, hased: string): Promise<boolean>
}