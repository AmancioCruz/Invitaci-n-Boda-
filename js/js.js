document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.contenedor-sobre');
    const sello = document.querySelector('.sello');

    if (contenedor && sello) {
        sello.addEventListener('click', (e) => {
            e.stopPropagation();
            contenedor.classList.add('abierto');
        }, { once: true });
    }
});

let temporizadorTransicion = null;

function cambiarFoto(foto) {
    const invitacion = document.querySelector('#invitacion');
    if (!invitacion) {
        return;
    }

    invitacion.classList.remove('foto1', 'foto2', 'foto3');
    invitacion.classList.add(foto);
}

function actualizarContenido(html, foto) {
    const contenido = document.querySelector('#contenido');
    const invitacion = document.querySelector('#invitacion');
    if (!contenido) {
        return;
    }

    if (temporizadorTransicion) {
        clearTimeout(temporizadorTransicion);
    }

    contenido.classList.add('transicion-salida');
    contenido.classList.remove('transicion-entrada');
    if (invitacion) {
        invitacion.classList.add('cambiando-fondo');
    }

    temporizadorTransicion = setTimeout(() => {
        contenido.innerHTML = html;
        cambiarFoto(foto);
        animarContenidoDinamico(contenido);

        contenido.classList.remove('transicion-salida');
        contenido.classList.add('transicion-entrada');
        if (invitacion) {
            invitacion.classList.remove('cambiando-fondo');
        }

        setTimeout(() => {
            contenido.classList.remove('transicion-entrada');
        }, 420);
    }, 190);
}

function animarContenidoDinamico(contenido) {
    const titulo = contenido.querySelector('.seccion-titulo');
    const volver = contenido.querySelector('.btn-menu.volver');
    const items = [
        ...contenido.querySelectorAll(
            '.bloque-seccion, .bloque-acordeon, .menu-navegacion .btn-menu:not(.volver), .detalles-lugar, .tipo-vestimenta, .colores-evitar'
        )
    ].filter((elemento) => !elemento.closest('.bloque-acordeon .contenido-acordeon') || elemento.classList.contains('bloque-acordeon'));

    if (titulo) {
        titulo.style.opacity = '0';
        titulo.style.animation = 'fadeInDown 0.55s ease-out forwards';
    }

    items.forEach((elemento, indice) => {
        elemento.style.opacity = '0';
        elemento.style.animation = `fadeInUp 0.55s ease-out ${0.12 + indice * 0.12}s forwards`;
    });

    if (volver) {
        volver.style.opacity = '0';
        volver.style.animation = `fadeInUp 0.55s ease-out ${0.24 + items.length * 0.12}s forwards`;
    }
}

function mostrarMenuPrincipal() {
    actualizarContenido(`
        <p class="portada-etiqueta" style="animation: fadeInDown 0.6s ease-out forwards;">Nuestra boda</p>
        <h1 class="invitacion-titulo portada-nombres" style="animation: fadeInDown 0.6s ease-out 0.08s forwards;">Valeria & Mateo</h1>
        <p class="invitacion-texto" style="animation: fadeInUp 0.6s ease-out 0.2s forwards;">
            Tenemos el honor de invitarte a celebrar nuestro matrimonio junto al mar.
        </p>
        <p class="invitacion-fecha" style="animation: fadeInUp 0.6s ease-out 0.4s forwards;">
            S&aacute;bado &middot; 18 de octubre &middot; 2027
        </p>
        <nav class="menu-navegacion">
            <button class="btn-menu" onclick="mostrarPersonasEspeciales()">Personas especiales</button>
            <button class="btn-menu" onclick="mostrarItinerario()">Itinerario</button>
            <button class="btn-menu" onclick="mostrarVestimenta()">Confirmar asistencia</button>
            <button class="btn-menu" onclick="mostrarDetalles()">M&aacute;s detalles</button>
        </nav>
    `, 'foto2');
}

function mostrarPersonasEspeciales() {
    actualizarContenido(`
        <div class="seccion-contenido">
            <h2 class="seccion-titulo">Personas especiales</h2>

            <div class="bloque-acordeon activo">
                <button class="btn-acordeon" type="button" onclick="alternarAcordeon(this)">Familiares</button>
                <div class="contenido-acordeon">
                    <div class="grupo-personas">
                        <h3 class="seccion-subtitulo">Padres de la novia</h3>
                        <ul class="lista-familia">
                            <li>Claudia Rivera Montes</li>
                            <li>H&eacute;ctor Salinas Prado</li>
                        </ul>
                    </div>

                    <div class="grupo-personas">
                        <h3 class="seccion-subtitulo">Padres del novio</h3>
                        <ul class="lista-familia">
                            <li>Mariana Torres Villar</li>
                            <li>Esteban Luna C&aacute;rdenas</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bloque-acordeon">
                <button class="btn-acordeon" type="button" onclick="alternarAcordeon(this)">Padrinos</button>
                <div class="contenido-acordeon">
                    <div class="grupo-personas">
                        <h3 class="seccion-subtitulo">Anillos</h3>
                        <ul class="lista-familia">
                            <li>Luc&iacute;a Andrade Sol</li>
                            <li>Daniel Robles Mar</li>
                        </ul>
                    </div>

                    <div class="grupo-personas">
                        <h3 class="seccion-subtitulo">Velaci&oacute;n</h3>
                        <ul class="lista-familia">
                            <li>Elena Duarte R&iacute;os</li>
                            <li>Samuel Ortega Paz</li>
                        </ul>
                    </div>
                </div>
            </div>

            <button class="btn-menu volver" onclick="mostrarMenuPrincipal()">&larr; Volver</button>
        </div>
    `, 'foto1');
}

function alternarAcordeon(boton) {
    const bloque = boton.closest('.bloque-acordeon');
    if (!bloque) {
        return;
    }

    const contenedor = bloque.parentElement;
    const yaActivo = bloque.classList.contains('activo');

    contenedor.querySelectorAll('.bloque-acordeon').forEach((item) => {
        item.classList.remove('activo');
    });

    if (!yaActivo) {
        bloque.classList.add('activo');
    }
}

function mostrarItinerario() {
    actualizarContenido(`
        <div class="seccion-contenido">
            <h2 class="seccion-titulo">Itinerario</h2>

            <div class="bloque-acordeon activo">
                <button class="btn-acordeon" type="button" onclick="alternarAcordeon(this)">Ceremonia</button>
                <div class="contenido-acordeon">
                    <div class="grupo-personas">
                        <div class="detalles-lugar">
                            <p>5:30 PM</p>
                            <p>Capilla Santa Aurora</p>
                            <p>Blvd. Coral 124, Zona Marina</p>
                            <p>Puerto Encanto, M&eacute;xico</p>
                            <div class="acciones-seccion">
                                <a class="btn-accion" href="#" aria-disabled="true">Ver ubicaci&oacute;n</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bloque-acordeon">
                <button class="btn-acordeon" type="button" onclick="alternarAcordeon(this)">Recepci&oacute;n</button>
                <div class="contenido-acordeon">
                    <div class="grupo-personas">
                        <div class="detalles-lugar">
                            <p>7:30 PM</p>
                            <p>Jard&iacute;n Las Olas</p>
                            <p>Av. del Faro 88, Costa Dorada</p>
                            <p>Recepci&oacute;n, cena y fiesta</p>
                            <div class="acciones-seccion">
                                <a class="btn-accion" href="#" aria-disabled="true">Ver ubicaci&oacute;n</a>
                                <button class="btn-accion" type="button" onclick="mostrarProgramaRecepcion()">Ver programa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn-menu volver" onclick="mostrarMenuPrincipal()">&larr; Volver</button>
        </div>
    `, 'foto2');
}

function mostrarProgramaRecepcion() {
    actualizarContenido(`
        <div class="seccion-contenido programa-recepcion">
            <h2 class="seccion-titulo">Programa</h2>

            <div class="bloque-seccion">
                <ul class="lista-itinerario">
                    <li class="item-itinerario">
                        <span class="hora-itinerario">7:30 PM</span>
                        <span class="detalle-itinerario">Recepci&oacute;n de invitados y coctel de bienvenida.</span>
                    </li>
                    <li class="item-itinerario">
                        <span class="hora-itinerario">8:15 PM</span>
                        <span class="detalle-itinerario">Entrada de los novios.</span>
                    </li>
                    <li class="item-itinerario">
                        <span class="hora-itinerario">8:30 PM</span>
                        <span class="detalle-itinerario">Cena y brindis familiar.</span>
                    </li>
                    <li class="item-itinerario">
                        <span class="hora-itinerario">9:45 PM</span>
                        <span class="detalle-itinerario">Vals, pastel y apertura de pista.</span>
                    </li>
                    <li class="item-itinerario">
                        <span class="hora-itinerario">12:30 AM</span>
                        <span class="detalle-itinerario">Despedida bajo luces de bengala.</span>
                    </li>
                </ul>
            </div>

            <button class="btn-menu volver" onclick="mostrarItinerario()">&larr; Volver</button>
        </div>
    `, 'foto2');
}

function mostrarVestimenta() {
    actualizarContenido(`
        <div class="seccion-contenido">
            <h2 class="seccion-titulo">Confirmar asistencia</h2>

            <div class="bloque-seccion">
                <h3 class="seccion-subtitulo">RSVP</h3>
                <div class="detalles-lugar">
                    <p>Confirma antes del 20 de septiembre.</p>
                    <p>Nos ayudar&aacute;s a preparar cada detalle con cari&ntilde;o.</p>
                    <div class="acciones-seccion">
                        <a class="btn-accion" href="#" aria-disabled="true">Confirmar por WhatsApp</a>
                    </div>
                </div>
            </div>

            <div class="bloque-seccion">
                <h3 class="seccion-subtitulo">C&oacute;digo de vestimenta</h3>
                <p class="tipo-vestimenta">Formal de playa</p>

                <div class="colores-evitar">
                    <h4>Colores reservados</h4>
                    <div class="grid-colores">
                        <div class="item-color">
                            <div class="circulo-color color-oro"></div>
                            <span class="nombre-color">Rose Gold</span>
                        </div>
                        <div class="item-color">
                            <div class="circulo-color color-rojo"></div>
                            <span class="nombre-color">Vino</span>
                        </div>
                        <div class="item-color">
                            <div class="circulo-color color-beige"></div>
                            <span class="nombre-color">Arena</span>
                        </div>
                        <div class="item-color">
                            <div class="circulo-color color-blanco"></div>
                            <span class="nombre-color">Blanco</span>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn-menu volver" onclick="mostrarMenuPrincipal()">&larr; Volver</button>
        </div>
    `, 'foto1');
}

function mostrarDetalles() {
    actualizarContenido(`
        <div class="seccion-contenido">
            <h2 class="seccion-titulo">Detalles</h2>

            <div class="bloque-seccion">
                <h3 class="seccion-subtitulo">Mesa de regalos</h3>
                <div class="detalles-lugar">
                    <p>Tu presencia es nuestro regalo favorito.</p>
                    <p>Si deseas tener un detalle, contaremos con lluvia de sobres durante la recepci&oacute;n.</p>
                </div>
            </div>

            <div class="bloque-seccion">
                <h3 class="seccion-subtitulo">Hospedaje</h3>
                <div class="detalles-lugar">
                    <p>Tenemos tarifa especial en Hotel Brisa Clara.</p>
                    <p>Menciona el c&oacute;digo ficticio: BODA-VM.</p>
                </div>
            </div>

            <div class="bloque-seccion">
                <h3 class="seccion-subtitulo">Ni&ntilde;os</h3>
                <div class="detalles-lugar">
                    <p>Evento familiar con &aacute;rea tranquila para los m&aacute;s peque&ntilde;os.</p>
                </div>
            </div>

            <button class="btn-menu volver" onclick="mostrarMenuPrincipal()">&larr; Volver</button>
        </div>
    `, 'foto2');
}
