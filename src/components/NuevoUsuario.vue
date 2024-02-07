<template>
    <div class="d-flex align-center flex-column">
        <v-card width="auto" elevation="1" variant="flat" :color="color">
          <v-card-title class="mt-6 text-center text-wrap">
            <v-icon left>
                mdi-checkbox-marked-outline
            </v-icon>
            Agregar un nueva persona
          </v-card-title>
          <v-card-subtitle class="text-center mb-6">Ingresar datos</v-card-subtitle>
        </v-card>
    </div>
    <v-container fluid class="mt-6">
      <v-row class="d-flex flex-md-row flex-column justify-center align-center text-center">
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Nombre(s) *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.nombre"  label="Indicar nombre(s)" variant="outlined" :error-messages="nombreErrors" @change="v$.formEdited.nombre.$touch()" @blur="v$.formEdited.nombre.$touch()" ref="nombre"></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Primer apellido *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.primerApellido"  label="Indicar primer apellido" variant="outlined" :error-messages="primerApellidoErrors" @change="v$.formEdited.primerApellido.$touch()" @blur="v$.formEdited.primerApellido.$touch()" ref="primerApellido"></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Segundo apellido *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.segundoApellido"  label="Indicar segundo apellido" variant="outlined" :error-messages="segundoApellidoErrors" @change="v$.formEdited.segundoApellido.$touch()" @blur="v$.formEdited.segundoApellido.$touch()" ref="segundoApellido"></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Número celular *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <v-text-field type="text" :color="color" :counter="10" maxlength ="10" @keydown="filter($event)" v-model="formEdited.tel"  label="Indicar número celular" variant="outlined" :error-messages="telErrors" @change="v$.formEdited.tel.$touch()" @blur="v$.formEdited.tel.$touch()"  ref="tel"></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Correo electrónico *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <!-- <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.correo"  label="Indicar correo electrónico" variant="outlined" :error-messages="correoErrors" @change="v$.formEdited.correo.$touch()" @blur="v$.formEdited.correo.$touch()" ref="correo" :rules="[rules.required, rules.email]"></v-text-field> -->
              <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.correo"  label="Indicar correo electrónico" variant="outlined" :error-messages="correoErrors" @change="v$.formEdited.correo.$touch()" @blur="v$.formEdited.correo.$touch()" ref="correo" ></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
              Curp *
          </v-col>
          <v-col col="12" xs="12" sm="12" md="6" lg="6">
              <v-text-field type="text" :color="color" :counter="20" maxlength ="20" v-model="formEdited.curp"  label="Indicar CURP" variant="outlined" :error-messages="curpErrors" @change="v$.formEdited.curp.$touch()" @blur="v$.formEdited.curp.$touch()" ref="curp"></v-text-field>
          </v-col>
          <v-col col="12" xs="12" sm="12" md="4" lg="4">
            <v-btn :color="color" block size="large" :loading="submitForm" :disabled="submitForm" @click="validarForm">
              <v-icon left>
                mdi-content-save-move-outline
              </v-icon> Guardar
            </v-btn>
          </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" vertical :timeout="2000" :color="colorSnackbar" location="center"  elevation="24">
      <div class="text-subtitle-1 "><v-icon left>mdi-information-outline</v-icon> {{ textoTituloSnackbar }}</div>
      <p class="text-wrap">{{ textoSnackbar }}</p>
      <div v-if="errors.length != 0" >
        <p v-for="error in errors" :key="error">
          {{ error }}
        </p>
      </div>
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">
  import "@fontsource/montserrat/600.css";
  import moment from 'moment';
  import { TimePicker } from "vue-material-time-picker";
  import "vue-material-time-picker/dist/style.css";
  import type { TDD } from '@/models/types';
  import { useSisecedStore } from '@/store/sisecedStore';
  import { useVuelidate } from '@vuelidate/core'
  import { required, maxLength, helpers, minLength, email } from '@vuelidate/validators'
  import 'moment/locale/es';
  moment.locale('es',{
    invalidDate: moment().format('DD-MM-YYYY')
  });
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  
  export default{
    emits: ["tengo_resultados"],
    components: {
      TimePicker
    },
    setup(){
      return{
        v$: useVuelidate()
      }
    },
    data: ()=>({
      submitForm: false,
      color: '',
      snackbar: false,
      colorSnackbar: '',
      textoTituloSnackbar: '',
      textoSnackbar: '',
      errors: <any>[],
      formEdited:{
          nombre: '',
          primerApellido: '',
          segundoApellido: '',
          tel: '',
          correo: '',
          curp: ''
      },
      formEditedDefault:{
          nombre: '',
          primerApellido: '',
          segundoApellido: '',
          tel: '',
          correo: '',
          curp: ''
      },
      rules: {
        required: (v : any) => !!v || 'Este campo es requerido',
        rfc: (v: any) => /^([A-ZÑ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})$/.test(v) || 'Ingresa un RFC válido',
        number: (v: any) => (!v || /^([0-9])+$/.test(v)) || 'Ingresa un número entero',
        decimal: (v: any) => (/^([0-9])+(.5)?$/.test(v) || !v) || 'Ingresa un número entero o decimal',
        email: (v: any) => /.+@.+\..+/.test(v) || 'Ingresa un correo válido',
        five: (v: any) => (!v || (v && v.length <= 5)) || 'Ingresa 5 dígitos como máximo',
        fifty: (v: any) => v && v.length <= 50 || 'Ingresa un correo de 50 caracteres como máximo',
        oneHundred: (v: any) => (!v || (v && v.length <= 100)) || 'Ingresa 100 caracteres como máximo',
        fourteen: (v: any) => !v || (v && v.length <= 14) || 'Ingresa 14 caracteres como máximo',
        ten: (v: any) => (!v || (v && v.length === 10)) || 'Ingresa un número de 10 dígitos',
        textarea: (v: any) => !v || (v && v.length <= 1000) || 'Ingresa 1000 caracteres como máximo',
        phone: (v: any) => /^([0-9])+$/.test(v) || 'Ingresa un número válido',
        phoneEmpty: (v: any) => (!v || /^([0-9])+$/.test(v)) || 'Ingresa un número válido',
      }
    }),
    validations:{
      formEdited:{    
        nombre: {required, maxLength: maxLength(50)},   
        primerApellido: {required, maxLength: maxLength(50)},
        segundoApellido: {required, maxLength: maxLength(50)},
        tel: {required, maxLength: maxLength(10), minLength: minLength(10)},
        correo: {required, maxLength: maxLength(50)},
        curp: {required, maxLength: maxLength(20)},
      },
    },
    computed:{
      nombreErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.nombre.$error) return errors
          this.v$.formEdited.nombre.required &&errors.push('Indicar el o los nombres')
          this.v$.formEdited.nombre.maxValue &&errors.push('El nombre no debe superar 50 caracteres')
          return errors
      },  
      primerApellidoErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.primerApellido.$error) return errors
          this.v$.formEdited.primerApellido.required &&errors.push('Indicar el primer apellido')
          this.v$.formEdited.primerApellido.maxValue &&errors.push('El primer apellido no debe superar 50 caracteres')
          return errors
      },  
      segundoApellidoErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.segundoApellido.$error) return errors
          this.v$.formEdited.segundoApellido.required &&errors.push('Indicar el segundo apellido')
          this.v$.formEdited.segundoApellido.maxValue &&errors.push('El segundo apellido no debe superar 50 caracteres')
          return errors
      }, 
      telErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.tel.$error) return errors
          this.v$.formEdited.tel.required &&errors.push('Indicar el número de contacto')
          this.v$.formEdited.tel.maxValue &&errors.push('El número no debe superar 10 digitos')
          this.v$.formEdited.tel.minLength &&errors.push('El número debe ser de al menos 10 digitos')
          return errors
      }, 
      correoErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.correo.$error) return errors
          this.v$.formEdited.correo.required &&errors.push('Indicar el correo')
          this.v$.formEdited.correo.maxValue &&errors.push('El correo no debe superar 50 caracteres')
          // this.v$.formEdited.correo.email &&errors.push('Debe ser un correo válido')
          return errors
      }, 
      curpErrors(){
          const errors: any = [];
          if(!this.v$.formEdited.curp.$error) return errors
          this.v$.formEdited.curp.required &&errors.push('Indicar la CURP')
          this.v$.formEdited.curp.maxValue &&errors.push('La CURP no debe superar 20 caracteres')
          return errors
      }, 
    },
    methods:{
      abrirPadre() {
        this.$emit('tengo_resultados', true);
      },
      filter: function(event: any){
        const code = window.Event ? event.which : event.keyCode;
        const isSpecial =
          code === 37 ||
          code === 39 ||
          code === 8 ||
          code === 46 ||
          code === 35 ||
          code === 36;
        const isDigit = code >= 48 && code <= 57;
        const isKeypad = code >= 96 && code <= 105;
        if (!isSpecial && !isDigit && !isKeypad) {
          // if not number or special (arrows, delete, home, end)
          event.preventDefault();
          return false;
        }
      },
      async validarForm(){
        this.v$.$validate();
        //router.push('Central') 
        console.log(this.formEdited );
        if (!this.v$.formEdited.$invalid) {
          const headers = {
            'Content-Type': 'application/json',
            'x-token-admin':localStorage.jwt
          }
          let postId = {
            nombre: this.formEdited.nombre,
            primerApellido: this.formEdited.primerApellido,
            segundoApellido: this.formEdited.segundoApellido,
            tel: this.formEdited.tel,
            correo: this.formEdited.correo,
            curp: this.formEdited.curp
          };
          this.submitForm = true;
          const Response = await this.$axios.post('/usuarios/agregar', postId, { headers: headers })
                              .then( function(response){
                                console.log(response.data);
                                return response.data;
                              }).catch( function(error){
                                console.log('Error: ', error);
                                let login = error.response.data.login;
                                if ( login == false ){
                                    return false
                                } else {
                                    return error;
                                }
                              });
          if ( Response == false ){
            this.abrirPadre();
          } else if (Response.ok){
            this.errors = [];
            this.textoTituloSnackbar = 'Correcto';
            this.textoSnackbar = Response.msg;
            this.colorSnackbar = this.color;
            this.snackbar = true;
            this.v$.$reset();
            this.$nextTick(() => {
              this.formEdited = Object.assign({}, this.formEditedDefault);
            });
            this.submitForm = false;
          } else {
            this.errors = [];
            this.textoTituloSnackbar = 'Error';
            this.textoSnackbar = Response.msg;
            this.textoSnackbar = Response.response.data.msg;
            this.colorSnackbar = 'red-darken-2';
            this.snackbar = true;
            this.submitForm = false;
          }
        } else {
          this.errors = [];
          if( this.formEdited.nombre == '' ){
            (<any>this.$refs.nombre).focus();
            this.errors.push('Indicar el nombre');
          } else if( this.formEdited.primerApellido == '' ){
            (<any>this.$refs.primerApellido).focus();
            this.errors.push('Indicar primer apellido');
          } else if( this.formEdited.segundoApellido == '' ){
            (<any>this.$refs.segundoApellido).focus();
            this.errors.push('Indicar segundo apellido');
          } else if( this.formEdited.tel == '' ){
            (<any>this.$refs.tel).focus();
            this.errors.push('Indicar el número de contacto');
          } else if( this.formEdited.correo == '' ){
            (<any>this.$refs.correo).focus();
            this.errors.push('Indicar el correo');
          } else if( this.formEdited.curp == '' ){
            (<any>this.$refs.curp).focus();
            this.errors.push('Indicar la CURP');
          } 
          //this.snackbar = true;
          //this.colorSnackbar = 'red-darken-2';
        }
      }
    },
    watch: {
        color(newColor){
            localStorage.color = newColor;
        }
    },
    mounted(){
        const colorStore = useSisecedStore();
        console.log(colorStore.color);
        this.color = colorStore.color;
        if (localStorage.color) {
            this.color = localStorage.color;
        }
        if( localStorage.login == false ){
          this.abrirPadre();
        }
    },
    created(){
      
    }
  }

</script>
