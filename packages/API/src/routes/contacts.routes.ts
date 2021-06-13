import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { ListContactsController } from '../modules/contacts/useCases/listContacts/ListContactsController';
import { ListContactByIdController } from '../modules/contacts/useCases/listContactById/ListContactByIdController';
import { CreateContactController } from '../modules/contacts/useCases/createContact/CreateContactController';
import { UpdateContactController } from '../modules/contacts/useCases/updateContacts/UpdateContactController';
import { DeleteContactController } from '../modules/contacts/useCases/deleteContact/DeleteContactController';

import { ListContactsByCustomerIdController } from '../modules/contacts/useCases/listContactsByCustomerId/ListContactsByCustomerIdController';

const contactsRoutes = Router();

const listContactController = new ListContactsController();
const listContactByIdController = new ListContactByIdController();
const createContactController = new CreateContactController();
const updateContactController = new UpdateContactController();
const deleteContactController = new DeleteContactController();

const listContactsByCustomerIdController =
  new ListContactsByCustomerIdController();

contactsRoutes.use(ensureAuthenticated);

contactsRoutes.get('/', listContactController.handle);
contactsRoutes.get('/listContactById/:id', listContactByIdController.handle);
contactsRoutes.post('/', createContactController.handle);
contactsRoutes.put('/:id', updateContactController.handle);
contactsRoutes.delete('/:id', deleteContactController.handle);

contactsRoutes.get(
  '/listByCustomerId/:id',
  listContactsByCustomerIdController.handle,
);

export { contactsRoutes };
