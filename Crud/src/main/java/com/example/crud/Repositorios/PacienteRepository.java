package com.example.crud.Repositorios;

import com.example.crud.Entidades.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository  extends JpaRepository<Paciente, Integer> {

}
