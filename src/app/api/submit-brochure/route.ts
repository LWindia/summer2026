import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use nodejs runtime for better compatibility with external APIs

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Google Apps Script URL from environment variable
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    // If Google Script URL is not configured, still return success
    // (form data is logged, and can be configured later)
    if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
      try {
        // Submit to Google Sheets via Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            formType: 'brochure_download',
          }),
          mode: 'no-cors', // Google Apps Script requires no-cors
        });
      } catch (fetchError) {
        // Log error but don't fail the request
        console.error('Error submitting to Google Sheets:', fetchError);
      }
    } else {
      // Log form data when Google Script URL is not configured
      console.log('Brochure form submission (Google Script not configured):', {
        ...formData,
        timestamp: new Date().toISOString(),
        formType: 'brochure_download',
      });
    }
    
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        message: 'Failed to submit form',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

