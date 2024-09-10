package com.icbt.abcrestaurant.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.icbt.abcrestaurant.Model.Resrvation;
import com.icbt.abcrestaurant.Repository.ResrvationRepository;

@Service
public class ResrvationService {

    @Autowired
    private ResrvationRepository resrvationRepository;
   

    public List<Resrvation> allReservations() {
        return resrvationRepository.findAll();
    }


    public Resrvation addRservation(Resrvation resrvation) {
        resrvation.setReservationId(generateReservationId());
        return resrvationRepository.save(resrvation);
    }


    public List<Resrvation> findByServiceNameAndDate(String serviceName, LocalDate date) {
        return resrvationRepository.findByServiceNameAndDate(serviceName,date);
    }

    private String generateReservationId() {
        long count = resrvationRepository.count();
        return String.format("r%03d", count + 1);
    }


    public long count() {
        return resrvationRepository.count();
    }


    public Optional<Resrvation> getReservationById(String reservationId) {
        return resrvationRepository.findByReservationId(reservationId);
    }


    public Resrvation updateReservation(String reservationId, Resrvation resrvation) {
        Resrvation existingRservation = resrvationRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new RuntimeException("Query not found with id: " + reservationId));

        existingRservation.setServiceName(resrvation.getServiceName());
        existingRservation.setUserName(resrvation.getUserName());
        existingRservation.setPeople(resrvation.getPeople());
        existingRservation.setEmail(resrvation.getEmail());
        existingRservation.setType(resrvation.getType());
        existingRservation.setDate(resrvation.getDate());
        existingRservation.setTime(resrvation.getTime());
        existingRservation.setConfirmation(resrvation.getConfirmation());
        existingRservation.setConfirmedBy(resrvation.getConfirmedBy());

        return resrvationRepository.save(existingRservation);
    }


    public void deleteReservationByReservationId(String reservationId) {
        resrvationRepository.deleteByReservationId(reservationId);
    }
}
