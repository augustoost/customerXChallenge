import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { UpdateEmailController } from '../modules/emails/useCases/updateEmail/UpdateEmailController';
import { DeleteEmailController } from '../modules/emails/useCases/deleteEmail/DeleteEmailController';

const emailsRoutes = Router();

const updateEmailController = new UpdateEmailController();
const deleteEmailController = new DeleteEmailController();

emailsRoutes.use(ensureAuthenticated);

emailsRoutes.put('/:id', updateEmailController.handle);
emailsRoutes.delete('/:id', deleteEmailController.handle);

export { emailsRoutes };
