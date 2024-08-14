package com.example.car_rental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.car_rental.model.Vehicle;
import com.example.car_rental.repository.VehicleRepository;
import com.example.car_rental.dto.VehicleDto;
import com.example.car_rental.dto.VehicleInfoDto;

import jakarta.transaction.Transactional;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepo;

    public List<Vehicle> getAllByUserId(int id) {
        return vehicleRepo.findAllByUserIdAndAvailabilityNot(id);
    }

    @Transactional
    public void updateVehicle(int userId, int vehicleId, Vehicle updatedVehicle) {

        Vehicle existingVehicle = vehicleRepo.findByVehicleIdAndUserId(vehicleId, userId);
        if (existingVehicle != null) {
            existingVehicle.setImageLink(updatedVehicle.getImageLink());
            existingVehicle.setModel(updatedVehicle.getModel());
            existingVehicle.setType(updatedVehicle.getType());
            existingVehicle.setPrice(updatedVehicle.getPrice());
            existingVehicle.setAvailability(updatedVehicle.getAvailability());
            vehicleRepo.save(existingVehicle);
        } else {
            throw new RuntimeException("Vehicle with id " + vehicleId + " not found for user " + userId);
        }
    }

    public Vehicle createNewVehicle(int userId, Vehicle newVehicle) {
        newVehicle.setUserId(userId);
        return vehicleRepo.save(newVehicle);
    }

    public List<VehicleInfoDto> getAll() {
        return vehicleRepo.findAllAvailabilityNot(-1);
    }

    public void findVehicleByIdSetAvailability(int vehicleId) {

        Vehicle v = vehicleRepo.findByVehicleId(vehicleId);
        v.setAvailability(-1);
        vehicleRepo.save(v);
    }

    public List<Vehicle> getAllByUserIdAndAvailable() {
        return vehicleRepo.findAllByAvailability();
    }

    public List<Vehicle> getAllByUserIdAndAvailableOrderByPrice() {
        return vehicleRepo.findAllByAvailabilityOrderByPrice();
    }

    public List<Vehicle> getVehiclesByLocation(String area, String city) {
        return vehicleRepo.findByLocationAreaAndLocationCity(area.toLowerCase(), city.toLowerCase());
    }

    public List<VehicleDto> getVehicleDetails(int vehicleId) {
        return vehicleRepo.findVehicleDetailsById(vehicleId);
    }
}
