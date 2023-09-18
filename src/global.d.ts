declare module "howler" {
  interface Howl {
    _emit: (event: string) => void;
    seek(seek: number, id?: number): this | number;
  }
}
