# Payment Service – Docker Setup
This project demonstrates a simple microservices architecture with **Order Service**, **Payment Service**, and **RabbitMQ** as the message broker.



## 📦 Running the Container

### Start command
docker-compose up

### Stop command
docker-compose down


## CURLS

### Get Orders List
curl --location 'http://127.0.0.1:6000/api/order'

### Create Order
curl --location 'http://127.0.0.1:6000/api/order' \
--header 'Content-Type: application/json' \
--data '{
    "productId":"1234"
}'