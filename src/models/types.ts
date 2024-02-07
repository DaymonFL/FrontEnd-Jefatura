export interface Usuario {
    idUsuario: number,
    idDistrito: number,
    nombre: string,
    tipoUsuario: number,
    estado: number | null,
    jwt: string
}

export interface SubMenu {
    subId: number,
    subnombre: string,
    subLink: string,
    icon: string
}

export interface Menu {
    id: number,
    nombre: string,
    icon: string,
    link: string,
    submenu:  object | null,
    subnombre: string | null
    
}

export interface TDD {
    name: string,
    value: number
}

export interface ReportesC {
    nombre: string, 
    tipo: number,
    link: string
}

export interface AxiosOptions {
    baseUrl?: string
    token?: string
}

export interface Archivos{
    name: string,
    type: string,
    size: number,
    lastModified: number,

}

export interface Integrantes{
    idIntegrante: string | symbol | number | undefined,
    siglas: string | null,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    cargo: string | number |boolean | undefined,
    nombrePartido: string | null,
    logoPartido: string | null,
    siglasPartido: string | null,
    nombre1: string | null,
    primerApellido1: number | null,
    segundoApellido1: number | null
    nombre2: string | null,
    primerApellido2: number | null,
    segundoApellido2: number | null
    idIntegrantePartido1: string | symbol | number | undefined,
    idIntegrantePartido2: string | symbol | number | undefined,
    PS1: string | null,
    PS2: string | null,
    PS: string | null,
    asistencia: string | boolean,
    votacion: string | null
}
