import React from 'react';
import Form from '@/components/Form';

const sampleData = {
  firebaseKey: '-O7uEf39hk3We_5rvoiUk',
  name: 'Max',
  text: 'I am not dead',
  userId: 'eEBDHrAAN6NF3zxUpQPFMsNPOkl1',
};
export default function FormPage() {
  return (
    <div>
      <h2>CREATE</h2>
      <Form />
      <h2>UPDATE</h2>
      <Form obj={sampleData} />
    </div>
  );
}
