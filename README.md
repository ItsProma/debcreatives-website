# Deb Creatives website

A responsive, five-page website for Deb Creatives. The site is in English and uses the cream, black, olive-green, and small coral-accent palette selected from the reference screenshot.

## Pages

- `index.html` — Home
- `work.html` — Portfolio with project filters
- `services.html` — Service details
- `studio.html` — Studio introduction
- `contact.html` — Project inquiry form
- `send-inquiry.php` — Server-side inquiry email handler

## Contact form

The form sends project inquiries to the studio inbox using PHP's `mail()`. It includes server-side field validation and a honeypot field for basic spam filtering. The visitor's email is set as Reply-To.

The hosting account must allow PHP mail delivery. Send a test inquiry after uploading the PHP file and check the inbox and spam folder.

## Before publishing

1. Confirm the project descriptions and public portfolio screenshots.
2. Add the final team names and profiles in `studio.html` when ready.
3. Review the contact and privacy information for the business and markets served.

## Preview and hosting

This project uses HTML, CSS, JavaScript, and one PHP handler. The pages can be previewed by opening `index.html`; the inquiry form requires PHP hosting to send messages.
