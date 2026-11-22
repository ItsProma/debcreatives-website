<?php
declare(strict_types=1);

function inquiry_redirect(string $status): void
{
    header('Location: contact.html?status=' . rawurlencode($status));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    inquiry_redirect('invalid');
}

function inquiry_field(string $key, int $maxLength): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace(["\r", "\n"], ' ', $value));
    return substr($value, 0, $maxLength);
}

$name = inquiry_field('name', 120);
$email = inquiry_field('email', 254);
$business = inquiry_field('business', 160);
$service = inquiry_field('service', 120);
$country = inquiry_field('country', 120);
$budget = inquiry_field('budget', 120);
$detailsValue = $_POST['details'] ?? '';
$details = is_string($detailsValue) ? trim(substr($detailsValue, 0, 5000)) : '';
$honeypot = inquiry_field('website', 200);

if ($honeypot !== '') {
    // Quietly accept the request so simple bots do not learn about the trap.
    inquiry_redirect('sent');
}

if (
    $name === '' ||
    $service === '' ||
    $details === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    inquiry_redirect('invalid');
}

$recipient = 'promadeb55@gmail.com';
$sender = 'website@debcreatives.net';

$subject = 'New Deb Creatives project inquiry';
$message = implode("\n", [
    'New project inquiry from DebCreatives.net',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Business/project: ' . ($business !== '' ? $business : 'Not provided'),
    'Service: ' . $service,
    'Country/time zone: ' . ($country !== '' ? $country : 'Not provided'),
    'Budget: ' . ($budget !== '' ? $budget : 'Not provided'),
    '',
    'Project details:',
    $details,
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Deb Creatives Website <' . $sender . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
]);

// Align the envelope sender with debcreatives.net so its SPF record is checked.
$sent = @mail($recipient, $subject, $message, $headers, '-f' . $sender);
inquiry_redirect($sent ? 'sent' : 'failed');
