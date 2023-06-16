import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoutes = router;
