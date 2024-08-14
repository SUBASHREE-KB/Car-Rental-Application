package com.example.car_rental.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class BookingDetailsDTO {
    private String imageLink;
    private String type;
    private String model;
    private String username;
    private Long phoneNumber;
    private Date pickUpDate;
    private Date returnDate;

    public BookingDetailsDTO(String imageLink, String type, String model, String username, Long phoneNumber,
            Date pickUpDate, Date returnDate) {
        this.imageLink = imageLink;
        this.type = type;
        this.model = model;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.pickUpDate = pickUpDate;
        this.returnDate = returnDate;
    }

}
