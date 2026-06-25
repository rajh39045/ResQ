import { body } from "express-validator";

export const createVehicleValidation = [
body("vehicleNumber")
.trim()
.notEmpty()
.withMessage("Vehicle number is required")
.isLength({ min: 4, max: 20 })
.withMessage("Vehicle number must be between 4 and 20 characters"),

body("vehicleType")
.trim()
.notEmpty()
.withMessage("Vehicle type is required")
.isIn([
"CAR",
"BIKE",
"TRUCK",
"BUS",
"SUV",
"VAN"
])
.withMessage("Invalid vehicle type"),

body("brand")
.trim()
.notEmpty()
.withMessage("Brand is required"),

body("model")
.trim()
.notEmpty()
.withMessage("Model is required"),

body("year")
.optional()
.isInt({
min: 1980,
max: new Date().getFullYear() + 1
})
.withMessage("Invalid manufacturing year"),

body("color")
.optional()
.trim(),

body("fuelType")
.optional()
.isIn([
"PETROL",
"DIESEL",
"ELECTRIC",
"CNG",
"HYBRID"
])
.withMessage("Invalid fuel type")
];

export const updateVehicleValidation = [
body("vehicleNumber")
.optional()
.trim()
.isLength({ min: 4, max: 20 })
.withMessage("Vehicle number must be between 4 and 20 characters"),

body("vehicleType")
.optional()
.isIn([
"CAR",
"BIKE",
"TRUCK",
"BUS",
"SUV",
"VAN"
])
.withMessage("Invalid vehicle type"),

body("brand")
.optional()
.trim(),

body("model")
.optional()
.trim(),

body("year")
.optional()
.isInt({
min: 1980,
max: new Date().getFullYear() + 1
})
.withMessage("Invalid manufacturing year"),

body("color")
.optional()
.trim(),

body("fuelType")
.optional()
.isIn([
"PETROL",
"DIESEL",
"ELECTRIC",
"CNG",
"HYBRID"
])
.withMessage("Invalid fuel type")
];
