package com.example.car_rental.dto;

import lombok.Data;

@Data
public class AgencyMetricsDto {
    private String agencyName;
    private Long bookingCount;
    private double averageRating;
    private Long averageVehicleCount;
    private double totalRevenue;

    public AgencyMetricsDto(String agencyName, Long bookingCount, double averageRating, Long averageVehicleCount,
            double totalRevenue) {
        this.agencyName = agencyName;
        this.bookingCount = bookingCount;
        this.averageRating = averageRating;
        this.averageVehicleCount = averageVehicleCount;
        this.totalRevenue = totalRevenue;
    }

}
