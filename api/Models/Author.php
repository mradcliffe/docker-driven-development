<?php

namespace Radcliffe\DockerExample\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table = 'author';
    public $timestamps = false;

    protected $casts = [
        'props' => 'array',
    ];
}
