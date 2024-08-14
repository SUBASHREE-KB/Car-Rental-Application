package com.example.car_rental.dto;

import lombok.Data;

@Data
public class StatusDto {

    private int trackId;
    private String status;

    public StatusDto(int trackId, String status) {
        this.trackId = trackId;
        this.status = status;
    }

}
