const EventService = require('./event.service');

class EventController {
  
  async list(req, resp) {
    const events =  await EventService.list();
    console.log(events);
    if (events) {
      return resp.status(200).send(events);
    }
    return resp.status(404).send({message: "Not found"});
  }
  
  async getById(req, resp) {
    const event = await EventService.getById(req.params.eventId);
    if (event) {
      return resp.status(200).send(event);
    }
    return resp.status(404).send({message: "Not found"});
  }

  insert(req, resp) {
    let event = EventService.insert(req.body);
    return resp.json(event);
  }

  update(req, resp) {
    let event = EventService.update(req.body);
    return resp.json(event);
  }

  delete(req, resp) {
    return EventService.delete(req, resp);
  }
}

module.exports = new EventController();
