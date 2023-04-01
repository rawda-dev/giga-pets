import { Router } from "express";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
import {
  appointmentByID,
  create,
  listByUser,
  read,
  remove,
  update,
} from "../controllers/appointment.controller";
const router = Router();
router
  .route("/users/:userId/appointments/")
  .post(requireLogin, hasAuthorization, create)
  .get(requireLogin, hasAuthorization, listByUser);
router
  .route("/users/:userId/appointments/:appointmentId")
  .get(requireLogin, hasAuthorization, read)
  .put(requireLogin, hasAuthorization, update)
  .delete(requireLogin, hasAuthorization, remove);

router.param("userId", userByID);
router.param("appointmentId", appointmentByID);
export default router;
