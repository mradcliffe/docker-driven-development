<?php

$app = new Illuminate\Foundation\Application(
    realpath(__DIR__ . '/../')
);

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    Radcliffe\DockerExample\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    Radcliffe\DockerExample\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    Radcliffe\DockerExample\Exceptions\Handler::class
);

return $app;
