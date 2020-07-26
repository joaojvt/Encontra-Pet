package br.com.encontra.pet.api.controller;

import br.com.encontra.pet.api.models.Pet;
import br.com.encontra.pet.api.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RelationTypeNotFoundException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/pets")
public class PetController {
    @Autowired
    private PetRepository petRepository;

    @GetMapping("")
    public List<Pet> listAllPets() {
        return petRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable(value = "id") Integer petId)
            throws RelationTypeNotFoundException {
        Pet Pet = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Pet not found on :: " + petId));
        return ResponseEntity.ok().body(Pet);
    }

    @PostMapping("")
    public Pet savePet(@Valid @RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable(value = "id") Integer petId,
                                             @Valid @RequestBody Pet petDetails) throws RelationTypeNotFoundException {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Pet not found on :: " + petId));
        pet.setName(petDetails.getName());
        pet.setRace(petDetails.getRace());
        pet.setGender(petDetails.getGender());
        pet.setWhatsapp(petDetails.getWhatsapp());
        pet.setCity(petDetails.getCity());
        pet.setState(petDetails.getState());
        pet.setLongitude(petDetails.getLongitude());
        pet.setLatitude(petDetails.getLatitude());
        final Pet updatedPet = petRepository.save(pet);

        return ResponseEntity.ok(updatedPet);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deletePet(@PathVariable(value = "id") Integer petId) throws Exception {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Pet not found on :: " + petId));
        petRepository.delete(pet);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}