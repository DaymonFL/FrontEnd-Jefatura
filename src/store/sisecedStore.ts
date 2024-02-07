// Utilities
//import { createPinia } from 'pinia'

//export default createPinia()
// Utilities
import { defineStore } from 'pinia'
import type { Usuario, Menu } from '@/models/types'

export const useSisecedStore = defineStore('sisecedStore', {
  state: () => ({
    // Valores vistos por todo el proyecto
    usuario: <Array<Usuario>> [],
    color: '#32215C',
    menuSys: [],
    loggedIn: false
  }),
  getters:{

  },
  actions:{
    cambiaColor(id: number){
        if ( id == 1 ) {
            this.color="#32215C";
        } else if ( id == 2 ) {
            this.color="#00616B";
        } else if ( id == 3 ) {
            this.color="#B8885B";
        } else if ( id == 4 ) {
            this.color="#00695c";
        } else if ( id == 5 ) {
            this.color="#32215C"; //A6B75D
        } else if ( id == 6 ) {
            this.color="#588980";
        } else if ( id == 7 ) {
            this.color ="#DAB4CB";
        } else if ( id == 9 ) {
            this.color ="red";
        } else {
            this.color="#303030";
        }
    },
    creaMenu(items: any){
        console.log(items);
        this.menuSys = items;
        this.loggedIn = true;
    },
    creaSesionUsuario(items: Array<Usuario>){
        this.usuario = items;
    },
  }
})

