from datetime import datetime

def custom_email(name, heading, msg):
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centerpiece Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        body {{
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            padding: 0;
        }}
        .container {{
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            background: white;
            padding: 24px;
            text-align: center;
        }}
        .header img {{
            max-width: 200px;
            height: auto;
        }}
        .content {{
            padding: 40px 32px;
            color: #334155;
        }}
        .content h1 {{
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            margin-top: 0;
        }}
        .content p {{
            font-size: 15px;
            line-height: 1.6;
            margin: 16px 0;
            color: #475569;
        }}
        .btn-primary {{
            background: linear-gradient(135deg, #f8ae1f 0%, #e69c00 100%);
            color: #1e293b !important;
            padding: 12px 28px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
            margin: 20px 0;
            border: none;
            cursor: pointer;
        }}
        .btn-primary:hover {{
            background: linear-gradient(135deg, #e69c00 0%, #cc8a00 100%);
        }}
        .footer {{
            text-align: center;
            padding: 24px;
            font-size: 13px;
            color: #64748b;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
        }}
        .footer a {{
            color: #f8ae1f;
            text-decoration: none;
            margin: 0 6px;
            font-weight: 500;
        }}
        .footer a:hover {{
            color: #e69c00;
            text-decoration: underline;
        }}
        .highlight {{
            color: #f8ae1f;
            font-weight: 600;
        }}
        .security-note {{
            background: #fffbeb;
            border: 1px solid #fef3c7;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            border-left: 4px solid #f8ae1f;
        }}
        .otp-code {{
            background: #1e293b;
            color: #f8ae1f;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 4px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }}
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://centerpieceltd.com/Centerpiece.png" alt="Centerpiece Group Ltd" />
        </div>

        <!-- Content -->
        <div class="content">
            <h1>{heading}</h1>
            <p>Dear <span class="highlight">{name}</span>,</p>
            <div>{msg}</div>
            
            <div class="security-note">
                <i class="fas fa-shield-alt" style="color: #f8ae1f; margin-right: 8px;"></i>
                <strong>Security Notice:</strong> For your protection, never share this code with anyone. 
                Our team will never ask for your verification code.
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
                Need help? Contact our support team at 
                <a href="mailto:support@centerpieceltd.com" style="color: #f8ae1f; font-weight: 600;">support@centerpieceltd.com</a>
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; {datetime.now().year} <span class="highlight">Centerpiece Group Ltd</span>. All rights reserved.</p>
            <p>
                <a href="https://centerpieceltd.com">Our Website</a> • 
                <a href="https://centerpieceltd.com/">Privacy Policy</a> • 
                <a href="https://centerpieceltd.com/">Terms of Service</a>
            </p>
            <p>Centerpiece Group Ltd - Financial Management Solutions</p>
        </div>
    </div>
</body>
</html>
"""