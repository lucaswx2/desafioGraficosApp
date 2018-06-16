import { Attributes } from "./attributes.model";

export class Dispositivo {
    '@attributes': Attributes;
    'pressao'?: number;
    'temperatura'?: number;
    'armazenamento'?: number;
}