<?php

return [
    'default' => env('CACHE_DRIVER', 'file'),
    'stores' => [
        'apc' => ['driver' => 'apc'],
        'array' => ['driver' => 'array'],
        'database' => ['driver' => 'database', 'table' => 'cache', 'connection' => null],
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
        ],
        'prefix' => env('CACHE_PREFIX', str_slug(env('APP_NAME', 'laravel'), '_') . '_cache')
    ],
];
