import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Email } from '../../emails/entities/Email';
import { Phone } from '../../phones/entities/Phone';
import { Customer } from '../../customers/entities/Customer';

@Entity('contacts')
class Contact {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Email, email => email.contact)
  emails: Email[];

  @OneToMany(() => Phone, phone => phone.contact)
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

export { Contact };
