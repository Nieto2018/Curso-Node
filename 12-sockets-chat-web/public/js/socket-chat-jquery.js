var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var txtFiltroUsuarios = $('#txtFiltroUsuarios');

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) {

    // console.log(personas);

    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + sala + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, yo) {
    // <!--chat Row -->
    // <li>
    //     <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" />
    //     </div>
    //     <div class="chat-content">
    //         <h5>Bianca Doe</h5>
    //         <div class="box bg-light-info">It’s Great opportunity to work.</div>
    //     </div>
    //     <div class="chat-time">10:57 am</div>
    // </li>
    // <!--chat Row -->
    // <li class="reverse">
    //     <div class="chat-content">
    //         <h5>Steave Doe</h5>
    //         <div class="box bg-light-inverse">It’s Great opportunity to work.
    //         </div>
    //     </div>
    //     <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />
    //     </div>
    //     <div class="chat-time">10:57 am</div>
    // </li>

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        // yo
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        // otros
        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" />';
        }

        html += '</div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }


    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');

    if (id) {
        socket.emit('crearChatPrivadoServidor', {para: id}, function () {
            newWindow = window.open('chat.html?nombre=' + nombre + '&sala=' + id, 'chat_privado', 'height=960px,width=940px');
        });
    }
});

formEnviar.on('submit', function (event) {
    event.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});

txtFiltroUsuarios.on('keyup', function () {

    socket.emit('filtrarUsuarios', sala, txtFiltroUsuarios.val(), function (personas) {
        renderizarUsuarios(personas);
    });

});