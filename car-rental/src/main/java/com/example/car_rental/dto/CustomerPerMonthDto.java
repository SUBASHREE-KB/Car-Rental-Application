package com.example.car_rental.dto;

import lombok.Data;

@Data
public class CustomerPerMonthDto {
    private int month;
    private long customerCount;
    private long agencyCount;

    public CustomerPerMonthDto(int month, long customerCount, long agencyCount) {
        this.month = month;
        this.customerCount = customerCount;
        this.agencyCount = agencyCount;
    }
}
