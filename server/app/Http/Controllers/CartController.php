<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cart;


class CartController extends Controller
{
    public function cartList(Request $request)
    {
        $cartObject = new Cart;
        $userCart = $cartObject->getUserCart($request);
        return response()->json(['data' => $userCart], 200);
    }

    public function addToCart(Request $request)
    {
        $cartObject = new Cart();        
        $return = $cartObject->addToCart($request);
        
        if($return)
        return response()->json(['message' => "Added to cart successfully", "status" => 1, "data" => $return[0], 'isNew' => $return[1]]);
        else
        return response()->json(['message' => "Error updating cart", "status" => 0]);

    }

    public function updateCartQty(Request $request)
    {
        $cartObject = new Cart();
        $cartObject->updateCartQty($request);
        response()->json(['message' => "Quantity updated successfully", "status" => 1]);
    }

    public function removeCartItem(Request $request)
    {
        $cartObject = new Cart();
        $ret = $cartObject->removeCartItem($request);
        return response()->json(['message' => "Item removed successfully", "status" => 1, 'ret' => $ret]);
    }

    public function clearAllCart(Request $request)
    {
        $cartObject = new Cart();
        $ret = $cartObject->clearCart($request);
        return response()->json(['message' => "Cart is empty now", "status" => 1, 'ret' => $ret]);
    }
}