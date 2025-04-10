import mongoose, { mongo } from "mongoose";

const eventSchema = new mongoose.Schema({
        title: String,
        description: String,
        data: Date,
        venue: String,
        createdBy: {type:mongoose.Schema.Types.ObjectId , ref: 'User'},
        checkIns: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        registrations: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
});

export default mongoose.model('Event', eventSchema);
