package com.example.car_rental.dto;

import lombok.Data;

@Data
public class FavoritesDto {
    private int favId;
    private int userId;
    private int vehicleId;
    private int flag;
    private String imageLink;
    private String type;
    private String model;
    private double price;
    private int availability;

    public FavoritesDto(int favId, int userId, int vehicleId, int flag, String imageLink, String type, String model,
            double price, int availability) {
        this.favId = favId;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.flag = flag;
        this.imageLink = imageLink;
        this.type = type;
        this.model = model;
        this.price = price;
        this.availability = availability;
    }

}
