import React from 'react';
import { Typography, Divider, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
          Terms and Conditions
        </Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          End User License Agreement
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
          END USER LICENSE AGREEMENT
        </Title>
        <Text strong style={{ fontSize: '16px' }}>
          Last updated November 17, 2022
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
          My Gutter is licensed to You (End-User) by My Gutter, located and registered at 1935 Long Road, Ames, Iowa 50010, United States ("Licensor"), for use only under the terms of this License Agreement.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          By downloading the Licensed Application from Apple's software distribution platform ("App Store"), and any update thereto (as permitted by this License Agreement), You indicate that You agree to be bound by all of the terms and conditions of this License Agreement, and that You accept this License Agreement. App Store is referred to in this License Agreement as "Services."
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The parties of this License Agreement acknowledge that the Services are not a Party to this License Agreement and are not bound by any provisions or obligations with regard to the Licensed Application, such as warranty, liability, maintenance and support thereof. My Gutter, not the Services, is solely responsible for the Licensed Application and the content thereof.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This License Agreement may not provide for usage rules for the Licensed Application that are in conflict with the latest Apple Media Services Terms and Conditions ("Usage Rules"). My Gutter acknowledges that it had the opportunity to review the Usage Rules and this License Agreement is not conflicting with them.
        </Paragraph>
        
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          My Gutter when purchased or downloaded through the Services, is licensed to You for use only under the terms of this License Agreement. The Licensor reserves all rights not expressly granted to You. My Gutter is to be used on devices that operate with Apple's operating systems ("iOS" and "Mac OS").
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
          TABLE OF CONTENTS
        </Title>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8px' }}>
          {[
            '1. THE APPLICATION',
            '2. SCOPE OF LICENSE',
            '3. TECHNICAL REQUIREMENTS',
            '4. MAINTENANCE AND SUPPORT',
            '5. USER-GENERATED CONTRIBUTIONS',
            '6. CONTRIBUTION LICENSE',
            '7. LIABILITY',
            '8. WARRANTY',
            '9. PRODUCT CLAIMS',
            '10. LEGAL COMPLIANCE',
            '11. CONTACT INFORMATION',
            '12. TERMINATION',
            '13. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY',
            '14. INTELLECTUAL PROPERTY RIGHTS',
            '15. APPLICABLE LAW',
            '16. MISCELLANEOUS'
          ].map((item, index) => (
            <Text key={index} style={{ fontSize: '14px', display: 'block', padding: '4px 0' }}>
              {item}
            </Text>
          ))}
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
          1. THE APPLICATION
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          My Gutter ("Licensed Application") is a piece of software created to tackle the problem of valuable items like couches, microwaves, etc., being dumped all around us, and seek to provide a sustainable, convenient, and more environmentally friendly solution to this problem. — and customized for iOS mobile devices ("Devices"). It is used to all users to trade and barter already used items.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The Licensed Application is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Licensed Application. You may not use the Licensed Application in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
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
          2. SCOPE OF LICENSE
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.1</Text> You are given a non-transferable, non-exclusive, non-sublicensable license to install and use the Licensed Application on any Devices that You (End-User) own or control and as permitted by the Usage Rules, with the exception that such Licensed Application may be accessed and used by other accounts associated with You (End-User, The Purchaser) via Family Sharing or volume purchasing.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.2</Text> This license will also govern any updates of the Licensed Application provided by Licensor that replace, repair, and/or supplement the first Licensed Application, unless a separate license is provided for such update, in which case the terms of that new license will govern.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.3</Text> You may not share or make the Licensed Application available to third parties (unless to the degree allowed by the Usage Rules, and with My Gutter's prior written consent), sell, rent, lend, lease or otherwise redistribute the Licensed Application.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.4</Text> You may not reverse engineer, translate, disassemble, integrate, decompile, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Licensed Application, or any part thereof (except with My Gutter's prior written consent).
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.5</Text> You may not copy (excluding when expressly authorized by this license and the Usage Rules) or alter the Licensed Application or portions thereof. You may create and store copies only on devices that You own or control for backup keeping under the terms of this license, the Usage Rules, and any other terms and conditions that apply to the device or software used. You may not remove any intellectual property notices. You acknowledge that no unauthorized third parties may gain access to these copies at any time. If you sell your Devices to a third party, you must remove the Licensed Application from the Devices before doing so.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.6</Text> Violations of the obligations mentioned above, as well as the attempt of such infringement, may be subject to prosecution and damages.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.7</Text> Licensor reserves the right to modify the terms and conditions of licensing.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>2.8</Text> Nothing in this license should be interpreted to restrict third-party terms. When using the Licensed Application, You must ensure that You comply with applicable third-party terms and conditions.
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
          3. TECHNICAL REQUIREMENTS
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>3.1</Text> The Licensed Application requires a firmware version 1.0.0 or higher. Licensor recommends using the latest version of the firmware.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>3.2</Text> Licensor attempts to keep the Licensed Application updated so that it complies with modified/new versions of the firmware and new hardware. You are not granted rights to claim such an update.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>3.3</Text> You acknowledge that it is Your responsibility to confirm and determine that the app end-user device on which You intend to use the Licensed Application satisfies the technical specifications mentioned above.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>3.4</Text> Licensor reserves the right to modify the technical specifications as it sees appropriate at any time.
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
          4. MAINTENANCE AND SUPPORT
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>4.1</Text> The Licensor is solely responsible for providing any maintenance and support services for this Licensed Application. You can reach the Licensor at the email address listed in the App Store Overview for this Licensed Application.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>4.2</Text> My Gutter and the End-User acknowledge that the Services have no obligation whatsoever to furnish any maintenance and support services with respect to the Licensed Application.
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
          5. USER-GENERATED CONTRIBUTIONS
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The Licensed Application may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or in the Licensed Application, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Licensed Application and through third-party websites or applications. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
        </Paragraph>
        <div style={{ marginLeft: '20px' }}>
          {[
            "The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.",
            "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Licensed Application, and other users of the Licensed Application to use your Contributions in any manner contemplated by the Licensed Application and this License Agreement.",
            "You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness or each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Licensed Application and this License Agreement.",
            "Your Contributions are not false, inaccurate, or misleading.",
            "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.",
            "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).",
            "Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.",
            "Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.",
            "Your Contributions do not violate any applicable law, regulation, or rule.",
            "Your Contributions do not violate the privacy or publicity rights of any third party.",
            "Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.",
            "Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.",
            "Your Contributions do not otherwise violate, or link to material that violates, any provision of this License Agreement, or any applicable law or regulation."
          ].map((item, index) => (
            <Paragraph key={index} style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>
              <Text strong>{index + 1}.</Text> {item}
            </Paragraph>
          ))}
        </div>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Any use of the Licensed Application in violation of the foregoing violates this License Agreement and may result in, among other things, termination or suspension of your rights to use the Licensed Application.
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
          6. CONTRIBUTION LICENSE
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          By posting your Contributions to any part of the Licensed Application or making Contributions accessible to the Licensed Application by linking your account from the Licensed Application to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use copy, reproduce, disclose, sell, resell, publish, broad cast, retitle, archive, store, cache, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area in the Licensed Application. You are solely responsible for your Contributions to the Licensed Application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to recategorize any Contributions to place them in more appropriate locations in the Licensed Application; and (3) to prescreen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
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
          7. LIABILITY
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>7.1</Text> Licensor's responsibility in the case of violation of obligations and tort shall be limited to intent and gross negligence. Only in case of a breach of essential contractual duties (cardinal obligations), Licensor shall also be liable in case of slight negligence. In any case, liability shall be limited to the foreseeable, contractually typical damages. The limitation mentioned above does not apply to injuries to life, limb, or health.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>7.2</Text> Licensor takes no accountability or responsibility for any damages caused due to a breach of duties according to Section 2 of this License Agreement. To avoid data loss, You are required to make use of backup functions of the Licensed Application to the extent allowed by applicable third-party terms and conditions of use. You are aware that in case of alterations or manipulations of the Licensed Application, You will not have access to the Licensed Application.
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
          8. WARRANTY
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.1</Text> Licensor warrants that the Licensed Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Licensed Application works as described in the user documentation.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.2</Text> No warranty is provided for the Licensed Application that is not executable on the device, that has been unauthorizedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by third parties, or if there are any other reasons outside of My Gutter's sphere of influence that affect the executability of the Licensed Application.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.3</Text> You are required to inspect the Licensed Application immediately after installing it and notify My Gutter about issues discovered without delay by email provided in Contact Information. The defect report will be taken into consideration and further investigated if it has been emailed within a period of thirty one (31) days after discovery.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.4</Text> If we confirm that the Licensed Application is defective, My Gutter reserves a choice to remedy the situation either by means of solving the defect or substitute delivery.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.5</Text> In the event of any failure of the Licensed Application to conform to any applicable warranty, You may notify the Services Store Operator, and Your Licensed Application purchase price will be refunded to You. To the maximum extent permitted by applicable law, the Services Store Operator will have no other warranty obligation whatsoever with respect to the Licensed Application, and any other losses, claims, damages, liabilities, expenses, and costs attributable to any negligence to adhere to any warranty.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>8.6</Text> If the user is an entrepreneur, any claim based on faults expires after a statutory period of limitation amounting to twelve (12) months after the Licensed Application was made available to the user. The statutory periods of limitation given by law apply for users who are consumers.
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
          9. PRODUCT CLAIMS
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          My Gutter and the End-User acknowledge that My Gutter, and not the Services, is responsible for addressing any claims of the End-User or any third party relating to the Licensed Application or the End-User's possession and/or use of that Licensed Application, including, but not limited to:
        </Paragraph>
        <div style={{ marginLeft: '20px' }}>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>(i)</Text> product liability claims;
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>(ii)</Text> any claim that the Licensed Application fails to conform to any applicable legal or regulatory requirement; and
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>(iii)</Text> claims arising under consumer protection, privacy, or similar legislation, including in connection with Your Licensed Application's use of the HealthKit and HomeKit.
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
          10. LEGAL COMPLIANCE
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          You represent and warrant that You are not located in a country that is subject to a US Government embargo, or that has been designated by the US Government as a "terrorist supporting" country; and that You are not listed on any US Government list of prohibited or restricted parties.
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
          11. CONTACT INFORMATION
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          For general inquiries, complaints, questions or claims concerning the Licensed Application, please contact:
        </Paragraph>
        <div style={{ marginLeft: '20px', marginTop: '16px' }}>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
            <Text strong>Elvis Kimara</Text>
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
            1935 Long Road<br />
            Ames, IA 50010<br />
            United States
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <Text strong>Email:</Text> mygutter.com@gmail.com
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
          12. TERMINATION
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          The license is valid until terminated by My Gutter or by You. Your rights under this license will terminate automatically and without notice from My Gutter if You fail to adhere to any term(s) of this license. Upon License termination, You shall stop all use of the Licensed Application, and destroy all copies, full or partial, of the Licensed Application.
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
          13. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          My Gutter represents and warrants that My Gutter will comply with applicable third-party terms of agreement when using Licensed Application.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          In Accordance with Section 9 of the "Instructions for Minimum Terms of Developer's End-User License Agreement," Apple's subsidiaries shall be third-party beneficiaries of this End User License Agreement and — upon Your acceptance of the terms and conditions of this License Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this End User License Agreement against You as a third-party beneficiary thereof.
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
          14. INTELLECTUAL PROPERTY RIGHTS
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          My Gutter and the End-User acknowledge that, in the event of any third-party claim that the Licensed Application or the End-User's possession and use of that Licensed Application infringes on the third party's intellectual property rights, My Gutter, and not the Services, will be solely responsible for the investigation, defense, settlement, and discharge or any such intellectual property infringement claims.
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
          15. APPLICABLE LAW
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          This License Agreement is governed by the laws of the State of Iowa excluding its conflicts of law rules.
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
          16. MISCELLANEOUS
        </Title>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>16.1</Text> If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>16.2</Text> Collateral agreements, changes and amendments are only valid if laid down in writing. The preceding clause can only be waived in writing.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <Text strong>16.3</Text> User agrees to the fact that abusive, hateful, and objectionable content is prohibited
        </Paragraph>
        <Divider />
        <Paragraph style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginTop: '24px' }}>
          This EULA was created using Termly's EULA Generator.
        </Paragraph>
      </Card>
    </div>
  );
};

export default TermsAndConditions;
