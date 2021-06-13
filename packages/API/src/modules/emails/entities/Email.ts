import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  TableForeignKey,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/Customer';
import { Contact } from '../../contacts/entities/Contact';

@Entity('emails')
class Email {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  customer_id: string;

  @Column()
  contact_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

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

export { Email };
