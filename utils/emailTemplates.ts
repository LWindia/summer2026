// utils/emailTemplates.ts

interface ApplicationData {
  fullName: string;
  whatsappNo: string;
  emailAddress: string;
  collegeName: string;
  branch: string;
  currentSemester: string;
  applyingFor: string;
  otherSpecification?: string;
  tentativeDates: string;
  referenceName?: string;
  source: string;
  query?: string;
}

export const getApplicationEmailTemplate = (data: ApplicationData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Application Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #dc2626;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 15px;
            border-bottom: 2px solid #dc2626;
            padding-bottom: 5px;
        }
        .field {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f8f8f8;
            border-radius: 4px;
        }
        .field-label {
            font-weight: bold;
            color: #666666;
            margin-bottom: 5px;
        }
        .field-value {
            color: #333333;
        }
        .footer {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }
        .logo {
            max-width: 150px;
            margin: 0 auto 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Summer Program Application</h1>
            <p>Application Submission Details</p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">Personal Information</div>
                <div class="field">
                    <div class="field-label">Full Name</div>
                    <div class="field-value">${data.fullName}</div>
                </div>
                <div class="field">
                    <div class="field-label">WhatsApp Number</div>
                    <div class="field-value">${data.whatsappNo}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email Address</div>
                    <div class="field-value">${data.emailAddress}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Academic Information</div>
                <div class="field">
                    <div class="field-label">College Name</div>
                    <div class="field-value">${data.collegeName}</div>
                </div>
                <div class="field">
                    <div class="field-label">Degree Pursuing</div>
                    <div class="field-value">${data.branch}</div>
                </div>
                <div class="field">
                    <div class="field-label">Year of Passing</div>
                    <div class="field-value">${data.currentSemester}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Program Details</div>
                <div class="field">
                    <div class="field-label">Applying For</div>
                    <div class="field-value">
                        ${data.applyingFor === 'others' 
                            ? `Others - ${data.otherSpecification}` 
                            : data.applyingFor}
                    </div>
                </div>
                <div class="field">
                    <div class="field-label">Tentative Dates</div>
                    <div class="field-value">${data.tentativeDates}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Additional Information</div>
                ${data.referenceName ? `
                <div class="field">
                    <div class="field-label">Reference Name</div>
                    <div class="field-value">${data.referenceName}</div>
                </div>
                ` : ''}
                <div class="field">
                    <div class="field-label">Source</div>
                    <div class="field-value">${data.source}</div>
                </div>
                ${data.query ? `
                <div class="field">
                    <div class="field-label">Query</div>
                    <div class="field-value">${data.query}</div>
                </div>
                ` : ''}
            </div>
        </div>

        <div class="footer">
            <img src="https://your-logo-url.com/logo.png" alt="Linux World Logo" class="logo">
            <p>© ${new Date().getFullYear()} Linux World. All rights reserved.</p>
            <p>This is an automated email notification for a new application submission.</p>
        </div>
    </div>
</body>
</html>
`;