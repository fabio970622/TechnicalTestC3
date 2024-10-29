import express from "express";
import { user } from "../models/userData.js";
import { sendMail } from "../Components/Emailer.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();

// route to save record
router.post("/addrecord", async (request, response) => {
  try {
    if (!request.body.name || !request.body.height || !request.body.email) {
      return response.status(400).send({
        message: "Send all required fields: name, height, email",
      });
    }
    const newRecord = {
      name: request.body.name,
      height: request.body.height,
      email: request.body.email,
    };

    const record = await user.create(newRecord);

    const records = await user.find({ email: newRecord.email });
    const totalHeight = records.reduce((sum, user) => sum + user.height, 0);
    const averageHeight = totalHeight / records.length;

    // Send email after record is created
    await sendMail(
      newRecord.email,
      "Your Average Height",
      `<html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Hello ${newRecord.name},</h2>
            <p style="color: #555;">
              Thank you for using our service! We have calculated your average
              height based on your inputs.
            </p>
            <h3 style="color: #2c3e50;">Your Average Height</h3>
            <p style="font-size: 24px; font-weight: bold; color: #2980b9;">
              ${averageHeight.toFixed(2)} cm
            </p>
            <p style="color: #555;">
              If you have any questions or need further assistance, feel free to
              reach out!
            </p>
            <footer style="margin-top: 20px; font-size: 12px; color: #999;">
              <p>
                Best regards,<br>Convergenc3</br>
              </p>
            </footer>
          </div>
        </body>
      </html>`
    );

    return response.status(201).send(record);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all records
router.get("/getallrecords", async (request, response) => {
  try {
    const records = await user.find({});

    return response.status(200).json({
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
