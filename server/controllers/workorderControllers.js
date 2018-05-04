const moment = require('moment');

const workOrderByPropertyId = (req, res) => {
  const db = req.app.get('db');
  db
    .workOrderByPropertyId([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(200).json({error: `${err}`}));
};

const workOrderByResidentId = (req, res) => {
  const db = req.app.get('db');
  db
    .workOrderByResidentId([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(200).json({error: `${err}`}));
};

const addWorkOrder = (req, res) => {
  const db = req.app.get('db');
  const {
    content, urgency, propertyid, unitid,
  } = req.body;
  db
    .addWorkOrder([
      moment().format('MMMM Do YYYY'),
      content,
      urgency,
      propertyid,
      req.session.user.userid,
      unitid,
    ])
    .then(response => res.status(200).json({added: true, response: response[0]}))
    .catch(err => res.status(200).json({error: `${err}`}));
};

const closeWorkorder = (req, res) => {
  const db = req.app.get('db');

  db
    .closeWorkOrder([moment().format('MMMM Do YYYY'), req.params.id])
    .then(response => res.status(200).json({closed: true, response}))
    .catch(err => res.status(200).json({error: `${err}`}));
};

module.exports = {
  workOrderByPropertyId,
  workOrderByResidentId,
  addWorkOrder,
  closeWorkorder,
};
