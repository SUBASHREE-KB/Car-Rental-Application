package com.example.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ReviewDetailsDTO {
    private int vehicleId;
    private String imageLink;
    private String type;
    private String model;
    private String agency;
    private List<CustomerReviewDto> customerReviews;

    public ReviewDetailsDTO(int vehicleId, String imageLink, String type, String model, String agency) {
        this.vehicleId = vehicleId;
        this.imageLink = imageLink;
        this.type = type;
        this.model = model;
        this.agency = agency;
    }

    public void setCustomerReviews(List<CustomerReviewDto> customerReviews) {
        this.customerReviews = customerReviews;
    }

    public ReviewDetailsDTO() {
    }
}
