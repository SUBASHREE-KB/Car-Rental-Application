package com.example.car_rental.dto;

import lombok.Data;

@Data
public class AgencyRequestDto {
    private String username;
    private Long phoneNumber;
    private String email;
    private String password;
    private String area;
    private String city;
    private String zip;
    private String businessLicense;
    private String status;

    public AgencyRequestDto(String username, Long phoneNumber, String email, String password, String area, String city,
            String zip, String businessLicense, String status) {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.area = area;
        this.city = city;
        this.zip = zip;
        this.businessLicense = businessLicense;
        this.status = status;
    }

}
