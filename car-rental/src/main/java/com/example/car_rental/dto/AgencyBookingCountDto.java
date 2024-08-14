package com.example.car_rental.dto;

import lombok.Data;

@Data
public class AgencyBookingCountDto {
    private String agencyName;
    private long bookingCount;

    public AgencyBookingCountDto(String agencyName, long bookingCount) {
        this.agencyName = agencyName;
        this.bookingCount = bookingCount;
    }

}
