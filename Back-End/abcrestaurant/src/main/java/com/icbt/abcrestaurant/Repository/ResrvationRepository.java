package com.icbt.abcrestaurant.Repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.icbt.abcrestaurant.Model.Resrvation;

@Repository
public interface ResrvationRepository extends MongoRepository<Resrvation,ObjectId> {

    List<Resrvation> findByServiceNameAndDate(String serviceName, LocalDate date);

    Optional<Resrvation> findByReservationId(String reservationId);

    void deleteByReservationId(String reservationId);



}
