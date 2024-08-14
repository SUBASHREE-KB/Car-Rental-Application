package com.example.car_rental.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.BookingDetailsDTO;
import com.example.car_rental.dto.BookingInfoDto;
import com.example.car_rental.model.Booking;

import jakarta.transaction.Transactional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

        // Get all the bookings
        @Query(value = "SELECT new com.example.car_rental.dto.BookingInfoDto(v.imageLink, v.type, v.model,a.username,u.username, u.phoneNumber, b.price,b.pickUpDate, b.returnDate) "
                        +
                        "FROM Vehicle v " +
                        "JOIN Booking b ON b.vehicleId = v.vehicleId " +
                        "JOIN User u ON u.userId = b.userId JOIN User a ON a.userId = v.userId where b.status in ('Booked','Started') order by b.createdAt desc")
        List<BookingInfoDto> findAllBookingDetailsByBooking();

        // Get all bookings done for agency
        @Query(value = "SELECT new com.example.car_rental.dto.BookingDetailsDTO(v.imageLink, v.type, v.model, u.username, u.phoneNumber, b.pickUpDate, b.returnDate) "
                        + "FROM Vehicle v " +
                        "JOIN Booking b ON b.vehicleId = v.vehicleId " +
                        "JOIN User u ON u.userId = b.userId where b.status in ('Booked','Started') and  v.userId = :id order by b.createdAt desc")
        List<BookingDetailsDTO> findAllBookingDetailsById(@Param("id") int id);

        // Get all the bookings of customer
        @Query(value = "SELECT new com.example.car_rental.dto.BookingDetailsDTO(v.imageLink, v.type, v.model, u.username, u.phoneNumber, b.pickUpDate, b.returnDate) "
                        +
                        "FROM Vehicle v " +
                        "JOIN Booking b ON b.vehicleId = v.vehicleId " +
                        "JOIN User u ON u.userId = b.userId where b.userId = :id")
        List<BookingDetailsDTO> findAllBookingDetailsByUserId(@Param("id") int user_id);

        @Query("Select b.price from Booking b where b.bookId = :book_id")
        Double findAmountByBookId(@Param("book_id") int book_id);

        @Query("Select b.vehicleId from Booking b where b.bookId = :book_id")
        int findVehicleIdByBookId(@Param("book_id") int book_id);

        Booking findByBookId(int book_id);

        @Query("Select b.returnDate from Booking b where b.bookId = :book_id")
        Date findReturnDateByBookId(@Param("book_id") int book_id);

        @Query("Select b.userId from Booking b where b.bookId = :book_id")
        int findUserIdByBookId(@Param("book_id") int book_id);

        @Query("Select b.vehicleId from Booking b where b.bookId = :book_id")
        int getVehicleIdByBookId(@Param("book_id") int bookId);

        @Query("SELECT b FROM Booking b WHERE b.status = :status AND b.createdAt < :date")
        List<Booking> findByStatusAndCreatedAtBefore(@Param("status") String status, @Param("date") Date date);

        @Query("Select count(*) from Booking b where b.status = 'Booked' or b.status = 'Started'")
        Long countOfBooked();

        @Query("select count(*) from Booking b join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :id  and b.status in ('Started','Booked') ")
        Long countOfBookedByAgency(int id);

        @Modifying
        @Transactional
        @Query("UPDATE Booking b SET b.status = 'Started' WHERE b.pickUpDate = :today AND b.status = 'Booked'")
        void updateStatusForPickupDate(@Param("today") Date today);

        List<Booking> findByUserIdAndStatusOrderByCreatedAtDesc(int userId, String string);
       
        List<Booking> findByUserIdAndStatusInOrderByCreatedAtDesc(int userId, List<String> statuses);

        List<Booking> findAllByStatus(String string);

}
