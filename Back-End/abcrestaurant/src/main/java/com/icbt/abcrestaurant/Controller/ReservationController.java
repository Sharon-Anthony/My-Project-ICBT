package com.icbt.abcrestaurant.Controller;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.icbt.abcrestaurant.Service.ResrvationService;
import com.icbt.abcrestaurant.Model.Resrvation;



@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ResrvationService resrvationService;

    @GetMapping("/reservation")
    public ResponseEntity<List<Resrvation>> getAllReservations() {
        List<Resrvation> reservations = resrvationService.allReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

     @PostMapping("/reservation")
    public ResponseEntity<?> addRservation(@RequestBody Resrvation resrvation){
        try {
            System.out.println("Rservation is: "+resrvation);
            Resrvation savedResrvation = resrvationService.addRservation(resrvation);
            return new ResponseEntity<>(savedResrvation, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping("/reservations")
public ResponseEntity<List<Resrvation>> getReservationsByDateAndService(
        @RequestParam String serviceName,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
    List<Resrvation> reservations = resrvationService.findByServiceNameAndDate(serviceName, date);
    return new ResponseEntity<>(reservations, HttpStatus.OK);
}

@GetMapping("/reservation/count")
public ResponseEntity<Long> getUserCount() {
    long count = resrvationService.count();
    return new ResponseEntity<>(count, HttpStatus.OK);
}


@PutMapping("/reservation/{reservationId}")
public ResponseEntity<?> updateReservation(@PathVariable("reservationId") String reservationId, @RequestBody Resrvation resrvation) {
    try {
        Optional<Resrvation> existingReservationOpt = resrvationService.getReservationById(reservationId);
        if (!existingReservationOpt.isPresent()) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }

        Resrvation updatedReservation = resrvationService.updateReservation(reservationId, resrvation);
        return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@DeleteMapping("/reservation/{reservationId}")
public ResponseEntity<?> deleteReservation(@PathVariable("reservationId") String reservationId) {
    try {
        Optional<Resrvation> existingReservationOpt = resrvationService.getReservationById(reservationId);
        if (!existingReservationOpt.isPresent()) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }

        resrvationService.deleteReservationByReservationId(reservationId);
        return new ResponseEntity<>("Reservation deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
