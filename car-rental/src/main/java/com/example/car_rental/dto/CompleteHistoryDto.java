package com.example.car_rental.dto;

import com.example.car_rental.model.AgencyLocation;
import com.example.car_rental.model.Booking;
import com.example.car_rental.model.Tracking;
import com.example.car_rental.model.User;
import com.example.car_rental.model.Vehicle;

public class CompleteHistoryDto {
    private Tracking tracking;
    private Booking booking;
    private Vehicle vehicle;
    private AgencyLocation agencyLocation;
    private User user;

    public CompleteHistoryDto(Tracking tracking, Booking booking, Vehicle vehicle, AgencyLocation agencyLocation,
            User user) {
        this.tracking = tracking;
        this.booking = booking;
        this.vehicle = vehicle;
        this.agencyLocation = agencyLocation;
        this.user = user;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public AgencyLocation getAgencyLocation() {
        return agencyLocation;
    }

    public void setAgencyLocation(AgencyLocation agencyLocation) {
        this.agencyLocation = agencyLocation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tracking getTracking() {
        return tracking;
    }

    public void setTracking(Tracking tracking) {
        this.tracking = tracking;
    }

}
