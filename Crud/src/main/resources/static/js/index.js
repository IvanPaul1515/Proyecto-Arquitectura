document.addEventListener("DOMContentLoaded", function() {
    const crearPacienteForm = document.getElementById("crearPacienteForm");
    const listaPacientes = document.getElementById("listaPacientes");

    // Función para cargar la lista de pacientes
    function cargarPacientes() {
        fetch("/paciente/")
            .then(response => response.json())
            .then(pacientes => {
                listaPacientes.innerHTML = "";
                pacientes.forEach(paciente => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <p class="nombre">${paciente.nombre} ${paciente.apellido}</p>

                        <a class="btnEditar" data-id="${paciente.id}">Editar</a>
                        <a class="btnEliminar" data-id="${paciente.id}">Eliminar</a>
                    `;
                    listaPacientes.appendChild(li);

                    // Crear div para mostrar detalles del paciente
                    const detallesDiv = document.createElement("div");
                    detallesDiv.className = "detalles";
                    detallesDiv.innerHTML = `
                        <p><strong>Nombre:</strong> ${paciente.nombre} ${paciente.apellido}</p>
                        <p><strong>Tipo de Documento:</strong> ${paciente.tipoDocumento}</p>
                        <p><strong>ID:</strong> ${paciente.IDent}</p>
                        <p><strong>Fecha de Nacimiento:</strong> ${paciente.fechaNacimiento}</p>
                        <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
                        <p><strong>Dirección:</strong> ${paciente.direccion}</p>
                    `;
                    li.appendChild(detallesDiv);

                    const btnEditar = li.querySelector(".btnEditar");
                    const btnEliminar = li.querySelector(".btnEliminar");

                    btnEditar.addEventListener("click", () => editarPaciente(paciente));
                    btnEliminar.addEventListener("click", () => eliminarPaciente(paciente.id));

                    // Agregar o quitar clase 'active' al hacer clic en el paciente
                    li.addEventListener("click", () => {
                        // Remover 'active' de todos los elementos de la lista
                        Array.from(listaPacientes.children).forEach(item => item.classList.remove("active"));
                        // Agregar 'active' al elemento actual
                        li.classList.add("active");
                    });
                });
            });
    }

    cargarPacientes();

    // Manejar el envío del formulario para crear un paciente
    crearPacienteForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        const Ident = document.getElementById("ID").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;

        const nuevoPaciente = {
            nombre: nombre,
            apellido: apellido,
            tipoDocumento: tipoDocumento,
            Ident: Ident,
            fechaNacimiento: fechaNacimiento,
            telefono: telefono,
            direccion: direccion
        };

        fetch("/paciente/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPaciente)
        })
            .then(response => response.json())
            .then(() => {
                cargarPacientes();
                crearPacienteForm.reset();
            });
    });

    function editarPaciente(paciente) {
        console.log(paciente);
        const nuevoNombre = prompt("Nuevo nombre:", paciente.nombre);
        const nuevoApellido = prompt("Nuevo apellido:", paciente.apellido);
        const nuevoTipoDocumento = prompt("Nuevo tipo de documento:", paciente.tipoDocumento);
        const nuevoIDent = prompt("Nuevo número de documento:", paciente.IDent);
        const nuevaFechaNacimiento = prompt("Nueva fecha de nacimiento:", paciente.fechaNacimiento);
        const nuevoTelefono = prompt("Nuevo teléfono:", paciente.telefono);
        const nuevaDireccion = prompt("Nueva dirección:", paciente.direccion);

        if (nuevoNombre !== null && nuevoApellido !== null && nuevoTipoDocumento !== null &&
            nuevoIDent !== null && nuevaFechaNacimiento !== null && nuevoTelefono !== null && nuevaDireccion !== null) {
            const pacienteActualizado = {
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                tipoDocumento: nuevoTipoDocumento,
                IDent: nuevoIDent,
                fechaNacimiento: nuevaFechaNacimiento,
                telefono: nuevoTelefono,
                direccion: nuevaDireccion
            };

            fetch(`/paciente/${paciente.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pacienteActualizado)
            })
                .then(() => {
                    cargarPacientes();
                });
        }
    }

    // Función para eliminar un paciente
    function eliminarPaciente(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
            fetch(`/paciente/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    cargarPacientes();
                });
        }
    }
});
