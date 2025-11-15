<?php
/**
 * FastComet PHP Proxy for Airtable API
 * This keeps your API key secure on the server side
 */

// Set CORS headers to allow requests from your domain
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load configuration from a separate file (outside web root if possible)
// Create a config.php file in the same directory with your credentials
require_once(__DIR__ . '/config.php');

// Validate configuration
if (!defined('AIRTABLE_API_KEY') || !defined('AIRTABLE_BASE_ID') || !defined('AIRTABLE_TABLE_ID')) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: Airtable credentials not set']);
    exit;
}

// Get optional query parameters
$offset = isset($_GET['offset']) ? $_GET['offset'] : '';
$maxRecords = isset($_GET['maxRecords']) ? $_GET['maxRecords'] : '100';
$view = isset($_GET['view']) ? $_GET['view'] : '';

// Build Airtable API URL
$url = "https://api.airtable.com/v0/" . AIRTABLE_BASE_ID . "/" . AIRTABLE_TABLE_ID . "?maxRecords=" . $maxRecords;
if ($offset) {
    $url .= "&offset=" . urlencode($offset);
}
if ($view) {
    $url .= "&view=" . urlencode($view);
}

// Initialize cURL
$ch = curl_init($url);

// Prepare cURL options and enable using a local CA bundle if present
$curlOpts = [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . AIRTABLE_API_KEY,
        'Content-Type: application/json'
    ],
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_TIMEOUT => 30
];

// If a CA bundle named cacert.pem exists in the api directory, use it.
$caFile = __DIR__ . '/cacert.pem';
if (file_exists($caFile)) {
    $curlOpts[CURLOPT_CAINFO] = $caFile;
}

curl_setopt_array($ch, $curlOpts);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    $curlErr = curl_error($ch);
    $response = [
        'error' => 'Internal server error',
        'message' => $curlErr
    ];

    // Detect common SSL certificate issues and provide actionable guidance
    if (stripos($curlErr, 'SSL certificate') !== false || stripos($curlErr, 'unable to get local issuer certificate') !== false) {
        $response['hint'] = 'cURL SSL error: install a CA bundle and set `curl.cainfo` in php.ini, or place a `cacert.pem` file in the api/ directory and set CURLOPT_CAINFO. For local development you can temporarily disable verification (not recommended in production).';
        $response['fix_example'] = 'Download cacert.pem from https://curl.se/ca/cacert.pem and add `curl.cainfo = "C:\\path\\to\\cacert.pem"` to php.ini';
    }

    http_response_code(500);
    echo json_encode($response);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Set HTTP response code from Airtable
http_response_code($httpCode);

// Return the response
echo $response;
?>

