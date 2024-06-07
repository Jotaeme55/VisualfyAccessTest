<template>
    <Toast />
    <div class="flex align-items-center justify-content-center overflow-hidden mt-5 mb-5">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img :src="topbarImage()" alt="Logo" class="mb-5"> -->
            </div>
            <div class="col-12 xl:col-6" style=" padding:0.3rem;">
                <div class="h-full w-full m-0 py-7 px-4" :style="'background: #1D3557'">
                    <div class="text-center mb-5">
                        <img :src="topbarImage()" alt="Logo" class="mb-3" width="100">
                        <div class=" font-medium mb-3" style="font-size:2.5rem; color:#FCC200; font-family:'Roboto';">Crea tu cuenta</div>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="emailId" class="block text-900 text-xl mb-2" style="font-size:1.2rem; color:#ffffff !important; font-family: 'Montserrat';">Email</label>
                        <InputText v-model="user.email" name="email" id="emailId" @keypress.enter="generateConfirmationCode()"
                        :class="{'p-invalid': error.field === 'email'} + '; w-full mb-2'" placeholder="Email" style="padding:1rem;" />
                        <small class="p-invalid" :key="errorEmail" v-if="enviado && (errorEmail || errorUser)">{{this.errorEmail}}{{ this.errorUser }}</small>
                
                        <label for="passwordId" class="block text-900 text-xl mt-2 mb-2" style="font-size:1.2rem; color:#ffffff !important; font-family: 'Montserrat';">Contraseña</label>
                        <Password v-model="user.password" name="password" id="passwordId" :feedback="false" @keypress.enter="generateConfirmationCode()" 
                        :class="{'p-invalid': error.field === 'password'}" placeholder="Contraseña" :toggleMask="true"
                        class="w-full mb-2" inputClass="w-full" inputStyle="padding:1rem" />
                        <small class="p-invalid" :key="errorPassword" v-if="enviado && errorPassword">{{this.errorPassword}}</small>

                        <!-- Checkbox -->
                        <div class="div-checkbox mt-2 flex align-items-center">
                            <Checkbox v-model="checked" :binary="true"/>
                            <label style="color: white;" class="ml-2"> He leído los <b @click="mostrarTerminos" style="color: #FCC200; cursor: pointer;">términos y condiciones</b> del servicio </label>
                        </div>
                        <!-- Checkbox -->
                        <small class="p-error" v-if="error.message === 'Missing credentials'">¡Algunos campos están en blanco!</small>

                        <div class="grid justify-content-center mt-5">
                            <Button type="button" icon="pi pi-user-plus" label="Registrarse" class="p-3 text-xl text-900 col-12 md:col-5 mt-2" 
                            @click="generateConfirmationCode()" style="background-color:var(--surface-card)" />
							
                        </div>
						<div class="grid justify-content-center mt-5">
							<h4 class="style" style="color: white;font-size: large; font-style: Roboto;">¿Ya tienes una cuenta?&ensp; </h4>
							<router-link  class="iniciosesion" to="/login">
								<h4 class="colortexto" style="color: #457B9D;font-size: large; font-style: Roboto;">Inicia Sesión</h4>
							</router-link>
                        </div>
						<div style="border:0.5px solid #FCC200; margin-top: 1%;"></div>
						<div class="grid justify-content-center mt-5">
							
							<Button type="button" icon="pi pi-google" label="Google" class="p-3 text-xl text-900 col-12 md:col-5 mt-2" 
							@click="signUpWithGoogle()" style="background-color:var(--surface-card)" />	
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog id="dialogo" ref="dialog" tabindex="-1" :header="'Introduce el código de confirmación'" :closable=false
            v-model:visible="displayConfirmation" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{'box-shadow': `4px 4px 13px #1D3557`,width: '70vw'}"  @keyup="selectSquare">
            <div style="display: flex; flex-direction: column;">
                <div>
                    <p>
                        Revisa tu bandeja de entrada, el código de confirmación está esperando.
                    </p>
                </div>
                <br>
                <div id="code-container">
                    <div v-for="(square, index) in squares" :key="index" :id="'square'+ index" :class="'code-square' ">
                        {{ code[index] }}
                    </div>
                </div>
                <br>
            </div>
        </Dialog>
        <Dialog v-model:visible="displayTerminos" modal header="Términos y condiciones" :style="{ width: '50vw' }">
            <div style="display: flex; flex-direction: column;">

              
            <p>Aviso Legal</p>
                <p><br></p>
                <p>I. INFORMACI&Oacute;N GENERAL</p>
                <p><br></p>
                <p>En cumplimiento con el deber de informaci&oacute;n dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Informaci&oacute;n y el Comercio Electr&oacute;nico (LSSI-CE) de 11 de julio, se facilitan a continuaci&oacute;n los siguientes datos de informaci&oacute;n general de este sitio web:</p>
                <p><br></p>
                <p>La titularidad de este sitio web, beelasy.com, (en adelante, Sitio Web) la ostenta: JOS&Eacute; MANUEL TABARES RODR&Iacute;GUEZ cuyo NIF es 77926820Z y cuyos datos de contacto son:</p>
                <p><br></p>
                <p>Direcci&oacute;n:</p>
                <p>Calle Pag&eacute;s del Corro 5</p>
                <p>41010 Sevilla (Sevilla)</p>
                <p>Espa&ntilde;a</p>
                <p>Tel&eacute;fono de contacto: 688916825</p>
                <p>Email de contacto: infobeelasy@gmail.com</p>
                <p><br></p>
                <p><br></p>
                <p>II. T&Eacute;RMINOS Y CONDICIONES GENERALES DE USO</p>
                <p><br></p>
                <p>El objeto de las condiciones: El Sitio Web</p>
                <p><br></p>
                <p>El objeto de las presentes Condiciones Generales de Uso (en adelante, Condiciones) es regular el acceso y la utilizaci&oacute;n del Sitio Web. A los efectos de las presentes Condiciones se entender&aacute; como Sitio Web: la apariencia externa de los interfaces de pantalla, tanto de forma est&aacute;tica como de forma din&aacute;mica, es decir, el &aacute;rbol de navegaci&oacute;n; y todos los elementos integrados tanto en los interfaces de pantalla como en el &aacute;rbol de navegaci&oacute;n (en adelante, Contenidos) y todos aquellos servicios o recursos en l&iacute;nea que en su caso ofrezca a los Usuarios (en adelante, Servicios).</p>
                <p><br></p>
                <p>BeeLasy se reserva la facultad de modificar, en cualquier momento, y sin aviso previo, la presentaci&oacute;n y configuraci&oacute;n del Sitio Web y de los Contenidos y Servicios que en &eacute;l pudieran estar incorporados. El Usuario reconoce y acepta que en cualquier momento BeeLasy pueda interrumpir, desactivar y/o cancelar cualquiera de estos elementos que se integran en el Sitio Web o el acceso a los mismos.</p>
                <p><br></p>
                <p>El acceso al Sitio Web por el Usuario tiene car&aacute;cter libre y, por regla general, es gratuito sin que el Usuario tenga que proporcionar una contraprestaci&oacute;n para poder disfrutar de ello, salvo en lo relativo al coste de conexi&oacute;n a trav&eacute;s de la red de telecomunicaciones suministrada por el proveedor de acceso que hubiere contratado el Usuario.</p>
                <p><br></p>
                <p>La utilizaci&oacute;n de los Contenidos no requiere previa suscripci&oacute;n o registro alguno.</p>
                <p><br></p>
                <p>El Usuario</p>
                <p><br></p>
                <p>El acceso, la navegaci&oacute;n y uso del Sitio Web, confiere la condici&oacute;n de Usuario, por lo que se aceptan, desde que se inicia la navegaci&oacute;n por el Sitio Web, todas las Condiciones aqu&iacute; establecidas, as&iacute; como sus ulteriores modificaciones, sin perjuicio de la aplicaci&oacute;n de la correspondiente normativa legal de obligado cumplimiento seg&uacute;n el caso. Dada la relevancia de lo anterior, se recomienda al Usuario leerlas cada vez que visite el Sitio Web.</p>
                <p><br></p>
                <p>El Sitio Web de BeeLasy proporciona gran diversidad de informaci&oacute;n, servicios y datos. El Usuario asume su responsabilidad para realizar un uso correcto del Sitio Web. Esta responsabilidad se extender&aacute; a:</p>
                <p><br></p>
                <ul>
                    <li>
                        <p>Un uso de la informaci&oacute;n, Contenidos y/o Servicios y datos ofrecidos por BeeLasy sin que sea contrario a lo dispuesto por las presentes Condiciones, la Ley, la moral o el orden p&uacute;blico, o que de cualquier otro modo puedan suponer lesi&oacute;n de los derechos de terceros o del mismo funcionamiento del Sitio Web.</p>
                    </li>
                </ul>
                <p>El mero acceso a este Sitio Web no supone entablar ning&uacute;n tipo de relaci&oacute;n de car&aacute;cter comercial entre BeeLasy y el Usuario.</p>
                <p><br></p>
                <p>El Usuario declara ser mayor de edad y disponer de la capacidad jur&iacute;dica suficiente para vincularse por las presentes Condiciones. Por lo tanto, este Sitio Web de BeeLasy no se dirige a menores de edad. BeeLasy declina cualquier responsabilidad por el incumplimiento de este requisito.</p>
                <p><br></p>
                <p>El Sitio Web est&aacute; dirigido principalmente a Usuarios residentes en Espa&ntilde;a. BeeLasy no asegura que el Sitio Web cumpla con legislaciones de otros pa&iacute;ses, ya sea total o parcialmente. Si el Usuario reside o tiene su domiciliado en otro lugar y decide acceder y/o navegar en el Sitio Web lo har&aacute; bajo su propia responsabilidad, deber&aacute; asegurarse de que tal acceso y navegaci&oacute;n cumple con la legislaci&oacute;n local que le es aplicable, no asumiendo BeeLasy responsabilidad alguna que se pueda derivar de dicho acceso.</p>
                <p><br></p>
                <p><br></p>
                <p>III. ACCESO Y NAVEGACI&Oacute;N EN EL SITIO WEB: EXCLUSI&Oacute;N DE GARANT&Iacute;AS Y RESPONSABILIDAD</p>
                <p>BeeLasy no garantiza la continuidad, disponibilidad y utilidad del Sitio Web, ni de los Contenidos o Servicios. BeeLasy har&aacute; todo lo posible por el buen funcionamiento del Sitio Web, sin embargo, no se responsabiliza ni garantiza que el acceso a este Sitio Web no vaya a ser ininterrumpido o que est&eacute; libre de error.</p>
                <p><br></p>
                <p>Tampoco se responsabiliza o garantiza que el contenido o software al que pueda accederse a trav&eacute;s de este Sitio Web, est&eacute; libre de error o cause un da&ntilde;o al sistema inform&aacute;tico (software y hardware) del Usuario. En ning&uacute;n caso BeeLasy ser&aacute; responsable por las p&eacute;rdidas, da&ntilde;os o perjuicios de cualquier tipo que surjan por el acceso, navegaci&oacute;n y el uso del Sitio Web, incluy&eacute;ndose, pero no limit&aacute;ndose, a los ocasionados a los sistemas inform&aacute;ticos o los provocados por la introducci&oacute;n de virus.</p>
                <p><br></p>
                <p>BeeLasy tampoco se hace responsable de los da&ntilde;os que pudiesen ocasionarse a los usuarios por un uso inadecuado de este Sitio Web. En particular, no se hace responsable en modo alguno de las ca&iacute;das, interrupciones, falta o defecto de las telecomunicaciones que pudieran ocurrir.</p>
                <p><br></p>
                <p><br></p>
                <p>IV. POL&Iacute;TICA DE PRIVACIDAD Y PROTECCI&Oacute;N DE DATOS</p>
                <p><br></p>
                <p>Respetando lo establecido en la legislaci&oacute;n vigente, BeeLasy (en adelante, tambi&eacute;n Sitio Web) se compromete a adoptar las medidas t&eacute;cnicas y organizativas necesarias, seg&uacute;n el nivel de seguridad adecuado al riesgo de los datos recogidos.</p>
                <p><br></p>
                <p>Leyes que incorpora esta pol&iacute;tica de privacidad</p>
                <p><br></p>
                <p>Esta pol&iacute;tica de privacidad est&aacute; adaptada a la normativa espa&ntilde;ola y europea vigente en materia de protecci&oacute;n de datos personales en internet. En concreto, la misma respeta las siguientes normas:</p>
                <p><br></p>
                <p>La Ley Org&aacute;nica 3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos digitales.</p>
                <p>El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protecci&oacute;n de las personas f&iacute;sicas en lo que respecta al tratamiento de datos personales y a la libre circulaci&oacute;n de estos datos (RGPD).</p>
                <p>El Real Decreto 1720/2007, de 21 de diciembre, por el que se BeeLasy el Reglamento de desarrollo de la Ley Org&aacute;nica 15/1999, de 13 de diciembre, de Protecci&oacute;n de Datos de Car&aacute;cter Personal (RDLOPD).</p>
                <p>La Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informaci&oacute;n y de Comercio Electr&oacute;nico (LSSI-CE).</p>
                <p><br></p>
                <p>Identidad del responsable del tratamiento de los datos personales</p>
                <p><br></p>
                <p>El responsable del tratamiento de los datos personales recogidos en BeeLasy es: JOS&Eacute; MANUEL TABARES RODR&Iacute;GUEZ cuyo NIF es 77926820Z y cuyos datos de contacto son:</p>
                <p><br></p>
                <p><br></p>
                <p>Direcci&oacute;n:</p>
                <p>Calle Pag&eacute;s del Corro 5</p>
                <p>41010 Sevilla (Sevilla)</p>
                <p>Espa&ntilde;a</p>
                <p>Tel&eacute;fono de contacto: 688916825</p>
                <p>Email de contacto: infobeelasy@gmail.com</p>
                <p><br></p>
                <p>Registro de Datos de Car&aacute;cter Personal</p>
                <p><br></p>
                <p>Los datos personales recabados por BeeLasy, mediante los formularios extendidos en sus p&aacute;ginas, ser&aacute;n introducidos en un fichero automatizado bajo la responsabilidad del Responsable del tratamiento, y debidamente declarado e inscrito en el Registro General de la Agencia de Protecci&oacute;n de Datos que se puede consultar en el sitio web de la Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos (http://www.agpd.es), con la finalidad de poder facilitar, agilizar y cumplir los compromisos establecidos entre BeeLasy y el Usuario o el mantenimiento de la relaci&oacute;n que se establezca en los formularios que este rellene, o para atender una solicitud o consulta del mismo.</p>
                <p><br></p>
                <p>Principios aplicables al tratamiento de los datos personales</p>
                <p><br></p>
                <p>El tratamiento de los datos personales del Usuario se someter&aacute; a los siguientes principios recogidos en el art&iacute;culo 5 del RGPD y en el art&iacute;culo 4 y siguientes de la Ley Org&aacute;nica 3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos digitales:</p>
                <p><br></p>
                <p>Principio de licitud, lealtad y transparencia: se requerir&aacute; en todo momento el consentimiento del Usuario previa informaci&oacute;n completamente transparente de los fines para los cuales se recogen los datos personales.</p>
                <p>Principio de limitaci&oacute;n de la finalidad: los datos personales ser&aacute;n recogidos con fines determinados, expl&iacute;citos y leg&iacute;timos.</p>
                <p>Principio de minimizaci&oacute;n de datos: los datos personales recogidos ser&aacute;n &uacute;nicamente los estrictamente necesarios en relaci&oacute;n con los fines para los que son tratados.</p>
                <p>Principio de exactitud: los datos personales deben ser exactos y estar siempre actualizados.</p>
                <p>Principio de limitaci&oacute;n del plazo de conservaci&oacute;n: los datos personales solo ser&aacute;n mantenidos de forma que se permita la identificaci&oacute;n del Usuario durante el tiempo necesario para los fines de su tratamiento.</p>
                <p>Principio de integridad y confidencialidad: los datos personales ser&aacute;n tratados de manera que se garantice su seguridad y confidencialidad.</p>
                <p>Principio de responsabilidad proactiva: el Responsable del tratamiento ser&aacute; responsable de asegurar que los principios anteriores se cumplen.</p>
                <p><br></p>
                <p>Categor&iacute;as de datos personales</p>
                <p><br></p>
                <p>Las categor&iacute;as de datos que se tratan en BeeLasy son &uacute;nicamente datos identificativos. En ning&uacute;n caso, se tratan categor&iacute;as especiales de datos personales en el sentido del art&iacute;culo 9 del RGPD.</p>
                <p><br></p>
                <p>Base legal para el tratamiento de los datos personales</p>
                <p><br></p>
                <p>La base legal para el tratamiento de los datos personales es el consentimiento. BeeLasy se compromete a recabar el consentimiento expreso y verificable del Usuario para el tratamiento de sus datos personales para uno o varios fines espec&iacute;ficos.</p>
                <p><br></p>
                <p>El Usuario tendr&aacute; derecho a retirar su consentimiento en cualquier momento. Ser&aacute; tan f&aacute;cil retirar el consentimiento como darlo. Como regla general, la retirada del consentimiento no condicionar&aacute; el uso del Sitio Web.</p>
                <p><br></p>
                <p>En las ocasiones en las que el Usuario deba o pueda facilitar sus datos a trav&eacute;s de formularios para realizar consultas, solicitar informaci&oacute;n o por motivos relacionados con el contenido del Sitio Web, se le informar&aacute; en caso de que la cumplimentaci&oacute;n de alguno de ellos sea obligatoria debido a que los mismos sean imprescindibles para el correcto desarrollo de la operaci&oacute;n realizada.</p>
                <p><br></p>
                <p>Fines del tratamiento a que se destinan los datos personales</p>
                <p><br></p>
                <p>Los datos personales son recabados y gestionados por BeeLasy con la finalidad de poder facilitar, agilizar y cumplir los compromisos establecidos entre el Sitio Web y el Usuario o el mantenimiento de la relaci&oacute;n que se establezca en los formularios que este &uacute;ltimo rellene o para atender una solicitud o consulta.</p>
                <p><br></p>
                <p>Igualmente, los datos podr&aacute;n ser utilizados con una finalidad comercial de personalizaci&oacute;n, operativa y estad&iacute;stica, y actividades propias del objeto social de BeeLasy, as&iacute; como para la extracci&oacute;n, almacenamiento de datos y estudios de marketing para adecuar el Contenido ofertado al Usuario, as&iacute; como mejorar la calidad, funcionamiento y navegaci&oacute;n por el Sitio Web.</p>
                <p><br></p>
                <p>Concretamente, las finalidades seg&uacute;n el lugar de recogida de los datos son:</p>
                <p><br></p>
                <p>Formulario de Presupuesto: Comunicar al Usuario el precio presupuestado en base a su solicitud a trav&eacute;s de los datos facilitados en el formulario. Asimismo, dichos datos se utilizar&aacute;n para generar un usuario y contrase&ntilde;a para dar acceso al Usuario dentro del espacio privado de la web para revisar el estado de sus presupuestos, pedidos y facturas. Tambi&eacute;n se podr&aacute;n utilizar para enviar promociones y otra informaci&oacute;n que pueda ser de inter&eacute;s para el Usuario en relaci&oacute;n a los presupuestos y encargos realizados.</p>
                <p>Formulario de Contacto: Dar respuesta a la petici&oacute;n realizada por el Usuario a trav&eacute;s de este formulario.</p>
                <p>Formulario Trabaja en BeeLasy: Analizar el perfil profesional del Usuario y determinar su adecuaci&oacute;n para colaborar con BeeLasy como tutor online. Enviar, si procede, la informaci&oacute;n necesaria y contratos para formar parte del equipo.</p>
                <p><br></p>
                <p>Per&iacute;odos de retenci&oacute;n de los datos personales</p>
                <p><br></p>
                <p>Los datos personales s&oacute;lo ser&aacute;n retenidos durante el tiempo m&iacute;nimo necesario para los fines de su tratamiento y, en todo caso, hasta que el Usuario solicite su supresi&oacute;n.</p>
                <p><br></p>
                <p>En el momento en que se obtengan los datos personales, se informar&aacute; al Usuario acerca del plazo durante el cual se conservar&aacute;n los datos personales o, cuando eso no sea posible, los criterios utilizados para determinar este plazo.</p>
                <p><br></p>
                <p>Destinatarios de los datos personales</p>
                <p><br></p>
                <p>Los datos personales del Usuario ser&aacute;n compartidos con los siguientes destinatarios o categor&iacute;as de destinatarios:</p>
                <p><br></p>
                <p>&ndash; Empresa de hosting (SiteGround Spain S.L.)</p>
                <p>&ndash; Empresa de env&iacute;o de comunicaciones (The Rocket Science Group LLC )</p>
                <p>&ndash; Empresa de gesti&oacute;n de proyectos (Basecamp, LLC)</p>
                <p><br></p>
                <p>Asimismo, pueden producirse transferencias internacionales conforme al r&eacute;gimen de autorizaci&oacute;n y notificaci&oacute;n previa que establece la normativa vigente.</p>
                <p><br></p>
                <p>Datos personales de menores de edad</p>
                <p><br></p>
                <p>Respetando lo establecido en los art&iacute;culos 8 del RGPD y 7 de la Ley Org&aacute;nica 3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos digitales, solo los mayores de 14 a&ntilde;os podr&aacute;n otorgar su consentimiento para el tratamiento de sus datos personales de forma l&iacute;cita por BeeLasy. Si se trata de un menor de 14 a&ntilde;os, ser&aacute; necesario el consentimiento de los padres o tutores para el tratamiento, y este solo se considerar&aacute; l&iacute;cito en la medida en la que los mismos lo hayan autorizado.</p>
                <p><br></p>
                <p>Secreto y seguridad de los datos personales</p>
                <p><br></p>
                <p>BeeLasy se compromete a adoptar las medidas t&eacute;cnicas y organizativas necesarias, seg&uacute;n el nivel de seguridad adecuado al riesgo de los datos recogidos, de forma que se garantice la seguridad de los datos de car&aacute;cter personal y se evite la destrucci&oacute;n, p&eacute;rdida o alteraci&oacute;n accidental o il&iacute;cita de datos personales transmitidos, conservados o tratados de otra forma, o la comunicaci&oacute;n o acceso no autorizados a dichos datos.</p>
                <p><br></p>
                <p>El Sitio Web cuenta con un certificado SSL (Secure Socket Layer), que asegura que los datos personales se transmiten de forma segura y confidencial, al ser la transmisi&oacute;n de los datos entre el servidor y el Usuario, y en retroalimentaci&oacute;n, totalmente cifrada o encriptada.</p>
                <p><br></p>
                <p>Sin embargo, debido a que BeeLasy no puede garantizar la inexpugabilidad de Internet ni la ausencia total de hackers u otros que accedan de modo fraudulento a los datos personales, el Responsable del tratamiento se compromete a comunicar al Usuario sin dilaci&oacute;n indebida cuando ocurra una violaci&oacute;n de la seguridad de los datos personales que sea probable que entra&ntilde;e un alto riesgo para los derechos y libertades de las personas f&iacute;sicas. Siguiendo lo establecido en el art&iacute;culo 4 del RGPD, se entiende por violaci&oacute;n de la seguridad de los datos personales toda violaci&oacute;n de la seguridad que ocasione la destrucci&oacute;n, p&eacute;rdida o alteraci&oacute;n accidental o il&iacute;cita de datos personales transmitidos, conservados o tratados de otra forma, o la comunicaci&oacute;n o acceso no autorizados a dichos datos.</p>
                <p><br></p>
                <p>Los datos personales ser&aacute;n tratados como confidenciales por el Responsable del tratamiento, quien se compromete a informar de y a garantizar por medio de una obligaci&oacute;n legal o contractual que dicha confidencialidad sea respetada por sus empleados, asociados, y toda persona a la cual le haga accesible la informaci&oacute;n.</p>
                <p><br></p>
                <p>Derechos derivados del tratamiento de los datos personales</p>
                <p><br></p>
                <p>El Usuario tiene sobre BeeLasy y podr&aacute;, por tanto, ejercer frente al Responsable del tratamiento los siguientes derechos reconocidos en el RGPD y en la Ley Org&aacute;nica 3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos digitales:</p>
                <p><br></p>
                <p>Derecho de acceso: Es el derecho del Usuario a obtener confirmaci&oacute;n de si BeeLasy est&aacute; tratando o no sus datos personales y, en caso afirmativo, obtener informaci&oacute;n sobre sus datos concretos de car&aacute;cter personal y del tratamiento que BeeLasy haya realizado o realice, as&iacute; como, entre otra, de la informaci&oacute;n disponible sobre el origen de dichos datos y los destinatarios de las comunicaciones realizadas o previstas de los mismos.</p>
                <p>Derecho de rectificaci&oacute;n: Es el derecho del Usuario a que se modifiquen sus datos personales que resulten ser inexactos o, teniendo en cuenta los fines del tratamiento, incompletos.</p>
                <p>Derecho de supresi&oacute;n (&laquo;el derecho al olvido&raquo;): Es el derecho del Usuario, siempre que la legislaci&oacute;n vigente no establezca lo contrario, a obtener la supresi&oacute;n de sus datos personales cuando estos ya no sean necesarios para los fines para los cuales fueron recogidos o tratados; el Usuario haya retirado su consentimiento al tratamiento y este no cuente con otra base legal; el Usuario se oponga al tratamiento y no exista otro motivo leg&iacute;timo para continuar con el mismo; los datos personales hayan sido tratados il&iacute;citamente; los datos personales deban suprimirse en cumplimiento de una obligaci&oacute;n legal; o los datos personales hayan sido obtenidos producto de una oferta directa de servicios de la sociedad de la informaci&oacute;n a un menor de 14 a&ntilde;os. Adem&aacute;s de suprimir los datos, el Responsable del tratamiento, teniendo en cuenta la tecnolog&iacute;a disponible y el coste de su aplicaci&oacute;n, deber&aacute; adoptar medidas razonables para informar a los responsables que est&eacute;n tratando los datos personales de la solicitud del interesado de supresi&oacute;n de cualquier enlace a esos datos personales.</p>
                <p>Derecho a la limitaci&oacute;n del tratamiento: Es el derecho del Usuario a limitar el tratamiento de sus datos personales. El Usuario tiene derecho a obtener la limitaci&oacute;n del tratamiento cuando impugne la exactitud de sus datos personales; el tratamiento sea il&iacute;cito; el Responsable del tratamiento ya no necesite los datos personales, pero el Usuario lo necesite para hacer reclamaciones; y cuando el Usuario se haya opuesto al tratamiento.</p>
                <p>Derecho a la portabilidad de los datos: En caso de que el tratamiento se efect&uacute;e por medios automatizados, el Usuario tendr&aacute; derecho a recibir del Responsable del tratamiento sus datos personales en un formato estructurado, de uso com&uacute;n y lectura mec&aacute;nica, y a transmitirlos a otro responsable del tratamiento. Siempre que sea t&eacute;cnicamente posible, el Responsable del tratamiento transmitir&aacute; directamente los datos a ese otro responsable.</p>
                <p>Derecho de oposici&oacute;n: Es el derecho del Usuario a que no se lleve a cabo el tratamiento de sus datos de car&aacute;cter personal o se cese el tratamiento de los mismos por parte de BeeLasy.</p>
                <p>Derecho a no ser objeto de una decisi&oacute;n basada &uacute;nicamente en el tratamiento automatizado, incluida la elaboraci&oacute;n de perfiles: Es el derecho del Usuario a no ser objeto de una decisi&oacute;n individualizada basada &uacute;nicamente en el tratamiento automatizado de sus datos personales, incluida la elaboraci&oacute;n de perfiles, existente salvo que la legislaci&oacute;n vigente establezca lo contrario.</p>
                <p>As&iacute; pues, el Usuario podr&aacute; ejercitar sus derechos mediante comunicaci&oacute;n escrita dirigida al Responsable del tratamiento con la referencia &laquo;RGPD-BeeLasy.com&raquo;, especificando:</p>
                <p><br></p>
                <p>Nombre, apellidos del Usuario y copia del DNI. En los casos en que se admita la representaci&oacute;n, ser&aacute; tambi&eacute;n necesaria la identificaci&oacute;n por el mismo medio de la persona que representa al Usuario, as&iacute; como el documento acreditativo de la representaci&oacute;n. La fotocopia del DNI podr&aacute; ser sustituida, por cualquier otro medio v&aacute;lido en derecho que acredite la identidad.</p>
                <p>Petici&oacute;n con los motivos espec&iacute;ficos de la solicitud o informaci&oacute;n a la que se quiere acceder.</p>
                <p>Domicilio a efecto de notificaciones.</p>
                <p>Fecha y firma del solicitante.</p>
                <p>Todo documento que acredite la petici&oacute;n que formula.</p>
                <p>Esta solicitud y todo otro documento adjunto podr&aacute; enviarse a la siguiente direcci&oacute;n y/o correo electr&oacute;nico:</p>
                <p><br></p>
                <p>Direcci&oacute;n postal:</p>
                <p>Calle Pag&eacute;s del Corro 5</p>
                <p>41010 Sevilla (Sevilla)</p>
                <p>Espa&ntilde;a</p>
                <p>Email de contacto: infobeelasy@gmail.com</p>
                <p><br></p>
                <p>Enlaces a sitios web de terceros</p>
                <p><br></p>
                <p>El Sitio Web puede incluir hiperv&iacute;nculos o enlaces que permiten acceder a p&aacute;ginas web de terceros distintos de BeeLasy, y que por tanto no son operados por BeeLasy. Los titulares de dichos sitios web dispondr&aacute;n de sus propias pol&iacute;ticas de protecci&oacute;n de datos, siendo ellos mismos, en cada caso, responsables de sus propios ficheros y de sus propias pr&aacute;cticas de privacidad.</p>
                <p><br></p>
                <p>Reclamaciones ante la autoridad de control</p>
                <p><br></p>
                <p>En caso de que el Usuario considere que existe un problema o infracci&oacute;n de la normativa vigente en la forma en la que se est&aacute;n tratando sus datos personales, tendr&aacute; derecho a la tutela judicial efectiva y a presentar una reclamaci&oacute;n ante una autoridad de control, en particular, en el Estado en el que tenga su residencia habitual, lugar de trabajo o lugar de la supuesta infracci&oacute;n. En el caso de Espa&ntilde;a, la autoridad de control es la Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos (http://www.agpd.es).</p>
                <p><br></p>
                <p><br></p>
                <p>V. POL&Iacute;TICA DE COOKIES</p>
                <p><br></p>
                <p>El acceso a este Sitio Web puede implicar la utilizaci&oacute;n de cookies. Las cookies son peque&ntilde;as cantidades de informaci&oacute;n que se almacenan en el navegador utilizado por cada Usuario &mdash;en los distintos dispositivos que pueda utilizar para navegar&mdash; para que el servidor recuerde cierta informaci&oacute;n que posteriormente y &uacute;nicamente el servidor que la implement&oacute; leer&aacute;. Las cookies facilitan la navegaci&oacute;n, la hacen m&aacute;s amigable, y no da&ntilde;an el dispositivo de navegaci&oacute;n.</p>
                <p><br></p>
                <p>Las cookies son procedimientos autom&aacute;ticos de recogida de informaci&oacute;n relativa a las preferencias determinadas por el Usuario durante su visita al Sitio Web con el fin de reconocerlo como Usuario, y personalizar su experiencia y el uso del Sitio Web, y pueden tambi&eacute;n, por ejemplo, ayudar a identificar y resolver errores.</p>
                <p><br></p>
                <p>La informaci&oacute;n recabada a trav&eacute;s de las cookies puede incluir la fecha y hora de visitas al Sitio Web, las p&aacute;ginas visitadas, el tiempo que ha estado en el Sitio Web y los sitios visitados justo antes y despu&eacute;s del mismo. Sin embargo, ninguna cookie permite que esta misma pueda contactarse con el n&uacute;mero de tel&eacute;fono del Usuario o con cualquier otro medio de contacto personal. Ninguna cookie puede extraer informaci&oacute;n del disco duro del Usuario o robar informaci&oacute;n personal. La &uacute;nica manera de que la informaci&oacute;n privada del Usuario forme parte del archivo Cookie es que el usuario d&eacute; personalmente esa informaci&oacute;n al servidor.</p>
                <p><br></p>
                <p>Las cookies que permiten identificar a una persona se consideran datos personales. Por tanto, a las mismas les ser&aacute; de aplicaci&oacute;n la Pol&iacute;tica de Privacidad anteriormente descrita. En este sentido, para la utilizaci&oacute;n de las mismas ser&aacute; necesario el consentimiento del Usuario. Este consentimiento ser&aacute; comunicado, en base a una elecci&oacute;n aut&eacute;ntica, ofrecido mediante una decisi&oacute;n afirmativa y positiva, antes del tratamiento inicial, removible y documentado.</p>
                <p><br></p>
                <p>Cookies propias</p>
                <p><br></p>
                <p>Son aquellas cookies que son enviadas al ordenador o dispositivo del Usuario y gestionadas exclusivamente por BeeLasy para el mejor funcionamiento del Sitio Web. La informaci&oacute;n que se recaba se emplea para mejorar la calidad del Sitio Web y su Contenido y su experiencia como Usuario. Estas cookies permiten reconocer al Usuario como visitante recurrente del Sitio Web y adaptar el contenido para ofrecerle contenidos que se ajusten a sus preferencias.</p>
                <p><br></p>
                <p>Cookies de terceros</p>
                <p><br></p>
                <p>Son cookies utilizadas y gestionadas por entidades externas que proporcionan a BeeLasy servicios solicitados por este mismo para mejorar el Sitio Web y la experiencia del usuario al navegar en el Sitio Web. Los principales objetivos para los que se utilizan cookies de terceros son la obtenci&oacute;n de estad&iacute;sticas de accesos y analizar la informaci&oacute;n de la navegaci&oacute;n, es decir, c&oacute;mo interact&uacute;a el Usuario con el Sitio Web.</p>
                <p><br></p>
                <p>La informaci&oacute;n que se obtiene se refiere, por ejemplo, al n&uacute;mero de p&aacute;ginas visitadas, el idioma, el lugar a la que la direcci&oacute;n IP desde el que accede el Usuario, el n&uacute;mero de Usuarios que acceden, la frecuencia y reincidencia de las visitas, el tiempo de visita, el navegador que usan, el operador o tipo de dispositivo desde el que se realiza la visita. Esta informaci&oacute;n se utiliza para mejorar el Sitio Web, y detectar nuevas necesidades para ofrecer a los Usuarios un Contenido y/o servicio de &oacute;ptima calidad. En todo caso, la informaci&oacute;n se recopila de forma an&oacute;nima y se elaboran informes de tendencias del Sitio Web sin identificar a usuarios individuales.</p>
                <p><br></p>
                <p>Puede obtener m&aacute;s informaci&oacute;n sobre las cookies, la informaci&oacute;n sobre la privacidad, o consultar la descripci&oacute;n del tipo de cookies que se utiliza, sus principales caracter&iacute;sticas, periodo de expiraci&oacute;n, etc. en el siguiente(s) enlace(s):</p>
                <p><br></p>
                <p>Google Analytics: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage</p>
                <p><br></p>
                <p>Zendesk: https://help.zendesk.com/hc/en-us/articles/360001863368</p>
                <p><br></p>
                <p>Cloudflare: https://www.cloudflare.com/cookie-policy/</p>
                <p><br></p>
                <p>La(s) entidad(es) encargada(s) del suministro de cookies podr&aacute;(n) ceder esta informaci&oacute;n a terceros, siempre y cuando lo exija la ley o sea un tercero el que procese esta informaci&oacute;n para dichas entidades.</p>
                <p><br></p>
                <p>Cookies de redes sociales</p>
                <p><br></p>
                <p>BeeLasy incorpora plugins de redes sociales, que permiten acceder a las mismas a partir del Sitio Web. Por esta raz&oacute;n, las cookies de redes sociales pueden almacenarse en el navegador del Usuario. Los titulares de dichas redes sociales disponen de sus propias pol&iacute;ticas de protecci&oacute;n de datos y de cookies, siendo ellos mismos, en cada caso, responsables de sus propios ficheros y de sus propias pr&aacute;cticas de privacidad. El Usuario debe referirse a las mismas para informarse acerca de dichas cookies y, en su caso, del tratamiento de sus datos personales. &Uacute;nicamente a t&iacute;tulo informativo se indican a continuaci&oacute;n los enlaces en los que se pueden consultar dichas pol&iacute;ticas de privacidad y/o de cookies:</p>
                <p><br></p>
                <p>Facebook: https://www.facebook.com/policies/cookies/</p>
                <p><br></p>
                <p>Twitter: https://twitter.com/es/privacy</p>
                <p><br></p>
                <p>Instagram: https://help.instagram.com/1896641480634370?ref=ig</p>
                <p><br></p>
                <p>Youtube: https://policies.google.com/privacy?hl=es-419&amp;gl=mx</p>
                <p><br></p>
                <p>Google+: https://policies.google.com/technologies/cookies?hl=es</p>
                <p><br></p>
                <p>Pinterest: https://policy.pinterest.com/es/privacy-policy</p>
                <p><br></p>
                <p>LinkedIn: https://www.linkedin.com/legal/cookie-policy?trk=hp-cookies</p>
                <p><br></p>
                <p>Deshabilitar, rechazar y eliminar cookies</p>
                <p><br></p>
                <p>El Usuario puede deshabilitar, rechazar y eliminar las cookies &mdash;total o parcialmente&mdash; instaladas en su dispositivo mediante la configuraci&oacute;n de su navegador (entre los que se encuentran, por ejemplo, Chrome, Firefox, Safari, Explorer). En este sentido, los procedimientos para rechazar y eliminar las cookies pueden diferir de un navegador de Internet a otro. En consecuencia, el Usuario debe acudir a las instrucciones facilitadas por el propio navegador de Internet que est&eacute; utilizando. En el supuesto de que rechace el uso de cookies &mdash;total o parcialmente&mdash; podr&aacute; seguir usando el Sitio Web, si bien podr&aacute; tener limitada la utilizaci&oacute;n de algunas de las prestaciones del mismo.</p>
                <p><br></p>
                <p><br></p>
                <p>VI. ACEPTACI&Oacute;N Y CAMBIOS EN ESTA POL&Iacute;TICA DE PRIVACIDAD</p>
                <p><br></p>
                <p>Es necesario que el Usuario haya le&iacute;do y est&eacute; conforme con las condiciones sobre la protecci&oacute;n de datos de car&aacute;cter personal contenidas en esta Pol&iacute;tica de Privacidad y de Cookies, as&iacute; como que acepte el tratamiento de sus datos personales para que el Responsable del tratamiento pueda proceder al mismo en la forma, durante los plazos y para las finalidades indicadas. El uso del Sitio Web implicar&aacute; la aceptaci&oacute;n de la Pol&iacute;tica de Privacidad y de Cookies del mismo.</p>
                <p><br></p>
                <p>BeeLasy se reserva el derecho a modificar su Pol&iacute;tica de Privacidad y de Cookies, de acuerdo a su propio criterio, o motivado por un cambio legislativo, jurisprudencial o doctrinal de la Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos. Los cambios o actualizaciones de esta Pol&iacute;tica de Privacidad y de Cookies no ser&aacute;n notificados de forma expl&iacute;cita al Usuario. Se recomienda al Usuario consultar esta p&aacute;gina de forma peri&oacute;dica para estar al tanto de los &uacute;ltimos cambios o actualizaciones.</p>
                <p><br></p>
                <p>Esta Pol&iacute;tica de Privacidad y de Cookies fue actualizada el d&iacute;a 25 de febrero 2019 para adaptarse al Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protecci&oacute;n de las personas f&iacute;sicas en lo que respecta al tratamiento de datos personales y a la libre circulaci&oacute;n de estos datos (RGPD) y a la Ley Org&aacute;nica 3/2018, de 5 de diciembre, de Protecci&oacute;n de Datos Personales y garant&iacute;a de los derechos digitales.</p>
                <p><br></p>
                <p><br></p>
                <p>VII. POL&Iacute;TICA DE ENLACES</p>
                <p><br></p>
                <p>Se informa que el Sitio Web de BeeLasy pone o puede poner a disposici&oacute;n de los Usuarios medios de enlace (como, entre otros, links, banners, botones), directorios y motores de b&uacute;squeda que permiten a los Usuarios acceder a sitios web pertenecientes y/o gestionados por terceros.</p>
                <p><br></p>
                <p>La instalaci&oacute;n de estos enlaces, directorios y motores de b&uacute;squeda en el Sitio Web tiene por objeto facilitar a los Usuarios la b&uacute;squeda de informaci&oacute;n y acceso a la informaci&oacute;n disponible en Internet, sin que pueda considerarse una sugerencia, recomendaci&oacute;n o invitaci&oacute;n para la visita de los mismos.</p>
                <p><br></p>
                <p>BeeLasy no ofrece ni comercializa por s&iacute; ni por medio de terceros los productos y/o servicios disponibles en dichos sitios enlazados.</p>
                <p><br></p>
                <p>Asimismo, tampoco garantizar&aacute; la disponibilidad t&eacute;cnica, exactitud, veracidad, validez o legalidad de sitios ajenos a su propiedad a los que se pueda acceder por medio de los enlaces.</p>
                <p><br></p>
                <p>BeeLasy en ning&uacute;n caso revisar&aacute; o controlar&aacute; el contenido de otros sitios web, as&iacute; como tampoco BeeLasy, examina ni hace propios los productos y servicios, contenidos, archivos y cualquier otro material existente en los referidos sitios enlazados.</p>
                <p><br></p>
                <p>BeeLasy no asume ninguna responsabilidad por los da&ntilde;os y perjuicios que pudieran producirse por el acceso, uso, calidad o licitud de los contenidos, comunicaciones, opiniones, productos y servicios de los sitios web no gestionados por BeeLasy y que sean enlazados en este Sitio Web.</p>
                <p><br></p>
                <p>El Usuario o tercero que realice un hiperv&iacute;nculo desde una p&aacute;gina web de otro, distinto, sitio web al Sitio Web de BeeLasy deber&aacute; saber que:</p>
                <p><br></p>
                <p>No se permite la reproducci&oacute;n &mdash;total o parcialmente&mdash; de ninguno de los Contenidos y/o Servicios del Sitio Web sin autorizaci&oacute;n expresa de BeeLasy.</p>
                <p><br></p>
                <p>No se permite tampoco ninguna manifestaci&oacute;n falsa, inexacta o incorrecta sobre el Sitio Web de BeeLasy, ni sobre los Contenidos y/o Servicios del mismo.</p>
                <p><br></p>
                <p>A excepci&oacute;n del hiperv&iacute;nculo, el sitio web en el que se establezca dicho hiperenlace no contendr&aacute; ning&uacute;n elemento, de este Sitio Web, protegido como propiedad intelectual por el ordenamiento jur&iacute;dico espa&ntilde;ol, salvo autorizaci&oacute;n expresa de BeeLasy.</p>
                <p><br></p>
                <p>El establecimiento del hiperv&iacute;nculo no implicar&aacute; la existencia de relaciones entre BeeLasy y el titular del sitio web desde el cual se realice, ni el conocimiento y aceptaci&oacute;n de BeeLasy de los contenidos, servicios y/o actividades ofrecidos en dicho sitio web, y viceversa.</p>
                <p><br></p>
                <p><br></p>
                <p>VIII. PROPIEDAD INTELECTUAL E INDUSTRIAL</p>
                <p><br></p>
                <p>BeeLasy por s&iacute; o como parte cesionaria, es titular de todos los derechos de propiedad intelectual e industrial del Sitio Web, as&iacute; como de los elementos contenidos en el mismo (a t&iacute;tulo enunciativo y no exhaustivo, im&aacute;genes, sonido, audio, v&iacute;deo, software o textos, marcas o logotipos, combinaciones de colores, estructura y dise&ntilde;o, selecci&oacute;n de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.). Ser&aacute;n, por consiguiente, obras protegidas como propiedad intelectual por el ordenamiento jur&iacute;dico espa&ntilde;ol, si&eacute;ndoles aplicables tanto la normativa espa&ntilde;ola y comunitaria en este campo, como los tratados internacionales relativos a la materia y suscritos por Espa&ntilde;a.</p>
                <p><br></p>
                <p>Todos los derechos reservados. En virtud de lo dispuesto en la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducci&oacute;n, la distribuci&oacute;n y la comunicaci&oacute;n p&uacute;blica, incluida su modalidad de puesta a disposici&oacute;n, de la totalidad o parte de los contenidos de esta p&aacute;gina web, con fines comerciales, en cualquier soporte y por cualquier medio t&eacute;cnico, sin la autorizaci&oacute;n de BeeLasy.</p>
                <p><br></p>
                <p>El Usuario se compromete a respetar los derechos de propiedad intelectual e industrial de BeeLasy. Podr&aacute; visualizar los elementos del Sitio Web o incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte f&iacute;sico siempre y cuando sea, exclusivamente, para su uso personal. El Usuario, sin embargo, no podr&aacute; suprimir, alterar, o manipular cualquier dispositivo de protecci&oacute;n o sistema de seguridad que estuviera instalado en el Sitio Web.</p>
                <p><br></p>
                <p>En caso de que el Usuario o tercero considere que cualquiera de los Contenidos del Sitio Web suponga una violaci&oacute;n de los derechos de protecci&oacute;n de la propiedad intelectual, deber&aacute; comunicarlo inmediatamente a BeeLasy a trav&eacute;s de los datos de contacto del apartado de INFORMACI&Oacute;N GENERAL de este Aviso Legal y Condiciones Generales de Uso.</p>
                <p><br></p>
                <p><br></p>
                <p>IX. ACCIONES LEGALES, LEGISLACI&Oacute;N APLICABLE Y JURISDICCI&Oacute;N</p>
                <p>BeeLasy se reserva la facultad de presentar las acciones civiles o penales que considere necesarias por la utilizaci&oacute;n indebida del Sitio Web y Contenidos, o por el incumplimiento de las presentes Condiciones.</p>
                <p><br></p>
                <p>La relaci&oacute;n entre el Usuario y BeeLasy se regir&aacute; por la normativa vigente y de aplicaci&oacute;n en el territorio espa&ntilde;ol. De surgir cualquier controversia en relaci&oacute;n a la interpretaci&oacute;n y/o a la aplicaci&oacute;n de estas Condiciones las partes someter&aacute;n sus conflictos a la jurisdicci&oacute;n ordinaria someti&eacute;ndose a los jueces y tribunales que correspondan conforme a derecho.</p>
                <p>&Uacute;ltima modificaci&oacute;n: 12 de junio 2023</p>
                <p><br></p>
                <p><br></p>
                <p>Pol&iacute;tica de uso aceptable</p>
                <p><br></p>
                <p>Nuestro compromiso de defender la integridad acad&eacute;mica</p>
                <p><br></p>
                <p>BeeLasy est&aacute; comprometido con los estudiantes y sus resultados de aprendizaje. Creemos que la integridad acad&eacute;mica es una parte fundamental del proceso de aprendizaje y trabajamos arduamente para preservarla.</p>
                <p><br></p>
                <p>Nuestros servicios est&aacute;n dise&ntilde;ados para apoyar el aprendizaje, no para reemplazarlo. Brindamos soporte de aprendizaje bajo demanda en l&iacute;nea, 24/7. Ofrecemos explicaciones paso a paso y herramientas de apoyo al aprendizaje, como tutor&iacute;as online, preparaci&oacute;n para ex&aacute;menes, herramientas de escritura y antiplagio, y otros servicios, incluido la resoluci&oacute;n de casos pr&aacute;cticos, para ayudar a los estudiantes donde y cuando lo necesiten.</p>
                <p><br></p>
                <p>Nuestros servicios pueden incluir conversaciones s&iacute;ncronas/as&iacute;ncronas y tutor&iacute;as online, as&iacute; como la confecci&oacute;n de documentos a medida para transmitir la formaci&oacute;n demandada desde nuestros tutores al estudiante. La utilizaci&oacute;n de cualquier material proporcionado por BeeLasy s&oacute;lo es posible si se referencia correctamente la fuente.</p>
                <p><br></p>
                <p>Nuestros servicios solo deben usarse para apoyar el aprendizaje y ayudar a comprender los cursos y el estudio.</p>
                <p><br></p>
                <p>En ning&uacute;n caso est&aacute;n destinados a ser utilizados para hacer trampa o fraude, como pedir respuestas a una prueba o examen activo, o copiar respuestas encontradas en l&iacute;nea y enviarlas como propias. Estas acciones frustran el prop&oacute;sito de aprender y no son justas para nadie.</p>
                <p><br></p>
                <p>No toleramos el abuso de nuestra plataforma o servicios. El uso indebido de nuestros Servicios puede tener consecuencias graves, que incluyen, entre otras, la prohibici&oacute;n de nuestra plataforma. Si nos enteramos de que nuestros Servicios han sido mal utilizados, podemos tomar las medidas necesarias para mantener la integridad de nuestra plataforma y nuestra comunidad. Esto puede incluir la eliminaci&oacute;n de materiales ofensivos y la cancelaci&oacute;n de las cuentas de los usuarios involucrados en el uso indebido de nuestra plataforma.</p>
                <p><br></p>
                <p>Aceptaci&oacute;n del uso justo de los documentos proporcionados por BeeLasy</p>
                <p><br></p>
                <p>Al usar el Sitio o sus servicios, usted se compromete a no enviar ning&uacute;n documento proporcionado a su instituci&oacute;n acad&eacute;mica como su propio trabajo, ni reclamar su autor&iacute;a y propiedad de los derechos de autor de otra manera.</p>
                <p><br></p>
                <p>Usted reconoce, est&aacute; de acuerdo y acepta que nuestros servicios pueden incluir muestras dise&ntilde;adas para ayudarlo a comprender el material acad&eacute;mico. Nos reservamos los derechos exclusivos para distribuir los Documentos y le otorgamos una licencia no exclusiva para usarlos de manera no comercial sin distribuci&oacute;n adicional.</p>
                <p><br></p>
                <p>Al utilizar nuestros servicios de manera contraria a nuestra Pol&iacute;tica, usted comprende que puede enfrentar las consecuencias previstas por los reglamentos de su instituci&oacute;n acad&eacute;mica y la legislaci&oacute;n estatal pertinente. Usted acepta indemnizar y salvar de toda responsabilidad a BeeLasy y a cualquier entidad afiliada y personas del mismo contra todas y cada una de las responsabilidades por cualquier cosa que haya hecho u omitido en caso de que no haya cumplido con nuestra Pol&iacute;tica.</p>
                <p><br></p>
                <p>Si no est&aacute; de acuerdo con esta Pol&iacute;tica, no acceda ni utilice el Sitio y los servicios.</p>
                <p><br></p>
            </div>  
        </Dialog>
</template>

<script>
import UserService from "../service/UserService";
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
export default {
    name: 'Register',
    components: {
    InputText,
    Password,
    Button,
    },
    created() {
        this.userService = new UserService;
    },
    data() {
        return {
            user: {},
            enviado: false,
            error: {},
            errorPassword: null,
            errorEmail: null,
            errorUser: null,
            displayConfirmation: false,
            squares: [1, 2, 3, 4, 5, 6], // Números de los cuadrados de código
            selectedSquare: 0, // Número de cuadrados seleccionados
            code: '', // Código de confirmación
            miTabIndex:1,
            userId : null,
            enviadoUnaVez: false,
            checked:false,
            displayTerminos:false,
        }
    },
    userService: null,
    mounted() {

    },
    updated(){

    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    
    methods: {

        mostrarTerminos(){
            this.displayTerminos=true;
        },
        topbarImage() {
            return '/images/favicon.svg';
        },
        cambiaGrados() {
            if (this.grados >= 360) {
                this.grados = 0
            } else {
                this.grados++
            }
        },
		signUpWithGoogle(){
			let from = '/';
			let rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
			let client_id= process.env.VUE_APP_GOOGLE_CLIENT_ID
			let redirect_uri= process.env.VUE_APP_FRONTEND_URL || "http://localhost:8081"
			let options = { 
			redirect_uri: redirect_uri,
			client_id: client_id,
			access_type: 'offline',
			response_type: 'code',
			prompt: 'consent',
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
			].join(' '),
			state: from,
			};
			
			const qs = new URLSearchParams(options);
			window.location.href =`${rootUrl}?${qs.toString()}`
		},

        async comprobarCampos() {
            let resultado = true;
            /* eslint-disable */
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            // Verificar el correo electrónico
            if (!this.user.email) {
                resultado = false;
                this.errorUser = 'El email es obligatorio';
            } else if (!regexEmail.test(this.user.email)) {
                resultado = false;
                this.errorEmail = 'El email no es válido';
            } else {
                try {
                    let data = await this.userService.getUser(this.user.email);
                    if (data == 'already exists') {
                        resultado = false;
                        this.errorUser = 'El email ya está en uso';
                    } else {
                        this.errorUser = null;
                    }
                } catch (error) {
                    console.error(error);
                    resultado = false;
                    this.errorUser = 'Error al verificar el correo electrónico';
                }
            }

            // Verificar el check

            if(!this.checked){
                resultado=false;
                this.$toast.add({
                            severity: 'error',
                            summary: 'Tienes que aceptar los términos y condiciones del servicio',
                            life: 3000
                        });
                
            }

            // Verificar la contraseña
            if (!this.user.password || this.user.password.length < 8) {
                resultado = false;
                this.errorPassword = 'La contraseña es obligatoria y debe tener al menos 8 caracteres';
            } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.user.password)) {
                resultado = false;
                this.errorPassword = 'La contraseña debe tener al menos una letra y un número';
            } else {
                this.errorPassword = null;
            }

            return resultado;
        },
        async generateConfirmationCode() {
            this.enviado = true;
            let comprobado = await this.comprobarCampos();
            if (comprobado) {
                try {
                    const res = await this.userService.generateCode(this.user.email)
                    if (res.status === 200) {
                        this.displayConfirmation = true;

                        if (this.displayConfirmation) {
                            this.$nextTick(() => {
                                if (this.displayConfirmation) {
                                    this.miTabIndex = -1;
                                    let dialogo = document.getElementById("dialogo");
                                    dialogo.tabIndex = -1000;
                                    dialogo.focus();
                                }
                            });
                        }    
                    } else {
                        this.$toast.add({
                            severity: 'error',
                            summary: 'Ha habido un error, inténtalo más tarde',
                            life: 3000
                        });
                    }
                } catch (error) {
                    console.error(error);

                    this.$toast.add({
                        severity: 'error',
                        summary: 'Ha habido un error, inténtalo más tarde',
                        life: 3000
                    });
                }
            }
        },
        async selectSquare(event) {
            const { keyCode, ctrlKey, key } = event;
            if (keyCode === 86 && ctrlKey) {
                try {
                    const text = await navigator.clipboard.readText();
                    const newCode = parseInt(text);
                    if (!isNaN(newCode) && newCode <= 999999 && this.code.length + text.length <= 6) {
                        this.code += text;
                    }
                } catch (error) {
                    console.error('Error al leer el texto del portapapeles', error);
                }
            } else if (key === 'Backspace') {
                this.code = this.code.slice(0, -1);
            } else if (Number.isInteger(parseInt(key))) {
                this.code += key;
            }

            if (this.code.length === 6) {
                try {
                    if (this.userId == null && !this.enviadoUnaVez){
                        this.enviadoUnaVez = true
                        let res = await this.userService.guardar(this.user, this.code);
                        let data = JSON.parse(this.userService.descifrarUsuarioYGuardar(res))
                        this.userId = data.userId
                        this.$store.dispatch("saveEmail", this.user.email);
                        this.$store.dispatch("saveUserId", this.userId);
                        this.$store.dispatch("saveToken", data.token);
                        this.$store.dispatch("logIn");
                        this.displayConfirmation = false;
                        this.$router.push(this.$store.state.lastPage)
                        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Inicio de sesión correcto', life: 3000});
                    }
                } catch (error) {
                    this.$toast.add({severity:'danger', summary: 'Failure', detail: 'Inicio de sesión fallido', life: 3000});
                    console.error('Error al enviar el código', error);
                }
            }
        }
    },
}
</script>

<style>
    .p-invalid{
        color: #FCC200;
    }

	.colortexto:hover{
		color: #FCC200 !important;
	}

    .code-square {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin: 10px;
        text-align: center;
        font-size: 30px;
        line-height: 40px;
        border: 1px solid black;
        cursor: pointer;
    }

    .selected {
        background-color: black;
        color: white;
    }

</style>
