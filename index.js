const updateList = (tbody) => {
    let userList = '';
    for (user of users) {
        const id = Object.keys(user)[0];
        const data = Object.values(user)[0];
        userList += `
            <tr>
                <th scope="row">${id}</th>
                <td>${data.usuario}</td>
                <td>${data.nombre}</td>
                <td>${data.apellido}</td>
                <td>${data.tipo_identificacion}</td>
                <td>${data.ciudad}</td>
                <td>${data.pais}</td>
                <td>${data.direccion}</td>
                <td>${data.telefono}</td>
            </tr>
        `;
    }
    tbody.innerHTML = userList;
}

const updateErrorMsg = (alert, msg) => {
    alert[0].innerHTML = msg;
}

const showErrorMsg = (alert, state) => {
    if (state) {
        alert.removeClass('d-none');
        alert.addClass('d-block');
        return;
    }
    alert.removeClass('d-block');
    alert.addClass('d-none');
}

$(function(){
    updateList($('#user-list')[0])
});

$('form#user-form').submit(function(e){
  	e.preventDefault();
    const formData = new FormData(e.target)
    const data = (Object.fromEntries(formData.entries()))

    const requiredFields = ['identificacion', 'usuario','nombre','apellido','tipo_identificacion','ciudad','pais','direccion','telefono'];
    const missingFields = [];
    for (field of requiredFields) {
        if (!data[field] || !data[field].trim())
            missingFields.push(field);
    }

    if (missingFields.length != 0) {
        updateErrorMsg($('#error-msg'), 'Los siguientes campos requeridos están vacíos: ' + missingFields.join(', '))
        showErrorMsg($('#error-msg'), true);
        return;
    }

    if (users.some(user => Object.keys(user)[0] === data.identificacion)) {
        updateErrorMsg($('#error-msg'), 'Este ID ya se encuentra en la lista de usuarios')
        showErrorMsg($('#error-msg'), true);
        return;
    }

    const newUser = {}
    newUser[data.identificacion] = data;
    delete newUser[data.identificacion].identificacion;

    users.push(newUser);
    updateList($('#user-list')[0]);
    $('form#user-form')[0].reset();
});

$('input').change(function() {
    showErrorMsg($('#error-msg'), false);
});

const users = [
    {
        1000000000: {
            usuario: "al123",
            nombre: "Alberto",
            apellido: "Enriquez Enriquez",
            tipo_identificacion: "Cédula",
            ciudad: "Miami",
            pais: "USA",
            direccion: "Calle 123 #123-123",
            telefono: "3150000000"
        }
    },
    {
        1000000001: {
            usuario: "al120",
            nombre: "Enrique",
            apellido: "Enriquez Enriquez",
            tipo_identificacion: "Cédula",
            ciudad: "New York",
            pais: "USA",
            direccion: "Calle 321 #123-123",
            telefono: "3150000001"
        }
    },
    {
        1000000002: {
            usuario: "al121",
            nombre: "Gonzalo",
            apellido: "Enriquez Enriquez",
            tipo_identificacion: "Cédula",
            ciudad: "Los Angeles",
            pais: "USA",
            direccion: "Calle 132 #123-123",
            telefono: "3150000002"
        }
    },
]


