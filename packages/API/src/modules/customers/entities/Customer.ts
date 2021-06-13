import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Email } from '../../emails/entities/Email';
import { Phone } from '../../phones/entities/Phone';
import { Contact } from '../../contacts/entities/Contact';

@Entity('customers')
class Customer {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @OneToMany(() => Contact, contact => contact.customer)
  contacts: Contact[];

  @OneToMany(() => Email, email => email.customer)
  emails: Email[];

  @OneToMany(() => Phone, phone => phone.customer)
  phones: Phone[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Customer };
