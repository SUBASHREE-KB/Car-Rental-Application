package com.example.car_rental.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.sql.Timestamp;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private int paymentId;
    @Column(name = "book_id")
    private int bookId;
    @Column(name = "card_type", length = 50)
    private String cardType;
    @Column(name = "card_holder_name", length = 60)
    private String cardHolderName;
    @Column(name = "card_no")
    private Long cardNo;
    @Temporal(TemporalType.DATE)
    private Date expirationDate;
    private int cvv;
    private Double amount;
    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp time;
    @Column(length = 50)
    private String status;
    @Column(unique = true, length = 255)
    private String transactionId;
}
