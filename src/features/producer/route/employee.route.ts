import express from "express";
import {
  EmployeeParamReadOneEntity,
  EmployeeQueryReadOneEntity,
} from "../../domain/entities/filters/employee.filter.entity";
import EmployeeController from "../controller/employee.controller";

const router = express.Router();

const controller = new EmployeeController();

const uri = "/employees";

// index
router.get(uri, async (req: express.Request, res: express.Response) => {
  try {
    const data = controller.index();

    res.json(data);
  } catch (err) {
    if (err instanceof Error)
      res.status(400).json({
        message: err["message"],
      });
  }
});

// get one
router.get(
  `${uri}/:id`,
  async (req: express.Request, res: express.Response) => {
    try {
      const { params, query } = req;

      const data = controller.show(
        params as EmployeeParamReadOneEntity,
        query as EmployeeQueryReadOneEntity
      );

      res.json(data);
    } catch (err) {
      if (err instanceof Error) res.status(404).json({ message: err.message });
    }
  }
);

// create
router.post(uri, async (req: express.Request, res: express.Response) => {
  try {
    const data = controller.create(req.body);

    return res.json(data);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
});

// update
router.put(
  `${uri}/:id`,
  async (req: express.Request, res: express.Response) => {
    try {
      const data = controller.update(parseInt(req.params.id), req.body);
      console.log(data, "apanehhh");
      return res.json(data);
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ message: err.message });
    }
  }
);

// delete
router.delete(
  `${uri}/:id`,
  async (req: express.Request, res: express.Response) => {
    try {
      controller.delete(parseInt(req.params.id));
      return res.json("Employee succesfully deleted");
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
