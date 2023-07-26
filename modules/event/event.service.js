const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const Event = require('../../models/event.model');

const eventSchema = Joi.object({
  eventId: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  rating: Joi.string().required(),
})

class EventService {

    async list() {
      console.log('hello');
      const events = await Event.find({});
      return events;
    }
    
    async getById(eventId) {
      const event = await Event.findOne({
        eventId: eventId
      });
      return event;
    }

    async insert(event) {
      console.log(event);
      // event = await eventSchema.validate(event, { abortEarly: false });
      // event.hashedPassword = bcrypt.hashSync(event.password, 10);
      // delete event.password;
      return await new Event(event).save(function(err) {
        console.error(err);
        
      });
    }
    
  
    async update(event) {
      
      //event = await eventSchema.validate(event, { abortEarly: false });
      //console.log(JSON.stringify(event));
      // event.hashedPassword = bcrypt.hashSync(event.password, 10);
      // delete event.password;
      //console
      return await Event.findOneAndUpdate({eventId: event.eventId}, event);
    }
  
    async delete(req, resp) {
      return await Event.findByIdAndDelete({eventId: req.params.eventId});
    }
}

module.exports = new EventService();