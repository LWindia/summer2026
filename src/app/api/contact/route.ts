import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, query, college } = body;
    
    // Validate required fields (query is optional)
    if (!fullName || !email || !phone || !college) {
      return NextResponse.json(
        { success: false, message: 'Full Name, Email, Phone, and College are required' },
        { status: 400 }
      );
    }

    // Send data to Google Sheets via Google Apps Script
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (googleAppsScriptUrl) {
      try {
        console.log('Sending query form data to Google Sheets...');
        const googleResponse = await fetch(googleAppsScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            college,
            query: query || '', // Query is optional, default to empty string
          }),
        });

        if (!googleResponse.ok) {
          throw new Error(`Google Apps Script returned status ${googleResponse.status}`);
        }

        const googleResult = await googleResponse.json();
        
        if (!googleResult.success) {
          console.error('Google Sheets error:', googleResult.message);
          // Continue with email fallback even if Google Sheets fails
        } else {
          console.log('✅ Query form data saved to Google Sheets successfully');
        }
      } catch (googleError) {
        console.error('❌ Error sending to Google Sheets:', googleError);
        // Continue with email fallback - don't fail the request
      }
    } else {
      console.warn('⚠️ GOOGLE_APPS_SCRIPT_URL not configured, skipping Google Sheets submission');
    }

    // Optional: Send email notification (if SMTP is configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        // Email content
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.RECIPIENT_EMAIL,
          subject: `New Query from ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>New Query Received</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>College Name:</strong> ${college}</p>
              <p><strong>Query:</strong> ${query || 'No query provided'}</p>
            </div>
          `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails, Google Sheets is the primary storage
      }
    }

    return NextResponse.json(
      { success: true, message: 'Query submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit query', error: String(error) },
      { status: 500 }
    );
  }
}