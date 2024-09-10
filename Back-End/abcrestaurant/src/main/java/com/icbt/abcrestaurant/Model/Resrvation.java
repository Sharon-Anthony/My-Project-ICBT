package com.icbt.abcrestaurant.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "reservation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Resrvation {
    @Id
    private ObjectId id;
    private String reservationId;
    private String serviceName;
    private String userName;
    private int people;
    private String email;
    private String type;
    private LocalDate date;
    private LocalTime time;
    private String confirmation;
    private String confirmedBy;
}
