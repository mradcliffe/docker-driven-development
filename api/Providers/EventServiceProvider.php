<?php

namespace Radcliffe\DockerExample\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        'Radcliffe\DockerExample\Events\Event' => [
            'Radcliffe\DockerExample\Listeners\EventListener',
        ],
    ];

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        parent::boot();
    }
}
