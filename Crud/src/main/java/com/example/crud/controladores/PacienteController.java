package com.example.crud.controladores;

import com.example.crud.Entidades.Paciente;
import com.example.crud.Repositorios.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    // Crear un paciente
    @PostMapping("/new")
    public Paciente crearPaciente(@RequestBody Paciente paciente) {
        System.out.println("NEW USER" + paciente.getId());
        return pacienteRepository.save(paciente);
    }

    // Leer todos los pacientes
    @GetMapping("/")
    public List<Paciente> obtenerPacientes() {
        System.out.println("ENTRE LISTAR TODOS");
        return pacienteRepository.findAll();
    }

    // Leer un paciente por ID
    @GetMapping("/{id}")
    public Optional<Paciente> obtenerPacientePorId(@PathVariable Long id) {
        return pacienteRepository.findById(Math.toIntExact(id));
    }

    // Actualizar un paciente
    @PutMapping("/{id}")
    public Paciente actualizarPaciente(@PathVariable Long id, @RequestBody Paciente pacienteActualizado) {
        pacienteActualizado.setId(id);
        return pacienteRepository.save(pacienteActualizado);
    }

    // Eliminar un paciente
    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        pacienteRepository.deleteById(Math.toIntExact(id));
    }

}
