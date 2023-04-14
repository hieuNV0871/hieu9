

const paymentController = {
    momoPayment: async (req, res) => {
        try {

            
            res.status(200).json({success: "Thanh toán thành công, xin cảm ơn"})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}


module.exports = paymentController