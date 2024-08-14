package com.example.car_rental.dto;

import lombok.Data;
@Data
public class VehicleInfoDto {
   
        private int vehicleId;
        private String imageLink;
        private String model;
        private String type;
        private Double price;
        private int availability;
        private String username;
        private Long phoneNumber;
        private String address;
        public VehicleInfoDto(int vehicleId, String imageLink, String model, String type, Double price,
                int availability, String username, Long phoneNumber, String address) {
            this.vehicleId = vehicleId;
            this.imageLink = imageLink;
            this.model = model;
            this.type = type;
            this.price = price;
            this.availability = availability;
            this.username = username;
            this.phoneNumber = phoneNumber;
            this.address = address;
        }
       
    
     
    
    
    
}
