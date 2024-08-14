package com.example.car_rental.dto;
import java.sql.Date;
    
import lombok.Data;
@Data
public class BookingInfoDto {
  
        private String imageLink;
        private String type;
        private String model;
        private String agencyName;
        private String username;
        private Long phoneNumber;
        private Double price;
        private Date pickUpDate;
        private Date returnDate;
        public BookingInfoDto(String imageLink, String type, String model, String agencyName, String username,
                Long phoneNumber, Double price, Date pickUpDate, Date returnDate) {
            this.imageLink = imageLink;
            this.type = type;
            this.model = model;
            this.agencyName = agencyName;
            this.username = username;
            this.phoneNumber = phoneNumber;
            this.price = price;
            this.pickUpDate = pickUpDate;
            this.returnDate = returnDate;
        }
}
