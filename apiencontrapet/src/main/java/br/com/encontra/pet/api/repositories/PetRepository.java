package br.com.encontra.pet.api.repositories;

import br.com.encontra.pet.api.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer> {}
