import { Router } from "express";
import { hasAuthorization, requireLogin} from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
import { create } from "../controllers/appointment.controller";
const router = Router();
router.route("/users/:userId/appointments/").post(requireLogin, hasAuthorization, create);
router.param("userId", userByID);
export default router;