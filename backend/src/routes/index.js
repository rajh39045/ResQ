import { Router } from "express";
import authRoutes from "./auth.routes.js";
import vehicleRoutes from "./vehicle.routes.js";
import mechanicRoutes from "./mechanic.routes.js";
import serviceRequestRoutes from "./serviceRequest.routes.js";
import quotationRoutes from "./quotation.routes.js";
import trackingRoutes from "./tracking.routes.js";
import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import notificationRoutes from "./notification.routes.js";
import uploadRoutes from "./upload.routes.js";


const router = Router();


router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use(
  "/mechanics",
  mechanicRoutes
);
router.use(
  "/requests",
  serviceRequestRoutes
);

router.use(
  "/quotations",
  quotationRoutes
);
router.use(
  "/tracking",
  trackingRoutes
);
router.use(
  "/reviews",
  reviewRoutes
);

router.use(
  "/users",
  userRoutes
);

router.use(
  "/admin",
  adminRoutes
);
router.use(
  "/notifications",
  notificationRoutes
);

router.use(
  "/uploads",
  uploadRoutes
);
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Healthy",
  });
});

export default router;