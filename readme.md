# CommerceHub Backend

## Overview

This is the backend component of the CommerceHub application, responsible for managing products, variants, and providing search functionality. It is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Products](#products)
  - [Variants](#variants)
  - [Search](#search)
- [Testing](#testing)
- [Architecture](#architecture)
- [Assumptions](#assumptions)

## Getting Started

### Prerequisites

- Node.js (version 12 or above)
- MongoDB (Make sure MongoDB is running on your machine or update the database configuration accordingly)

### Installation

1.  Clone the repository:

    bashCopy code

    `git clone https://github.com/samdeopa/commercehub-backend.git`

2.  Install dependencies:

    bashCopy code

    `cd commercehub-backend npm install`

## Running the Server

To start the server, run the following command:

bashCopy code

`npm start`

The server will run on `http://localhost:3000` by default.

## API Documentation

### Products

- **Create a Product**

  - Endpoint: `POST /products`
  - Request Body: JSON with product details
  - Response: JSON with the created product

- **Get All Products**

  - Endpoint: `GET /products`
  - Response: JSON array of all products

- **Get Product by ID**

  - Endpoint: `GET /products/:productId`
  - Response: JSON with the requested product

- **Update Product by ID**

  - Endpoint: `PUT /products/:productId`
  - Request Body: JSON with updated product details
  - Response: JSON with the updated product

- **Delete Product by ID**

  - Endpoint: `DELETE /products/:productId`
  - Response: JSON with the deleted product

### Variants

- **Add Variant to a Product**

  - Endpoint: `POST /variants/:productId`
  - Request Body: JSON with variant details
  - Response: JSON with the added variant

- **Update Variant of a Product**

  - Endpoint: `PUT /variants/:productId/:variantId`
  - Request Body: JSON with updated variant details
  - Response: JSON with the updated variant

- **Delete Variant from a Product**

  - Endpoint: `DELETE /variants/:productId/:variantId`
  - Response: JSON with the deleted variant

### Search

- **Search Products**
  - Endpoint: `GET /products/search?query=:searchQuery`
  - Response: JSON array of products matching the search query

## Testing

Run tests using the following command:

bashCopy code

`npm test`

## Architecture

The project follows a modular architecture with separate routers for products and variants. The data is stored in a MongoDB database using Mongoose.

## Assumptions

- The MongoDB server is running locally on the default port.
- The project assumes a certain structure for the product and variant data.
