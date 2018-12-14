<?php

return [
    'defalut' => env('FILESYSTEM_DRIVER', 'local'),
    'disks' => [
        'local' => ['driver' => 'local', 'root' => storage_path('app')],
        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/webroot'),
            'url' => env('APP_URL') . '/storage',
            'visibility' => 'public',
        ],
    ],
];
