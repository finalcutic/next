'use server';

import { sql } from '@vercel/postgres';
import { error } from 'console';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()
  .gt(0,{ message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'],{
  invalid_type_error: 'Please select an invoice status.',
}),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {

    const validatedFields = CreateInvoice.safeParse( {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
  const {customerId, amount, status}  = validatedFields.data
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  // Test it out:
  console.log(date)
try{
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  }
  catch(error) {
    return{messge: "Insert in invoice db is faild"};
  } 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse( {
  customerId: formData.get('customerId'),
  amount: formData.get('amount'),
  status: formData.get('status'),
});

const amountInCents = amount * 100;
try{
await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
}
catch(error){
  return {message: "UPDATE invoices Faild"}
}

revalidatePath('/dashboard/invoices');
redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

console.log(id)
try{
  throw new Error("Test error message");
  await sql`
DELETE FROM invoices WHERE id = ${id}
`;
}
catch(error){
 return {message: "DELETE from incoices faild"}
}
revalidatePath('/dashboard/invoices');
}

