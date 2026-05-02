# Vercel Deployment Guide

## Deploying Backend + Frontend to Vercel

### Prerequisites
- GitHub repository with your code
- Vercel account
- Gmail account with app password

### Step 1: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password

### Step 2: Deploy to Vercel

#### Option A: Import from GitHub (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `Meghana30001/My-Portfolio`
4. Vercel will automatically detect the `vercel.json` configuration
5. Click **"Deploy"**

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Step 3: Verify Deployment

1. **Check frontend**: Visit your Vercel URL
2. **Test backend**: Visit `https://your-domain.vercel.app/api/health`
   - Should return: `{"status":"OK","message":"Backend is running"}`
3. **Test contact form**: Fill out the contact form on your site

### Step 4: Gmail App Password Setup

If you haven't set up Gmail app password:

1. Enable 2-factor authentication on your Gmail account
2. Go to [Google Account settings](https://myaccount.google.com/)
3. **Security** → **2-Step Verification** → **App passwords**
4. Generate new app password:
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Name it: "Portfolio Contact Form"
5. Use this 16-character password in Vercel environment variables

### File Structure After Deployment

```
/
├── index.html (main portfolio)
├── 01-ultra-illuminated-orange-ambient-portfolio.html
├── 02-enhanced-ambient-background-glow-copy.html
├── 03-ultra-illuminated-skills-arsenal.html
├── 04-enhanced-ambient-background-lighting-copy.html
├── 05-illuminated-contact-experience-copy.html
├── backend/
│   ├── server.js (serverless function)
│   ├── package.json
│   └── .env.example
└── vercel.json (deployment configuration)
```

### API Endpoints

- `POST /api/contact` - Contact form submission
- `GET /api/health` - Health check

### Troubleshooting

#### Backend Not Working
- Check Vercel function logs in dashboard
- Verify environment variables are set correctly
- Ensure Gmail app password is correct

#### Contact Form Not Sending
- Verify Gmail app password setup
- Check if 2-factor authentication is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are correct in Vercel

#### CORS Issues
- The `vercel.json` configuration should handle CORS
- If issues persist, check browser console for errors

### Local Development

To test locally:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Production Considerations

- Vercel automatically handles HTTPS
- Serverless functions scale automatically
- No server management required
- Free tier includes 100GB bandwidth/month

### Monitoring

- Check Vercel Analytics for visitor data
- Monitor function logs in Vercel dashboard
- Set up email forwarding for contact form notifications
