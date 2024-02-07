<template>
    <v-container fluid class="text-center">
        <div class="d-flex align-center mt-2 flex-column">     
            <v-card elevation="1" variant="flat" :color="color">
                <v-card width="auto" elevation="1" variant="flat" :color="color">
                    <v-card-title class="mt-6 mb-6 text-center text-wrap">
                        <v-icon left>
                            mdi-card-account-details-star
                        </v-icon> Seguimiento de personas registradas
                    </v-card-title>
                    <!-- <v-col col="6" xs="12" sm="0" md="6" lg="8"> </v-col> -->
                    <v-row class="d-flex flex-md-row flex-column justify-center align-center text-center">
                        <v-col col="6" xs="12" sm="12" md="5" lg="5">
                            <v-text-field v-model="buscar1" :counter="200" maxlength ="200" bg-color="#078691"  autofocus base-color="black" clearable append-icon="mdi-magnify" label="Buscar"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card variant="outlined" :color="color" elevation="3">
                    <v-data-table density="compact" :color="color" :expanded="expanded" show-expand item-value="idSesion" :items-per-page="itemsPerPage" multi-sort
                    item-key="idSesion" :headers="headers1" :search="buscar1" :items="desserts1" no-data-text="No hay datos disponibles"
                    elevation="16" transition="scale-transition" origin="center center" :height="desserts1.length < 15 ? 'auto': '400' " hide-default-footer :page="page" fixed-header>
                        <template v-slot:[`item.editar`]="{ item }">
                            <v-btn :color="color" variant="text" @click="editar(item)" icon="mdi mdi-lead-pencil"></v-btn>
                        </template>
                        <template v-slot:[`item.eliminar`]="{ item }">
                            <v-btn color="red" variant="text" @click="eliminar(item)" icon="mdi-delete"></v-btn>
                        </template>
                        <template v-slot:bottom>
                            <v-container>
                                <v-row class="d-flex flex-md-row flex-column text-center">
                                    <v-col col="2" md="2"></v-col>
                                    <v-col col="8" md="8">
                                        <v-pagination v-model="page" :color="color" rounded="circle" :length="pageCount"></v-pagination>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>
                    </v-data-table>
                </v-card>
                <v-dialog v-model="dialogEdita" scrollable content-class="rounded-xl elevation-12" max-width="900" :retain-focus="false">
                    <v-card class="rounded-xl">
                        <v-img height="90" cover src="../img/fondo_nombre2.png" class="d-flex justify-center align-center text-center">
                            <v-card title="Editar usuario" class="text-white" color="rgba(0, 0, 0, 0)" variant="flat">
                            </v-card>
                        </v-img>
                        <v-card-text class="justify-center align-center text-center">
                            <!-- <v-virtual-scroll  :items="itemsScroll" height="500" item-height="80"> -->
                            <v-container fluid>
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
                                        <v-text-field type="text" :color="color" :counter="10" maxlength ="10" v-model="formEdited.tel" @keydown="filter($event)" label="Indicar número celular" variant="outlined" :error-messages="telErrors" @change="v$.formEdited.tel.$touch()" @blur="v$.formEdited.tel.$touch()" ref="tel"></v-text-field>
                                    </v-col>
                                    <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
                                        Correo electrónico *
                                    </v-col>
                                    <v-col col="12" xs="12" sm="12" md="6" lg="6">
                                        <v-text-field type="text" :color="color" :counter="50" maxlength ="50" v-model="formEdited.correo"  label="Indicar correo electrónico" variant="outlined" :error-messages="correoErrors" @change="v$.formEdited.correo.$touch()" @blur="v$.formEdited.correo.$touch()" ref="correo"></v-text-field>
                                    </v-col>
                                    <v-col col="12" xs="12" sm="12" md="4" lg="4" class="text-center">
                                        Curp *
                                    </v-col>
                                    <v-col col="12" xs="12" sm="12" md="6" lg="6">
                                        <v-text-field type="text" :color="color" :counter="20" maxlength ="20" v-model="formEdited.curp"  label="Indicar CURP" variant="outlined" :error-messages="curpErrors" @change="v$.formEdited.curp.$touch()" @blur="v$.formEdited.curp.$touch()" ref="curp"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <!-- </v-virtual-scroll> -->
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn variant="tonal" size="large" color="red" @click="dialogEdita = false"> Cerrar </v-btn>
                            <v-btn variant="tonal" :loading="submitForm" :disabled="submitForm" size="large" :color="color" @click="validarDatos"> Guardar </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogBorrar" persistent max-width="600" :retain-focus="false">
                    <v-card class="rounded-xl">
                        <v-img height="200" cover src="@/img/fondo_nombre2.png" class="d-flex justify-center align-center text-center">
                            <v-card :title="'¿Estas por borrar ' + formEdited.nombre + ' ' + formEdited.primerApellido + ' '+ formEdited.segundoApellido +' ?'" class="text-white" color="rgba(0, 0, 0, 0)" variant="flat">
                                <v-avatar :color="color" size="60">
                                    <v-icon large>
                                        mdi-delete-empty
                                    </v-icon>
                                </v-avatar>
                            </v-card>
                        </v-img>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn variant="tonal" size="large" color="red" @click="dialogBorrar = false"> Cerrar </v-btn>
                            <v-btn variant="tonal" size="large" :loading="submitForm" :disabled="submitForm" :color="color" @click="baja"> Guardar </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </div>
    </v-container>
    <v-snackbar v-model="snackbar" vertical :timeout="2000" :color="colorSnackbar" location="center"  elevation="24">
        <div class="text-subtitle-1 "><v-icon left>mdi-information-outline</v-icon> {{ textoTituloSnackbar }}</div>
        <p>{{ textoSnackbar }}</p>
        <div v-if="errors.length != 0" >
        <p v-for="error in errors" :key="error">
            {{ error }}
        </p>
        </div>
        <template v-slot:actions>f
        <v-btn variant="text" @click="snackbar = false">
            Cerrar
        </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
    import moment from 'moment';
    import { TimePicker } from "vue-material-time-picker";
    import "vue-material-time-picker/dist/style.css";
    import { useSisecedStore } from '@/store/sisecedStore';
    import { useVuelidate } from '@vuelidate/core'
    import { required, maxLength, minLength, email, helpers  } from '@vuelidate/validators'
    import 'moment/locale/es';
    import type {Axios} from 'axios'
    declare module '@vue/runtime-core' {
      export interface ComponentCustomProperties {
          $axios: Axios
          catTags: string[]
      }
    }
    moment.locale('es',{
        invalidDate: moment().format('DD-MM-YYYY')
    });
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
            expanded: [],
            page: 1,
            itemsPerPage: 50,
            buscar1:'',
            idSesionZip: 0,
            headers1: <any>[
                { title: 'Nombre', align: 'center', key: 'nombre'},
                { title: 'Primer apellido', align: 'center', key: 'primerApellido' },
                { title: 'Segundo apellido', align: 'center', key: 'segundoApellido' },
				{ title: 'Correo', align: 'center', key: 'correo'},
                { title: 'Núm.Celular', align: 'center', key: 'tel'},
                { title: 'CURP', align: 'center', key: 'curp'},
                { title: 'Editar', align: 'center', key: 'editar', sortable: false},
                { title: 'Eliminar', align: 'center', key: 'eliminar', sortable: false},
                //{ title: 'Minuta', align: 'center', key: 'minuta', sortable: false},
                //{ title: 'Acreditaciones', align: 'center', key: 'acreditacion', sortable: false},
                //{ title: 'Documentos de la Comisión', align: 'center', key: 'comision', sortable: false},
                //{ title: 'Reportes', align: 'center', key: 'reportes', sortable: false},
            ],
            desserts1: <any>[],
            formEdited:{
                idUsuario: '',
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                tel: '',
                correo: '',
                curp: ''
            },
            formEditedDefault:{
                idUsuario: '',
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                tel: '',
                correo: '',
                curp: ''
            },
            dialogEdita: false,
            dialogBorrar: false
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
        props: ['value'],
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
            editar(item: any){
                this.$nextTick(() => {
                    this.formEdited = Object.assign({}, item);
                });
                this.dialogEdita = true;
            },
            eliminar(item: any){
                this.$nextTick(() => {
                    this.formEdited = Object.assign({}, item);
                });
                this.dialogBorrar = true;
            },
            async validarDatos(){
                this.v$.$validate();
                //router.push('Central') 
                console.log(this.formEdited );
                if (!this.v$.formEdited.$invalid) {
                    const headers = {
                        'Content-Type': 'application/json',
                        'x-token-admin':localStorage.jwt
                    }
                    let postId = {
                        idUsuario: this.formEdited.idUsuario,
                        nombre: this.formEdited.nombre,
                        primerApellido: this.formEdited.primerApellido,
                        segundoApellido: this.formEdited.segundoApellido,
                        tel: this.formEdited.tel,
                        correo: this.formEdited.correo,
                        curp: this.formEdited.curp
                    };
                    this.submitForm = true;
                    const Response = await this.$axios.post('/usuarios/editar', postId, { headers: headers })
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
                        this.dialogEdita = false;
                    } else {
                        this.errors = [];
                        this.textoTituloSnackbar = 'Error';
                        this.textoSnackbar = Response.msg;
                        this.textoSnackbar = Response.response.data.msg;
                        this.colorSnackbar = 'red-darken-2';
                        this.snackbar = true;
                        this.submitForm = false;
                        this.dialogEdita = false;
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
            },
            async baja(){
                const headers = {
                        'Content-Type': 'application/json',
                        'x-token-admin':localStorage.jwt
                    }
                    let postId = {
                        idUsuario: this.formEdited.idUsuario,
                    };
                    this.submitForm = true;
                    const Response = await this.$axios.post('/usuarios/eliminar', postId, { headers: headers })
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
                        this.$nextTick(() => {
                            this.formEdited = Object.assign({}, this.formEditedDefault);
                        });
                        this.consultaUsuarios();
                        this.dialogBorrar = false;
                    } else {
                        this.errors = [];
                        this.textoTituloSnackbar = 'Error';
                        this.textoSnackbar = Response.msg;
                        this.textoSnackbar = Response.response.data.msg;
                        this.colorSnackbar = 'red-darken-2';
                        this.snackbar = true;
                        this.$nextTick(() => {
                            this.formEdited = Object.assign({}, this.formEditedDefault);
                        });
                        this.consultaUsuarios();
                        this.dialogBorrar = false;
                    }
            },
            async consultaUsuarios(){
                this.desserts1 = [];
                const headers = {
                    'Content-Type': 'application/json',
                    'x-token-admin':localStorage.jwt
                }
                const local = await this.$axios.get('/usuarios/consulta', { headers: headers })
                .then( function(response){
                    //console.log(response);
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
                if ( local == false ){
                    this.abrirPadre();
                } else {
                    if (local.ok != false){
                        this.desserts1 = local.usuariosDB;
                        console.log(this.desserts1);
                    }
                }
            }
        },
        computed: {
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
            pageCount () {
                return Math.ceil(this.desserts1.length / this.itemsPerPage)
            },
        },
        watch: {
            color(newColor){
                localStorage.color = newColor;
            },

        },
        mounted(){
            const colorStore = useSisecedStore();
            console.log(colorStore.color);
            this.color = colorStore.color;
            if (localStorage.color) {
                this.color = localStorage.color;
            }
            this.consultaUsuarios();
        },
        created(){
            
        }
    }

</script>
