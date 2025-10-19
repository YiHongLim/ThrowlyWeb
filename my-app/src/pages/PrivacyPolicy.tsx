import React from 'react';
import { Typography, Divider, Card, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Table data for CCPA categories
  const ccpacategoriesColumns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Examples',
      dataIndex: 'examples',
      key: 'examples',
    },
    {
      title: 'Collected',
      dataIndex: 'collected',
      key: 'collected',
    },
  ];

  const ccpacategoriesData = [
    {
      key: '1',
      category: 'A. Identifiers',
      examples: 'Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name',
      collected: 'NO',
    },
    {
      key: '2',
      category: 'B. Personal information categories listed in the California Customer Records statute',
      examples: 'Name, contact information, education, employment, employment history, and financial information',
      collected: 'NO',
    },
    {
      key: '3',
      category: 'C. Protected classification characteristics under California or federal law',
      examples: 'Gender and date of birth',
      collected: 'NO',
    },
    {
      key: '4',
      category: 'D. Commercial information',
      examples: 'Transaction information, purchase history, financial details, and payment information',
      collected: 'NO',
    },
    {
      key: '5',
      category: 'E. Biometric information',
      examples: 'Fingerprints and voiceprints',
      collected: 'NO',
    },
    {
      key: '6',
      category: 'F. Internet or other similar network activity',
      examples: 'Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements',
      collected: 'NO',
    },
    {
      key: '7',
      category: 'G. Geolocation data',
      examples: 'Device location',
      collected: 'YES',
    },
    {
      key: '8',
      category: 'H. Audio, electronic, visual, thermal, olfactory, or similar information',
      examples: 'Images and audio, video or call recordings created in connection with our business activities',
      collected: 'NO',
    },
    {
      key: '9',
      category: 'I. Professional or employment-related information',
      examples: 'Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us',
      collected: 'NO',
    },
    {
      key: '10',
      category: 'J. Education Information',
      examples: 'Student records and directory information',
      collected: 'NO',
    },
    {
      key: '11',
      category: 'K. Inferences drawn from other personal information',
      examples: 'Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual\'s preferences and characteristics',
      collected: 'NO',
    },
  ];

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '24px',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          style={{ 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ff6f73 0%, #ff4757 100%)',
            border: 'none',
            borderRadius: '12px',
            height: '40px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(255,111,115,0.4)',
          }}
        >
          Back
        </Button>
        <Title level={1} style={{ marginBottom: '8px' }}>
          Privacy Policy
        </Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          Privacy Notice
        </Text>
      </div>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          PRIVACY NOTICE
        </Title>
        <Text strong style={{ fontSize: '16px' }}>
          Last updated April 07, 2022
        </Text>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This privacy notice for Gutter ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
        </Paragraph>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Download and use our mobile application (My Gutter), or any other application of ours that links to this privacy notice</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <Text strong>mygutter.com@gmail.com</Text>.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          SUMMARY OF KEY POINTS
        </Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for. You can also <Text strong><a href="#table-of-contents" style={{ color: '#ff6f73' }}>click here</a></Text> to go directly to our table of contents.
          </Paragraph>
        
        <div style={{ marginTop: '20px' }}>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>What personal information do we process?</Text> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Gutter and the Services, the choices you make, and the products and features you use. <Text strong><a href="#what-information" style={{ color: '#ff6f73' }}>Click here</a></Text> to learn more.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>Do we process any sensitive personal information?</Text> We do not process sensitive personal information.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>Do we receive any information from third parties?</Text> We do not receive any information from third parties.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>How do we process your information?</Text> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. <Text strong><a href="#how-process" style={{ color: '#ff6f73' }}>Click here</a></Text> to learn more.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>In what situations and with which parties do we share personal information?</Text> We may share information in specific situations and with specific third parties. <Text strong><a href="#when-share" style={{ color: '#ff6f73' }}>Click here</a></Text> to learn more.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>How do we keep your information safe?</Text> We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. <Text strong><a href="#how-keep-safe" style={{ color: '#ff6f73' }}>Click here</a></Text> to learn more.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>What are your rights?</Text> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. <Text strong><a href="#privacy-rights" style={{ color: '#ff6f73' }}>Click here</a></Text> to learn more.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>How do you exercise your rights?</Text> The easiest way to exercise your rights is by filling out our data subject request form available <Text strong><a href="https://app.termly.io/dsar/434d7eef-7e74-4066-9553-a42b900c7205" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>here</a></Text>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
          </Paragraph>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>Want to learn more about what Gutter does with any information we collect?</Text> <Text strong><a href="#full-notice" style={{ color: '#ff6f73' }}>Click here</a></Text> to review the notice in full.
          </Paragraph>
        </div>
      </Card>

      <Card id="table-of-contents" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          TABLE OF CONTENTS
        </Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8px' }}>
          {[
            '1. WHAT INFORMATION DO WE COLLECT?',
            '2. HOW DO WE PROCESS YOUR INFORMATION?',
            '3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?',
            '4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?',
            '5. HOW LONG DO WE KEEP YOUR INFORMATION?',
            '6. HOW DO WE KEEP YOUR INFORMATION SAFE?',
            '7. WHAT ARE YOUR PRIVACY RIGHTS?',
            '8. CONTROLS FOR DO-NOT-TRACK FEATURES',
            '9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?',
            '10. DO WE MAKE UPDATES TO THIS NOTICE?',
            '11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?',
            '12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?'
          ].map((item, index) => (
            <Text key={index} style={{ fontSize: '14px', display: 'block', padding: '4px 0' }}>
              {item}
            </Text>
          ))}
        </div>
      </Card>

      <Card id="what-information" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          1. WHAT INFORMATION DO WE COLLECT?
        </Title>
        
        <Title level={4} style={{ marginBottom: '12px' }}>
          Personal information you disclose to us
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We collect personal information that you provide to us.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>Personal Information Provided by You.</Text> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
        </Paragraph>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>usernames</li>
          <li>passwords</li>
          <li>contact preferences</li>
          <li>contact or authentication data</li>
          <li>billing addresses</li>
          <li>debit/credit card numbers</li>
          <li>mailing addresses</li>
          <li>email addresses</li>
          <li>names</li>
          <li>phone numbers</li>
        </ul>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>Sensitive Information.</Text> We do not process sensitive information.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          Application Data
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
        </Paragraph>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li><Text strong>Geolocation Information.</Text> We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li>
          <li><Text strong>Mobile Device Access.</Text> We may request access or permission to certain features from your mobile device, including your mobile device's calendar, camera, contacts, sensors, storage, and other features. If you wish to change our access or permissions, you may do so in your device's settings.</li>
          <li><Text strong>Push Notifications.</Text> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
        </ul>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </Paragraph>
      </Card>

      <Card id="how-process" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          2. HOW DO WE PROCESS YOUR INFORMATION?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
        </Paragraph>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li><Text strong>To facilitate account creation and authentication and otherwise manage user accounts.</Text> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
          <li><Text strong>To deliver and facilitate delivery of services to the user.</Text> We may process your information to provide you with the requested service.</li>
          <li><Text strong>To respond to user inquiries/offer support to users.</Text> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
          <li><Text strong>To send administrative information to you.</Text> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
          <li><Text strong>To fulfill and manage your orders.</Text> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
          <li><Text strong>To enable user-to-user communications.</Text> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
          <li><Text strong>To request feedback.</Text> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
          <li><Text strong>To deliver targeted advertising to you.</Text> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.</li>
          <li><Text strong>To protect our Services.</Text> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
          <li><Text strong>To administer prize draws and competitions.</Text> We may process your information to administer prize draws and competitions.</li>
          <li><Text strong>To evaluate and improve our Services, products, marketing, and your experience.</Text> We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
          <li><Text strong>To identify usage trends.</Text> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
          <li><Text strong>To determine the effectiveness of our marketing and promotional campaigns.</Text> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
          <li><Text strong>To comply with our legal obligations.</Text> We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
        </ul>
      </Card>

      <Card id="when-share" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We may share information in specific situations described in this section and/or with the following third parties.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We may need to share your personal information in the following situations:
        </Paragraph>
        
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li><Text strong>Business Transfers.</Text> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li><Text strong>When we use Google Maps Platform APIs.</Text> We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). To find out more about Google's Privacy Policy, please refer to <Text strong><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>this link</a></Text>. We obtain and store on your device ("cache") your location. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document.</li>
        </ul>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We may use cookies and other tracking technologies to collect and store your information.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <Text strong><a href="https://termly.io/products/cookie-policy-generator/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>Cookie Notice</a></Text>.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          5. HOW LONG DO WE KEEP YOUR INFORMATION?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </Paragraph>
      </Card>

      <Card id="how-keep-safe" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          6. HOW DO WE KEEP YOUR INFORMATION SAFE?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: We aim to protect your personal information through a system of organizational and technical security measures.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
        </Paragraph>
      </Card>

      <Card id="privacy-rights" style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          7. WHAT ARE YOUR PRIVACY RIGHTS?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: You may review, change, or terminate your account at any time.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details <Text strong><a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>here</a></Text>.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you are located in Switzerland, the contact details for the data protection authorities are available <Text strong><a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>here</a></Text>.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          Withdrawing your consent
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          Account Information
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you would at any time like to review or change the information in your account or terminate your account, you can:
        </Paragraph>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Log in to your account settings and update your user account.</li>
          <li>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</li>
        </ul>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you have questions or comments about your privacy rights, you may email us at <Text strong>mygutter.com@gmail.com</Text>.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          8. CONTROLS FOR DO-NOT-TRACK FEATURES
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          CCPA Privacy Notice
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The California Code of Regulations defines a "resident" as:
        </Paragraph>
        <ol style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>every individual who is in the State of California for other than a temporary or transitory purpose and</li>
          <li>every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</li>
        </ol>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          All other individuals are defined as "non-residents."
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If this definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal information.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          What categories of personal information do we collect?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We have collected the following categories of personal information in the past twelve (12) months:
        </Paragraph>
        
        <Table 
          columns={ccpacategoriesColumns} 
          dataSource={ccpacategoriesData} 
          pagination={false}
          size="small"
          style={{ marginTop: '16px' }}
        />
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '24px' }}>
          We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
        </Paragraph>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>Receiving help through our customer support channels;</li>
          <li>Participation in customer surveys or contests; and</li>
          <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
        </ul>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          How do we use and share your personal information?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          More information about our data collection and sharing practices can be found in this privacy notice.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          You may contact us by email at <Text strong>mygutter.com@gmail.com</Text>, or by referring to the contact details at the bottom of this document.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you are using an authorized agent to exercise your right to opt out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          Will your information be shared with anyone else?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Gutter has not disclosed or sold any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. Gutter will not sell personal information in the future belonging to website visitors, users, and other consumers.
        </Paragraph>
        
        <Title level={4} style={{ marginBottom: '12px', marginTop: '24px' }}>
          Your rights with respect to your personal data
        </Title>
        
        <Title level={5} style={{ marginBottom: '8px' }}>
          Right to request deletion of the data — Request to delete
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation, or any processing that may be required to protect against illegal activities.
        </Paragraph>
        
        <Title level={5} style={{ marginBottom: '8px' }}>
          Right to be informed — Request to know
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Depending on the circumstances, you have a right to know:
        </Paragraph>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>whether we collect and use your personal information;</li>
          <li>the categories of personal information that we collect;</li>
          <li>the purposes for which the collected personal information is used;</li>
          <li>whether we sell your personal information to third parties;</li>
          <li>the categories of personal information that we sold or disclosed for a business purpose;</li>
          <li>the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and</li>
          <li>the business or commercial purpose for collecting or selling personal information.</li>
        </ul>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.
        </Paragraph>
        
        <Title level={5} style={{ marginBottom: '8px' }}>
          Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We will not discriminate against you if you exercise your privacy rights.
        </Paragraph>
        
        <Title level={5} style={{ marginBottom: '8px' }}>
          Verification process
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g., phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.
        </Paragraph>
        
        <Title level={5} style={{ marginBottom: '8px' }}>
          Other privacy rights
        </Title>
        <ul style={{ fontSize: '16px', lineHeight: '1.6', marginLeft: '20px' }}>
          <li>You may object to the processing of your personal information.</li>
          <li>You may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the information.</li>
          <li>You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
          <li>You may request to opt out from future selling of your personal information to third parties. Upon receiving an opt-out request, we will act upon the request as soon as feasibly possible, but no later than fifteen (15) days from the date of the request submission.</li>
        </ul>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          To exercise these rights, you can contact us by email at <Text strong>mygutter.com@gmail.com</Text>, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          10. DO WE MAKE UPDATES TO THIS NOTICE?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
          In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
        </Paragraph>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you have questions or comments about this notice, you may email us at <Text strong>mygutter.com@gmail.com</Text> or by post to:
        </Paragraph>
        <div style={{ marginLeft: '20px', marginTop: '16px' }}>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
            <Text strong>Gutter</Text>
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
            1935 Long Road<br />
            Ames, IA 50010<br />
            United States
          </Paragraph>
        </div>
      </Card>

      <Card style={{ 
        marginBottom: '24px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,.08), 0 10px 20px -5px rgba(0,0,0,.04)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <Title level={3} style={{ color: '#ff6f73', marginBottom: '16px' }}>
          12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please submit a request form by <Text strong><a href="https://app.termly.io/dsar/434d7eef-7e74-4066-9553-a42b900c7205" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>clicking here</a></Text>.
        </Paragraph>
        <Divider />
        <Paragraph style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '24px' }}>
          This privacy policy was created using <a href="https://termly.io/products/privacy-policy-generator/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f73' }}>Termly's Privacy Policy Generator</a>.
        </Paragraph>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
