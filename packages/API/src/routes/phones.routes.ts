import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { UpdatePhoneController } from '../modules/phones/useCases/updatePhone/UpdatePhoneController';
import { DeletePhoneController } from '../modules/phones/useCases/deletePhone/DeletePhoneController';

const phonesRoutes = Router();

const updatePhoneController = new UpdatePhoneController();
const deletePhoneController = new DeletePhoneController();

phonesRoutes.use(ensureAuthenticated);

phonesRoutes.put('/:id', updatePhoneController.handle);
phonesRoutes.delete('/:id', deletePhoneController.handle);

export { phonesRoutes };
