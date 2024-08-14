package com.example.car_rental.dto;

import lombok.Data;

@Data
public class AgencyDetailsDto {
    private String username;
    private Long phoneNumber;
    private String email;
    private String area;
    private String city;
    private String zip;

    public AgencyDetailsDto(String username, Long phoneNumber, String email, String area, String city, String zip) {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.area = area;
        this.city = city;
        this.zip = zip;
    }

    public AgencyDetailsDto(String username, Long phoneNumber, String email) {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

}
