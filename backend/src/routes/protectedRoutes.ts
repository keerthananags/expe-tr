import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Protected test route
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user info
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Protected route accessed", user });
});

export default router;
