import { container } from 'tsyringe';

import { IContactsRepository } from '../../modules/contacts/repositories/IContactsRepository';
import { ContactsRepository } from '../../modules/contacts/repositories/ContactsRepository';

import { CustomersRepository } from '../../modules/customers/repositories/CustomersRepository';
import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UserRepository } from '../../modules/accounts/repositories/UserRepository';

import { IEmailsRepository } from '../../modules/emails/repositories/IEmailsRepository';
import { EmailsRepository } from '../../modules/emails/repositories/EmailsRepository';

import { IPhonesRepository } from '../../modules/phones/repositories/IPhonesRepository';
import { PhonesRepository } from '../../modules/phones/repositories/PhonesRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<IEmailsRepository>(
  'EmailsRepository',
  EmailsRepository,
);

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);
