<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/**
 * Message table schema.
 */
class CreateMessageTable extends Migration
{
    public function up()
    {
        Schema::create('message', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('author');
            $table->jsonb('props');

            $table->index('author');
        });
    }

    public function down()
    {
        Schema::dropIfExists('message');
    }
}
