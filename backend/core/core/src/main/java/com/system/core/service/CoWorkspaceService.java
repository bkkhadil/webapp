    package com.system.core.service;

    import com.system.core.entity.CoWorkspace;
    import com.system.core.repository.CoWorkspaceRepository;
    import com.system.core.repository.EquipmentRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import com.system.core.entity.Equipment;
    import org.springframework.transaction.annotation.Transactional;

    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Optional;
    import org.springframework.web.multipart.MultipartFile;
    import java.io.IOException;

    @Service
    public class CoWorkspaceService {

        @Autowired
        private  CoWorkspaceRepository coWorkspaceRepository;

        @Autowired
        private EquipmentRepository equipmentRepository;


        @Transactional
        public CoWorkspace createCoworkspace(CoWorkspace coWorkspace, List<Equipment> equipments) {
            List<Equipment> persistedEquipments = new ArrayList<>();

            for (Equipment equipment : equipments) {
                Optional<Equipment> existingEquipment = equipmentRepository.findByNom(equipment.getNom());
                if (existingEquipment.isPresent()) {
                    persistedEquipments.add(existingEquipment.get());
                } else {
                    Equipment savedEquipment = equipmentRepository.saveAndFlush(equipment); // Use saveAndFlush to persist immediately
                    persistedEquipments.add(savedEquipment);
                }
            }

            coWorkspace.setEquipments(persistedEquipments);
            return coWorkspaceRepository.save(coWorkspace);
        }
        public List<CoWorkspace> getAllCoworkspaces() {
            return coWorkspaceRepository.findAll();
        }
        @Transactional
        public void deleteCoworkspace(Long id) {
            coWorkspaceRepository.deleteById(id);
        }
        @Transactional
        public CoWorkspace updateCoworkspace(Long id, CoWorkspace updatedCoworkspace) {
            CoWorkspace existingCoworkspace = coWorkspaceRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Coworking space non trouvé."));

            // Mettre à jour les propriétés de existingCoworkspace avec celles de updatedCoworkspace
            existingCoworkspace.setNom(updatedCoworkspace.getNom());
            existingCoworkspace.setVille(updatedCoworkspace.getVille());
            existingCoworkspace.setAdresse(updatedCoworkspace.getAdresse());
            existingCoworkspace.setDateCreation(updatedCoworkspace.getDateCreation());
            existingCoworkspace.setDescription(updatedCoworkspace.getDescription());
            existingCoworkspace.setImage(updatedCoworkspace.getImage());

            // Sauvegarder les modifications
            return coWorkspaceRepository.save(existingCoworkspace);
        }


        public List<CoWorkspace> searchCoworkspaces(String city, String searchQuery) {
            return coWorkspaceRepository.searchByCityAndQuery(
                    city != null ? city : "",
                    searchQuery != null ? searchQuery : ""
            );
        }






        public CoWorkspace findById(Long id) {
            return coWorkspaceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Coworkspace non trouvé"));
        }

        @Transactional
        public CoWorkspace updateCoworkspace(Long id, CoWorkspace updatedCoworkspace, MultipartFile file) {
            CoWorkspace existing = coWorkspaceRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Coworkspace non trouvé"));

            // Mettre à jour les champs de base
            existing.setNom(updatedCoworkspace.getNom());
            existing.setVille(updatedCoworkspace.getVille());
            existing.setAdresse(updatedCoworkspace.getAdresse());
            existing.setDateCreation(updatedCoworkspace.getDateCreation());
            existing.setDescription(updatedCoworkspace.getDescription());

            // Gérer l'image
            if (file != null && !file.isEmpty()) {
                try {
                    existing.setImageData(file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Erreur de lecture du fichier image", e);
                }
            }

            // Mettre à jour les équipements
            List<Equipment> persistedEquipments = new ArrayList<>();
            for (Equipment eq : updatedCoworkspace.getEquipments()) {
                Equipment existingEq = equipmentRepository.findByNom(eq.getNom())
                        .orElseGet(() -> equipmentRepository.save(eq));
                persistedEquipments.add(existingEq);
            }
            existing.setEquipments(persistedEquipments);

            return coWorkspaceRepository.save(existing);
        }



    }