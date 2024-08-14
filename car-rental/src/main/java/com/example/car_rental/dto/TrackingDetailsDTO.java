package com.example.car_rental.dto;

import java.util.Date;

import lombok.Data;

@Data
public class TrackingDetailsDTO {
    private String username;
    private Long phoneNumber;
    private String email;
    private String imageLink;
    private String type;
    private String model;
    private int trackId;
    private Date due;
    private String status;
    private Double fine;

    public TrackingDetailsDTO(String username, Long phoneNumber, String email, String imageLink, String type,
            String model, int trackId, Date due, String status, Double fine) {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.imageLink = imageLink;
        this.type = type;
        this.model = model;
        this.trackId = trackId;
        this.due = due;
        this.status = status;
        this.fine = fine;
    }

    public TrackingDetailsDTO() {
    }

}
