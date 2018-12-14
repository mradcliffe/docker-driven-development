<?php

namespace Radcliffe\DockerExample\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'message';
    public $timestamps = false;

    protected $casts = [
        'props' => 'array',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class, 'author', 'id');
    }
}
