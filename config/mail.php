<?php

return [
    'driver' => env('MAIL_DRIVER', 'sendmail'),
    'host' => env('MAIL_HOST', 'mailhog'),
    'port' => env('MAIL_PORT', 1025),
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'web@example.com'),
        'name' => env('MAIL_FROM_NAME', 'Example'),
    ],
    'sendmail' => '/usr/sbin/sendmail -t -i',
    'markdown' => [
        'theme' => 'default',
        'paths' => [
            resource_path('views/vendor/mail'),
        ],
    ],
];
