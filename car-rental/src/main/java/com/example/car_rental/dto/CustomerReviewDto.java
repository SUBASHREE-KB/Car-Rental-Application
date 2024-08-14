package com.example.car_rental.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CustomerReviewDto {
    private String customerName;
    private Long phoneNumber;
    private int rating;
    private String comment;
    private LocalDate date;

    public CustomerReviewDto(String customerName, Long phoneNumber, int rating, String comment, LocalDate date) {
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }
}
