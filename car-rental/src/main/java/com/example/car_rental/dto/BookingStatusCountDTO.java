package com.example.car_rental.dto;

import lombok.Data;

@Data
public class BookingStatusCountDTO {

        private long confirmedCount;
        private long cancelledCount;

        public BookingStatusCountDTO(long confirmedCount, long cancelledCount) {
                this.confirmedCount = confirmedCount;
                this.cancelledCount = cancelledCount;
        }

        public BookingStatusCountDTO() {
        }

}
