    package com.system.core.controller;

    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.core.type.TypeReference;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.system.core.entity.CoWorkspace;
    import com.system.core.entity.Equipment;
    import com.system.core.entity.Espace;
    import com.system.core.repository.EquipmentRepository;
    import com.system.core.repository.CoWorkspaceRepository;
    import com.system.core.service.CoWorkspaceService;
    import com.system.core.service.EspaceService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.text.SimpleDateFormat;
    import java.util.Date;
    import java.util.List;
    import java.util.Scanner;



    @CrossOrigin(origins = "http://localhost:4200")
    @RestController
    @RequestMapping("/api/coworkspaces")
    public class CoWorkspaceController {

        @Autowired
        private EspaceService espaceService;



        @Autowired
        private CoWorkspaceService coWorkspaceService;


        @Autowired
        private CoWorkspaceRepository coWorkspaceRepository;

        @Autowired
        private  EquipmentRepository equipmentRepository;


        @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<?> createCoworkspace(
                @RequestParam("nom") String nom,
                @RequestParam("ville") String ville,
                @RequestParam("adresse") String adresse,
                @RequestParam("dateCreation") String dateCreation,
                @RequestParam("description") String description,
                @RequestParam("image") MultipartFile image, // Assurez-vous que ce nom correspond à celui utilisé dans Angular
                @RequestParam("equipmentNames") String equipmentNamesJson
        ) {
            try {
                // Convertir la chaîne JSON en liste d'équipements
                List<Equipment> equipmentNames = new ObjectMapper().readValue(equipmentNamesJson, new TypeReference<List<Equipment>>() {});

                // Convertir la date
                Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(dateCreation);

                // Créer un nouveau CoWorkspace
                CoWorkspace coWorkspace = new CoWorkspace();
                coWorkspace.setNom(nom);
                coWorkspace.setVille(ville);
                coWorkspace.setAdresse(adresse);
                coWorkspace.setDateCreation(date);
                coWorkspace.setDescription(description);

                // Gérer l'image
                if (image != null && !image.isEmpty()) {
                    coWorkspace.setImageData(image.getBytes()); // Convertir l'image en tableau de bytes
                }

                CoWorkspace savedCoworkspace = coWorkspaceService.createCoworkspace(coWorkspace, equipmentNames);
                return ResponseEntity.ok(savedCoworkspace);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création du coworking space.");
            }
        }







        @GetMapping
        public ResponseEntity<List<CoWorkspace>> getAllCoworkspaces() throws JsonProcessingException {
            List<CoWorkspace> coworkspaces = coWorkspaceService.getAllCoworkspaces();
            System.out.println(new ObjectMapper().writeValueAsString(coworkspaces)); // Afficher la réponse JSON
            return ResponseEntity.ok(coworkspaces);
        }
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCoworkspace(@PathVariable Long id) {
            System.out.println("Tentative de suppression du coworking space avec l'ID : " + id);
            if (!coWorkspaceRepository.existsById(id)) {
                System.out.println("Coworking space non trouvé avec l'ID : " + id);
                return ResponseEntity.notFound().build();
            }
            coWorkspaceRepository.deleteById(id);
            System.out.println("Coworking space supprimé avec succès : " + id);
            return ResponseEntity.noContent().build();
        }

        @GetMapping  ("/search") // Assurez-vous que c'est bien un GET
        public ResponseEntity<List<CoWorkspace>> searchCoworkspaces(
                @RequestParam(required = false) String city,
                @RequestParam(required = false) String searchQuery) {
            List<CoWorkspace> coworkspaces = coWorkspaceService.searchCoworkspaces(city, searchQuery);
            return ResponseEntity.ok(coworkspaces);
        }

        @GetMapping("/{id}")
        public ResponseEntity<CoWorkspace> getDetails(@PathVariable Long id) {
            CoWorkspace coworkspace = coWorkspaceService.findById(id);
            return coworkspace != null
                    ? ResponseEntity.ok(coworkspace)
                    : ResponseEntity.notFound().build();
        }

        // CoWorkspaceController.java

        // CoWorkspaceController.java
        @GetMapping("/equipments")
        public ResponseEntity<List<Equipment>> getAllEquipments() {
            return ResponseEntity.ok(equipmentRepository.findAll());
        }





        @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<CoWorkspace> updateCoworkspace(
                @PathVariable Long id,
                @RequestPart("coWorkspace") CoWorkspace updatedCoworkspace,
                @RequestPart(value = "image", required = false) MultipartFile file) {

            try {
                CoWorkspace updated = coWorkspaceService.updateCoworkspace(id, updatedCoworkspace, file);
                return ResponseEntity.ok(updated);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        // Méthodes pour Espace
        @DeleteMapping("/espaces/{id}")
        public ResponseEntity<Void> deleteEspace(@PathVariable Long id) {
            espaceService.delete(id);
            return ResponseEntity.noContent().build();
        }

        @PutMapping("/espaces/{id}")
        public ResponseEntity<Espace> updateEspace(
                @PathVariable Long id,
                @RequestBody Espace updatedEspace) {
            return ResponseEntity.ok(espaceService.update(id, updatedEspace));
        }








    }