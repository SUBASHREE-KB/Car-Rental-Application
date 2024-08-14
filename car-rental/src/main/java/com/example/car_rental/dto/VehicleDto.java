package com.example.car_rental.dto;

import lombok.Data;

@Data
public class VehicleDto {
    private int vehicleId;
    private String imageLink;
    private String model;
    private String type;
    private String username;
    private Long phoneNumber;
    private String address;

    public VehicleDto(int vehicleId, String imageLink, String type, String model, String username, Long phoneNumber,
            String address) {
        this.vehicleId = vehicleId;
        this.imageLink = imageLink;
        this.type = type;
        this.model = model;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

}
