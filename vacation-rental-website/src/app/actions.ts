'use server';

import { Resend } from 'resend';

function required(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function submitInquiry(formData: FormData): Promise<void> {
  const firstName = required(formData.get('firstName'));
  const lastName = required(formData.get('lastName'));
  const email = required(formData.get('email'));
  const phone = required(formData.get('phone'));
  const checkIn = required(formData.get('checkInVisible'));
  const checkOut = required(formData.get('checkOutVisible'));
  const guests = required(formData.get('guestsVisible'));
  const message = required(formData.get('message'));
  const propertyName = required(formData.get('propertyName'));
  const propertyLocation = required(formData.get('propertyLocation'));

  if (!firstName || !lastName || !email || !phone) {
    throw new Error('Please complete the required contact fields.');
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const inquiryTo = process.env.BOOKING_INQUIRY_TO || 'Vacation@myersrealtync.com';
  const inquiryFrom = process.env.BOOKING_INQUIRY_FROM || 'Myers Realty Website <onboarding@resend.dev>';

  if (!resendApiKey) {
    throw new Error('Email delivery is not configured yet. Add RESEND_API_KEY in your environment settings.');
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: inquiryFrom,
      to: [inquiryTo],
      replyTo: email,
      subject: `Booking inquiry: ${propertyName || 'Vacation rental inquiry'}`,
      text: [
        'New booking inquiry from the vacation rental website',
        '',
        `Property: ${propertyName || 'Not specified'}`,
        `Location: ${propertyLocation || 'Not specified'}`,
        `Guest name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Check-in: ${checkIn || 'Not provided'}`,
        `Check-out: ${checkOut || 'Not provided'}`,
        `Guests: ${guests || 'Not provided'}`,
        '',
        'Message:',
        message || 'No message provided.',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e2a32; line-height: 1.6;">
          <h2 style="color: #2d4657;">New booking inquiry</h2>
          <p><strong>Property:</strong> ${propertyName || 'Not specified'}</p>
          <p><strong>Location:</strong> ${propertyLocation || 'Not specified'}</p>
          <p><strong>Guest name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Check-in:</strong> ${checkIn || 'Not provided'}</p>
          <p><strong>Check-out:</strong> ${checkOut || 'Not provided'}</p>
          <p><strong>Guests:</strong> ${guests || 'Not provided'}</p>
          <h3 style="color: #2d4657; margin-top: 24px;">Message</h3>
          <p>${(message || 'No message provided.').replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });

    return;
  } catch (error) {
    console.error('Inquiry email send failed', error);
    throw new Error('Something went wrong sending the inquiry. Please try again.');
  }
}
