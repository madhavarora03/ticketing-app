import { requireAuth, validateRequest } from "@my-ticketing-app/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  },
);

export { router as createTicketRouter };
