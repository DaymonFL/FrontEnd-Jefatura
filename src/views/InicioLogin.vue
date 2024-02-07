<style> .v-overlay__scrim { opacity: 0.04 !important; } </style>
<template>
  <div class="area" >
    <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
    </ul>
  </div >
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog  v-model="value" persistent  width="600px"  >
        <v-card  class="rounded-xl">
          <!--<v-img cover height="180" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" lazy-src="../img/FQ.jpg" src="../img/FQ.jpg"  class="bg-grey-lighten-2 align-end">
            <v-card-title class="text-white text-center justify-center">Sistema de Información Curricular del Personal Académico</v-card-title>
          </v-img>-->
          <v-carousel cycle height="180"  hide-delimiters hide-delimiter-background :show-arrows="false"  >
            <!-- <v-carousel-item key="1" src="../img/fondo_nombre1.png" cover gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"> -->
            <v-carousel-item key="1" cover gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.1)">
              <v-img class="mx-auto my-auto" cover lazy-src="../img/fondo_nombre1.png"  src="../img/fondo_nombre1.png">
                <v-card-title class="my-auto text-white text-wrap text-center justify-center align-center flex-sm-grow-0" style="width: 100%; white-space: normal;"><br><br>{{ textoTitulo }}</v-card-title>
              </v-img> 
            </v-carousel-item>
            <v-carousel-item key="2" cover gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.1)">
              <v-img class="mx-auto" cover lazy-src="../img/fondo_nombre2.png"  src="../img/fondo_nombre2.png">
                <v-card-title class="text-white text-wrap text-center justify-center align-center flex-sm-grow-0" style="width: 100%; white-space: normal;"><br><br>{{ textoTitulo }}</v-card-title>
              </v-img> 
            </v-carousel-item>
            <v-carousel-item key="3" cover gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.1)">
              <v-img class="mx-auto" cover lazy-src="../img/fondo_nombre3.png"  src="../img/fondo_nombre3.png">
                <v-card-title class="text-white text-wrap text-center justify-center align-center flex-sm-grow-0" style="width: 100%; white-space: normal;"><br><br>{{ textoTitulo }}</v-card-title>
              </v-img> 
            </v-carousel-item>
          </v-carousel>
          <v-card-title class="text-center" style="font-size: 1em">
            Ingresar usuario y contraseña de acceso
          </v-card-title>
          <v-card-text class="text-center">
            <v-list>
              <v-list-item>
                  <v-text-field v-model="form1.user" :counter="15" label="Usuario" :error-messages="userErrors" @change="v$.form1.user.$touch()" @blur="v$.form1.user.$touch()" color="#32215C" :maxlength="15" 
                  prepend-icon="mdi-account-circle" @keypress.enter="validarForm" required></v-text-field>
                  <v-text-field v-model="form1.pass" class="mt-2" color="#32215C" :counter="10" :maxlength="10" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" :error-messages="passErrors" @change="v$.form1.pass.$touch()" @blur="v$.form1.pass.$touch()"
                    @click:append="show1 = !show1" label="Contraseña" prepend-icon="mdi-key" @keypress.enter="validarForm" required></v-text-field>
                  <v-btn color="#32215C" block @click="validarForm" class="mt-2" >Ingresar</v-btn>
              </v-list-item>
              <v-divider></v-divider>
              <!-- <v-list-item class="text-center align-center">
                <v-chip-group>
                  <v-chip class="ma-2" color="#32215C" prepend-icon="mdi-key-remove">Olvidé mi contraseña</v-chip>
                  <v-chip class="ma-2" color="#32215C" @click="limpia" prepend-icon="mdi-eraser">Limpia</v-chip>
                </v-chip-group>
              </v-list-item> -->
            </v-list>
          </v-card-text>
          <v-divider class="mx-auto"></v-divider>
          <v-card-title style="font-size: 0.87em" class="justify-center text-center text-wrap"> 
            <strong>Secretaría de Planeación e Informática de la Facultad de Química © {{ new Date().getFullYear() }}</strong> 
            <p>UNAM {{ new Date().getFullYear() }}</p>
          </v-card-title>
          <div class="text-caption mx-3 my-0 py-0 text-right">1.0Beta</div>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
  <v-snackbar v-model="snackbar" vertical :timeout="2000" :color="colorSnackbar" location="top"  elevation="24">
    <div class="text-subtitle-1 "><v-icon left>mdi-information-outline</v-icon> {{ textoTituloSnackbar }}</div>
    <p>{{ textoSnackbar }}</p>
    <template v-slot:actions>
      <!-- <v-btn variant="text" @click="snackbar = false">
        Cerrar
      </v-btn> -->
    </template>
  </v-snackbar>
</template>

<script lang="ts">
  import { useVuelidate } from '@vuelidate/core'
  import { required, maxLength, helpers  } from '@vuelidate/validators'
  import router from "@/router";
  import "@fontsource/montserrat/600.css";
  import type {Axios} from 'axios'
  import { useSisecedStore } from '@/store/sisecedStore';
  import { Usuario } from '@/models/types';
  declare module '@vue/runtime-core' {
      export interface ComponentCustomProperties {
          $axios: Axios
          catTags: string[]
      }
  }
  export default {
    name: 'InicioLogin',
    setup(){
      return{
        v$: useVuelidate()
      }
    },

    data() {
      return {
        value: true, 
        show1: false,
        snackbar: false,
        textoTituloSnackbar: '',
        textoSnackbar: '',
        colorSnackbar: '',
        i: 0,
        textoTitulo: 'Sistema de Registro de Usuarios',
        form1:{
          user: '',
          pass: '',
        },
        form1Default:{
          user: '',
          pass: ''
        }
      }
    },
    validations(){
      return{
        form1:{
          user: {required, maxLength: maxLength(15)},
          pass: {required, maxLength: maxLength(10)}
        }
      }
    },
    computed:{
      userErrors(){
        const errors: any = [];
        if(!this.v$.form1.user.$error) return errors
          this.v$.form1.user.required &&errors.push('Indicar un nombre de usuario')
          this.v$.form1.user.maxLength && errors.push('El nombre de usuario no debe exceder los 15 caracteres')
        return errors
      },
      passErrors(){
        const errors: any = [];
        if(!this.v$.form1.pass.$error) return errors
          this.v$.form1.pass.required&&errors.push('Indicar una contraseña')
          this.v$.form1.pass.maxLength&&errors.push('La contraseña no debe exceder los 10 caracteres')
        return errors
      }
    },
    methods:{
      async validarForm(){
        this.v$.$validate();
        //router.push('Central') 
        if (!this.v$.form1.$invalid) {
          /*if ( this.form1.user == 'central') {
            router.push('/central')
          } else if ( this.form1.user == 'distrital' ){
            router.push('/distrital')
          }*/
          let formData = new FormData();
          formData.append('usuario', this.form1.user);
          formData.append('contrasena', this.form1.pass);
          let postId = {
                      usuario: this.form1.user,
                      contrasena: this.form1.pass
                    };
          const typePerfil = await this.$axios.post('/login/', postId)
                              .then( function(response){
                                console.log(response.data);
                                return response.data;

                              }).catch( function(error){
                                  console.log('Error: ', error.response.data);
                                  return error.response.data;

                              });
          if ( typePerfil.ok == false ){
            this.snackbar = true;
            this.colorSnackbar = 'red-darken-2';
            this.textoTituloSnackbar = 'Error';
            this.textoSnackbar = typePerfil.msg;
            this.limpia();
          }else{
            const menuStore = useSisecedStore();
            menuStore.creaMenu(typePerfil.menu[0].items);
            menuStore.creaSesionUsuario(<Array<Usuario>>typePerfil.usuarioJson[0]);
            console.table(menuStore.usuario);
            localStorage.idUsuario = JSON.stringify(typePerfil.usuarioJson[0].idUsuario);
            localStorage.setItem('links', JSON.stringify(typePerfil.menu[0].items))
            localStorage.jwt = typePerfil.token;
            localStorage.admin = typePerfil.admin;
            localStorage.login = false;
            console.log(typePerfil.link);
            router.push(typePerfil.link);
          }
        } else {
          console.log('Login todo mal');
        }
      },
      limpia(){
        this.v$.$reset();
        this.$nextTick(() => {
          this.form1 = Object.assign({}, this.form1Default);
        });
      }
    },  

    mounted(){

    },

    
  }
</script>
