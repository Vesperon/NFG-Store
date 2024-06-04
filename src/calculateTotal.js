import supabase from "./supabaseClient";

async function calculateTotal(transactionId) {
    try {
        // Fetch orders associated with the transaction ID
        const { data: orders, error: ordersError } = await supabase
            .from('order')
            .select('*')
            .eq('transaction_id', transactionId);

        if (ordersError) {
            console.error('Error fetching orders:', ordersError);
            return null;
        }

        // Calculate the total amount
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.order_quantity * order.order_price;
        });

        return totalAmount;
    } catch (error) {
        console.error('Error calculating total:', error);
        return null;
    }
}

export default calculateTotal;
