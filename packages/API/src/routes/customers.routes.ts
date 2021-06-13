import { Router } from 'express';

import { ListCustomersController } from '../modules/customers/useCases/listCustomers/ListCustomersController';
import { ListCustomerByIdController } from '../modules/customers/useCases/listCustomerById/ListCustomerByIdController';
import { CreateCustomerController } from '../modules/customers/useCases/createCustomer/CreateCustomerController';
import { UpdateCustomerController } from '../modules/customers/useCases/updateCustomer/UpdateCustomerController';
import { DeleteCustomerController } from '../modules/customers/useCases/deleteCustomer/DeleteCustomerController';

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomerController = new ListCustomersController();
const listCustomerByIdController = new ListCustomerByIdController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

customersRoutes.get('/', listCustomerController.handle);

customersRoutes.get('/listCustomerById/:id', listCustomerByIdController.handle);

customersRoutes.post('/', createCustomerController.handle);

customersRoutes.put('/:id', updateCustomerController.handle);

customersRoutes.delete('/:id', deleteCustomerController.handle);

export { customersRoutes };
