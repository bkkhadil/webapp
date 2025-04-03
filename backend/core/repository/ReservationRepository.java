package com.system.core.repository;

import com.system.core.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r " +
            "JOIN r.espace e " +
            "JOIN e.coWorkspace c " +
            "WHERE c.partner.id = :partnerId")
    List<Reservation> findByEspaceCoWorkspacePartnerId(Long partnerId);


    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
    List<Reservation> findByUserId(@Param("userId") Integer userId);
}