package com.example.car_rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.car_rental.model.Vehicle;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOverdueNotification(String to, String username, Vehicle vehicleInfo, Long due) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Rent Overdue Notice");
        message.setText("Hello " + username + ",\n\n"
                + "The rental service for the below given vehicle is " + due
                + " days past the due date. Please return the vehicle as soon as possible.\n"
                + "Vehicle Information: \n"
                + "Model: " + vehicleInfo.getModel()
                + "\nType: " + vehicleInfo.getType()
                + "\nAdditional Charge: " + vehicleInfo.getPrice() * due
                + "\nThank you,\nRide-It Rentals");
        javaMailSender.send(message);
    }

    public void sendSuccessfulRegister(String to, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Successful Registration to Ride-It Rentals");
        message.setText("Hello " + username + ",\n\n"
                + "Your documents are verified and validated."
                + " You will now be able to access our website and provide rentals services." +
                " Thank you for choosing Ride-It Rentals\nThank you,\nRide-It Rentals");
        javaMailSender.send(message);
    }

    public void sendRejectRegister(String to, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Unsuccessful Registration to Ride-It Rentals");
        message.setText("Hello " + username + ",\n\n"
                + "Your documents are verified and validated. The documents are not very clear"
                + " So you will not have access our website and provide rentals services." +
                "\nThank you,\nRide-It Rentals");
        javaMailSender.send(message);
    }

    public void sendRefund(String to, String username, Double refund) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Successful money refund for booking cancellation");
        message.setText("Hello " + username + ",\n\n"
                + "The refund amount of Rs. " + refund
                + " for your recent booking cancellation has been credited to your account"
                + "\nThank you,\nRide-It Rentals");
        javaMailSender.send(message);
    }
}
