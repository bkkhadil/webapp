package com.system.core.service;

import com.system.core.entity.Espace;
import com.system.core.entity.Reservation;
import com.system.core.entity.ReservationStatus;
import com.system.core.entity.User;
import com.system.core.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }





    public Reservation updateReservationStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // Conversion du String vers l'enum
        ReservationStatus statusEnum = ReservationStatus.valueOf(status.toUpperCase());
        reservation.setStatus(statusEnum);

        return reservationRepository.save(reservation);
    }


    public List<Reservation> getPartnerReservations(Long partnerId) {
        return reservationRepository.findByEspaceCoWorkspacePartnerId(partnerId);
    }

    public List<Reservation> findByUserId(Integer userId) {
        return reservationRepository.findByUserId(userId);
    }


    public Reservation createReservation(Reservation reservation) {
        // Calcul du total
        Espace espace = reservation.getEspace();
        long jours = ChronoUnit.DAYS.between(
                reservation.getDateStart(),
                reservation.getDateEnd()
        ) + 1; // Inclure le jour de début

        double total = jours * espace.getPrixParMois() * reservation.getNbrePlaces();
        reservation.setTotal(total);

        reservation.setStatus(ReservationStatus.PENDING);
        return reservationRepository.save(reservation);
    }
}