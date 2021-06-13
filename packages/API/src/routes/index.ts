import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { contactsRoutes } from './contacts.routes';
import { customersRoutes } from './customers.routes';
import { usersRoutes } from './users.routes';
import { emailsRoutes } from './emails.routes';
import { phonesRoutes } from './phones.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use('/customers', customersRoutes);
routes.use('/contacts', contactsRoutes);
routes.use('/users', usersRoutes);
routes.use('/emails', emailsRoutes);
routes.use('/phones', phonesRoutes);

export { routes };
