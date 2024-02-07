    <template>
        <v-app>
            <v-app-bar scroll-behavior="fade-image inverted" density="prominent"  class="mx-auto d-flex align-center justify-center">
                <template v-slot:prepend>
                    <v-img class="mx-auto" contain lazy-src="../img/FQ.svg" width="140" src="../img/FQ.svg"></v-img> 
                    <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                </template>
                <!-- <v-container class="mx-auto d-flex align-center justify-center"> -->
                    <!-- <v-btn variant="text" icon="mdi mdi-menu" size="x-large" @click.stop="drawer = !drawer" v-if="drawer == false"></v-btn>
                    <v-btn variant="text" icon="mdi mdi-menu-open" size="x-large" @click.stop="drawer = !drawer" v-if="drawer == true"></v-btn> -->
                    <v-app-bar-title class="mx-auto d-flex  text-center text-wrap justify-center align-center">
                        Sistema de Registro de Usuarios <br> Facultad de Química
                    </v-app-bar-title>
                    <!--<v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>-->
                <!-- </v-container> -->
                <template v-slot:append>
                    <!-- <v-tooltip text="Activar/Desactivar modo oscuro"  location="left">
                        <template v-slot:activator="{ props }">
                            <v-btn variant="text" v-bind="props" @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Notificaciones"  location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn variant="text" v-bind="props" icon="mdi-bell-ring-outline"></v-btn>
                        </template>
                    </v-tooltip> -->
                    <v-chip size="large" :color="color" label>
                        Admin
                        <v-icon end icon="mdi-shield-account"></v-icon>
                    </v-chip>
                </template>
            </v-app-bar>
            <v-app-bar :color="color" elevation="1" height="18"></v-app-bar>
            <v-navigation-drawer v-model="drawer" floating permanent color="rgb(0, 0, 0, 0)">
                <v-card rounded="lg" elevation="3" class="mt-4 ml-1 mr-1">
                    <v-list density="compact">
                        <v-list-item title="Administrador" subtitle="Menú">
                            <template v-slot:prepend>
                                <v-avatar :color="color">
                                    <span class="text-h5">C</span>
                                </v-avatar>
                            </template>
                            <!-- <template v-slot:append>
                                <v-btn variant="text" @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
                            </template> -->
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list rounded="lg" shaped>
                        <v-list-item @click="cambiaColor(link.id)" v-for="link in links" :to="link.link" :value="link.id" :key="link.id" link :color="color" rounded="xl">
                            <template v-slot:prepend>
                                <v-icon left>
                                    {{ link.icon }}
                                </v-icon>
                            </template>
                            <v-list-item-title class="text-wrap"> {{ link.nombre }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item  key="5" link value="9" @click="cerrarSesion"  :color="color" rounded="xl">
                            <template v-slot:prepend>
                                <v-icon left>
                                    mdi-exit-to-app
                                </v-icon>
                            </template>
                            <v-list-item-title> Cerrar sesión </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-navigation-drawer>
            <v-main>
                <v-container fluid>
                    <v-sheet min-height="85vh" rounded="lg" elevation="1">
                        <router-view  v-on:tengo_resultados="onResultados"/>
                    </v-sheet>
                </v-container>
            </v-main>
            <v-dialog  v-model="value" persistent  width="600px"  >
                <v-card  class="rounded-xl" >
                <!--<v-img cover height="180" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" lazy-src="../img/FQ.jpg" src="../img/FQ.jpg"  class="bg-grey-lighten-2 align-end">
                    <v-card-title class="text-white text-center justify-center">Sistema de Información Curricular del Personal Académico</v-card-title>
                </v-img>-->
                <v-carousel cycle height="180"  hide-delimiters hide-delimiter-background :show-arrows="false"  >
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
                <v-card-title class="text-center" style="font-size: 1em" >
                   Ha caducado la sesión
                </v-card-title>
                <v-card-text class="text-center">
                    <v-list>
                    <v-list-item>
                        <v-text-field v-model="form1.user" :counter="15" label="Usuario" :error-messages="userErrors" @change="v$.form1.user.$touch()" @blur="v$.form1.user.$touch()" :color="color" :maxlength="15" 
                        prepend-icon="mdi-account-circle" @keypress.enter="validarForm" required></v-text-field>
                        <v-text-field v-model="form1.pass" class="mt-2" :color="color" :counter="10" :maxlength="10" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" :error-messages="passErrors" @change="v$.form1.pass.$touch()" @blur="v$.form1.pass.$touch()"
                            @click:append="show1 = !show1" label="Contraseña" prepend-icon="mdi-key" @keypress.enter="validarForm" required></v-text-field>
                        <v-btn :color="color" block @click="validarForm" class="mt-2" >Ingresar</v-btn>
                    </v-list-item>
                    <v-divider></v-divider>
                    </v-list>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-title style="font-size: 0.87em" class="justify-center text-center text-wrap"> 
                    <strong>Instituto Electoral de la Ciudad de México © {{ new Date().getFullYear() }}</strong> 
                    <p>Huizaches 25, Colonia Rancho Los Colorines, Tlalpan, C.P. 14386, Ciudad de México. {{ new Date().getFullYear() }}</p>
                </v-card-title>
                </v-card>
            </v-dialog>
            <v-footer inset width="auto" absolute padless :color="color" class="white--text text-center justify-center py-0 py-sm-0 py-xs-1 py-md-1 py-lg-1 py-xl-1" > 
                <v-card flat tile v-model="value2" :color="color" class="white--text text-center justify-center ma-0 pa-0">
                    <v-card-text class="white--text py-0">
                        <v-container class="fill-height align-content-center ma-0 pa-0" fluid >
                            <v-col cols="2" sm="5" md="3" class="d-flex justify-center align-center">
                                <v-img class="mx-auto" contain lazy-src="../img/FQ.svg" width="70" src="../img/FQ.svg"></v-img> 
                            </v-col>
                            <v-col cols="10" sm="7" md="9">
                                <strong>Secretaría de Planeación e Informática de la Facultad de Química © {{ new Date().getFullYear() }}</strong> 
                                <p>UNAM {{ new Date().getFullYear() }}</p>
                            </v-col>
                        </v-container >
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-app>
        
    </template>
    
    <script lang="ts">
        import { useVuelidate } from '@vuelidate/core'
        import { required, maxLength, helpers  } from '@vuelidate/validators'
        import { useSisecedStore } from '@/store/sisecedStore';
        import "@fontsource/montserrat/600.css";
        import router from "@/router";
        import type { Menu } from '@/models/types';
        import type {Axios} from 'axios'
        import { Usuario } from '@/models/types';
        import { useTheme } from 'vuetify'
        declare module '@vue/runtime-core' {
            export interface ComponentCustomProperties {
                $axios: Axios
                catTags: string[]
            }
        }

        export default {
            setup(){
                return{
                    v$: useVuelidate()
                }
            },
            data: () => ({
                drawer: true,
                value2: '',
                color: '#32215C',
                value: false, 
                show1: false,
                snackbar: false,
                textoTituloSnackbar: '',
                textoSnackbar: '',
                colorSnackbar: '',
                i: 0,
                textoTitulo: 'Sistema de Seguimiento a las Sesiones de los Consejos Distritales Proceso Electoral Local Ordinario 2023-2024',
                valid:true,
                form1:{
                    user: '',
                    pass: '',
                },
                form1Default:{
                    user: '',
                    pass: ''
                },
                /*links: <Array<Menu>>[
                    { id: 1, nombre: 'Nueva sesión', icon: 'mdi-checkbox-marked-outline', link: '/sesiones'},
                    { id: 2, nombre: 'Seguimiento a las Sesiones de los Consejos Distritales', icon: 'mdi-card-account-details-star', link:'/seguimiento'},
                    { id: 3, nombre: 'Monitor', icon: 'mdi-chart-line', link: '/monitor'},
                    { id: 4, nombre: 'Reportes', icon: 'mdi-file-excel', link: '/reportes'},
                ],*/
                links: <Array<Menu>>[]
            }),
            beforeRouteUpdate(to,from){
                console.log('Update', to.params);
            },
            beforeRouteEnter(to, from){
                console.log('Enter', to.params);
            },
            validations(){
                return{
                    form1:{
                    user: {required, maxLength: maxLength(15)},
                    pass: {required, maxLength: maxLength(10)}
                    }
                }
            },
            methods:{
                onResultados(datos: boolean) {
                    this.limpia();
                    this.value = datos;
                    localStorage.login = datos;
                },
                cambiaColor(id: number){
                    const colorState = useSisecedStore();
                    colorState.cambiaColor(id);
                    this.color = colorState.color;
                },
                cerrarSesion(){
                    this.cambiaColor(1);
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('links');
                    localStorage.removeItem('usuario');
                    localStorage.removeItem('idUsuario');
                    localStorage.removeItem('idDistrito');
                    localStorage.removeItem('usuario');
                    this.$router.push({name: 'Login'});
                },
                toggleTheme () {
                    //this.$vuetify.theme.global.name = this.$vuetify.theme.global.name == 'dark' ? 'light' : 'dark';
                    //Actualizado de información en Local Storage
                    localStorage.lightBlack = this.$vuetify.theme.global.name;
                },
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
                    }else{
                        const menuStore = useSisecedStore();
                        menuStore.creaMenu(typePerfil.menu[0].items);
                        localStorage.setItem('links', JSON.stringify(typePerfil.menu[0].items))
                        localStorage.jwt = typePerfil.token;
                        localStorage.admin = typePerfil.admin;
                        localStorage.login = false;
                        menuStore.creaSesionUsuario(<Array<Usuario>>typePerfil.usuarioJson[0]);
                        console.table(menuStore.usuario);
                        localStorage.idUsuario = JSON.stringify(typePerfil.usuarioJson[0].idUsuario);
                        localStorage.idDistrito = JSON.stringify(typePerfil.usuarioJson[0].idDistrito);
                        this.value = false;
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
            computed:{
                estadoColor(){
                    const colorStore = useSisecedStore();
                    this.color = colorStore.color;
                },
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
            watch: {
                //Observables asociados a las variables vue necesarias en el LocalStorage
                color(newColor){
                    localStorage.color = newColor;
                },
                //Otros Observables
            },
            mounted(){
                //Guardado de información en el LocalStorage
                //Color
                const colorStore = useSisecedStore();
                this.color = colorStore.color;
                this.links = colorStore.menuSys;
                if (localStorage.color) {
                    this.color = localStorage.color;
                }
                //Modo oscuro o claro
                if(localStorage.lightBlack){
                    const theme = useTheme()
                    theme.global.name.value = localStorage.lightBlack;
                }
                if(localStorage.links){
                    this.links = JSON.parse(localStorage.links);
                }
                console.table(colorStore.usuario);
                if( localStorage.login == true ){
                    this.limpia();
                    this.value = true;
                }
            },
        }
    </script>
    