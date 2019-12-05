const moment = require("moment");
// turn time to utc epoche
// console.log(moment.utc().valueOf());
// undo on server side to local
// console.log(moment(1575333808092))

const router = require("express").Router();
const Employee = require("../models/Employee");
const JobNumber = require("../models/JobNumber");
const LaborType = require("../models/LaborType");
const History = require("../models/History");

router.get("/", (req, res) => {
  res.json({
    epsActive: true
  })
});

// get all employees in database
router.get('/employees', (req, res, next) => {
  Employee.find()
    .then(employee => {
      res.json(employee);
    }).catch(err => console.log(err));
});

router.get('/laborTypes', (req, res, next) => {
  LaborType.find()
    .then(laborType => {
      res.json(laborType);
    }).catch(err => console.log(err));
});

router.get('/jobNumbers', (req, res, next) => {
  JobNumber.find()
    .then(jobNumber => {
      res.json(jobNumber);
    }).catch(err => console.log(err));
});

// add one employees to database
router.post('/employees', async (req, res, next) => {

  try {

    // check to see if employee is already in the database
    const employee = await Employee.findOne({ name: req.body.name });
    // if so return an error
    if(employee) return res.status(400).json({
      status: "Employee already exists"
    });

    // create an employee if the employees doesn't already exist with the request body data
    let newEmployee = new Employee({ ...req.body });
    // save the created employee to the database
    newEmployee.save((error, employee) => {
      // send an error if there is one
      if(error) return res.json({ error });
      // else send the create the created employee
      res.json({
        status: 'Employee added to database!',
        employee: req.body
      });
    });

  } catch(err) {
    // send an error if one isn't handle above
    res.status(500).json({ error: "server error adding employee" });
  }

});

router.post('/jobNumbers', async (req, res, next) => {
  try {
    const jobNumber = await JobNumber.findOne({ number: req.body.number });
    if(jobNumber) return res.status(400).json({
      status: "Job number already exists"
    });
    let newJobNumber = new JobNumber({ ...req.body });
    newJobNumber.save((error, jobNumber) => {
      if(error) return res.json({ error });
      res.json({
        status: 'Job number added to database!',
        jobNumber: req.body
      });
    });
  } catch(err) {
    res.status(500).json({ error: "server error adding job number" });
  }
});

router.post('/laborTypes', async (req, res, next) => {
  try {
    const laborType = await LaborType.findOne({ name: req.body.name });
    if(laborType) return res.status(400).json({
      status: "Labor type already exists"
    });
    let newLaborType = new LaborType({ ...req.body });
    newLaborType.save((error, laborType) => {
      if(error) return res.json({ error });
      res.json({
        status: 'Labor type added to database!',
        laborType: req.body
      });
    });
  } catch(err) {
    res.status(500).json({ error: "server error adding labor type" });
  }
});

router.post('/clockIn/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){
      employee.clockIn = moment.utc().valueOf();
      employee.jobNumber = req.body.jobNumber;
      employee.laborType = req.body.laborType;
      employee.save(err => {
        if(err) res.json({error: "error clocking in"})
        res.json({success: "successful punch"})
      })
    } else {
      res.json({
        error: "employee doesn't exist"
      })
    }
  })
});

router.post('/toLunch/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){
      employee.toLunch = moment.utc().valueOf();
      employee.jobNumber = req.body.jobNumber;
      employee.laborType = req.body.laborType;
      employee.save(err => {
        if(err) res.json({error: "error going to lunch"})
        res.json({success: "successful punch"})
      })
    } else {
      res.json({
        error: "employee doesn't exist"
      })
    }
  })
});

router.post('/fromLunch/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){
      employee.fromLunch = moment.utc().valueOf();
      employee.jobNumber = req.body.jobNumber;
      employee.laborType = req.body.laborType;
      employee.save(err => {
        if(err) res.json({error: "error coming from lunch"})
        res.json({success: "successful punch"})
      })
    } else {
      res.json({
        error: "employee doesn't exist"
      })
    }
  })
});

router.post('/clockOut/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){

      employee.clockOut = moment.utc().valueOf();
      employee.jobNumber = req.body.jobNumber;
      employee.laborType = req.body.laborType;

      employee.save((err, employee) => {

        if(err) res.json({error: "error clocking out"});
        let newHistory = new History({
          employeeId: employee._id,
          name: employee.name,
          jobTitle: employee.jobTitle,
          isContractor: employee.isContractor,
          isTech: employee.isTech,
          isActive: employee.isActive,
          clockIn: employee.clockIn,
          toLunch: employee.toLunch,
          fromLunch: employee.fromLunch,
          clockOut: employee.clockOut
        });
        newHistory.save((error, history) => {
          if(error) return res.json({ error });

          employee.clockIn = null;
          employee.toLunch = null;
          employee.fromLunch = null;
          employee.clockOut = null;
          employee.jobNumber = null;
          employee.laborType = null;
          employee.save(e => {
            if(e) res.json(e);
            res.json({success: "successful punch"})
          })

        });

      })

    } else {
      res.json({
        error: "employee doesn't exist"
      })
    }
  })
});

router.delete('/employees/:id', (req, res, next) => {
  Employee.findOneAndDelete({ _id: req.params.id })
    .then(data => {
      res.json({ success: "deletion successful" })
    }).catch(err => console.log(err))
});

router.delete('/laborTypes/:id', (req, res, next) => {
  LaborType.findOneAndDelete({ _id: req.params.id })
    .then(data => {
      res.json({ success: "deletion successful" })
    }).catch(err => console.log(err))
});

router.delete('/jobNumbers/:id', (req, res, next) => {
  JobNumber.findOneAndDelete({ _id: req.params.id })
    .then(data => {
      res.json({ success: "deletion successful" })
    }).catch(err => console.log(err))
});

router.post('/employees/toggleActivation/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){
      employee.isActive = !employee.isActive;
      employee.save(err => {
        if(err) res.json({error: "error toggling activation"})
        res.json({success: "successful activation toggle"})
      })
    } else {
      res.json({
        error: "employee doesn't exist"
      })
    }
  })
});

router.post('/jobNumbers/toggleActivation/:id', (req, res) => {
  JobNumber.findOne({
    _id: req.params.id
  }).then(jobNumber => {
    if(jobNumber){
      jobNumber.isActive = !jobNumber.isActive;
      jobNumber.save(err => {
        if(err) res.json({error: "error toggling activation"})
        res.json({success: "successful activation toggle"})
      })
    } else {
      res.json({
        error: "jobNumber doesn't exist"
      })
    }
  })
});

router.post('/laborTypes/toggleActivation/:id', (req, res) => {
  LaborType.findOne({
    _id: req.params.id
  }).then(laborType => {
    if(laborType){
      laborType.isActive = !laborType.isActive;
      laborType.save(err => {
        if(err) res.json({error: "error toggling activation"})
        res.json({success: "successful activation toggle"})
      })
    } else {
      res.json({
        error: "laborType doesn't exist"
      })
    }
  })
});

router.post('/editEmployee/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id
  }).then(employee => {
    if(employee){
      req.body.edits.map(data => {
        employee[data.key] = data.value;
      });
      employee.save(err => {
        if(err) res.json({error: "error editing employee"});
        res.json({success: "employee edited"})
      })
    } else {
      res.json({error: "employee does not exist"})
    }
  })
  .catch(err => res.json(err));
})

module.exports = router;
