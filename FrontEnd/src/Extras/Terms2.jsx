import React from 'react';
import HomeDuplicate from '../HomeDuplicate';
import './Terms.css';
import FrontOlx from '../FrontOlx';

const Terms2 = () => {
  return (
    <div className='extrasbg'>
    <FrontOlx/>
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        By accessing and using our platform, you agree to comply with the following terms and conditions. Please read them carefully.
      </p>
      <p>
        <strong>1. User Responsibilities:</strong> Users are responsible for providing accurate information and conducting transactions ethically. Any fraudulent activity will result in account suspension.
      </p>
      <p>
        <strong>2. Payment and Fees:</strong> Users must adhere to our payment policies and fee structures. All transactions should be completed within the platform to ensure security.
      </p>
      <p>
        <strong>3. Privacy Policy:</strong> We are committed to protecting your privacy. Your personal information will not be shared with third parties without your consent.
      </p>
      <p>
        <strong>4. Prohibited Items:</strong> The sale of illegal or prohibited items is strictly forbidden. Please refer to our list of prohibited items before listing products.
      </p>
      <p>
        <strong>5. Dispute Resolution:</strong> In case of disputes, our customer support team will assist in resolving the issue. We encourage users to communicate and resolve disputes amicably.
      </p>
      <p>
        By using our platform, you agree to these terms and conditions. If you have any questions, please contact our support team.
      </p>
    </div>
    </div>
  );
};

export default Terms2;
