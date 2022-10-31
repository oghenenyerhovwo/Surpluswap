import express from "express";
import { isAuth } from "../../utils/index.js"

import { createEvent, updateEvent, deleteEvent, getEvent, getEvents, getEventsWithLimit } from "./controllers/index.js";


const router = express.Router();

// get Event
router.get(
    "/", 
    (req, res) => {
        getEvents(req, res)
});

// get Event with limit
router.get(
    "/limit/:limitNumber", 
    (req, res) => {
        getEventsWithLimit(req, res)
});

// create Event
router.post(
    "/", 
    isAuth,
    (req, res) => {
        createEvent(req, res)
});

router.get(
    "/:id", 
    (req, res) => {
        getEvent(req, res)
});

router.put(
    "/:id", 
    isAuth,
    (req, res) => {
        updateEvent(req, res)
});
// // get Produc
// // update Event
router.delete(
    "/:id", 
    isAuth,
    (req, res) => {
        deleteEvent(req, res)
});


export default router;