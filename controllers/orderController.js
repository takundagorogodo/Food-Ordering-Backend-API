export const placeOrderController = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const { cart } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart must be a non-empty array"
      });
    }

    let total = 0;
    const foods = [];

    // 🔐 Fetch real data from DB
    for (const itemId of cart) {
      const food = await Food.findById(itemId);

      if (!food) {
        return res.status(404).json({
          success: false,
          message: `Food not found: ${itemId}`
        });
      }

      total += food.price;   // ✅ real price
      foods.push(food._id);  // store ID
    }

    const newOrder = await Order.create({
      foods,
      payment: total,
      buyer: req.user.id,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error placing order"
    });
  }
};

export const orderStatusController = async (req, res) => {
  try {

    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id"
      });
    }

    if (!validStatus.includes(status)) {
    return res.status(400).json({
        success: false,
        message: "Invalid status value"
    });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { returnDocument: "after", runValidators: true }
    );
    
    const validStatus = ["pending", "preparing", "delivered"];

    

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order
    });

  } catch (error) {

    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order id format"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to change order status"
    });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required"
      });
    }

    // 1. Find order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // 2. Authorization check
    const isAdmin = user.role === "admin";
    const isOwner = order.buyer.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own order"
      });
    }

    // 3. Cancel order (better than delete)
    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order
    });

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};