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
@RequestMapping(value = "/")
public class PetController {
    @Autowired
    private PetRepository petRepository;

    @GetMapping("/pets")
    public List<Pet> listAllPets() {
        return petRepository.findAll();
    }

    @GetMapping("/pet/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable(value = "id") Integer petId)
       throws RelationTypeNotFoundException{
        Pet product = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Pet not found on :: " + petId));
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/pets")
    public Pet savePet(@Valid @RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @PutMapping("/pets/{id}")
    public ResponseEntity<Pet> updateProduct(@PathVariable(value = "id") Integer petId,
                                                 @Valid @RequestBody Pet petDetails) throws RelationTypeNotFoundException {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Pet not found on :: " + petId));
        pet.setName(petDetails.getName());
        pet.setRace(pet.getRace());
        pet.setWhatsapp(pet.getWhatsapp());
        pet.setCity(pet.getCity());
        pet.setState(pet.getState());
        pet.setLongitude(pet.getLongitude());
        pet.setLongitude(pet.getLatitude());
        final Pet updatedProduct = petRepository.save(pet);

        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/pet/{id}")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Integer petId) throws Exception {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RelationTypeNotFoundException("Product not found on :: " + petId));
        petRepository.delete(pet);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}