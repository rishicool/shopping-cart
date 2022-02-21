<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->double("total_amount", 16,2 )->unsigned()->default(0)->nullable();
            $table->integer("status")->comment("0 = Pending, 1 = Accepted, 2 = Canceled, 3 = Delivered");
            $table->integer("payment_status")->comment("0 = Pending, 1 = Paid, 2 = Canceled");
            $table->foreignId("user_id")->references("id")->on("users")->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function(Blueprint $table){
            $table->dropForeign('user_id');
            $table->dropForeign('product_id');
        });
        Schema::dropIfExists('orders');
    }
}
