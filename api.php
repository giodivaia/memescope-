<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'InstantPanelApi.php';

class TwitterServiceAPI {
    private $api;

    public function __construct($apiKey) {
        $this->api = new Api();
        $this->api->api_key = $apiKey;
    }

    public function handleRequest() {
        $action = $_POST['action'] ?? '';
        $response = ['success' => false, 'message' => 'Invalid action'];

        switch ($action) {
            case 'validate_key':
                $response = $this->validateApiKey();
                break;
            case 'place_order':
                $response = $this->placeOrder();
                break;
            case 'check_status':
                $response = $this->checkStatus();
                break;
            case 'get_services':
                $response = $this->getServices();
                break;
        }

        echo json_encode($response);
    }

    private function validateApiKey() {
        try {
            $balance = $this->api->balance();
            return [
                'success' => true,
                'balance' => $balance->balance,
                'currency' => $balance->currency
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Invalid API key'
            ];
        }
    }

    private function placeOrder() {
        try {
            $tweetUrl = $_POST['tweet_url'] ?? '';
            $quantity = intval($_POST['quantity'] ?? 0);
            $service = intval($_POST['service'] ?? 0);

            if (!$tweetUrl || !$quantity || !$service) {
                throw new Exception('Missing required parameters');
            }

            $orderData = [
                'service' => $service,
                'link' => $tweetUrl,
                'quantity' => $quantity
            ];

            $result = $this->api->order($orderData);

            if (isset($result->error)) {
                throw new Exception($result->error);
            }

            return [
                'success' => true,
                'order_id' => $result->order,
                'message' => 'Order placed successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    private function checkStatus() {
        try {
            $orderId = $_POST['order_id'] ?? '';
            if (!$orderId) {
                throw new Exception('Order ID is required');
            }

            $status = $this->api->status($orderId);

            if (isset($status->error)) {
                throw new Exception($status->error);
            }

            return [
                'success' => true,
                'status' => $status->status,
                'charge' => $status->charge,
                'remains' => $status->remains,
                'start_count' => $status->start_count,
                'currency' => $status->currency
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    private function getServices() {
        try {
            $services = $this->api->services();
            return [
                'success' => true,
                'services' => $services
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}

// Handle the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apiKey = $_POST['api_key'] ?? '';
    $handler = new TwitterServiceAPI($apiKey);
    $handler->handleRequest();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
} 