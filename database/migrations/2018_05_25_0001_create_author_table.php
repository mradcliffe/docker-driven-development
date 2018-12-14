<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/**
 * Author table schema.
 */
class CreateAuthorTable extends Migration
{
    public function up()
    {
        Schema::create('author', function (Blueprint $table) {
            $table->increments('id');
            $table->jsonb('props');
        });
    }

    public function down()
    {
        Schema::dropIfExists('author');
    }
}
