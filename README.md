# Dockerized Comer E-commerce Website

## Introduction

Welcome to the Dockerized Comer E-commerce Website repository. This comprehensive guide is designed to assist you in deploying and managing the full-stack web application of an online store. This project encapsulates three primary components: the front-end client, the back-end server, and the MongoDB database, all seamlessly integrated and Dockerized for ease of deployment and scalability.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Docker Compose
- Git (for cloning the repository)

## Installation

### Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/gayeongpark/comer_docker.git
cd comer_docker
```

### Environment Setup

Set up the necessary `.env` files in both the `client` and `server` directories as per the template provided in each directory.

### Building the Docker Containers

To build the Docker containers, run the following command in the root directory:

```bash
docker-compose build
```

### Running the Docker Containers

Start the application by running:

```bash
docker-compose up
```

This command will start all the services defined in your `docker-compose.yml` file.

## Usage

Once the application is running, you can access:
- The client application at `http://localhost:3000`
- The server API at `http://localhost:8000`

## Services

The application consists of the following services:
- **Client**: A React-based front-end running on port 3000.
- **Server**: A Node.js back-end server, interfacing with MongoDB, running on port 8000.
- **MongoDB**: A MongoDB database service, configured for the application's data storage needs.

## Accessing Logs

To view the logs for a specific service, use the following command:

```bash
docker-compose logs [service_name]
```

Replace `[service_name]` with `client`, `server`, or `mongodb`.

## Stopping the Application

To stop and remove the containers, networks, and volumes, run:

```bash
docker-compose down
```

## Troubleshooting

If you encounter issues, check the logs for each service as described above. Common issues usually involve environment variable misconfigurations or Docker daemon issues.

## Contributing

Contributions to the Comer E-commerce Website project are welcome. Please send your pull requests to the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
