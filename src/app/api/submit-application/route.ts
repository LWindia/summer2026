// app/api/submit-application/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import dbConnect from '@/lib/mongodb';
// import Application from '../../../../models/Application';
import { getApplicationEmailTemplate } from '../../../../utils/emailTemplates';

export async function POST(req: Request) {
  try {
    // Connect to database
    // await dbConnect();

    // Get form data
    const formData = await req.json();
    const { step, isPartial, ...applicationData } = formData;
    console.log('Received form data:', { step, isPartial, applicationData });

    // Send data to Google Sheets via Google Apps Script (for both partial and complete submissions)
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM;
    let googleSheetsSuccess = false;
    let googleSheetsError = null;
    
    if (googleAppsScriptUrl) {
      try {
        const submissionType = isPartial ? 'Partial' : 'Complete';
        console.log(`📤 Sending application form data to Google Sheets (${submissionType}, Step ${step})...`);
        console.log('📋 Data being sent:', { ...applicationData, step: step || '', isPartial: isPartial !== undefined ? isPartial : true });
        
        const googleResponse = await fetch(googleAppsScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...applicationData,
            step: step || '',
            isPartial: isPartial !== undefined ? isPartial : true,
          }),
        });

        console.log(`📥 Google Apps Script response status: ${googleResponse.status}`);

        if (!googleResponse.ok) {
          const errorText = await googleResponse.text();
          
          // Check for 403 Access Denied error
          if (googleResponse.status === 403) {
            throw new Error(`403 Access Denied: The Google Apps Script web app is not accessible. Please ensure: 1) The script is deployed as a Web App, 2) "Who has access" is set to "Anyone", 3) The script has been authorized. Error details: ${errorText.substring(0, 200)}`);
          }
          
          throw new Error(`Google Apps Script returned status ${googleResponse.status}: ${errorText.substring(0, 200)}`);
        }

        const googleResult = await googleResponse.json();
        console.log('📥 Google Apps Script response:', googleResult);
        
        if (!googleResult.success) {
          googleSheetsError = googleResult.message || 'Unknown error from Google Apps Script';
          console.error('❌ Google Sheets error:', googleSheetsError);
        } else {
          googleSheetsSuccess = true;
          console.log(`✅ Application form data saved to Google Sheets successfully (${submissionType}, Step ${step})`);
        }
      } catch (googleError) {
        googleSheetsError = googleError instanceof Error ? googleError.message : String(googleError);
        console.error('❌ Error sending to Google Sheets:', googleSheetsError);
        // Continue with email fallback - don't fail the request
      }
    } else {
      console.warn('⚠️ GOOGLE_APPS_SCRIPT_URL_APPLICATION_FORM not configured, skipping Google Sheets submission');
      googleSheetsError = 'Environment variable not configured';
    }

    // Only send emails if it's a complete submission (not a partial save)
    // Note: Google Sheets saves both partial and complete submissions
    if (!isPartial && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        // Configure email transport
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });
      // Send email to admin
      await transporter.sendMail({
        from: `"Industrial Training program Program" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Industrial Training Program Application - ${applicationData.fullName || 'Incomplete'}`,
        html: getApplicationEmailTemplate(applicationData),
      });

      // Send confirmation email to applicant (only if email is provided)
      if (applicationData.emailAddress) {
        await transporter.sendMail({
          from: `"Summer Industrial Training Program" <${process.env.SMTP_USER}>`,
          to: applicationData.emailAddress,
          subject: 'Application Received - Summer Industrial Training Program',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #dc2626;">Thank You for Your Application</h2>
              <p>Dear ${applicationData.fullName || 'Applicant'},</p>
              <p>We have received your application for the Summer Industrial Training Program. Our team will review your application and get back to you soon.</p>
              <p>Application Details:</p>
              <ul>
                <li>Program: ${applicationData.applyingFor === 'others' ? applicationData.otherSpecification : applicationData.applyingFor || 'Not specified'}</li>
                <li>Tentative Dates: ${applicationData.tentativeDates || 'Not specified'}</li>
              </ul>
              <p>If you have any questions, feel free to contact us.</p>
              <p>Best regards,<br>Summer Industrial Training Program Team</p>
            </div>
          `,
        });
      }

      // send email to preet mam 
      await transporter.sendMail({
        from: `"Summer Industrial Training Program" <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'Application Received - Summer Industrial Training Program',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626;">New Application Received</h2>
            <p> Name ${applicationData.fullName || 'Not provided'},</p>
            <p> Whatsapp No ${applicationData.whatsappNo || 'Not provided'},</p>
            <p> college ${applicationData.collegeName || 'Not provided'},</p>
            <p> Branch ${applicationData.branch || 'Not provided'},</p>
            <p> Year of Passing ${applicationData.currentSemester || 'Not provided'},</p>
            <p> Applying for ${applicationData.applyingFor || 'Not provided'},</p>
            <p> Tentative Date ${applicationData.tentativeDates || 'Not provided'},</p>
            <p> Source ${applicationData.source || 'Not provided'},</p>
            <p> Query ${applicationData.query || 'Not provided'},</p>
            <p>Application Details:</p>
          </div>
        `,
      });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email fails, Google Sheets is the primary storage
      }
    }
    // Return response with Google Sheets status
    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        googleSheetsSaved: googleSheetsSuccess,
        googleSheetsError: googleSheetsError,
        step: step,
        isPartial: isPartial
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        message: 'Failed to submit application',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}